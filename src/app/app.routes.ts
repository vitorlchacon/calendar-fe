
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AuthGuard } from '../core/auth/auth.guard';

export const routes: Routes = [
  { path: 'access-denied',
    component: AccessDeniedComponent,
    canActivate: [AuthGuard]
  },
  { path: 'user',
    loadChildren: () => import('./components/user/user.routes').then(m => m.USER_ROUTES),
    canActivate: [AuthGuard],
    data: { roles: ['USER'] } 
  },
  { path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', 
    redirectTo: '' 
  }
];
