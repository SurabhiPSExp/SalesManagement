import { ManagerComponent } from '../../../ExperionEmpv2021/src/app/manager/manager.component';
import { AdminComponent } from '../../../ExperionEmpv2021/src/app/admin/admin.component';
import { Employee } from './shared/employee';
import { EmployeeComponent } from '../../../ExperionEmpv2021/src/app/employees/employee/employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeelistComponent } from '../../../ExperionEmpv2021/src/app/employees/employeelist/employeelist.component';
import { EmployeesComponent } from '../../../ExperionEmpv2021/src/app/employees/employees.component';
import { ContactComponent } from '../../../ExperionEmpv2021/src/app/contact/contact.component';
import { HomeComponent } from '../../../ExperionEmpv2021/src/app/home/home.component';
import { LoginComponent } from '../../../ExperionEmpv2021/src/app/login/login.component';
import { AuthGuard } from '../../../ExperionEmpv2021/src/app/shared/auth.guard';

const routes: Routes = [
  { path: '',redirectTo:"/login", pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employeelist', component: EmployeelistComponent },
  //{ path: 'editemployee', component: EditemployeeComponent } , //route.snapshot.param[]
  { path: 'employee/:empId', component: EmployeeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
  {path :'admin',component:AdminComponent,canActivate:[AuthGuard],data:{role:'1001'}},
  {path :'manager',component:ManagerComponent,canActivate:[AuthGuard],data:{role:'1002'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
