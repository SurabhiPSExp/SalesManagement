
import { AuthService } from './../shared/auth.service';
import { User } from './../shared/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { invalid } from '@angular/compiler/src/render3/view/util';
import{JwtResponse}from "../shared/jwtresponse"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted= false;
  loginUser: User = new User();
  error = '';
  jwtResponse:any=new JwtResponse();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //formGroup
    this.loginForm = this.formBuilder.group({
      Username: ['', [Validators.required, Validators.minLength(2)]],
      Userpassword: ['', [Validators.required]],
    });
  }
  //Get controls
  get formControls() {
    return this.loginForm.controls;
  }
  //login verify credentials
  loginCredentials() {
    this.isSubmitted = true;
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) return;
   // #region valid form

   // #end
    if (this.loginForm.valid) {
   
      //calling a method from AuthService -Authorization

      this.authService
        .loginVerify(this.loginForm.value)

        .subscribe(
          (data) => {
            console.log(data);

            this.jwtResponse=data;
            
            sessionStorage.setItem("jwtToken",this.jwtResponse.Token);
            //Check the role--based on TRoleIdit redirect to the respective component
            if(this.jwtResponse.RoleId===1001){
              //logged as Administrator
              console.log("Admin");
              //storing in local storage
              localStorage.setItem("Username",this.jwtResponse.username);
              localStorage.setItem("Access_Role",this.jwtResponse.RoleId.toString());
              sessionStorage.setItem("Username",this.jwtResponse.username);
            
              this.router.navigateByUrl('admin');

            }
            else if(this.jwtResponse.RoleId===1002){
              console.log("Manager");
              localStorage.setItem("Username",this.jwtResponse.username);
              localStorage.setItem("Access_Role",this.jwtResponse.RoleId.toString());
              sessionStorage.setItem("Username",this.jwtResponse.username);
             
              this.router.navigateByUrl('manager');
            }
            else if(this.jwtResponse.RoleId===1003){
              console.log("Developer");
              
              localStorage.setItem("Username",this.jwtResponse.username);
              sessionStorage.setItem("Username",this.jwtResponse.username);
              this.router.navigateByUrl('employee');
            }
            else if(this.jwtResponse.RoleId===1004){
              console.log("Software Engineer");
            }
            else{
              console.log("Unauthorized user");
            }
          }, 
          (error) => {

            this.error = 'Invalid username or password';
          }
          );
        }
      }
         
  //valid or invalid
  //calling method from Authservice -Authorization
  //check the role --based on Role Id/it redirect to the respective componenT
    
    //LoginVerify Test
//LoginVerify Test
  loginVerifyTest(){
    if(this.loginForm.valid){
    this.authService.getUserByPassword(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
}
  