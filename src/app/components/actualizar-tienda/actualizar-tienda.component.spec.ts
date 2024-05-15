import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTiendaComponent } from './actualizar-tienda.component';

describe('ActualizarTiendaComponent', () => {
  let component: ActualizarTiendaComponent;
  let fixture: ComponentFixture<ActualizarTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
