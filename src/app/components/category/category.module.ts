
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { ElectronicsComponent } from './electronics/electronics.component';
import { PipesModule } from 'src/pipes/pipes.module';
import { WomenClothesComponent } from './women-clothes/women-clothes.component';
import { MenClothesComponent } from './men-clothes/men-clothes.component';
import { JeweleryComponent } from './jewelery/jewelery.component';
// for tooltip
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    ElectronicsComponent,
    WomenClothesComponent,
    MenClothesComponent,
    JeweleryComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    PipesModule,
    NgbModule
  ],
})
export class CategoryModule {}
