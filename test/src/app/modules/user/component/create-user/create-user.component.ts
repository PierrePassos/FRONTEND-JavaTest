import { Component, OnInit, signal } from '@angular/core';
import { Profile } from '../../../profile/model/profile.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileService } from '../../../profile/service/profile.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  profiles: Array<Profile> = new Array<Profile>;
  showPassword: boolean = false;

  constructor(
    private profileSrv: ProfileService,
    private userSrv: UserService
  ) { }

  ngOnInit() {
    this.loadProfiles();
  }

  async loadProfiles() {
    this.profiles = new Array<Profile>;
    await this.profileSrv.getAll().subscribe(resp => {
      if (!!resp && resp instanceof Array) this.profiles = resp;
    });
    console.log(this.profiles)
  }


  validaUser(user) {

  }

  async register(user: User) {
    console.log(user)

    await this.userSrv.create(user).subscribe(resp => {
      console.log(resp)
    })

    this.user = new User();

  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }



}
