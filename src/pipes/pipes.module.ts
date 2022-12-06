import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProWishlistPipe } from './pro-wishlist.pipe';



@NgModule({
  declarations: [
    ProWishlistPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[ProWishlistPipe]
})
export class PipesModule { }
