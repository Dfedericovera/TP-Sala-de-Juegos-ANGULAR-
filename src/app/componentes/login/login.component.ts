import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: string;
  clave: string;
  contrasena: any;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private jugadoresService:JugadoresService,
  ) {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  IngresarComoAdmin() {
    this.loginForm.get('correo').setValue('admin@admin.com');
    this.loginForm.get('clave').setValue('111111');
  }

  login() {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
    }
    this.authService
      .login(
        this.loginForm.get('correo').value,
        this.loginForm.get('clave').value
      )
      .then((data) => {
        console.log('logeado exitosamente');
        this.jugadoresService.getJugador(this.loginForm.get('correo').value);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
