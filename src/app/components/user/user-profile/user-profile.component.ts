import { Component, SecurityContext, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../../model/user.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    AvatarModule,
    TagModule,
    PanelModule,
    ButtonModule,
    CalendarModule,
    InputTextModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnDestroy {
  user!: User;
  editedUser!: User;
  editing = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private http: HttpClient,
              private sanitizer: DomSanitizer) {
    this.initializeUser();
  }

  private initializeUser(): void {
    this.userService.getMyUser(this.authService.getUser()).subscribe(res => {
      console.log({ ...this.user, ...res })
      this.user = new User({ ...this.user, ...res }, this.sanitizer);
    });
  }
  
  enterEditMode(): void {
    this.editing = true;
    // Clone the user object for editing
    this.editedUser = new User(
      {
        ...this.user,
        birthday: new Date(this.user.birthday)
      }, 
      this.sanitizer);
  }

  cancelEdit(): void {
    this.editing = false;
    this.editedUser = this.user;
  }

  saveChanges(): void {
    this.userService.saveUser(this.editedUser).subscribe({
      next: (response) => {
        console.log(response)
        this.user = new User(this.editedUser, this.sanitizer);
        this.editing = false;
      },
      error: (err) => {
        console.error('Failed to save user:', err);
        // Handle error (show toast/message)
      }
    });
  }

  ngOnDestroy(): void {
    this.user.destroy();
  }
}