import { Component, OnInit } from '@angular/core';
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
      <span>Virion</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</button>
      <button mat-button routerLink="/dashboard" routerLinkActive="active">Dashboard</button>
      <button mat-button routerLink="/user" routerLinkActive="active">User Management</button>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="over">
        <mat-nav-list>
          <a mat-list-item routerLink="/" (click)="sidenav.close()">Home</a>
          <a mat-list-item routerLink="/dashboard" (click)="sidenav.close()">Dashboard</a>
          <a mat-list-item routerLink="/user" (click)="sidenav.close()">User Management</a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="content">
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
export class AppComponent implements OnInit {
  title = 'Virion';

  isMenuOpen = false;

  ngOnInit() {
    console.log('AppComponent initialized');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
