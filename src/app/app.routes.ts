import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

export const APP_ROUTES: Routes = [
  { path: 'user', loadChildren: () => import('./user/user.routes').then(m => m.USER_ROUTES) },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
