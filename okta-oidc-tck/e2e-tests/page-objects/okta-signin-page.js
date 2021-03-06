/*!
 * Copyright (c) 2015-2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

'use strict';

const util = require('./shared/util');

function input(field) {
  const inputWrap = `o-form-input-${field}`;
  return $(`${util.se(inputWrap)} input`);
}

class OktaSignInPage {

  constructor() {
    this.usernameInput = input('username');
    this.passwordInput = input('password');
    this.submitButton = $('[data-type="save"]');
  }

  waitForPageLoad() {
    return util.wait(this.usernameInput);
  }

  login(username, password) {
    this.usernameInput.sendKeys(username);
    this.passwordInput.sendKeys(password);
    return this.submitButton.click();
  }

  urlContains(str) {
    return util.urlContains(str);
  }
}

module.exports = OktaSignInPage;
