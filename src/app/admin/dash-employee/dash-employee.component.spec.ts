import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEmployeeComponent } from './dash-employee.component';

describe('DashEmployeeComponent', () => {
  let component: DashEmployeeComponent;
  let fixture: ComponentFixture<DashEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
