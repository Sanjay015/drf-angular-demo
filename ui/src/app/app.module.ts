import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatRadioModule,
  MatCardModule,
  MatGridListModule,
  MatSnackBarModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatTooltipModule,
  MatChipsModule,
  MatPaginatorModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTourFormComponent } from './create-tour-form/create-tour-form.component';
import { TourPackageListComponent } from './tour-package-list/tour-package-list.component';
import { SummaryComponent } from './summary/summary.component';
import { TourPackageComponent } from './tour-package/tour-package.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { RestApiService } from './rest-api.service';
import { TourPackageController } from './tour-package-controller';

export const appModuleImports: Array<any> = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatSnackBarModule,
  MatCardModule,
  MatButtonModule,
  MatRadioModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatTooltipModule,
  MatChipsModule,
  MatPaginatorModule
];

export const appModuleDeclarations: Array<any> = [
  AppComponent,
  SummaryComponent,
  TourPackageComponent,
  CreateTourFormComponent,
  TourPackageListComponent,
  TermsOfUseComponent
];

@NgModule({
  declarations: appModuleDeclarations,
  imports: appModuleImports,
  providers: [
    RestApiService,
    TourPackageController
  ],
  bootstrap: [AppComponent],
  entryComponents: [TermsOfUseComponent]
})
export class AppModule { }
