import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Alumnos } from './alumnos';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Alumnos Component', () => {
  let component: Alumnos;
  let fixture: ComponentFixture<Alumnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Alumnos,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Alumnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería agregar un alumno al formulario válido', () => {
    component.formulario.setValue({ nombre: 'Edilson', apellido: 'Herrera', curso: 'Angular' });
    component.agregar();
    expect(component.alumnos.length).toBe(1);
    expect(component.alumnos[0].nombre).toBe('Edilson');
  });
});
