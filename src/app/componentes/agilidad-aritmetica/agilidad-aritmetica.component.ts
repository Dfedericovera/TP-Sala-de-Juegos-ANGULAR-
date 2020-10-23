import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';
import { JuegoService } from '../../servicios/juego.service';
import { AuthService } from '../../servicios/auth.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css'],
})
export class AgilidadAritmeticaComponent implements OnInit {
  @Output()
  enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  gano: Boolean;
  perdio: boolean;

  ngOnInit() {}
  constructor(
    private juegoService: JuegoService,
    private jugadoresService:JugadoresService,
    private authService: AuthService
  ) {
    console.log(this.authService.user);
    this.ocultarVerificar = true;
    this.nuevoJuego = new JuegoAgilidad(false);
    console.info('Inicio agilidad');
  }
  
  NuevoJuego() {
    this.ocultarVerificar = false;
    this.perdio = false;
    this.nuevoJuego.generarnumero();
    this.Tiempo = 10;
    this.repetidor = setInterval(() => {
      this.Tiempo--;
      if (this.Tiempo == 0) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar = true;
      }
    }, 900);
    this.nuevoJuego.numeroIngresado = 0;
    this.gano = false;
  }

  verificar() {
    this.ocultarVerificar = true;
    this.gano = this.nuevoJuego.verificar();
    this.perdio = !this.gano;
    clearInterval(this.repetidor);

    this.juegoService.addJuego(this.nuevoJuego).then((data) => {
      console.log(data);
    });
  }
}
