import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyContainerComponent } from './verify-container.component';

describe('VerifyContainerComponent', () => {
  let component: VerifyContainerComponent;
  let fixture: ComponentFixture<VerifyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
