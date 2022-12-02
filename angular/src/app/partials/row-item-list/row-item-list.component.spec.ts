import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowItemListComponent } from './row-item-list.component';

describe('RowItemListComponent', () => {
  let component: RowItemListComponent;
  let fixture: ComponentFixture<RowItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
