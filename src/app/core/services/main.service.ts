import { IImage } from './../models/images';
import { Injectable } from '@angular/core';

import {Images} from '../data/imageData';
import {Products} from '../data/productData';
import { IProductData } from '../models/product';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private images: IImage[] = Images;
  private products: IProductData[] = Products;
  public totalProductsSubject$ = new BehaviorSubject<number>(0);

  constructor() { }

  getImages():IImage[]{
    return this.images;
  }

  getProducts():IProductData[]{
    return this.products;
  }

  postLocalStorage(key:string, data:any){
    localStorage.setItem(key, JSON.stringify(data));
    this.totalProductsSubject$.next(data.length);
  }

  getLocalStorage(key:string):any{
    return JSON.parse(localStorage.getItem(key));
  }

  deleteLocalStorage(key:string){
    localStorage.removeItem(key);
    this.totalProductsSubject$.next(0);
  }
}
