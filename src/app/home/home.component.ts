import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: []
})
export class HomeComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {}
}
