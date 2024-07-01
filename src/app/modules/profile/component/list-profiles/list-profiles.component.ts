import { Component, OnInit } from '@angular/core';
import { Profile } from '../../model/profile.model';
import { ProfileService } from '../../service/profile.service';
import { AlertService } from '../../../../services/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-profiles',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './list-profiles.component.html',
  styleUrl: './list-profiles.component.css'
})
export class ListProfilesComponent implements OnInit {

  public profiles: Array<Profile> = new Array<Profile>;
  isEditing: number = null;

  constructor(
    private profileSrv: ProfileService,
    private alertSrv: AlertService
  ) { }

  ngOnInit() {
    this.loadProfiles();
  }

  async loadProfiles() {
    this.profiles = new Array<Profile>;
    await this.profileSrv.getAll().subscribe(resp => {
      if (!!resp && resp instanceof Array) this.profiles = resp;
    });
  }

  //Profile só pode ser deletado se não estiver referenciado em nenhum Usuario.
  deleteProfile(id: number) {
    this.profileSrv.delete(id).subscribe(() => {
      this.profileSrv.delete(id)
      this.loadProfiles();
    })

  }

  updateProfile(profile: Profile) {

    this.profileSrv.getByName(profile.name).subscribe(resp => {
      console.log(resp);
      if (resp) {
        this.alertSrv.openAlert("Nome de Profile já cadastrado não será possivel atualizar", 'warning', 5000)
        this.loadProfiles();
        return;
      } else {
        this.profileSrv.update(profile).subscribe(() => {
          this.alertSrv.openAlert("Atualizado com sucesso", 'success');
          this.loadProfiles();
          return;
        })
      }

    })
  }

}
