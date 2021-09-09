import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkExternalRedirectComponent } from './link-external-redirect.component';

describe('LinkExternalRedirectComponent', () => {
  let component: LinkExternalRedirectComponent;
  let fixture: ComponentFixture<LinkExternalRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkExternalRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkExternalRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
