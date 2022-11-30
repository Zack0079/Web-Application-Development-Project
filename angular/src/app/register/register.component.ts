import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMsg:string = "";
  data = {
    username: "",
    password: "",
    repeatedPassword: "",
    displayName: "",
    role: 3,
    email: ""
  };


  constructor(private authAPIs:AuthService, private router: Router, private routerLink: ActivatedRoute) { 
  }

  ngOnInit(): void {
  }
  register() {
    this.authAPIs.register(this.data).subscribe((res) => {
      if(res&& res.token){
        localStorage.setItem("token",res.token)
      }else{
        this.errorMsg = res.error;
      }
    });
  }
}
