import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-product',
    standalone: true,
    imports: [
      RatingModule, 
      FormsModule,
      CommonModule
    ],
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
  })

  export class ProductComponent implements OnInit {
    @Input() products: Product[] = [];
    @Output() productOutput: EventEmitter<Product> = new EventEmitter<Product>();
  
    currentIndex = 0;
    showOverlay = false;
    overlayImage: string | null = null;
    maxSlides = 2;
    thumbnailIndex = 0;
  
    ngOnInit() {
      if (this.products.length > 0) {
        this.productOutput.emit(this.products[this.currentIndex]);
      }
    }
  
    plusSlides(n: number): void {
      this.currentIndex += n;
      this.showSlides(this.currentIndex);
    }
  
    plusSlidesInOverlay(n: number): void {
      this.currentIndex += n;

      if(this.currentIndex >= this.products.length){
        this.currentIndex = 0;
      }
      
      if(this.currentIndex <0){
        this.currentIndex = this.products.length - 1;
      }
      this.overlayImage = this.products[this.currentIndex].image;
    }
  
    showSlides(index: number): void {
      if (index >= this.products.length) {
        this.currentIndex = 0;
      }
      if (index < 0) {
        this.currentIndex = this.products.length - 1;
      }
      this.productOutput.emit(this.products[this.currentIndex]);
      this.adjustThumbnailIndex();
    }
  
    openOverlay(image: string): void {
      this.overlayImage = image;
      this.showOverlay = true;
    }
  
    closeOverlay(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      if (target.classList.contains('close')) {
        this.showOverlay = false;
        this.overlayImage = null;
      }
      event.stopPropagation();
    }

    showCurrentIndexAndTotalCount(){
      return {
        currentIndex : this.currentIndex + 1,
        totalCount: this.products.length
      }
    }

    showMaxSlidesInThumbnail(): Product[] {
        const start = this.thumbnailIndex;
        const end = Math.min(start + this.maxSlides, this.products.length);
        return this.products.slice(start, end);
    }

    nextThumbnailSet(): void {
      if (this.thumbnailIndex + this.maxSlides < this.products.length) {
        this.thumbnailIndex += this.maxSlides;
      }
    }
  
    previousThumbnailSet(): void {
      if (this.thumbnailIndex - this.maxSlides >= 0) {
        this.thumbnailIndex -= this.maxSlides;
      }
    }

    setCurrentIndex(index: number): void {
      this.currentIndex = index;
      this.showSlides(this.currentIndex);
    }

    adjustThumbnailIndex(): void {
      const currentSetIndex = Math.floor(this.currentIndex / this.maxSlides);
      this.thumbnailIndex = currentSetIndex * this.maxSlides;
    }
  }