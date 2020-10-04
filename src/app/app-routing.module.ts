import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: ':name', component: UserComponent},
	{path: 'error', component: ErrorComponent, data: {}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
