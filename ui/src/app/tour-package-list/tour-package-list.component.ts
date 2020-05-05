import { Component, OnInit } from '@angular/core';
import { TourPackage, TourPackagePage } from '../tour-package';
import { TourPackageController } from '../tour-package-controller';
import { trigger, style, query, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-tour-package-list',
  templateUrl: './tour-package-list.component.html',
  styleUrls: ['./tour-package-list.component.css'],
  animations: [
    trigger('filterSelected', [
      transition('loading => loaded', [
        query('.mat-chip-selected',
          style({ transformOrigin: '50%', transform: 'rotate(0)' }),
          { optional: true }
        ),
        query('.mat-chip-selected', [
          animate('75ms linear', style({ transform: 'rotate(10deg)' })),
          animate('125ms ease-in-out', style({ transform: 'rotate(-10deg)' })),
          animate(50, style({ transform: 'rotate(0)' }))
        ], { optional: true })
      ])
    ]),
    trigger('tableData', [
      transition('loading => loaded', [
        query('tbody', style({ opacity: 0 }), { optional: true }),
        query('tbody', animate(300, style({ opacity: 1 })), { optional: true }),
      ])
    ])
  ]
})
export class TourPackageListComponent implements OnInit {
  displayColumns: string[] = ['name', 'price', 'tourLength', 'actions'];
  packages: TourPackage[] = [];
  pageIndex = 0;
  totalPackages = 0;
  tourLength?: number = null;
  loadingData: 'loaded' | 'loading' = 'loaded';

  constructor(private tourPackageController: TourPackageController) { }

  changePage() {
    this.loadingData = 'loading';
    const djangoPageIndex = this.pageIndex + 1;
    this.tourPackageController.list(
      djangoPageIndex, this.tourLength
    ).subscribe((page: TourPackagePage) => {
      this.packages = page.results;
      this.totalPackages = page.count;
      this.loadingData = 'loaded';
    });
  }

  filterByTourLength(tourLength?: number) {
    this.tourLength = tourLength;
    this.changePage();
  }

  ngOnInit() {
    this.changePage();
  }

  deleteTour(tourPackage: TourPackage) {
    this.tourPackageController.delete(tourPackage).subscribe(() => {
      if (this.packages.length - 1 === 0 && this.pageIndex > 0) {
        this.pageIndex -= 1;
      }
      this.changePage();
    });
  }

}
