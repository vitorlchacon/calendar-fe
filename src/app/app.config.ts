import { ApplicationConfig } from '@angular/core';
import { 
    PreloadAllModules, 
    provideRouter, 
    withDebugTracing, 
    withPreloading 
} 
from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, 
      withPreloading(PreloadAllModules),
      withDebugTracing(),
    ),
    provideClientHydration(),
    provideAnimationsAsync()
  ]
};
