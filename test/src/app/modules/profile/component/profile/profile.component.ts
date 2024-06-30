import { Component } from '@angular/core';
import { Profile } from '../../model/profile.model';
import { ProfileService } from '../../service/profile.service';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public profile: Profile = new Profile();

  constructor(
    private profileSrv: ProfileService,
    private alertSrv: AlertService
  ) { }

  createProfile(profile: Profile) {

    console.log(profile)

   

    this.profileSrv.create(profile).subscribe(response => {
      this.alertSrv.openAlert('Salvo com Sucesso');
      this.profile = new Profile();
    });

  }

  // updateProfile() {
  //   this.profileSrv.update(this.profile).subscribe(response => {
  //     console.log('Profile updated:', response);
  //   });
  // }

  // deleteProfile() {
  //   if (this.profile.id) {
  //     this.profileSrv.delete(this.profile.id).subscribe(() => {
  //       console.log('Profile deleted');
  //     });
  //   }
  // }

}
