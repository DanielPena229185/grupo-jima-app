import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTiendaComponent } from './agregar-tienda.component';

describe('AgregarTiendaComponent', () => {
  let component: AgregarTiendaComponent;
  let fixture: ComponentFixture<AgregarTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
