import { Component, OnInit, Input } from '@angular/core';
import { TourPackage } from '../tour-package';

@Component({
  selector: 'app-tour-package',
  templateUrl: './tour-package.component.html',
  styleUrls: ['./tour-package.component.css']
})
export class TourPackageComponent implements OnInit {
  @Input() tourPackage: TourPackage;

  constructor() { }

  ngOnInit() {
  }

}
