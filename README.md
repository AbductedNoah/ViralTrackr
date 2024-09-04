# ViralTrackr (v0.0.1)

**Note: This project is currently a work in progress. Not all features are fully implemented or working as intended.**

ViralTrackr is a comprehensive web application designed to track and visualize data related to viral outbreaks. It provides real-time insights into various viruses, including COVID-19, Influenza, RSV, and MPox, using data from the CDC.

## Features

- **Multi-Virus Tracking**: Monitor data for COVID-19, Influenza, RSV, and MPox.
- **Interactive Dashboard**: Visualize virus-related data with customizable date ranges.
- **Data Visualization**: Display wastewater levels, hospitalizations, and deaths in an easy-to-read chart.
- **Risk Assessment**: Provides current risk levels and recommended actions based on the latest data.
- **User Management**: Allow users to create and manage accounts for personalized experiences.

## Functionality

1. **Virus Selection**: Users can choose which virus they want to track from the available options.
2. **Date Range Selection**: Customize the date range for data visualization.
3. **Data Fetching**: Retrieve the latest data from CDC APIs for the selected virus and date range.
4. **Chart Visualization**: Display the fetched data in an interactive line chart.
5. **Risk Assessment**: Analyze recent data to determine the current risk level and provide appropriate recommendations.
6. **User Registration**: Allow users to create accounts with name and email.

## Information Provided

- Wastewater levels (for COVID-19)
- Hospitalization rates
- Death rates
- Current risk level (Low, Moderate, High)
- Recommended actions based on risk level

## API Documentation

ViralTrackr uses the CDC's public APIs to fetch data. Here are the endpoints used for each virus:

1. **COVID-19**:
   - Endpoint: `https://data.cdc.gov/resource/2ew6-ywp6.json`
   - Query parameters: 
     - `$where`: `date_start between '[start_date]' and '[end_date]'`

2. **Influenza**:
   - Endpoint: `https://data.cdc.gov/resource/bkwc-xpsv.json`
   - Query parameters:
     - `$where`: `week_start between '[start_date]' and '[end_date]'`

3. **RSV**:
   - Endpoint: `https://data.cdc.gov/resource/29hc-w46k.json`
   - Query parameters:
     - `$where`: `week_start between '[start_date]' and '[end_date]'`

4. **MPox**:
   - Endpoint: `https://data.cdc.gov/resource/29hc-w46k.json`
   - Query parameters:
     - `$where`: `week_start between '[start_date]' and '[end_date]'`

Replace `[start_date]` and `[end_date]` with the desired date range in 'YYYY-MM-DD' format.

## Future Features

We are constantly working to improve ViralTrackr and expand its capabilities. Here are some exciting features we plan to implement in the future:

1. **Expanded Data Sources**: Integrate additional data sources beyond the CDC to provide a more comprehensive view of viral outbreaks and trends.

2. **Vaccine Finder**: Implement a vaccine finder feature for all displayable viruses, helping users locate nearby vaccination sites for COVID-19, Influenza, and other applicable viruses.

3. **Testing Information**: Provide up-to-date information on testing locations, types of tests available, and guidance on when to get tested for each tracked virus.

4. **User Profiles and Notifications**: Allow users to save their preferences, track specific viruses, and receive personalized notifications about outbreaks, risk levels, or new recommendations in their area.

5. **Automated Social Media Updates**: Create an 'X' (formerly Twitter) account that automatically posts updates, alerts, and key statistics based on the latest data from ViralTrackr.

These planned features aim to make ViralTrackr an even more valuable resource for public health awareness and personal risk management.

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
