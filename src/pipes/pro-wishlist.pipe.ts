import { Product } from 'src/model/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proWishlist',
})
export class ProWishlistPipe implements PipeTransform {
  wishlistArray: Product[] = [];
  id: number = 0;
  transform(value: string): number {
    this.wishlistArray =
      JSON.parse(localStorage.getItem('wishlistHeart') as any) || [];

    if (this.wishlistArray) {
      this.wishlistArray.forEach((pro) => {
        if (pro.id === value) {
          this.id = Number(value);
        }
      });
    }
    return this.id;
  }
}
