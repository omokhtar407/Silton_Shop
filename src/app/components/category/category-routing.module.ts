import { ProductResolverService } from './../../services/product-resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicsComponent } from './electronics/electronics.component';
import { MenClothesComponent } from './men-clothes/men-clothes.component';
import { WomenClothesComponent } from './women-clothes/women-clothes.component';
import { JeweleryComponent } from './jewelery/jewelery.component';

const routes: Routes = [
  { path: ``, redirectTo: `men's clothing`, pathMatch: `full` },
  { path: `men's clothing`, component: MenClothesComponent  , resolve: { products: ProductResolverService } },
  { path: `women's clothing`, component: WomenClothesComponent  , resolve: { products: ProductResolverService } },
  { path: `electronics`,  component: ElectronicsComponent  , resolve: { products: ProductResolverService }},
  { path: `jewelery`,  component: JeweleryComponent  , resolve: { products: ProductResolverService }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
