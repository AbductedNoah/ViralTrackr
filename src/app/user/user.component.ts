import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { STATES } from '../constants/states';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule
  ],
  template: `
    <div class="user-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Create New User</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill">
              <mat-label>Name</mat-label>
              <input matInput type="text" [(ngModel)]="user.name" name="name" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput type="email" [(ngModel)]="user.email" name="email" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Password</mat-label>
              <input matInput type="password" [(ngModel)]="user.password" name="password" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Home State</mat-label>
              <mat-select [(ngModel)]="user.homeState" name="homeState" required>
                <mat-option *ngFor="let state of states" [value]="state.value">
                  {{state.viewValue}}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <div class="checkbox-container">
              <mat-checkbox [(ngModel)]="user.isHighRisk" name="isHighRisk">
                Higher risk of viral complications
              </mat-checkbox>
              <mat-icon
                matTooltip="Higher risk individuals include older adults, people with underlying medical conditions, and those with weakened immune systems."
                matTooltipPosition="right"
              >
                info
              </mat-icon>
            </div>

            <div class="checkbox-container">
              <mat-checkbox [(ngModel)]="user.wantsEmailNotifications" name="wantsEmailNotifications">
                Receive weekly email notifications with wastewater updates
              </mat-checkbox>
              <mat-icon
                matTooltip="You will receive weekly email updates about your home state's wastewater data and viral trends."
                matTooltipPosition="right"
              >
                info
              </mat-icon>
            </div>

            <button mat-raised-button color="primary" type="submit">Create User</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .user-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    .checkbox-container {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    mat-checkbox {
      margin-right: 0.5rem;
    }
    button {
      width: 100%;
    }
  `]
})
export class UserComponent {
  user = {
    name: '',
    email: '',
    password: '',
    homeState: '',
    isHighRisk: false,
    wantsEmailNotifications: false
  };

  states = STATES;

  onSubmit() {
    console.log('User created:', this.user);
    // Here you would typically send the user data to your backend service
    // For now, we'll just log it to the console
  }
}