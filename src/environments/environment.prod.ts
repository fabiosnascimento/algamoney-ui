export const environment = {
  production: true,
  apiUrl: 'https://springb-algamoney-api.herokuapp.com',
  tokenAllowedDomains: [ /springb-algamoney-api.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  oauthCallbackUrl: 'https://springb-algamoney-api.herokuapp.com/authorized',
  logoutRedirectToUrl: 'https://springb-algamoney-api.herokuapp.com'
};
