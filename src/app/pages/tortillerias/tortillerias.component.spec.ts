import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortilleriasComponent } from './tortillerias.component';

describe('TortilleriasComponent', () => {
  let component: TortilleriasComponent;
  let fixture: ComponentFixture<TortilleriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TortilleriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TortilleriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
