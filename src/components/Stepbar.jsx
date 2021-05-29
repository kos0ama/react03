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

import React, { useState, useEffect } from 'react';
import { Step } from 'semantic-ui-react';

const Stepbar = () => {
	const [menu, setMenu] = useState([]);

	useEffect(() => {
		console.log('MainHeaderでuseEffectが実行されました');
		setMenu(document.title);
	}, [menu.value]); // Update if authState changes

	return (
		<div>
			<Step.Group ordered size="mini">
				<Step completed>
					<Step.Content>
						<Step.Title>Ordered</Step.Title>
					</Step.Content>
				</Step>

				<Step completed>
					<Step.Content>
						<Step.Title>Reserved</Step.Title>
					</Step.Content>
				</Step>

				<Step completed>
					<Step.Content>
						<Step.Title>Shipped</Step.Title>
					</Step.Content>
				</Step>

				<Step active>
					<Step.Content>
						<Step.Title>Completed</Step.Title>
					</Step.Content>
				</Step>

				<Step>
					<Step.Content>
						<Step.Title>Cannceled</Step.Title>
					</Step.Content>
				</Step>
			</Step.Group>
		</div>
	);
};
export default Stepbar;
