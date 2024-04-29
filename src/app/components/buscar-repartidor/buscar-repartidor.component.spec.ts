import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarRepartidorComponent } from './buscar-repartidor.component';

describe('BuscarRepartidorComponent', () => {
  let component: BuscarRepartidorComponent;
  let fixture: ComponentFixture<BuscarRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarRepartidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
