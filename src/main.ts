import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('Application started successfully'))
  .catch(err => {
    console.error('Error bootstrapping app:', err);
    // Display an error message on the page
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `
      <h1>An error occurred</h1>
      <p>Please check the console for more details.</p>
    `;
    document.body.appendChild(errorMessage);
  });
