import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { LoginService } from '../services/login.service';
import { STATES } from '../constants/states';

interface Virus {
  value: string;
  viewValue: string;
}

interface State {
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
    MatButtonModule,
    MatCheckboxModule,
    MatListModule
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
            Select a state and one or more viruses to view their spread, hospitalization rates, and other key metrics.
          </p>
          <mat-form-field appearance="fill">
            <mat-label>Select State</mat-label>
            <mat-select [(ngModel)]="selectedState">
              <mat-option *ngFor="let state of states" [value]="state.value">
                {{state.viewValue}}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Select Viruses</mat-label>
            <mat-select [(ngModel)]="selectedViruses" multiple>
              <mat-option *ngFor="let virus of viruses" [value]="virus.value">
                {{virus.viewValue}}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-checkbox [(ngModel)]="isHighRisk">I am at high risk for viral complications</mat-checkbox>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="onSubmit()">Submit</button>
        </mat-card-actions>
      </mat-card>
      <div class="chart-container">
        <canvas #chartCanvas></canvas>
      </div>
      <mat-card *ngIf="recommendation" class="recommendation-card">
        <mat-card-header>
          <mat-card-title>Personal Protection Recommendation</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h3>{{ recommendation.title }}</h3>
          <ul class="recommendation-list">
            <li *ngFor="let item of recommendation.baseRecommendations">
              {{ item }}
            </li>
          </ul>
          <div *ngIf="recommendation.mpoxRecommendations.length > 0">
            <h3>Additional recommendations for MPox:</h3>
            <ul class="recommendation-list">
              <li *ngFor="let item of recommendation.mpoxRecommendations">
                {{ item }}
              </li>
            </ul>
          </div>
          <div *ngIf="recommendation.highRiskRecommendations.length > 0">
            <h3>Additional recommendations for high-risk individuals:</h3>
            <ul class="recommendation-list">
              <li *ngFor="let item of recommendation.highRiskRecommendations">
                {{ item }}
              </li>
            </ul>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    mat-form-field, mat-checkbox {
      width: 100%;
      margin-bottom: 1rem;
    }
    button {
      width: 100%;
    }
    .chart-container {
      margin-top: 2rem;
      height: 400px;
    }
    .recommendation-card {
      margin-top: 2rem;
    }
    .recommendation-list {
      padding-left: 20px;
      margin-bottom: 1rem;
    }
    .recommendation-list li {
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
  `]
})
export class DashboardComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  viruses: Virus[] = [
    {value: 'covid-19', viewValue: 'COVID-19'},
    {value: 'influenza', viewValue: 'Influenza'},
    {value: 'rsv', viewValue: 'RSV'},
    {value: 'mpox', viewValue: 'MPox'}
  ];

  states = STATES;

  selectedState: string = '';
  selectedViruses: string[] = [];
  isHighRisk: boolean = false;
  chart: Chart | null = null;
  recommendation: {
    title: string;
    baseRecommendations: string[];
    mpoxRecommendations: string[];
    highRiskRecommendations: string[];
  } | null = null;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.getLoggedInUser().subscribe(user => {
      if (user) {
        this.selectedState = user.homeState;
        this.isHighRisk = user.isHighRisk;
      }
    });
  }

  onSubmit() {
    if (!this.selectedState) {
      console.error('No state selected');
      return;
    }
    console.log('Selected state:', this.selectedState);
    console.log('Selected viruses:', this.selectedViruses);
    this.createChart();
    this.generateRecommendation();
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const data = this.generateDummyData();

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: this.selectedViruses.map(virus => ({
          label: virus,
          data: data[virus],
          borderColor: this.getRandomColor(),
          fill: false
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cases'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  generateDummyData(): { [key: string]: number[] } {
    const data: { [key: string]: number[] } = {};
    this.selectedViruses.forEach(virus => {
      data[virus] = Array.from({length: 7}, () => Math.floor(Math.random() * 1000));
    });
    return data;
  }

  getRandomColor(): string {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  }

  generateRecommendation() {
    if (this.selectedViruses.length === 0) {
      this.recommendation = {
        title: "Please select at least one virus for a recommendation.",
        baseRecommendations: [],
        mpoxRecommendations: [],
        highRiskRecommendations: []
      };
      return;
    }

    let highestLevel = 0;
    let highestVirus = '';

    const data = this.generateDummyData();
    this.selectedViruses.forEach(virus => {
      const virusLevel = Math.max(...data[virus]);
      if (virus === 'covid-19') {
        // COVID-19 is given higher priority
        if (virusLevel > highestLevel * 0.8) {
          highestLevel = virusLevel;
          highestVirus = virus;
        }
      } else if (virusLevel > highestLevel) {
        highestLevel = virusLevel;
        highestVirus = virus;
      }
    });

    let baseRecommendations: string[] = [];
    let mpoxRecommendations: string[] = [];
    let highRiskRecommendations: string[] = [];

    if (highestLevel < 300) {
      baseRecommendations = [
        `Stay up to date with vaccinations for all selected viruses (${this.selectedViruses.join(', ')}). Consult your healthcare provider for the recommended vaccination schedule.`,
        "Practice good hygiene: wash hands frequently and use hand sanitizer when soap and water are not available.",
        "Consider improving indoor air quality by opening windows when possible and using HEPA air purifiers."
      ];
      mpoxRecommendations = [
        "Avoid close, skin-to-skin contact with people who have a rash that looks like MPox.",
        "Practice good hand hygiene, especially before eating or touching your face."
      ];
    } else if (highestLevel < 600) {
      baseRecommendations = [
        `Ensure you are up to date with all recommended vaccinations for ${this.selectedViruses.join(', ')} and consult your healthcare provider for any necessary boosters.`,
        "Wear a well-fitting mask (such as an N95, KN95, or KF94) in crowded indoor spaces.",
        "Maintain physical distance (at least 6 feet) from others when possible, especially in poorly ventilated areas.",
        "Limit time spent in crowded indoor spaces (e.g., grocery stores, public transportation) to 15 minutes or less when possible.",
        "Improve indoor air quality by increasing ventilation (opening windows, using fans) and using HEPA air purifiers."
      ];
      mpoxRecommendations = [
        "Avoid close, skin-to-skin contact with people who have a rash that looks like MPox.",
        "Do not touch the rash or scabs of a person with MPox.",
        "Avoid contact with objects and materials that a person with MPox has used.",
        "Wash your hands often with soap and water or use an alcohol-based hand sanitizer, especially before eating or touching your face and after you use the bathroom."
      ];
    } else {
      baseRecommendations = [
        `Prioritize getting vaccinated or boosted for ${this.selectedViruses.join(', ')} if you haven't already. Consult your healthcare provider immediately to discuss vaccination options.`,
        "Wear a high-quality, well-fitting mask (N95, KN95, or KF94) in all public indoor spaces and crowded outdoor areas.",
        "Practice strict physical distancing (at least 6 feet) in all settings outside your household.",
        "Avoid indoor gatherings with people outside your household, especially in poorly ventilated spaces.",
        "If gatherings are necessary, keep them small (less than 10 people), brief, and outdoors if possible.",
        "Maximize indoor air quality by increasing ventilation (opening windows, using fans), using HEPA air purifiers, and considering the use of upper-room UVGI (ultraviolet germicidal irradiation) in high-risk settings."
      ];
      mpoxRecommendations = [
        "Avoid close, skin-to-skin contact with people who have a rash that looks like MPox.",
        "Do not touch the rash or scabs of a person with MPox.",
        "Do not kiss, hug, cuddle or have sex with someone with MPox.",
        "Avoid contact with objects and materials that a person with MPox has used.",
        "Wash your hands often with soap and water or use an alcohol-based hand sanitizer, especially before eating or touching your face and after you use the bathroom.",
        "Consider wearing disposable gloves when in public spaces and dispose of them properly after use.",
        "Clean and disinfect frequently touched surfaces regularly."
      ];
    }

    if (this.isHighRisk) {
      highRiskRecommendations = [
        "Consult with your healthcare provider about additional or booster vaccinations that may be recommended for your specific health condition.",
        "Consider taking extra precautions such as wearing a mask even in lower-risk situations.",
        "Discuss potential preventive treatments or medications with your healthcare provider.",
        "Use N95 masks instead of other types when in public indoor spaces.",
        "Limit non-essential activities and consider using delivery services for groceries and other necessities."
      ];
    }

    this.recommendation = {
      title: `Based on current ${highestVirus.toUpperCase()} levels:`,
      baseRecommendations: baseRecommendations,
      mpoxRecommendations: this.selectedViruses.includes('mpox') ? mpoxRecommendations : [],
      highRiskRecommendations: highRiskRecommendations
    };
  }
}