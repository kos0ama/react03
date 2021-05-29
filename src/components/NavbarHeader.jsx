/* eslint-disable unicode-bom */
/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const NavbarHeader = () => {
	const { authState, oktaAuth } = useOktaAuth();
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		if (!authState.isAuthenticated) {
			// When user isn't authenticated, forget any user info
			setUserInfo(null);
		} else {
			oktaAuth.getUser().then((info) => {
				setUserInfo(info);
			});
		}
	}, [authState, oktaAuth]); // Update if authState changes

	const login = async () => {
		oktaAuth.signInWithRedirect();
	};
	const logout = async () => oktaAuth.signOut();

	if (authState.isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{authState.isAuthenticated && userInfo && (
				<Button
					id="profile-button"
					basic
					inverted
					color="violet"
					as={Link}
					to="/profile"
				>
					{userInfo.email}
				</Button>
			)}
			{authState.isAuthenticated && (
				<Button id="logout-button" inverted color="red" onClick={logout}>
					Logout
				</Button>
			)}
			{!authState.isPending && !authState.isAuthenticated && (
				<Button id="login-button" inverted color="green" onClick={login}>
					Login
				</Button>
			)}
		</div>
	);
};
export default NavbarHeader;
