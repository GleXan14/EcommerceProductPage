import { IImage } from './../../core/models/images';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  images:IImage[] = [];
  imgSelected: IImage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {images: IImage[], imageSelected: IImage},
    private dialogRef: MatDialogRef<ProductDetailComponent>
  ) { }

  ngOnInit(): void {
    if(this.data &&
      this.data.imageSelected &&
      this.data.imageSelected){
        this.images = this.data.images;
        this.imgSelected = this.data.imageSelected;
    }
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

  changeImage(direction:string):void{
    const images: IImage[] = this.images;
    const indexSelected:number = images.findIndex(item => item.selected);
    const options = {
      left: indexSelected == 0? images.length-1 : indexSelected-1,
      right: indexSelected >= images.length-1? 0 :  indexSelected+1
    }
    const newIndex:number = options[direction];

    const newImages: IImage[] = images.map(img => {
      if(img.id == images[indexSelected].id){
        return {...img, selected: false}
      }

      if(img.id == images[newIndex].id){
        return {...img, selected: true}
      }

      return img;
    })

    this.imgSelected = images[newIndex];
    this.images = newImages;

  }

  close(){
    this.dialogRef.close();
  }

}
