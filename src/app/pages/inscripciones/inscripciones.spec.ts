import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inscripciones } from './inscripciones';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Inscripciones Component', () => {
  let component: Inscripciones;
  let fixture: ComponentFixture<Inscripciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Inscripciones,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatListModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Inscripciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería agregar una inscripción válida', () => {
    component.alumnoSeleccionado = { id: 1, nombre: 'Juan' };
    component.cursoSeleccionado = { id: 101, nombre: 'Angular' };
    component.agregarInscripcion();
    expect(component.inscripciones.length).toBe(1);
    expect(component.inscripciones[0].alumno.nombre).toBe('Juan');
  });
});
