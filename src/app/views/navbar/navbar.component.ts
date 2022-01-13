import { MainService } from './../../core/services/main.service';
import { IPurchasedProduct } from './../../core/models/product';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  isSmallWindow:boolean = false;
  totalProducts: number = 0;
  subscription: Subscription[] = [];
  constructor(private service: MainService) { }

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

  showCartDialog(){
    
  }

}
