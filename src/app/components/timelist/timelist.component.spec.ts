import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelistComponent } from './timelist.component';

describe('TimelistComponent', () => {
  let component: TimelistComponent;
  let fixture: ComponentFixture<TimelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
