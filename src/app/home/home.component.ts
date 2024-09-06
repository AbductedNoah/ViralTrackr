import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  template: `
    <div class="home-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Welcome to Virion</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>
            Virion is a cutting-edge web application designed to track and visualize the spread of infectious viral diseases using CDC wastewater data.
          </p>
          <h3>Key Features:</h3>
          <ul>
            <li>Real-time tracking of multiple viruses including COVID-19, Influenza, RSV, and MPox</li>
            <li>Interactive dashboard with customizable date ranges</li>
            <li>Data visualization of wastewater levels, hospitalizations, and deaths</li>
            <li>Risk assessment and recommended actions based on current data</li>
            <li>User accounts for personalized experiences</li>
          </ul>
          <p>
            Our application utilizes the latest CDC data to provide you with accurate and up-to-date information on viral spread in your area.
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/dashboard">Go to Dashboard</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    mat-card {
      margin-bottom: 1rem;
    }
    ul {
      padding-left: 1.5rem;
    }
  `]
})
export class HomeComponent {}