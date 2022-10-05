import { MatButtonModule } from '@angular/material/button';
import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  user: User = { name: '', phone: '' };

  @Output() post = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>();

  actionLabel = 'Add';
  title = 'Register';
  mode: string = 'add';
  id: number = NaN;

  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'] || 'add';

    if (this.mode === 'edit') {
      this.id = Number(this.route.snapshot.queryParamMap.get('id'));
      this.actionLabel = 'Update';
      this.title = 'Edit';
    }

    if (!isNaN(this.id)) {
      this.user = this.dataService.getOne(this.id) || this.user;
    }
  }

  handleAction() {
    if (this.mode === 'edit') {
      this.update.emit({ ...this.user });
      this.user = { name: '', phone: '' };
    } else {
      this.post.emit({ ...this.user });
      this.user = { name: '', phone: '' };
    }
  }
}
