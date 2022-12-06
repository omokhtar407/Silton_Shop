import { ProductResolverService } from './../../services/product-resolver.service';
import { ClothesComponent } from './clothes/clothes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicsComponent } from './electronics/electronics.component';
import { ShoesComponent } from './shoes/shoes.component';
import { FurnitureComponent } from './furniture/furniture.component';

const routes: Routes = [
  { path: '', redirectTo: 'clothes', pathMatch: 'full' },
  { path: 'clothes', component: ClothesComponent  , resolve: { products: ProductResolverService } },
  { path: 'electronics',  component: ElectronicsComponent  , resolve: { products: ProductResolverService }},
  { path: 'shoes',  component: ShoesComponent  , resolve: { products: ProductResolverService } },
  { path: 'furniture', component: FurnitureComponent  , resolve: { products: ProductResolverService }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
