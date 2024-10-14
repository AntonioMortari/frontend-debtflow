import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDebtContentComponent } from './dialog-debt-content.component';

describe('DialogDebtContentComponent', () => {
  let component: DialogDebtContentComponent;
  let fixture: ComponentFixture<DialogDebtContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDebtContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDebtContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
