/*
 * Copyright 2017 Okta, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.okta.test.mock.application

import com.okta.test.mock.Config
import com.okta.test.mock.Scenario
import com.okta.test.mock.TestScenario
import com.okta.test.mock.wiremock.HttpMock
import groovy.text.StreamingTemplateEngine
import org.testng.Assert
import org.testng.IHookCallBack
import org.testng.IHookable
import org.testng.ITestResult
import org.testng.annotations.AfterClass
import org.testng.annotations.BeforeClass
import org.testng.SkipException
import org.yaml.snakeyaml.Yaml

import java.util.stream.Collectors

import static io.restassured.RestAssured.given
import static org.hamcrest.MatcherAssert.assertThat

abstract class ApplicationTestRunner extends HttpMock implements IHookable {

    private ApplicationUnderTest app = getApplicationUnderTest(getScenarioName())

    private int mockPort
    private int mockHttpsPort
    private int applicationPort
    private TestScenario scenario

    ApplicationTestRunner() {
        setScenario(getScenarioName())
    }

    String getScenarioName() {
        Scenario scenario = getClass().getAnnotation(Scenario)
        if (scenario == null) {
            Assert.fail("@Scenario was not found on class '${getClass()}', you must annotate this class or override the 'getScenarioName()' method.")
        }
        return scenario.value().id
    }

    int getApplicationPort() {
        return applicationPort
    }

    int doGetMockPort() {
        return mockPort
    }

    int doGetMockHttpsPort() {
        return mockHttpsPort
    }

    String getProtectedPath() {
        return app.getTestScenario().protectedPath
    }

    @Override
    void run(IHookCallBack callBack, ITestResult testResult) {

        String testMethod = testResult.method.getMethodName()
        if (scenario.enabled == false || scenario.disabledTests.contains(testMethod)) {
            throw new SkipException("Skipping the disabled test - " + testMethod)
        }
        callBack.runTestMethod(testResult)
    }

    @BeforeClass
    void start() {
        if (scenario.enabled == false) {
            return
        }

        startMockServer()
        app.start()

        // allow for CI to configure the timeout
        String retryCountKey = "okta.test.startPollCount"
        String envRetryCountKey = retryCountKey.replace('.', '_').toUpperCase(Locale.ENGLISH)
        String value = System.getenv(envRetryCountKey) ?: System.getProperty(retryCountKey, "10000") // a little over a minute

        pollForStartedApplication(applicationPort, value.toInteger())
    }

    @AfterClass
    void stop() {
        if (scenario.enabled == false) {
            return
        }
        int exitStatus = app.stop()
        assertThat("exit status was not 0 or 143 (SIGTERM)", exitStatus==0 || exitStatus==143)
    }

    boolean pollForStartedApplication(int port, int times) {

        for (int ii=0; ii<times; ii++) {
            try {
                given().get("http://localhost:${port}/")
                return true
            } catch (ConnectException e) {
                // ignore connection exception
                Thread.sleep(500)
            }
        }
        return false
    }

    ApplicationUnderTest getApplicationUnderTest(String scenarioName) {

        Config config = loadConfig()

        Class impl = Class.forName(config.implementation)
        scenario = config.scenarios.get(scenarioName)

        // if the scenario is not defined, just skip it
        if (scenario == null) {
            scenario = new TestScenario()
            scenario.enabled = false
            return null
        }

        // figure out which ports we need
        applicationPort = getPort("applicationPort", scenario)
        mockPort = getPort("mockPort", scenario)
        mockHttpsPort = getPort("mockHttpsPort", scenario)

        // interpolate the scenario args with the ports
        def templateEngine = new StreamingTemplateEngine()
        def binding = [applicationPort: applicationPort, mockPort: mockPort, mockHttpsPort: mockHttpsPort]
        List<String> filteredArgs = scenario.args.stream()
            .map { templateEngine.createTemplate(it).make(binding).toString() }
            .collect(Collectors.toList())
        scenario.args = filteredArgs

        // create and return
        return impl.newInstance()
                .configure(scenario)
    }

    int getPort(String key, TestScenario scenario) {
        Integer port = scenario.ports.get(key)
        if (port == null || port == 0) {
            return getFreePort()
        }
        return port
    }

    int getFreePort() {
        int port = new ServerSocket(0).withCloseable {it.getLocalPort()}
        return port
    }

    /**
     * Add some verbose logging (when needed). References to this method should NOT be checked in.
     */
    void dump() {
        println "\nDump:"
        if (wireMockServer != null) {
            wireMockServer.getAllServeEvents().each {
                println(it.getRequest())
            }
        }
    }

    Config loadConfig(String fallbackConfigLocation = configYamlLocation()) {
        Config config
        if (System.getProperty("config") != null) {
            File yamlFile = new File(System.getProperty("config"))
            config = new Yaml().loadAs(new FileInputStream(yamlFile), Config)
        } else {
            config = new Yaml().loadAs(getClass().getResource( fallbackConfigLocation ).text, Config)
        }
        return config
    }

    /**
     * Returns the location of the configuration yaml file on the classpath.
     * @return defaults to '/testRunner.yml'
     */
    String configYamlLocation() {
        return '/testRunner.yml'
    }
}
