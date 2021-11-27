import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeelistComponent } from './employees/employeelist/employeelist.component';
import { EmployeeComponent } from './employees/employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeelistComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [EmployeeService,AuthService,AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true],
  bootstrap: [AppComponent]
})
export class AppModule { }
