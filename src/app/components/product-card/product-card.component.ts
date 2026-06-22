import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  viewDetails = output<Product>();

  get stars(): number[] {
    return Array(5).fill(0).map((_, i) => i);
  }

  get categoryIcon(): string {
    const icons: Record<string, string> = {
      "men's clothing": '👔',
      "women's clothing": '👗',
      "jewelery": '💎',
      "electronics": '⚡',
    };
    return icons[this.product().category] ?? '🛍️';
  }

  truncate(text: string, max = 90): string {
    return text.length > max ? text.slice(0, max) + '…' : text;
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product());
  }
}
