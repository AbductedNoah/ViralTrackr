import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, MaterialModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleMenu()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>ViralTrackr</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/dashboard" routerLinkActive="active">Dashboard</button>
      <button mat-button routerLink="/user" routerLinkActive="active">User Management</button>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="over">
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" (click)="sidenav.close()">Dashboard</a>
          <a mat-list-item routerLink="/user" (click)="sidenav.close()">User Management</a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="content">
          <div class="welcome-banner">
            <h1>Welcome to ViralTrackr</h1>
            <p>Your comprehensive tool for tracking viral outbreaks and staying informed.</p>
          </div>

          <div class="site-info">
            <h2>About ViralTrackr</h2>
            <p>ViralTrackr is a cutting-edge platform designed to provide real-time insights into viral outbreaks. By combining data from multiple sources, including wastewater analysis and CDC reports, we offer a comprehensive view of current health trends.</p>
            <h3>Key Features:</h3>
            <ul>
              <li>Real-time wastewater data analysis</li>
              <li>CDC hospitalization and death statistics</li>
              <li>Customizable date ranges for data viewing</li>
              <li>Risk level assessments and recommendations</li>
              <li>User management for personalized experiences</li>
            </ul>
            <p>Navigate to the Dashboard to explore the latest data and receive up-to-date recommendations for staying safe and healthy.</p>
          </div>

          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .content {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .welcome-banner {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
      text-align: center;
    }
    .welcome-banner h1 {
      color: #3f51b5;
      margin-bottom: 10px;
    }
    .site-info {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .site-info h2 {
      color: #3f51b5;
      margin-bottom: 15px;
    }
    .site-info h3 {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .site-info ul {
      padding-left: 20px;
    }
    .active {
      background-color: rgba(0,0,0,0.1);
    }
  `]
})
export class AppComponent {
  title = 'ViralTrackr';

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
