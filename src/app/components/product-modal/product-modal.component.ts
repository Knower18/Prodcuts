import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {
  product = input.required<Product>();
  close = output<void>();

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

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }
}
