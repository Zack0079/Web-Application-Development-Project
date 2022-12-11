import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  api: string = "http://localhost:8080/"
  constructor(private http: HttpClient, private auth: AuthService) { }


  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `JWT ${this.auth.getToken()}`)

  getItemList(): Observable<any> {
    return this.http.get(`${this.api}items/`)
  }

  getItemByID(id: any, price: boolean = false): Observable<any> {
    return this.http.get(`${this.api}item/${id}?price=${price}`)
  }

  getItemsByShopID(shopId: any): Observable<any> {
    return this.http.get(`${this.api}shop/${shopId}/items`, { 'headers': this.headers })
  }

  getItemsByUserID(userId: any): Observable<any> {
    return this.http.get(`${this.api}${userId}/wish-list`, { 'headers': this.headers })
  }

  createItem(item: object): Observable<any> {
    console.log(this.headers)
    return this.http.post(`${this.api}item/`, item, { 'headers': this.headers })
  }

  updateItemByID(id: any, item: object): Observable<any> {
    return this.http.post(`${this.api}item/${id}`, item, { 'headers': this.headers })
  }

  updateItemRemain(id: any, sold: Number): Observable<any> {
    return this.http.post(`${this.api}item/${id}/remain`, { "sold": sold }, { 'headers': this.headers })
  }

  deleteItem(id: any): Observable<any> {
    return this.http.post(`${this.api}item/${id}/delete`, {}, { 'headers': this.headers })
  }


  addItemsInWishList(item: any, id: any) {
    return this.http.post(`${this.api}item/${item._id}/wishList`, { user_id: id }, { 'headers': this.headers })
  }

  updateItemsInWishList(item: any, id: any) {
    return this.http.post(`${this.api}item/${item._id}/wishList/update`, { user_id: id, "quantify": item.quantify }, { 'headers': this.headers })
  }


  deleteItemsInWishList(item: any, id: any,) {
    return this.http.post(`${this.api}item/${item._id}/wishList/delete`, { user_id: id }, { 'headers': this.headers })
  }

  postOrder(list: any): Observable<any> {
    return this.http.post(`${this.api}order/`, list, { 'headers': this.headers })
  }

  getOrder(user_id: any): Observable<any> {
    return this.http.get(`${this.api}order/${user_id}`, { 'headers': this.headers })
  }

  getItemsInCart() {
    let tmp = localStorage.getItem("cart");
    if (tmp)
      return JSON.parse(tmp);
    else return [];
  }

  updateQuantifyInCart(selectedItemId: any, quantify: number) {
    let tmp = localStorage.getItem('cart');
    if (tmp) {
      let storageItems = JSON.parse(tmp);
      let index = storageItems.map((x: any) => x._id).indexOf(selectedItemId)
      storageItems[index].quantify = quantify;
      localStorage.setItem('cart', JSON.stringify(storageItems));
    }
  }

  addItemInCart(item: any) {
    console.log(item);
    let cartList = [];
    let tmp = localStorage.getItem("cart");
    if (tmp) {
      cartList = JSON.parse(tmp);
    }
    let index = cartList.map((x: any) => x._id).indexOf(item._id)
    if (index >= 0) {
      cartList[index].quantify += 1;
    } else {
      item.quantify = 1;
      cartList.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cartList));

  }

  setCart(cartList: any) {
    localStorage.setItem('cart', JSON.stringify(cartList));
  }

  removeItem(selectedItemId: any) {
    let tmp = localStorage.getItem('cart');
    if (tmp) {
      let storageItems = JSON.parse(tmp);
      let certList = storageItems.filter((item: any) => item._id !== selectedItemId);
      console.log("certList:", certList)
      localStorage.setItem('cart', JSON.stringify(certList));
    }
  }

  removeAllItem() {
    localStorage.removeItem('cart');
  }
}
