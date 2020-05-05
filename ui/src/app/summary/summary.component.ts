import { Component, OnInit, Input } from '@angular/core';
import { TourPackage } from '../tour-package';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() tourPackage: TourPackage;

  constructor() { }

  ngOnInit() {
  }

}
