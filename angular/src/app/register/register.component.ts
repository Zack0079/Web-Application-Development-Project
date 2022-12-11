import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMsg: string = "";
  showErrorMsg: boolean = false;
  emailError: boolean = false;

  data = {
    username: "",
    password: "",
    repeatedPassword: "",
    displayName: "",
    role: "3",
    email: ""
  };


  constructor(private authAPIs: AuthService, private router: Router, private routerLink: ActivatedRoute) {
  }

  ngOnInit(): void {
  }
  register() {
    if (
      this.data.username &&
      this.data.password &&
      this.data.repeatedPassword &&
      this.data.displayName &&
      this.data.role &&
      this.data.email &&
      this.data.password === this.data.repeatedPassword &&
      !this.emailError
    ) {
      this.authAPIs.register(this.data).subscribe({
        next: res => {
          if (res && res.token) {
            localStorage.setItem("token", res.token)
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          } else {
            this.errorMsg = res.error;
          }
        },
        error: err => {
          this.errorMsg = err.errMsg;
          this.showError();
        },
        complete: () => console.log('done')
      })
    } else {
      this.showError();
    }
  }

  showError() {
    this.showErrorMsg = true;
  }

  validateEmail(email: string) {
    this.emailError = !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  };
}
