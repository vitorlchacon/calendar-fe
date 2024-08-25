import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';
import { KeycloakProfile } from 'keycloak-js';
import { User } from '../../app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private keycloakService: KeycloakService) {}

  initKeycloak() {
    var service = this.keycloakService.init({
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
    this.loadUserProfile();
    return service;
  }

  loadUserProfile(): void {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.currentUser = new User(profile);
    });
  }

  getUser(): User | null {
    return this.currentUser;
  }

  getAuthorizationToken(): string {
    return this.keycloakService.getKeycloakInstance().token ? 'Bearer ' + this.keycloakService.getKeycloakInstance().token : '';    
  }

  isAuthenticated(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  logout() {
    this.keycloakService.logout();
  }
}