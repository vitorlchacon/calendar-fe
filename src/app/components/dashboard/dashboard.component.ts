import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule,
      MatIconModule, MatToolbar],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    // Propriedades para os dados que serão usados no template
    featuredCards = [
      { title: 'Serviço 1', description: 'Descrição do serviço 1.', icon: 'build' },
      { title: 'Serviço 2', description: 'Descrição do serviço 2.', icon: 'code' },
      { title: 'Serviço 3', description: 'Descrição do serviço 3.', icon: 'design_services' }
    ];
}
