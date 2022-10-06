import { User } from './core/models/user';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./pages/forms/forms.component').then((c) => c.FormsComponent),
    data: { mode: 'edit', user: '' },
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/forms/forms.component').then((c) => c.FormsComponent),
    data: { mode: 'add' },
  },
  { path: '**', redirectTo: 'add' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
