import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewFormComponent } from './view-form/view-form.component';
import { DashEmployeeComponent } from './dash-employee/dash-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view-form/:id', component: ViewFormComponent },
  { path: 'employee-dashboard', component: DashEmployeeComponent},
  { path: 'view-employee/:id', component: ViewEmployeeComponent},
  { path: 'create-employee', component: CreateEmployeeComponent},
  { path: 'home', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
