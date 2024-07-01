import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './modules/user/component/list-users/list-users.component';
import { CreateUserComponent } from './modules/user/component/create-user/create-user.component';
import { ProfileComponent } from './modules/profile/component/profile/profile.component';
import { ListProfilesComponent } from './modules/profile/component/list-profiles/list-profiles.component';
import { LoginComponent } from './modules/login/component/login.component';
import { HomeComponent } from './modules/home/component/home/home.component';
import { authGuard } from './guard/auth.guard';
// import { HomeComponent } from './modules/home/component/home/home.component';

// tela para login foi feita, mas na geração do token no back estava dando muita divergencia de versões 
// e fiquei muito tempo preso em erros, não deu tempo de concluir, vou deixar toda a logica aqui ainda
export const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'cadastrar-usuario', component: CreateUserComponent },
  { path: 'cadastrar-usuario/:id', component: CreateUserComponent },
  { path: 'lista-usuarios', component: ListUsersComponent },
  { path: 'cadastrar-perfil', component: ProfileComponent },
  { path: 'lista-perfis', component: ListProfilesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

