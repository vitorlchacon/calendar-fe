import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { User } from './model/user.model';
import { UserService } from './components/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  user!: User;

  constructor(
    public authService: AuthService, 
    public router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated()
    if (this.isLoggedIn) {
      this.authService.loadUserProfile().then(user => {
         this.userService.getUser(user.userId).subscribe(myUser => 
          {
            this.user = new User(myUser, this.sanitizer)

          }
        )
      });
    }
  }

  public async login() {
    this.authService.login()
    this.isLoggedIn = true;
  }

  public logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  
}
