import { Observable, BehaviorSubject } from 'rxjs';
import { TourPackage, defaultEmptyTourPackage } from './tour-package';
import { RestApiService } from './rest-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TourPackageController {
  constructor(private restApiService: RestApiService) { }

  getTourPackage(id?: number): Observable<TourPackage> {
    if (id) {
      return this.restApiService.getTour(id);
    }
    return new BehaviorSubject<TourPackage>(defaultEmptyTourPackage);
  }

  save(tourPackageData: TourPackage) {
    if (tourPackageData.id > 0) {
      return this.restApiService.updateTour(tourPackageData);
    }
    return this.restApiService.createTour(tourPackageData);
  }

  delete(tourPackage: Pick<TourPackage, 'id'>) {
    return this.restApiService.deleteTour(tourPackage.id);
  }

  list(pageIndex: number = 1, tourLength?: number): any {
    return this.restApiService.listTours(pageIndex, tourLength);
  }
}
