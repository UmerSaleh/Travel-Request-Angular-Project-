import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagersRoutingModule } from './managers-routing.module';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewFormComponent } from './view-form/view-form.component';


@NgModule({
  declarations: [
    ManagerLoginComponent,
    DashboardComponent,
    ViewFormComponent
  ],
  imports: [
    CommonModule,
    ManagersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ManagersModule { }
