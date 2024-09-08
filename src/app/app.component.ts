import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleMenu()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Virion</span>
      <span class="spacer"></span>
      <div class="toolbar-links">
        <button mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</button>
        <button mat-button routerLink="/dashboard" routerLinkActive="active">Dashboard</button>
        <button mat-button routerLink="/user" routerLinkActive="active">User Management</button>
        <button mat-button routerLink="/cdc-data" routerLinkActive="active">CDC Data</button>
        <span *ngIf="loggedInUser">{{ "Hi, " + loggedInUser }}</span>
        <button mat-button *ngIf="!loggedInUser" routerLink="/login">Login</button>
        <button mat-button *ngIf="loggedInUser" (click)="logout()">Logout</button>
      </div>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="over">
        <mat-nav-list>
          <a mat-list-item routerLink="/" (click)="sidenav.close()">Home</a>
          <a mat-list-item routerLink="/dashboard" (click)="sidenav.close()">Dashboard</a>
          <a mat-list-item routerLink="/user" (click)="sidenav.close()">User Management</a>
          <a mat-list-item routerLink="/cdc-data" (click)="sidenav.close()">CDC Data</a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    // ... (keep existing styles)
    `
      .spacer {
        flex: 1 1 auto;
      }
      .toolbar-links {
        display: flex;
        align-items: center;
      }
      .toolbar-links > * {
        margin-left: 8px;
      }
      .content {
        padding: 20px;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  title = 'Virion';
  isMenuOpen = false;
  loggedInUser: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginService.getLoggedInUser().subscribe(user => {
      this.loggedInUser = user ? user.name : null;
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
