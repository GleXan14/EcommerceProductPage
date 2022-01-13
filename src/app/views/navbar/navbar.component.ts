import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from './../../core/services/main.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import Utility from '../../core/utils/Utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  isSmallWindow:boolean = false;
  totalProducts: number = 0;
  isCartOpen:boolean = false;
  subscription: Subscription[] = [];
  constructor(
    private service: MainService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    const windowWidth = window.innerWidth;
    this.validateWindowWidth(windowWidth);

    const productSub = this.service.totalProductsSubject$.subscribe(res =>{
      this.totalProducts = res;
    });
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
    if(windowWidth < 800){
      this.isSmallWindow = true;
    }else{
      this.isSmallWindow = false;
    }
  }

  getProductsFromLocalStorage(){
    const key = Utility.LS_PRODUCT_KEY;
    const purchasedProducts = this.service.getLocalStorage(key);
    this.totalProducts = purchasedProducts? purchasedProducts.length : 0;
  }

  toggleCart(){
    this.isCartOpen = !this.isCartOpen;
  }

  alertDoesntWork(){

    const text:string = `This button does not work`
    this.snackbar.open(text, null, {
      duration: 4000,
      panelClass: ['bg-secondary', 'text-white']
    })
  }

}
