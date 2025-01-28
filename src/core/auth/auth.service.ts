import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';
import { User } from '../../app/model/user.model';
import { UserService } from '../../app/components/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser!: User;

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService
  ) {}

  async initKeycloak() {
    await this.keycloakService.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      loadUserProfileAtStartUp: true,
      initOptions: {
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: [
          '/assets',
          '/clients/public']
    });
  }

  async loadUserProfile(): Promise<any> {
    await this.keycloakService.loadUserProfile()
    .then(profile => {
      this.currentUser = new User(profile);
    }).finally(() => {
      this.currentUser.roles = this.keycloakService.getUserRoles()
      .filter(role => role !== "view-profile" &&  role !== "default-roles-calendar-app" )
    })
    await this.userService.getMyUser(this.currentUser).subscribe(userDetails => {
      console.log(userDetails)
      this.currentUser = userDetails
      console.log(userDetails)
    })
    return this.currentUser
  } 

  getUser(): User {
    return this.currentUser;
  }

  getAuthorizationToken(): string {
    return this.keycloakService.getKeycloakInstance().token ? 'Bearer ' + this.keycloakService.getKeycloakInstance().token : '';    
  }

  isAuthenticated(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}