import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAsComponent } from './login-as/login-as.component';

const routes: Routes = [
  { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) },
  { path: 'managers', loadChildren: () => import('./managers/managers.module').then(m => m.ManagersModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'login-as', component:LoginAsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
