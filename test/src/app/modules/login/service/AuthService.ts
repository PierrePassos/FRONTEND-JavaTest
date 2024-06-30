import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { username: string; password: string }) {
    return this.http.post('/auth/login', credentials).subscribe((response: any) => {
      localStorage.setItem(this.TOKEN_KEY, response.token);
      this.router.navigate(['/']);
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}