import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router,) { }
  // api: string = "http://localhost:8080/auth/"
  api:string = "http://18.217.40.159:8080/auth/"

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `JWT ${this.getToken()}`)

  login(data: any): Observable<any> {
    return this.http.post(`${this.api}login`, data)
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.api}register`, data)
  }

  updateUserAddress(id: any, data: any): Observable<any> {
    return this.http.post(`${this.api}user/${id}/update`, data, { 'headers': this.headers })
  }

  getUserShip(id: any): Observable<any> {
    return this.http.get(`${this.api}user/${id}/ship`, { 'headers': this.headers })
  }

  getUserID(): string {
    let token = localStorage.getItem("token")
    if (token == null || !token) {
      this.router.navigate(["/login"])
      return "";
    } else {
      let tokenExpiry: any = jwt_decode(token);
      console.log(tokenExpiry);
      return tokenExpiry.id;
    }
  }

  getToken(): string {
    let token = localStorage.getItem("token")
    if (token == null || !token) {
      this.router.navigate(["/login"])
      return "";
    } else {
      return token;
    }
  }

  checkToken() {
    let token = localStorage.getItem("token")
    if (token == null || !token) {
      this.router.navigate(["/login"])
    } else {
      let tokenExpiry: any = jwt_decode(token);
      if (tokenExpiry.exp * 1000 <= Date.now()) {
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
      };
    }
    return;
  }
}
