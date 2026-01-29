import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsterraAdComponent } from './adsterra-ad.component';

describe('AdsterraAdComponent', () => {
  let component: AdsterraAdComponent;
  let fixture: ComponentFixture<AdsterraAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsterraAdComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdsterraAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
