import { TestBed, inject } from '@angular/core/testing';
import { appModuleImports, appModuleDeclarations } from './app.module';
import { RestApiService } from './rest-api.service';
import { TourPackageController } from './tour-package-controller';
import { defaultEmptyTourPackage } from './tour-package';

describe('TourPackageController', () => {
  let mockService: jasmine.SpyObj<RestApiService>;
  let controller: TourPackageController;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('restApiService', [
      'createTour',
      'updateTour',
      'listTours',
      'getTour',
      'deleteTour'
    ]);
    TestBed.configureTestingModule({
      declarations: appModuleDeclarations,
      imports: appModuleImports,
      providers: [
        { provide: RestApiService, useValue: mockService },
        TourPackageController
      ]
    });
  });

  beforeEach(inject([TourPackageController], (tourPackageController) => {
    controller = tourPackageController;
  }));

  describe('getTourPackage', () => {
    it('returns default empty package', () => {
      controller.getTourPackage().subscribe((value) => {
        expect(value).toEqual(defaultEmptyTourPackage);
      });
    });

    it('calls tour package getTour method', () => {
      controller.getTourPackage(1);
      expect(mockService.getTour).toHaveBeenCalledWith(1);
    });
  });

  describe('save', () => {
    it('calls create tour method', () => {
      controller.save(defaultEmptyTourPackage);
      expect(mockService.createTour).toHaveBeenCalledWith(defaultEmptyTourPackage);
    });
  });

  describe('delete', () => {
    it('calls delete tour package method', () => {
      controller.delete({ id: 1 });
      expect(mockService.deleteTour).toHaveBeenCalledWith(1);
    });
  });

  describe('list', () => {
    it('calls tour package list method', () => {
      controller.list();
      expect(mockService.listTours).toHaveBeenCalledWith(1, undefined);
      controller.list(3, 5);
      expect(mockService.listTours).toHaveBeenCalledWith(3, 5);
    });
  });
});
