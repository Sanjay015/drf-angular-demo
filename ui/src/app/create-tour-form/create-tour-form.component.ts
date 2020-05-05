import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TermsOfUseComponent } from '../terms-of-use/terms-of-use.component';
import { TourPackageController } from '../tour-package-controller';

@Component({
  selector: 'app-create-tour-form',
  templateUrl: './create-tour-form.component.html',
  styleUrls: ['./create-tour-form.component.css']
})
export class CreateTourFormComponent implements OnInit {
  packageForm: FormGroup;

  @Input() id: number;

  constructor(
    private tourPackageController: TourPackageController,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.packageForm = new FormGroup({
      id: new FormControl(0),
      category: new FormControl('tour'),
      name: new FormControl('Tour Package'),
      promo: new FormControl('Promotional text'),
      tourLength: new FormControl(1),
      price: new FormControl(99.99),
      rating: new FormControl('medium'),
      start: new FormControl(new Date())
    });

    this.route.paramMap.subscribe((paramMap) => {
      const idParam = paramMap.get('id');
      if (!idParam) {
        return;
      }
      this.id = parseInt(idParam, 10);
      this.tourPackageController.getTourPackage(this.id).subscribe((tourPackageData: any) => {
        const { id, category, name, promo, price, rating, tour_length, start } = tourPackageData;
        this.packageForm.setValue({
          id, category, name, promo, price, rating,
          start,
          tourLength: tour_length
        });
      });
    });
  }

  save() {
    const tourPackageData = this.packageForm.getRawValue();
    const dialogRef = this.dialog.open(TermsOfUseComponent, {
      height: '70%',
      width: '30%'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tourPackageController.save(tourPackageData).subscribe((savedData: any) => {
          this.packageForm.get('id').setValue(savedData.id);
          this.snackBar.open(
            `Saved ${savedData.name} with id ${savedData.id}`,
            'Dismiss',
            { duration: 2500 }
          );
        });
      } else {
        this.snackBar.open('Could not save', 'Dismiss', { duration: 5000 });
      }
    });
  }
}
