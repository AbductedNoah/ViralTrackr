import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CdcDataComponent } from './cdc-data/cdc-data.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cdc-data', component: CdcDataComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  template: '<h1>Test Component</h1>'
})
export class TestComponent {}
