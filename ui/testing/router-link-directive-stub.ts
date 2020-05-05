import { Directive, Input, HostListener } from '@angular/core';

/**
 * @see: https://angular.io/guide/testing#components-with-routerlink
 */
@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
