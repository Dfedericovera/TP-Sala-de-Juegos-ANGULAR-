import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaraosecaComponent } from './caraoseca.component';

describe('CaraosecaComponent', () => {
  let component: CaraosecaComponent;
  let fixture: ComponentFixture<CaraosecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaraosecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaraosecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
