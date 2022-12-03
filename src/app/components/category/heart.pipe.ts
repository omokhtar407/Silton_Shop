import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heart'
})
export class HeartPipe implements PipeTransform {

  wishlistArray:any[]=[];
  id:number = 0
  transform(value: number): number {
    this.wishlistArray  =  JSON.parse(localStorage.getItem('wishlistHeart') as any) || [];

    if(this.wishlistArray){
      this.wishlistArray.forEach((pro) =>{
        if(pro.id === value){
          this.id = value;
        }
      })
    }
    return this.id;
  }
}
