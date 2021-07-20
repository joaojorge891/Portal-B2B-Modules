import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecOrdersComponent } from './exec-orders.component';

describe('ExecOrdersComponent', () => {
  let component: ExecOrdersComponent;
  let fixture: ComponentFixture<ExecOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
