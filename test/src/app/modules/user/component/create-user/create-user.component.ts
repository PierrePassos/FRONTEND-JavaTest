import { Component, signal } from '@angular/core';
import { UserModel } from '../../model/user';
import { Profile } from '../../../profile/model/profile.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  user: UserModel = new UserModel();
  profiles: Array<Profile>;
  showPassword: boolean = false;

  constructor() { }


  validaUser(user) {

  }

  register() {

  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }



}
