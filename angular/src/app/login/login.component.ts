import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title:string = "login";
  errorMsg:string = "";
  data = {
    username: "",
    password: ""
  };


  constructor(private authAPIs:AuthService, private router: Router, private routerLink: ActivatedRoute) { 
  }

  ngOnInit(): void {
  }
  login() {
    this.authAPIs.login(this.data).subscribe((res) => {
      if(res&& res.token){
        localStorage.setItem("token",res.token)
      }else{
        this.errorMsg = res.error;
      }
    });
  }

}
