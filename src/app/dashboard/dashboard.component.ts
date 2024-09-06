import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

interface Virus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <div class="dashboard-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Virus Tracking Dashboard</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>
            This dashboard provides real-time tracking of multiple viruses using CDC wastewater data. 
            Select one or more viruses to view their spread, hospitalization rates, and other key metrics.
          </p>
          <mat-form-field appearance="fill">
            <mat-label>Select Viruses</mat-label>
            <mat-select [(ngModel)]="selectedViruses" multiple>
              <mat-option *ngFor="let virus of viruses" [value]="virus.value">
                {{virus.viewValue}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="onSubmit()">Submit</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    button {
      width: 100%;
    }
  `]
})
export class DashboardComponent {
  viruses: Virus[] = [
    {value: 'covid-19', viewValue: 'COVID-19'},
    {value: 'influenza', viewValue: 'Influenza'},
    {value: 'rsv', viewValue: 'RSV'},
    {value: 'mpox', viewValue: 'MPox'}
  ];

  selectedViruses: string[] = [];

  onSubmit() {
    console.log('Selected viruses:', this.selectedViruses);
    // Here you would typically fetch and display data for the selected viruses
    // For now, we'll just log the selection to the console
  }
}