import { Routes } from "@angular/router";
import { UserProfileComponent } from "./user-profile/user-profile.component";

export const USER_ROUTES: Routes = [{
  path: '',
  component: UserProfileComponent,
  children: []
}];
