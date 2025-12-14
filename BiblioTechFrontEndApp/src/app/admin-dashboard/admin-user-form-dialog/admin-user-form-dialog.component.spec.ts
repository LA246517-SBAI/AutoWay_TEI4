import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserFormDialogComponent } from './admin-user-form-dialog.component';

describe('AdminUserFormDialogComponent', () => {
  let component: AdminUserFormDialogComponent;
  let fixture: ComponentFixture<AdminUserFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdminUserFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
