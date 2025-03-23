export const environment = {
  production: true,
  enableDebug: false,
  defaultLanguage: 'pt-BR',
  version: '1.0.0',
  keycloak: {
    url: 'http://192.168.1.211:8443',
    realm: 'calendar',
    clientId: 'calendar'
  },
  backend: {
    url: 'http://192.168.1.211:8080',
  }
};
