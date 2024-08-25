import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) {}

  initKeycloak() {
    return this.keycloakService.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: [
          '/assets',
          '/clients/public']
    });
  }

  getAuthorizationToken(): string {
    return this.keycloakService.getKeycloakInstance().token ? 'Bearer ' + this.keycloakService.getKeycloakInstance().token : '';    
  }

  getUserInfo(): Promise<KeycloakProfile> {
    return this.keycloakService.getKeycloakInstance().loadUserProfile();
  }

  isAuthenticated(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  logout() {
    this.keycloakService.logout();
  }
}