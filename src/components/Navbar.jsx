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
import { Menu, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Navbar = () => {
	const { authState, oktaAuth } = useOktaAuth();
	const [activeItem, setActiveItem] = useState(null);

	useEffect(() => {
		setActiveItem(activeItem);
		// update focus whenever active item changes
	}, [activeItem, setActiveItem]);

	return (
		<div>
			<Menu pointing>
				<Menu.Item
					name="home"
					as={Link}
					to="/home"
					active={activeItem === 'home'}
					onClick={() => setActiveItem(activeItem)}
				>
					Home
				</Menu.Item>
				{authState.isAuthenticated && (
					<Menu.Item
						name="tasklist"
						as={Link}
						to="/tasklist"
						active={activeItem === 'tasklist'}
						onClick={() => setActiveItem(activeItem)}
					>
						tasklist <Label color="teal">1</Label>
					</Menu.Item>
				)}
				{authState.isAuthenticated && (
					<Menu.Item
						name="searchresults"
						as={Link}
						to="/searchresults"
						active={activeItem === 'searchresults'}
						onClick={() => setActiveItem(activeItem)}
					>
						searchresults
					</Menu.Item>
				)}
				{authState.isAuthenticated && (
					<Menu.Item
						name="gituserinfo"
						as={Link}
						to="/gituserinfo"
						active={activeItem === 'gituserinfo'}
						onClick={() => setActiveItem(activeItem)}
					>
						gituserinfo
					</Menu.Item>
				)}
				{authState.isAuthenticated && (
					<Menu.Item
						name="getuserlist"
						as={Link}
						to="/getuserlist"
						active={activeItem === 'getuserlist'}
						onClick={() => setActiveItem(activeItem)}
					>
						getuserlist<Label>51</Label>
					</Menu.Item>
				)}
				{authState.isAuthenticated && (
					<Menu.Item
						name="getqueuelist"
						as={Link}
						to="/getqueuelist"
						active={activeItem === 'getqueuelist'}
						onClick={() => setActiveItem(activeItem)}
					>
						getqueuelist<Label>21</Label>
					</Menu.Item>
				)}
				{authState.isAuthenticated && (
					<Menu.Item
						name="cti"
						as={Link}
						to="/cti"
						active={activeItem === 'cti'}
						onClick={() => setActiveItem(activeItem)}
					>
						cti
					</Menu.Item>
				)}
			</Menu>
		</div>
	);
};
export default Navbar;
