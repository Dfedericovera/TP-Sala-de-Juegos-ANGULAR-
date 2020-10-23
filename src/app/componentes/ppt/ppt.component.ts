import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { JuegoService } from "../../servicios/juego.service";
import { JuegoPiedraPapelTijera } from "../../clases/juego-piedra-papel-tijera";
import { JugadoresService } from 'src/app/servicios/jugadores.service';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

  constructor(
    private juegoService: JuegoService,
    private jugadoresService:JugadoresService,
    private authService:AuthService
    ) {   
      this.nuevoJuego = new JuegoPiedraPapelTijera(this.jugadoresService.jugador);
  }

  ngOnInit() {
  }
  opciones: number[] = [0, 1, 2];
  eleccionMaquina: any;
  mensaje: string;
  nuevoJuego: JuegoPiedraPapelTijera;

  aleatorio(minimo: any, maximo: any) {
    var numero = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
    return numero;
  }

  verificar(eleccionUsuario: any) {

    eleccionUsuario = parseInt(eleccionUsuario);
    this.eleccionMaquina = this.aleatorio(0, 2);
    var referencia: string;
    if (this.eleccionMaquina == 0) {
      referencia = "Piedra";
    }
    else if (this.eleccionMaquina == 1) {
      referencia = "Papel";
    }
    else {
      referencia = "Tijera";
    }


    console.log('Eleccion de maquina: ' + referencia);

    if (eleccionUsuario == 0) {//el usuario eligio piedra 
      if (this.opciones[this.eleccionMaquina] == 1) {//si la maquina eligio papel             
        this.mensaje = '¡Perdiste! La maquina eligio papel y tu piedra.';
        this.nuevoJuego.gano = false;
      } else {
        if (this.opciones[this.eleccionMaquina] == 2) {
          this.mensaje = '¡Ganaste! La maquina eligio tijera y tu piedra.';
          this.nuevoJuego.gano = true;
        } else {
          if (this.opciones[this.eleccionMaquina] == 0) {
            this.mensaje = '¡Empate! Ambos eligieron piedra.';
          }
        }
      }
    }

    if (eleccionUsuario == 1) {//el usuario eligio papel 
      if (this.opciones[this.eleccionMaquina] == 2) {
        this.mensaje = '¡Perdiste! La maquina eligio tijera y tu papel.';
        this.nuevoJuego.gano = false;
      } else {
        if (this.opciones[this.eleccionMaquina] == 0) {
          this.mensaje = '¡Ganaste! La maquina eligio piedra y tu papel.';
          this.nuevoJuego.gano = true;
        } else {
          if (this.opciones[this.eleccionMaquina] == 1) {
            this.mensaje = '¡Empate! Ambos eligieron papel.';
          }
        }
      }
    }

    if (eleccionUsuario == 2) {//el usuario eligio tijera 
      if (this.opciones[this.eleccionMaquina] == 1) {
        this.mensaje = '¡Ganaste! La maquina eligio papel y tu tijera.';
        this.nuevoJuego.gano = true;
      } else {
        if (this.opciones[this.eleccionMaquina] == 0) {
          this.mensaje = '¡Perdiste! La maquina eligio piedra y tu tijera.';
          this.nuevoJuego.gano = false;
        } else {
          if (this.opciones[this.eleccionMaquina] == 2) {
            this.mensaje = '¡Empate! Ambos eligieron tijera.';
          }
        }
      }
    }
    if (this.nuevoJuego.gano != null) {
      this.juegoService.addJuego(this.nuevoJuego);
      this.nuevoJuego = new JuegoPiedraPapelTijera(this.jugadoresService.jugador);
    }
    this.nuevoJuego.gano = null;
    let efecto = document.getElementById('efecto') as HTMLInputElement;
    efecto.style.display = "";
  }



  quitarEfecto() {
    let efecto = document.getElementById('efecto') as HTMLInputElement;
    efecto.style.display = "none";
  }
}