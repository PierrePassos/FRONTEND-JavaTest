import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginator
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'profile', 'actions'];
  dataSource = new MatTableDataSource<User>();
  totalUsers = 0;
  pageSize = 10;
  pageEvent: PageEvent;
  searchQuery = '';
  isEditing: number = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userSrv: UserService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadUsers();
  }

  applyFilter() {
    this.paginator.firstPage();
    this.loadUsers();
  }

  loadUsers() {
    const pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
    const pageSize = this.pageEvent ? this.pageEvent.pageSize : this.pageSize;
    const search = this.searchQuery.trim().toLowerCase();

    console.log(pageIndex, pageSize, search)

    this.userSrv.getPaginator(pageIndex, pageSize, search).subscribe(data => {
      console.log(data)
      this.dataSource.data = data.users;
      this.totalUsers = data.total;
    });

  }



  // updateProfile(profile: Profile) {
  //   this.userSrv.update(profile).subscribe(() => {
  //     this.loadProfiles();
  //   });
  // }

  // deleteProfile(id: number) {
  //   this.profileService.delete(id).subscribe(() => {
  //     this.loadProfiles();
  //   });
  // }
}
