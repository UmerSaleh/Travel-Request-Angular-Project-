import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewFormComponent } from './view-form/view-form.component';

const routes: Routes = [
    { path: 'login', component: ManagerLoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'view-form/:id', component: ViewFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagersRoutingModule { }
