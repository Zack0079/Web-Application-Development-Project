import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  api: string = "http://localhost:8080/"
  constructor(private http:HttpClient) { }

  
  getItemList():Observable<any>{
    return this.http.get(`${this.api}items/`)
  }

  getItemByID(id: any):Observable<any>{
    return this.http.get(`${this.api}item/${id}`)
  }

  createItem(item:object):Observable<any>{
    return this.http.post(`${this.api}item/`,item)
  }

  updateItemByID(id: any, item:object):Observable<any>{
    return this.http.post(`${this.api}item/${id}`,item)
  }

  updateItemRemain(id: any, remain:Number):Observable<any>{
    return this.http.post(`${this.api}item/${id}/remain`,{"remain":remain})
  }

  deleteItem(id: any):Observable<any>{
    return this.http.get(`${this.api}item/${id}/detele`)
  }
}
