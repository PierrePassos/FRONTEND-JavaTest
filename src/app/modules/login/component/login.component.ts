import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../user/model/user';
import { UserService } from '../../user/service/user.service';
import { AlertService } from '../../../services/alert.service';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { Login } from '../model/login';
import { AuthService } from '../service/AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // tela para login foi feita, mas na geração do token no back estava dando muita divergencia de versões 
  // e fiquei muito tempo preso em erros, não deu tempo de concluir, vou deixar toda a logica aqui ainda

  user: User = new User();
  showPassword: boolean = false;

  login: Login = new Login();

  constructor(
    private userSrv: UserService,
    private alertSrv: AlertService,
    private authSrv: AuthService
  ) { }

  logar(login: Login) {
    console.log(login)
    this.authSrv.login(login);
  }

  register(user: User) {

    console.log(user)
    this.userSrv.create(user).subscribe(resp => {
      console.log(resp)
      if (user) return this.alertSrv.openAlert("Salvo com Sucesso", "success")
    })

    this.user = new User();

  }

}
