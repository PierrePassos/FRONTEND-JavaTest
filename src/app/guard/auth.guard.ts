import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/login/service/AuthService';

// tela para login foi feita, mas na geração do token no back estava dando muita divergencia de versões 
// e fiquei muito tempo preso em erros, não deu tempo de concluir, vou deixar toda a logica aqui ainda
export const authGuard: CanActivateFn = (route, state) => {
  const authService = Inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    return router.navigate(['login']);
  }
};
