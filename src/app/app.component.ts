import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../core/material/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = "Title";

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().then((data: any) => {
      console.log(data);
      this.title = "Hello, " + data.email;
    });
  }

  public logout() {
    this.authService.logout();
  }
}
