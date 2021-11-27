import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 //populate form by clicking the coloumn fields
 populateForm(emp:Employee){
  console.log(emp);
  var datePipe=new DatePipe("en-UK");
  let formatedDate:any=datePipe.transform(emp.DateOfJoining,'yyyy-MM-dd');
  emp.DateOfJoining=formatedDate;
  this.empService.formData=Object.assign({},emp);
}
//update
updateEmployee(empId:number){
  console.log(empId);
  this.router.navigate(['employee',empId]);

}
}
