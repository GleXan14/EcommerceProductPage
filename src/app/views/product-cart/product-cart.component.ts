import { IPurchasedProduct } from './../../core/models/product';
import { MainService } from './../../core/services/main.service';
import { Component, HostListener, OnInit } from '@angular/core';
import Utility from '../../core/utils/Utility';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {

  products: IPurchasedProduct[] = [];
  isSmallWindow:boolean = false;
  subscription: Subscription[] = [];
  constructor(
    private service: MainService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    
    this.getProductsInLocalStorage();

    const productSub = this.service.totalProductsSubject$.subscribe(res =>{
      this.getProductsInLocalStorage();
    })

    this.subscription.push(productSub);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.forEach(sub => sub.unsubscribe());
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    const windowWidth = event.target.innerWidth;
    this.validateWindowWidth(windowWidth);
    //console.log(width);
  }

  validateWindowWidth(windowWidth:number){
    if(windowWidth < 768){
      this.isSmallWindow = true;
    }else{
      this.isSmallWindow = false;
    }
  }

  getProductsInLocalStorage():void{
    const key = Utility.LS_PRODUCT_KEY;
    const products = this.service.getLocalStorage(key);
    this.products = products ? products : [];
  }

  setProductsInLocalStorage(products:any):void{
    const key = Utility.LS_PRODUCT_KEY;
    this.service.postLocalStorage(key, products);
  }

  deleteProduct(product: IPurchasedProduct):void{
    const newProducts = this.products.filter(item => {
      return item.title != product.title || item.quantity != product.quantity;
    });

    this.setProductsInLocalStorage(newProducts);

  }

  checkout():void{
    const key = Utility.LS_PRODUCT_KEY;
    this.service.deleteLocalStorage(key);

    const text:string = `Your purchase has been completed succesfully`
    this.snackbar.open(text, null, {
      duration: 3000,
      panelClass: ['bg-success', 'text-white']
    })
  }
}
