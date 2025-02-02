export const environment = {
  production: true,
  enableDebug: false,
  defaultLanguage: 'pt-BR',
  version: '1.0.0', // Atualize conforme suas versões
  keycloak: {
    url: 'http://localhost:8081',
    realm: 'calendar-app',
    clientId: 'calendar-fe'
  },
  backend: {
    url: 'http://localhost:8080',
  }
};