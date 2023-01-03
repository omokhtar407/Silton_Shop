
import { NgModule } from '@angular/core';
import { ClothesComponent } from './clothes/clothes.component';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { ElectronicsComponent } from './electronics/electronics.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { ShoesComponent } from './shoes/shoes.component';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [
    ClothesComponent,
    ElectronicsComponent,
    FurnitureComponent,
    ShoesComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    PipesModule,
  ],
})
export class CategoryModule {}
