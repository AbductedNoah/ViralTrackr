import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface UserInfo {
  name: string;
  homeState: string;
  isHighRisk: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInUser = new BehaviorSubject<UserInfo | null>(null);

  login(email: string, password: string): Observable<boolean> {
    // For now, always succeed and set the user to Paul Atreides with default values
    this.loggedInUser.next({
      name: 'Paul Atreides',
      homeState: 'WI',
      isHighRisk: true
    });
    return of(true);
  }

  logout(): void {
    this.loggedInUser.next(null);
  }

  getLoggedInUser(): Observable<UserInfo | null> {
    return this.loggedInUser.asObservable();
  }
}