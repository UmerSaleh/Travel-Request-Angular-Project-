import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewFormComponent } from './view-form/view-form.component';
import { DashEmployeeComponent } from './dash-employee/dash-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    DashboardComponent,
    ViewFormComponent,
    DashEmployeeComponent,
    ViewEmployeeComponent,
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
