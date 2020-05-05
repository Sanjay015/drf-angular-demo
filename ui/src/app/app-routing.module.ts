import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTourFormComponent } from './create-tour-form/create-tour-form.component';
import { TourPackageListComponent } from './tour-package-list/tour-package-list.component';

const routes: Routes = [
  { path: 'packages', component: TourPackageListComponent },
  { path: 'packages/:id/update', component: CreateTourFormComponent },
  { path: 'packages/new', component: CreateTourFormComponent },
  { path: '', redirectTo: '/packages', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
