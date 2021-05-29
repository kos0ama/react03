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
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
// Obtain a reference to the platformClient object
//import platformClient from 'purecloud-platform-client-v2';

const Ctibar = () => {
	/*
	const clientId = 'd03eb90b-4753-4144-be08-da2890cfa679'; //ama_implicit トークンの暗黙的な付与（ブラウザー
	const redirectUri = window.location.href;
	const client = platformClient.ApiClient.instance;
	const conversationsApi = new platformClient.ConversationsApi();
	const notificationsApi = new platformClient.NotificationsApi();
	const usersApi = new platformClient.UsersApi();
	// Set Genesys Cloud settings
	client.setEnvironment('mypurecloud.jp');
	client.setPersistSettings(true, 'test_app');

	// Set local vars
	let CONVERSATION_LIST_TEMPLATE = null;
	let conversationList = {};
	let me, webSocket, conversationsTopic, notificationChannel;

	client
		.loginImplicitGrant(clientId, redirectUri)
		.then(() => {
			console.log('Logged in');

			// Get authenticated user's info
			return usersApi.getUsersMe();
		})
		.then((userMe) => {
			console.log('userMe: ', userMe);
			me = userMe;

			// Create notification channel
			return notificationsApi.postNotificationsChannels();
		})
		.then((channel) => {
			console.log('channel: ', channel);
			notificationChannel = channel;

			// Set up web socket
			webSocket = new WebSocket(notificationChannel.connectUri);
			//webSocket.onmessage = handleNotification;

			// Subscribe to authenticated user's conversations
			conversationsTopic = 'v2.users.' + me.id + '.conversations';
			const body = [{ id: conversationsTopic }];
			return notificationsApi.putNotificationsChannelSubscriptions(
				notificationChannel.id,
				body
			);
		})
		.catch(function (response) {
			console.log(response);
		});
*/

	const { authState, oktaAuth } = useOktaAuth();
	const refinputnumber = useRef(null);
	const [unlessCond, setunlessCond] = useState('off'); //'on' or 'off'
	const [muted, setmuted] = useState('off'); //'on' or 'off'
	const [held, setheld] = useState('off'); //'on' or 'off'
	const [isConsult, setisConsult] = useState('off'); //'on' or 'off'

	const [valinputnumber, setvalnumber] = useState('');
	const handleChange = (e) => setvalnumber(e.target.value);

	useEffect(() => {
		console.log('MainHeaderでuseEffectが実行されました');
		console.log(unlessCond);
		setmuted('off');
		setheld('off');
		setisConsult('off');
	}, [unlessCond]); // Update if authState changes

	useEffect(() => {
		console.log('MainHeaderでuseEffectが実行されました');
		console.log(muted);
	}, [muted]); // Update if authState changes

	useEffect(() => {
		console.log('MainHeaderでuseEffectが実行されました');
		console.log(held);
	}, [held]); // Update if authState changes

	useEffect(() => {
		console.log('MainHeaderでuseEffectが実行されました');
		console.log(isConsult);
	}, [isConsult]); // Update if authState changes

	// Handle dial button click
	const MakeCall = () => {
		setunlessCond('on');
		refinputnumber.current.focus();
		// Create request body
		let body = {
			phoneNumber: valinputnumber,
		};

		// Invoke API
		console.log(body);
	};

	//-------------------------

	//-------------------------

	// Handle dial button click
	const Login = () => {};

	//-------------------------

	//-------------------------

	return (
		<div>
			<iframe
				src="https://kos0ama.github.io/softphone/"
				width="1124"
				height="106"
				frameborder="0"
				style={{ border: 0 }}
				allowfullscreen=""
				aria-hidden="false"
				tabindex="0"
			></iframe>
		</div>
	);
};
export default Ctibar;
