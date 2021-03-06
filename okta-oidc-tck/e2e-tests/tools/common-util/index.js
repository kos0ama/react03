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
/* global jasmine */
const jasmineReporters = require('jasmine-reporters');

const commonUtils = module.exports = {};
const qs = require('qs');
const request = require('request');
const url = require('url');

commonUtils.getAccessToken = function(options = {}) {

  const {
    ISSUER,
    CLIENT_ID,
    REDIRECT_URI,
    USERNAME,
    PASSWORD
  } = options;

  return new Promise((resolve, reject) => {

    const urlProperties = url.parse(ISSUER);
    const domain = urlProperties.protocol + '//' + urlProperties.host;
    const postUrl = domain + '/api/v1/authn';
    request.post(postUrl, {
      json: true,
        body: {
          username: USERNAME,
          password: PASSWORD
        }
    }, function (err, resp, body) {

      if (err || resp.statusCode >= 400) {
        return resolve(err || body);
      }

      const authorizeParams = {
        sessionToken: body.sessionToken,
        response_type: 'token',
        client_id: CLIENT_ID,
        redirect_uri: 'http://localhost:8080/implicit/callback',
        scope: 'openid',
        nonce: 'foo',
        state: 'foo'
      };
      const authorizeUrl = ISSUER + '/v1/authorize?' + qs.stringify(authorizeParams);

      request.get(authorizeUrl, {followRedirect: false}, function(err, resp, body) {

        const parsedUrl = url.parse(resp.headers.location, true);
        if (parsedUrl.query.error) {
          return reject(parsedUrl.query.error);
        }
        const match = resp.headers.location.match(/access_token=([^&]+)/);
        const accessToken = match && match[1];
        if (!accessToken){
          return reject(new Error('Could not parse access token from URI'));
        }

        resolve(accessToken);
      })
    });
  });
};
