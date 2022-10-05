import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'src/app/features/form/form.component';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
