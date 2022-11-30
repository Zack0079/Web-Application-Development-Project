import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  api: string = "http://localhost:8080/auth/"

  login(data: any): Observable<any> {
    return this.http.post(`${this.api}login`,data)
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.api}register`,data)
  }
}
