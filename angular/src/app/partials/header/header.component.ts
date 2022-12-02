import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logined: boolean = false;
  role: number = 3;
  displayName: String = "";
  constructor(private router: Router, private routerLink: ActivatedRoute) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token")
    if (token == null || !token) {
      // this.router.navigate(["/login"])
      this.logined = false;
    } else {
      let tmpObj: any = jwt_decode(token);
      this.logined = true;
      this.role = tmpObj.role;
      this.displayName = tmpObj.displayName;
    }
  }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("cart")
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}
