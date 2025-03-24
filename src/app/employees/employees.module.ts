import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewFormComponent } from './view-form/view-form.component';



@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeLoginComponent,
    DashboardComponent,
    RequestFormComponent,
    ViewFormComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EmployeesModule { 
  
}
