/*
 * Copyright 2017 Okta
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
package com.okta.test.mock.tests

import com.okta.test.mock.Scenario
import org.hamcrest.Matcher
import org.hamcrest.Matchers

import static com.okta.test.mock.scenarios.Scenario.CUSTOM_CODE_FLOW_LOCAL_VALIDATION

@Scenario(CUSTOM_CODE_FLOW_LOCAL_VALIDATION)
class CustomLoginCodeFlowLocalValidationIT extends CodeFlowLocalValidationIT {

    @Override
    protected Matcher<?> loginPageMatcher() {
        return Matchers.containsString('id="sign-in-widget"')
    }
}
