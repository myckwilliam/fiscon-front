import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'src/app/features/form/form.component';
import { User } from 'src/app/core/models/user';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent {
  private dataService = inject(DataService);
  private router = inject(Router);

  handlePost(user: User) {
    this.dataService.add(user);
    this.router.navigate(['dashboard']);
  }

  handleUpdate(user: User) {
    this.dataService.update(user);
    this.router.navigate(['dashboard']);
  }
}
