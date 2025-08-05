import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Listado } from './listado';
import { of } from 'rxjs';
import { AlumnoService } from '../../services/alumno.service';

describe('Listado Component', () => {
  let component: Listado;
  let fixture: ComponentFixture<Listado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listado],
      providers: [
        {
          provide: AlumnoService,
          useValue: {
            getAlumnos: () => of([
              { id: 1, nombre: 'Juan', email: 'juan@example.com' },
              { id: 2, nombre: 'Ana', email: 'ana@example.com' }
            ])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Listado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar los alumnos', (done) => {
    component.alumnos$.subscribe(alumnos => {
      expect(alumnos.length).toBe(2);
      expect(alumnos[0].nombre).toBe('Juan');
      done();
    });
  });
});
