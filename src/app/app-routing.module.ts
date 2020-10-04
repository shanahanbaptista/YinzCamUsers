import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'error', component: ErrorComponent},
	{path: ':name', component: UserComponent},
	{path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
