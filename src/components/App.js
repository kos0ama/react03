/* eslint-disable unicode-bom */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './okta/config';
import styled from 'styled-components';

import Home from './Home';
//import Home from './okta/Home';
import NavbarHeader from './NavbarHeader';
import Navbar from './Navbar';
import Profile from './okta/Profile';

import Stepbar from './Stepbar';

import Todo from './Todo';
import TaskList from './TaskList';
import SearchResults from './SearchResults';
import GitUserInfo from './GitUserInfo';
import GetUserList from './GetUserList';
import GetQueueList from './GetQueueList';
import Cti from './Cti';
import Ctibar from './Ctibar';
import Ctibarg from './Ctibarg';

const oktaAuth = new OktaAuth(config.oidc);

//CSS Settings ---------start---
const keyColor = 'grey';
const CssInJsTextHover = styled.div`
	color: ${keyColor};
	&:hover {
		background: rgba(255, 0, 255, 0.3);
	}
	& span {
		font-weight: bold;
	}
`;
const StyledWrapper = styled.div`
	/* NOTE: & { ... } でスタイルを囲まないと autoprefixer がエラーを吐く */
	& {
		display: grid;
		grid-template-columns: 200px 1fr 1px;
		grid-template-rows: 40px 47px 1fr 106px;
		grid-gap: 0px;
	}
`;
const BlockTopHeader = styled.div`
	grid-column: 1 / 3;
	grid-row: 1;
	background: #350d36;
	color: rgb(188, 171, 188);
	box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
	min-width: 0;
	-webkit-app-region: drag;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	flex-shrink: 0;
`;
const BlockTopNavRight = styled.div`
	flex: 1;
	min-width: 128px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 16px;
	padding-left: 32px;
	position: relative;
`;

const BlockSidebarHeader = styled.div`
	grid-column: 1;
	grid-row: 2;
	background: #3f0e40;
	color: rgb(188, 171, 188);
	box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
	min-width: 0;
	-webkit-app-region: drag;
	position: relative;
	padding: 0 20px 0 8px;
	flex-shrink: 2;
`;
const BlockSidebarView = styled.div`
	grid-column: 1;
	grid-row: 3;
	background: #3f0e40;
	color: rgb(188, 171, 188);
	box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
	min-width: 0;
	-webkit-app-region: drag;
	align-items: center;
	padding: 0 20px 0 8px;
	flex-shrink: 2;
`;
const BlockSidebarFotter = styled.div`
	grid-column: 1;
	grid-row: 4;
	background: #3f0e40;
	color: rgb(188, 171, 188);
	min-width: 0;
	-webkit-app-region: drag;
	position: relative;
	align-items: center;
	padding: 0 20px 0 8px;
	flex-shrink: 2;
`;
const BlockMainHeader = styled.div`
	grid-column: 2 / 3;
	grid-row: 2;
	display: flex;
	padding: 0 20px 0 8px;
	border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
	flex-shrink: 2;
`;
const BlockMainView = styled.div`
	grid-column: 2 / 3;
	grid-row: 3;
	height: auto;
	display: flex;
	padding: 0 200px 0 8px;
	flex-shrink: 2;
`;
const BlockFotter = styled.div`
	grid-column: 3;
	grid-row: 4;
	margin: 1px;
	padding: 0 20px;
	border-radius: 0px;
	padding: 0 20px 0 8px;
	flex-shrink: 2;
`;
const BlockMainFotter = styled.div`
	grid-column: 2;
	grid-row: 4;
	margin: 1px;
	padding: 0 20px;
	border-radius: 0px;
	padding: 0 20px 0 8px;
	flex-shrink: 2;
`;
//CSS Settings ---------end---

const App = () => (
	<div>
		<StyledWrapper>
			<Security oktaAuth={oktaAuth}>
				<BlockTopHeader>
					top_header
					<BlockTopNavRight>
						<NavbarHeader />
					</BlockTopNavRight>
				</BlockTopHeader>
				<BlockSidebarHeader>sidebar_header</BlockSidebarHeader>
				<BlockSidebarView>
					sidebar_menu<CssInJsTextHover>Sales</CssInJsTextHover>
					<CssInJsTextHover>Support</CssInJsTextHover>
					<CssInJsTextHover>Assign</CssInJsTextHover>
				</BlockSidebarView>
				<BlockSidebarFotter>sidebar_fotter</BlockSidebarFotter>
				<BlockMainHeader>
					<Navbar />
				</BlockMainHeader>
				<BlockMainView>
					<Container>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/login/callback" component={LoginCallback} />
							<SecureRoute path="/profile" component={Profile} />
							<SecureRoute path="/todo" exact component={Todo} />
							<SecureRoute path="/tasklist" exact component={TaskList} />
							<SecureRoute
								path="/searchresults"
								exact
								component={SearchResults}
							/>
							<SecureRoute path="/gituserinfo" exact component={GitUserInfo} />
							<SecureRoute path="/getuserlist" exact component={GetUserList} />
							<SecureRoute
								path="/getqueuelist"
								exact
								component={GetQueueList}
							/>
							<SecureRoute path="/cti" component={Cti} />
						</Switch>
					</Container>
				</BlockMainView>
				<BlockMainFotter>
					<Ctibar />
				</BlockMainFotter>
			</Security>

			<BlockFotter>
				<Stepbar />
			</BlockFotter>
		</StyledWrapper>
	</div>
);
export default App;
