import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service';
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private jugadorService: JugadoresService
  ) {
    this.createForm();
  }

  createForm() {
    this.registroForm = this.formBuilder.group({
      alias: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registrar() {
    this.authService
      .register(
        this.registroForm.get('correo').value,
        this.registroForm.get('clave').value
      )
      .then((user) => {
        console.log(user);
        this.router.navigateByUrl('/Principal');
        this.jugadorService
          .addJugador(
            new Jugador(
              null,
              this.registroForm.get('correo').value,
              this.registroForm.get('alias').value
            )
          )
          .then((data) => {
            console.log('Registrado correctamente', data);
          });
      });
  }

  navegar() {
    this.router.navigateByUrl('/Principal');
  }
}
