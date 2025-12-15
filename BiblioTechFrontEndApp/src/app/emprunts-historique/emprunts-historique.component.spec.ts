import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntsHistoriqueComponent } from './emprunts-historique.component';

describe('EmpruntsHistoriqueComponent', () => {
  let component: EmpruntsHistoriqueComponent;
  let fixture: ComponentFixture<EmpruntsHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpruntsHistoriqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntsHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
