import { Component } from '@angular/core';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListingComponent],
  template: '<app-product-listing />'
})
export class AppComponent {}
