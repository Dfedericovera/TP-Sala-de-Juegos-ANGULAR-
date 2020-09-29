import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from "../../servicios/juego-service.service";

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

  constructor(private juegoService: JuegoServiceService) {

  }

  ngOnInit() {
  }
  opciones: number[] = [0, 1, 2];
  eleccionMaquina: any;
  mensaje: string;
  gano: boolean = null;

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
        this.gano = false;
      } else {
        if (this.opciones[this.eleccionMaquina] == 2) {
          this.mensaje = '¡Ganaste! La maquina eligio tijera y tu piedra.';
          this.gano = true;
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
        this.gano = false;
      } else {
        if (this.opciones[this.eleccionMaquina] == 0) {
          this.mensaje = '¡Ganaste! La maquina eligio piedra y tu papel.';
          this.gano = true;
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
        this.gano = true;
      } else {
        if (this.opciones[this.eleccionMaquina] == 0) {
          this.mensaje = '¡Perdiste! La maquina eligio piedra y tu tijera.';
          this.gano = false;
        } else {
          if (this.opciones[this.eleccionMaquina] == 2) {
            this.mensaje = '¡Empate! Ambos eligieron tijera.';
          }
        }
      }
    }
    if (this.gano != null) {
      /* this.juegoService.registrarJuego("/juegos/registrar", 'PidraPapelTijera', this.gano); */
    }
    this.gano = null;
    let efecto = document.getElementById('efecto') as HTMLInputElement;
    efecto.style.display = "";
  }



  quitarEfecto() {
    let efecto = document.getElementById('efecto') as HTMLInputElement;
    efecto.style.display = "none";
  }
}