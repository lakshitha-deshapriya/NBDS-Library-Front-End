import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsComponentComponent } from './show-details-component.component';

describe('ShowDetailsComponentComponent', () => {
  let component: ShowDetailsComponentComponent;
  let fixture: ComponentFixture<ShowDetailsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDetailsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
