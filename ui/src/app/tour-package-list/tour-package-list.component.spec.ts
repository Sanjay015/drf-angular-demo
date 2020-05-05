import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { RouterLinkDirectiveStub } from 'testing/router-link-directive-stub';
import { TourPackageListComponent } from './tour-package-list.component';
import { appModuleImports, appModuleDeclarations } from '../app.module';
import { TourPackage, TourPackagePage } from '../tour-package';
import { TourPackageController } from '../tour-package-controller';

describe('TourPackageListComponent', () => {
  let fixture: ComponentFixture<TourPackageListComponent>;
  let component: TourPackageListComponent;

  let mockController: jasmine.SpyObj<TourPackageController>;

  const tourPackage = new TourPackage(1, 'category', 'name', 'promo', 1.99, 'easy', 1, new Date());

  beforeEach(() => {
    mockController = jasmine.createSpyObj('tourPackageController', ['delete', 'list']);

    TestBed.configureTestingModule({
      declarations: appModuleDeclarations.concat([RouterLinkDirectiveStub]),
      imports: appModuleImports,
      providers: [
        { provide: TourPackageController, useValue: mockController }
      ]
    });

    fixture = TestBed.createComponent(TourPackageListComponent);
    component = fixture.componentInstance;
  });

  it('loads the list of tour packages from the REST API', () => {
    const page: TourPackagePage = {
      count: 1,
      results: [tourPackage]
    };
    mockController.list.and.returnValue(of(page));
    fixture.detectChanges();
    expect(mockController.list).toHaveBeenCalled();
    expect(component.packages).toContain(tourPackage);
    expect(component.packages.length).toEqual(1);
  });

  it('calls the REST API when deleting a tour and reloads the package list', async(() => {
    const page: TourPackagePage = {
      count: 0,
      results: []
    };
    mockController.delete.withArgs(tourPackage).and.returnValue(of(null));
    mockController.list.and.returnValue(of(page));

    component.deleteTour(tourPackage);
    expect(mockController.delete).toHaveBeenCalledWith(tourPackage);
    expect(mockController.list).toHaveBeenCalled();
    expect(component.packages).not.toContain(tourPackage);
  }));
});
