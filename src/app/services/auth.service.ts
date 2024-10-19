import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthData } from '../@types/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<any> {
    const url = this.baseUrl + '/users/auth';

    return this.http.post(url, { email, password });
  }

  public signUp(email: string, password: string): Observable<any> {
    const url = this.baseUrl + '/users';

    return this.http.post(url, { email, password });
  }

  public getAuthData(): IAuthData | null{
    const stringAuthData = localStorage.getItem('@auth');

    if(!stringAuthData){
      return null;
    }

    return JSON.parse(stringAuthData);
  }

  public logout() {
    localStorage.removeItem('@auth');
    this.router.navigate(['/'])
  }
}
