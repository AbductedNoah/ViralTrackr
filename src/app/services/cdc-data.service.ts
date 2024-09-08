import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CdcDataService {
  private baseUrl = 'https://data.cdc.gov/resource/';

  constructor(private http: HttpClient) {}

  getCovidData(state: string, startDate: string, endDate: string): Observable<any> {
    const endpoint = '2ew6-ywp6.json';
    const url = `${this.baseUrl}${endpoint}`;
    const query = `$where=state='${state}' AND date_start between '${startDate}' and '${endDate}'&$order=date_start ASC&$limit=1000`;

    return this.http.get(`${url}?${query}`);
  }

  // ... (keep the existing methods)
}