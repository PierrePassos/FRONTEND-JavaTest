import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Login } from "../model/login";

// tela para login foi feita, mas na geração do token no back estava dando muita divergencia de versões 
// e fiquei muito tempo preso em erros, não deu tempo de concluir, vou deixar toda a logica aqui ainda

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private router: Router) { }

  login(login: Login) {
    console.log(login)
    return this.http.post('/login', login).subscribe((response: any) => {
      console.log(response)
      // localStorage.setItem(this.TOKEN_KEY, response.token);
      // this.router.navigate(['/']);
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token != null && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}