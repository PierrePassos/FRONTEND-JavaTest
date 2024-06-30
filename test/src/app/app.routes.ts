import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './modules/user/component/list-users/list-users.component';
import { CreateUserComponent } from './modules/user/component/create-user/create-user.component';
import { ProfileComponent } from './modules/profile/component/profile/profile.component';
import { ListProfilesComponent } from './modules/profile/component/list-profiles/list-profiles.component';
// import { HomeComponent } from './modules/home/component/home/home.component';

export const routes: Routes = [
  { path: 'cadastrar-usuario', component: CreateUserComponent },
  { path: 'lista-usuarios', component: ListUsersComponent },
  { path: 'cadastrar-perfil', component: ProfileComponent },
  { path: 'lista-perfis', component: ListProfilesComponent },
  // { path: '', component: HomeComponent},
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

