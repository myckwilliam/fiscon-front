import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/core/services/data.service';
import { User } from 'src/app/core/models/user';
import { TableComponent } from 'src/app/features/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  users = new MatTableDataSource<User>();

  ngOnInit(): void {
    this.users.data = this.dataService.list();
  }

  handleEdit(user: User) {
    this.router.navigate(['edit'], { queryParams: { id: user.id } });
  }

  handleDelete(user: User) {
    this.dataService.delete(user);
    this.users.data = this.dataService.list();
  }

  handleAdd() {
    this.router.navigate(['add']);
  }
}
