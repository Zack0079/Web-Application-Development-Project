import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = "login";
  errorMsg: string = "";
  showErrorMsg: boolean = false;

  data = {
    username: "",
    password: ""
  };


  constructor(private authAPIs: AuthService, private router: Router, private routerLink: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  login() {
    if (this.data.username != "" && this.data.password != "") {
      this.authAPIs
        .login(this.data)
        .subscribe({
          next: (res) => {
            if (res && res.token) {
              localStorage.setItem("token", res.token)
              this.router.navigate(['/']).then(() => {
                window.location.reload();
              });
            }
          },
          error: (err) => {
          this.errorMsg = err.errMsg;
          this.showError();
          },
          complete: () => console.log('done'),
        });

    } else {
      this.showError();
    }
  }

  showError() {
    this.showErrorMsg = true;
  }
}
