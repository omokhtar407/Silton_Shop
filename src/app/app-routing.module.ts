import { ProductInfoResolverService } from './services/product-info-resolver.service';
import { ProductResolverService } from './services/product-resolver.service';
import { AuthGuard } from './auth.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent , resolve: { products: ProductResolverService }},
  { path: 'shop',  component: ShopComponent , resolve: { products: ProductResolverService }},

  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  { path: 'wishlist', canActivate: [AuthGuard], component: WishlistComponent },
  {
    path: 'product-info/:id',
    canActivate: [AuthGuard],
    component: ProductInfoComponent,
    resolve: { product: ProductInfoResolverService , products: ProductResolverService}
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./components/category/category.module').then(
        (m) => m.CategoryModule
      ),
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
