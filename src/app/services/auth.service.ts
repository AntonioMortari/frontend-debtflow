import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<any> {
    const url = this.baseUrl + '/users/auth';

    return this.http.post(url, { email, password });
  }

  public signUp(email: string, password: string): Observable<any> {
    const url = this.baseUrl + '/users';

    return this.http.post(url, { email, password });
  }

  public logout() {
    localStorage.removeItem('@auth');
    this.router.navigate(['/'])
  }
}
