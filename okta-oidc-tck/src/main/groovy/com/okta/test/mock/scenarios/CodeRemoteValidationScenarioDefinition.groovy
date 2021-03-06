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
package com.okta.test.mock.scenarios

import com.github.tomakehurst.wiremock.WireMockServer
import com.okta.test.mock.Config

import java.nio.charset.StandardCharsets
import java.util.regex.Pattern

import static com.github.tomakehurst.wiremock.client.WireMock.*

class CodeRemoteValidationScenarioDefinition implements ScenarioDefinition {

    @Override
    void configureHttpMock(WireMockServer wireMockServer, String baseUrl) {

        def redirectUriPath = Config.Global.codeFlowRedirectPath
        def redirectUriPathEscaped = URLEncoder.encode(redirectUriPath, StandardCharsets.UTF_8.toString())

        wireMockServer.stubFor(
                get("/oauth2/default/.well-known/openid-configuration")
                        .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBodyFile("discovery.json")
                        .withTransformers("gstring-template")))

        wireMockServer.stubFor(
                get(urlPathEqualTo("/oauth2/default/v1/authorize"))
                        .withQueryParam("client_id", matching("OOICU812"))
                        .withQueryParam("redirect_uri", matching(Pattern.quote("http://localhost:") + "\\d+${redirectUriPath}"))
                        .withQueryParam("response_type", matching("code"))
                        .withQueryParam("scope", matching("offline_access"))
                        .withQueryParam("state", matching(".{6,}"))
                        .willReturn(aResponse()
                        .withBody("<html>fake_login_page<html/>")))

        // remote access token
        wireMockServer.stubFor(
                post(urlPathEqualTo("/oauth2/default/v1/token"))
                        .withRequestBody(containing("grant_type=authorization_code"))
                        .withRequestBody(containing("code=TEST_CODE&"))
                        .withRequestBody(matching(".*" + Pattern.quote("redirect_uri=http%3A%2F%2Flocalhost%3A") + "\\d+" + Pattern.quote(redirectUriPathEscaped) + ".*"))
                        .withBasicAuth("OOICU812", "VERY_SECRET")
                        .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json;charset=UTF-8")
                        .withBodyFile("remote-validation-token.json")))

        wireMockServer.stubFor(
                get(urlPathEqualTo("/oauth2/default/v1/userinfo"))
                        .withHeader("Authorization", equalTo("Bearer accessTokenJwt"))
                        .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json;charset=UTF-8")
                        .withBodyFile("userinfo.json")))

        // access token with groups
        wireMockServer.stubFor(
                post(urlPathEqualTo("/oauth2/default/v1/token"))
                        .withRequestBody(containing("grant_type=authorization_code"))
                        .withRequestBody(containing("code=TEST_CODE_WITH_GROUPS&"))
                        .withRequestBody(matching(".*" + Pattern.quote("redirect_uri=http%3A%2F%2Flocalhost%3A") + "\\d+" + Pattern.quote(redirectUriPathEscaped) + ".*"))
                        .withBasicAuth("OOICU812", "VERY_SECRET")
                        .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json;charset=UTF-8")
                        .withBodyFile("remote-validation-token-groups.json")))

        wireMockServer.stubFor(
                get(urlPathEqualTo("/oauth2/default/v1/userinfo"))
                        .withHeader("Authorization", equalTo("Bearer accessTokenJwt_groups"))
                        .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json;charset=UTF-8")
                        .withBodyFile("userinfo-groups.json")))
    }
}