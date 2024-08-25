import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AuthService } from '../core/auth/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../core/auth/auth.interceptor';

function initializeKeycloak(authService: AuthService) {
  return () => authService.initKeycloak();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [AuthService],
    }
  ]
};
