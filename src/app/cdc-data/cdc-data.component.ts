import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CdcDataService } from '../services/cdc-data.service';
import { STATES } from '../constants/states';

@Component({
  selector: 'app-cdc-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>CDC COVID-19 Data</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field appearance="fill">
          <mat-label>Select State</mat-label>
          <mat-select [(ngModel)]="selectedState">
            <mat-option *ngFor="let state of states" [value]="state.value">
              {{state.viewValue}}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Enter a date range</mat-label>
          <mat-date-range-input [rangePicker]="picker" [max]="maxDate">
            <input matStartDate placeholder="Start date" [(ngModel)]="startDate">
            <input matEndDate placeholder="End date" [(ngModel)]="endDate">
          </mat-date-range-input>
          <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-date-range-picker #picker></mat-date-range-picker>
        </mat-form-field>

        <button mat-raised-button color="primary" (click)="fetchData()" [disabled]="!selectedState || !startDate || !endDate">
          Fetch COVID-19 Data
        </button>
        <pre *ngIf="covidData">{{ covidData | json }}</pre>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 800px;
      margin: 20px auto;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
    button {
      width: 100%;
      margin-bottom: 20px;
    }
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .error-message {
      color: red;
      margin-top: 10px;
    }
  `]
})
export class CdcDataComponent implements OnInit {
  covidData: any;
  selectedState: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  maxDate: Date = new Date();  // Set max date to today
  states = STATES;

  constructor(private cdcDataService: CdcDataService) {}

  ngOnInit() {
    // Set the end date to today by default
    this.endDate = new Date();
    // Set the start date to 30 days before the end date by default
    this.startDate = new Date(this.endDate);
    this.startDate.setDate(this.startDate.getDate() - 30);
  }

  fetchData() {
    if (!this.selectedState || !this.startDate || !this.endDate) {
      console.error('State and date range must be selected');
      return;
    }
    
    const startDateStr = this.formatDate(this.startDate);
    const endDateStr = this.formatDate(this.endDate);

    this.covidData = null; // Reset data before new request

    this.cdcDataService.getCovidData(this.selectedState, startDateStr, endDateStr).subscribe({
      next: (data) => {
        this.covidData = data;
        console.log('COVID-19 Data:', data);
      },
      error: (error) => {
        console.error('Error fetching COVID-19 data:', error);
      }
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}