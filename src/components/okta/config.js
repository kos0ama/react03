/* eslint-disable unicode-bom */
//const CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
const CLIENT_ID = process.env.CLIENT_ID || '0oabbcdhh6JbELqAz5d6';
const ISSUER =
	//	process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
	process.env.ISSUER || 'https://dev-62354073.okta.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK =
	process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `${window.location.origin}/login/callback`;

export default {
	oidc: {
		clientId: CLIENT_ID,
		issuer: ISSUER,
		redirectUri: REDIRECT_URI,
		scopes: ['openid', 'profile', 'email'],
		pkce: true,
		disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
	},
	resourceServer: {
		messagesUrl: 'http://localhost:8000/api/messages',
	},
};
