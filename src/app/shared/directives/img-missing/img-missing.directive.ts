/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[missing]',
})
export class ImgMissingDirective {
  constructor(private element: ElementRef) {}

  @HostListener('load')
  private onLoad() {
    this.element.nativeElement.style.display = 'inline';
  }

  @HostListener('error')
  private onError() {
    this.element.nativeElement.style.display = 'none';
  }
}
