import {
  Component, OnInit, inject, signal, computed, effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';

const PAGE_SIZE = 8;

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, ProductModalComponent],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss'
})
export class ProductListingComponent implements OnInit {
  private productService = inject(ProductService);

  // ── Signals ────────────────────────────────────────────────
  allProducts   = signal<Product[]>([]);
  categories    = signal<string[]>([]);
  loading       = signal(true);
  error         = signal<string | null>(null);
  searchQuery   = signal('');
  activeCategory = signal('all');
  currentPage   = signal(1);
  selectedProduct = signal<Product | null>(null);

  // ── Derived signals ─────────────────────────────────────────
  filtered = computed(() => {
    const q  = this.searchQuery().toLowerCase().trim();
    const cat = this.activeCategory();
    return this.allProducts().filter(p => {
      const matchesCat  = cat === 'all' || p.category === cat;
      const matchesSearch = !q || p.title.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  });

  totalPages = computed(() => Math.ceil(this.filtered().length / PAGE_SIZE));

  paginated = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  constructor() {
    // Reset to page 1 whenever filter/search changes
    effect(() => {
      this.searchQuery();
      this.activeCategory();
      this.currentPage.set(1);
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts.set(products);
        const cats = [...new Set(products.map(p => p.category))];
        this.categories.set(cats);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products. Please try again.');
        this.loading.set(false);
      }
    });
  }

  onSearch(value: string): void { this.searchQuery.set(value); }
  setCategory(cat: string): void { this.activeCategory.set(cat); }
  goToPage(page: number): void { this.currentPage.set(page); }
  openModal(product: Product): void { this.selectedProduct.set(product); }
  closeModal(): void { this.selectedProduct.set(null); }
  retry(): void { this.error.set(null); this.loading.set(true); this.ngOnInit(); }
}
