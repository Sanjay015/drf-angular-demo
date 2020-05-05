import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { TermsOfUseComponent } from './terms-of-use.component';

describe('TermsOfUseComponent', () => {
  let component: TermsOfUseComponent;
  let fixture: ComponentFixture<TermsOfUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TermsOfUseComponent],
      imports: [MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
