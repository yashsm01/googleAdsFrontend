import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyAdComponent } from './sticky-ad.component';

describe('StickyAdComponent', () => {
  let component: StickyAdComponent;
  let fixture: ComponentFixture<StickyAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
