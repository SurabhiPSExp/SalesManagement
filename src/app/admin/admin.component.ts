import { AuthService } from '../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
loggedUserName:string;
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loggedUserName=localStorage.getItem('Username');
  }
  logOut(){
   this.authService.logOut();
   this.router.navigateByUrl('login');
  }

}
