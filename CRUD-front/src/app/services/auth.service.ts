import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
  ) { }

  isLoggedIn(): Observable<any> {
    return this.http.post<any>('http://localhost:3000/token', {
      token: this.cookieService.get('Bearer')
    })
  }

  logout() {
    this.cookieService.delete('Bearer')
    this.router.navigate(['/login'])
  }
}
