import { NgModule } from '@angular/core';
import { ClothesComponent } from './clothes/clothes.component';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { ElectronicsComponent } from './electronics/electronics.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { ShoesComponent } from './shoes/shoes.component';
import { HeartPipe } from './heart.pipe';

@NgModule({
  declarations: [
    ClothesComponent,
    ElectronicsComponent,
    FurnitureComponent,
    ShoesComponent,
    HeartPipe,
  ],
  imports: [CommonModule, CategoryRoutingModule],
})
export class CategoryModule {}
