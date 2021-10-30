export const environment = {
  production: true,
  apiUrl: 'https://springb-algamoney-api.herokuapp.com',
  tokenAllowedDomains: [ /springb-algamoney-api.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/]
};
