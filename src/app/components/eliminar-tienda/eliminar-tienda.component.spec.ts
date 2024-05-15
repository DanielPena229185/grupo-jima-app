import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTiendaComponent } from './eliminar-tienda.component';

describe('EliminarTiendaComponent', () => {
  let component: EliminarTiendaComponent;
  let fixture: ComponentFixture<EliminarTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
