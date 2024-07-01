import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginator,
    MatIcon
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

  constructor(
    private userSrv: UserService,
    private router: Router
  ) { }

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

    this.userSrv.getPaginator(pageIndex, pageSize, search).subscribe(data => {
      this.dataSource.data = data.users;
      this.totalUsers = data.total;
    });

  }

  openEditUser(user: User): void {
    this.router.navigate(['/cadastrar-usuario', user.id]);
  }

  async deleteUser(id: number) {
    if (id) {
      this.userSrv.delete(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

}
