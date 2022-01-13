export interface IProductData{
    title:string;
    description:string;
    price:number;
    discountedPrice:number | null;
    discount:number;
}

export interface IPurchasedProduct{
    title:string;
    price:number;
    quantity:number;
    image:string;
}

export class PurchasedProduct implements IPurchasedProduct{
    title:string = '';
    price:number = 0;
    quantity:number = 0;
    image:string = '';
}