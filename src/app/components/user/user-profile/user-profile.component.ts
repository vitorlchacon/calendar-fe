import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  private user: User | null = null;

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}
