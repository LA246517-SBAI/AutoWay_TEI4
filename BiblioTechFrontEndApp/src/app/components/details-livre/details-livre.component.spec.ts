import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLivreComponent } from './details-livre.component';

describe('DetailsLivreComponent', () => {
  let component: DetailsLivreComponent;
  let fixture: ComponentFixture<DetailsLivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsLivreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
