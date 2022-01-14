import { MatSnackBar } from '@angular/material/snack-bar';
import { IProductData, IPurchasedProduct, PurchasedProduct } from './../../core/models/product';
import { ProductDetailComponent } from './../product-detail/product-detail.component';
import { MainService } from './../../core/services/main.service';
import { IImage } from './../../core/models/images';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Utility from '../../core/utils/Utility';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {

  images:IImage[] = [];
  imgSelected: IImage;
  quantity: number = 0;
  product:IProductData;
  purchasedProducts: IPurchasedProduct[] = [];
  isSmallWindow:boolean = false;
  subscription: Subscription[] = [];

  constructor(
    private service: MainService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    const windowWidth = window.innerWidth;
    this.validateWindowWidth(windowWidth);

    const images = this.service.getImages();
    this.imgSelected = this.getImageSelected(images);
    this.images = images;
    const product = this.service.getProducts();
    this.product = product[0];
    
    const productSub = this.service.totalProductsSubject$.subscribe(res =>{
      this.getProductsFromLocalStorage();
    });

    this.getProductsFromLocalStorage();

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
    this.isSmallWindow = windowWidth < 768;
  }

  getProductsFromLocalStorage(){
    const key = Utility.LS_PRODUCT_KEY;
    const purchasedProducts = this.service.getLocalStorage(key);
    this.purchasedProducts = purchasedProducts? purchasedProducts : [];
  }

  getImageSelected(images:IImage[]):IImage{
    return images.find(item => item.selected);
  }

  selectImage(image: IImage):void {
    
    if(image.id !== this.imgSelected.id){

      const images: IImage[] = this.images;
      const newImages: IImage[] = [];

      images.forEach(img => {
        if(img.id === image.id){
          const imgSelected = {...img, selected:true};
          newImages.push(imgSelected);
          this.imgSelected = imgSelected;
  
        }else{
          newImages.push({...img, selected:false});
        }
      })
      this.images = newImages;
    }

  }

  addOrSubstractQuantity(option:string):void{
    const options = {
      add: () => {this.quantity += 1},
      sub: () => {this.quantity === 0? null : this.quantity -= 1}
    }
    const defaultOption = () => null;

    const updateQuantity = options[option] || defaultOption;
    updateQuantity();
    
  }

  addToCart(){
    const purchasedProduct: IPurchasedProduct = {
      title: this.product.title,
      price: this.product.discountedPrice ? this.product.discountedPrice : this.product.price,
      quantity: this.getTotalQuantity(),
      image: this.images[0].small
    };
    this.purchasedProducts = [purchasedProduct];


    const key = Utility.LS_PRODUCT_KEY;
    this.service.postLocalStorage(key, this.purchasedProducts);
    
  }

  getTotalQuantity(): number{
    if(this.purchasedProducts.length === 0){
      return this.quantity;
    }else{
      return this.quantity + this.purchasedProducts[0].quantity;
    }
  }


  showDetailDialog(){

    const data = { images: this.images, imageSelected: this.imgSelected};

    const dialogRef = this.dialog.open(ProductDetailComponent, {
      data: data,
      width: "50vw",
      height:"auto",
    })

  }

 

}
