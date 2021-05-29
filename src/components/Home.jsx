/* eslint-disable unicode-bom */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';

const Home = () => {
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

	return (
		<div>
			<div>
				{authState.isAuthenticated && !userInfo && (
					<div>Loading user information...</div>
				)}
				{authState.isAuthenticated && userInfo && (
					<div>
						Welcome, &nbsp;
						{userInfo.name}!
					</div>
				)}
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
			</div>
		</div>
	);
};

export default Home;
