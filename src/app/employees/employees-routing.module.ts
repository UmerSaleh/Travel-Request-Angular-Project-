import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { ViewFormComponent } from './view-form/view-form.component';

const routes: Routes = [{ path: 'employees', component: EmployeesComponent },
  { path: 'login', component: EmployeeLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'request-form', component: RequestFormComponent },
  { path: 'view-form/:id', component: ViewFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
