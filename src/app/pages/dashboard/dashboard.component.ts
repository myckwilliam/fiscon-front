import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/core/services/data.service';
import { User } from 'src/app/core/models/user';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private dataService = inject(DataService);
  private changeDetector = inject(ChangeDetectorRef);

  users = new MatTableDataSource<User>();
  displayedColumns = ['name', 'phone', 'actions'];

  ngOnInit(): void {
    this.dataService.add({ name: 'John', phone: '123-456-7890' });
    this.dataService.add({ name: 'Jane', phone: '123-456-7891' });
    this.dataService.add({ name: 'Jack', phone: '123-456-7892' });

    this.users.data = this.dataService.list();
  }

  handleEdit(user: User) {
    this.dataService.update(user);
  }

  handleDelete(user: User) {
    this.dataService.delete(user);
    this.users.data = this.dataService.list();
  }
}
