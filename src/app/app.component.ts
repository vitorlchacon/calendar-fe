import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './model/user.model';
import { UserService } from './components/user/user.service';
import { ConstraintsService } from './services/constraints.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  items: MenuItem[] = this.constraintsService.getMenuItems();
  public isLoggedIn = false;
  public user: User | undefined;

  constructor(
    public authService: AuthService, 
    public router: Router,
    private userService: UserService, 
    private constraintsService: ConstraintsService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated()
    if (this.isLoggedIn) {
      this.authService.loadUserProfile().then(user => {
         this.userService.getMyUser(user).subscribe(myUser => this.user = myUser)
      });
    }
  }

  public async login() {
    this.authService.login()
  }

  public logout() {
    this.authService.logout();
  }

  
}
