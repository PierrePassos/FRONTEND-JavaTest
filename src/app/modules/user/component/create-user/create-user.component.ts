import { Component, OnInit, signal } from '@angular/core';
import { Profile } from '../../../profile/model/profile.model';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../../../profile/service/profile.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule, MatSelectModule
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
    private userSrv: UserService,
    private route: ActivatedRoute,
    private alertSrv: AlertService
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userSrv.getById(+userId).subscribe(user => {
        this.user = user as User;
      });
      this.loadProfiles();
    }
  }

  async loadProfiles() {
    this.profiles = new Array<Profile>;
    await this.profileSrv.getAll().subscribe(resp => {
     this.profiles = resp as Array<Profile>;
    });
  }


  validaUser(user) {

  }

  selectProfile(event: any): void {
    console.log(event)
    console.log(this.user.profile); 
  }

 register(user: User) {

    console.log(user)
   this.userSrv.create(user).subscribe(resp => {
      console.log(resp)
      if(user) return this.alertSrv.openAlert("Salvo com Sucesso","success")
    })

    this.user = new User();

  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }



}
