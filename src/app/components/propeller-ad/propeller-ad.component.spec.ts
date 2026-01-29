import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropellerAdComponent } from './propeller-ad.component';

describe('PropellerAdComponent', () => {
  let component: PropellerAdComponent;
  let fixture: ComponentFixture<PropellerAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropellerAdComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PropellerAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
