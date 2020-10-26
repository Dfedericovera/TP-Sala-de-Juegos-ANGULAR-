import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../servicios/juego.service';
import { JuegoTateti } from '../../clases/juego-tateti';
import { JugadoresService } from 'src/app/servicios/jugadores.service';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css'],
})
export class TatetiComponent implements OnInit {
  mensaje: any;
  nuevoJuego: JuegoTateti;
  posiblesElecciones:number=9;
  constructor(
    private juegoService: JuegoService,
    private jugadoresService:JugadoresService,
  ) {
    this.nuevoJuego = new JuegoTateti(this.jugadoresService.jugador);
  }

  ngOnInit() {}

  eleccion(id) {
    if(this.posiblesElecciones == 1){
        this.mensaje = 'EMPATE!!';
        let modal = document.getElementById('efecto') as HTMLInputElement;
        modal.style.display = '';
    }
    var x = document.getElementById(id).innerText;
    if (x == '' && this.posiblesElecciones != 0) {
      document.getElementById(id).innerText = 'X';
      this.posiblesElecciones--;
      if (this.verificar()) {
        this.nuevoJuego.gano = true;
        this.guardarJuego();
        this.mensaje = 'GANASTE!!';
        let modal = document.getElementById('efecto') as HTMLInputElement;
        modal.style.display = '';
      } else if(this.posiblesElecciones != 0){
        this.eleccionMaquina();
      }
      if (this.verificarMaquina()) {
        this.nuevoJuego.gano = false;
        this.guardarJuego();
        this.mensaje = 'PERDISTE!!';
        let modal = document.getElementById('efecto') as HTMLInputElement;
        modal.style.display = '';
      }
    }
  }
  guardarJuego() {
    this.juegoService.addJuego(this.nuevoJuego).then(() => {
      this.nuevoJuego = new JuegoTateti(this.jugadoresService.jugador);
    });
  }

  eleccionMaquina() {
    var id = Math.floor(Math.random() * 8);

    var x = document.getElementById(id.toString()).innerText;
    if (x != 'X' && x != 'O') {      
      document.getElementById(id.toString()).innerText = 'O';
      this.posiblesElecciones--;
    } else {
      this.eleccionMaquina();
    }
  }

  verificar() {
    var a1 = document.getElementById('0').innerText;
    var a2 = document.getElementById('1').innerText;
    var a3 = document.getElementById('2').innerText;
    var b1 = document.getElementById('3').innerText;
    var b2 = document.getElementById('4').innerText;
    var b3 = document.getElementById('5').innerText;
    var c1 = document.getElementById('6').innerText;
    var c2 = document.getElementById('7').innerText;
    var c3 = document.getElementById('8').innerText;
    /* Horizontales */
    if (a1 == 'X' && a2 == 'X' && a3 == 'X') {
      return true;
    }
    if (b1 == 'X' && b2 == 'X' && b3 == 'X') {
      return true;
    }
    if (c1 == 'X' && c2 == 'X' && c3 == 'X') {
      return true;
    }
    /* Verticales */
    if (a1 == 'X' && b1 == 'X' && c1 == 'X') {
      return true;
    }
    if (a2 == 'X' && b2 == 'X' && c2 == 'X') {
      return true;
    }
    if (a3 == 'X' && b3 == 'X' && c3 == 'X') {
      return true;
    }
    /* Diagonales */
    if (a1 == 'X' && b2 == 'X' && c3 == 'X') {
      return true;
    }
    if (a3 == 'X' && b2 == 'X' && c1 == 'X') {
      return true;
    }
  }
  verificarMaquina() {
    var a1 = document.getElementById('0').innerText;
    var a2 = document.getElementById('1').innerText;
    var a3 = document.getElementById('2').innerText;
    var b1 = document.getElementById('3').innerText;
    var b2 = document.getElementById('4').innerText;
    var b3 = document.getElementById('5').innerText;
    var c1 = document.getElementById('6').innerText;
    var c2 = document.getElementById('7').innerText;
    var c3 = document.getElementById('8').innerText;
    /* Verificar si gano la maquina */
    /* Horizontales */
    if (a1 == 'O' && a2 == 'O' && a3 == 'O') {
      return true;
    }
    if (b1 == 'O' && b2 == 'O' && b3 == 'O') {
      return true;
    }
    if (c1 == 'O' && c2 == 'O' && c3 == 'O') {
      return true;
    }
    /* Verticales */
    if (a1 == 'O' && b1 == 'O' && c1 == 'O') {
      return true;
    }
    if (a2 == 'O' && b2 == 'O' && c2 == 'O') {
      return true;
    }
    if (a3 == 'O' && b3 == 'O' && c3 == 'O') {
      return true;
    }
    /* Diagonales */
    if (a1 == 'O' && b2 == 'O' && c3 == 'O') {
      return true;
    }
    if (a3 == 'O' && b2 == 'O' && c1 == 'O') {
      return true;
    }
  }

  reset() {
    this.posiblesElecciones = 9;
    var a1 = (document.getElementById('0').innerText = '');
    var a2 = (document.getElementById('1').innerText = '');
    var a3 = (document.getElementById('2').innerText = '');
    var b1 = (document.getElementById('3').innerText = '');
    var b2 = (document.getElementById('4').innerText = '');
    var b3 = (document.getElementById('5').innerText = '');
    var c1 = (document.getElementById('6').innerText = '');
    var c2 = (document.getElementById('7').innerText = '');
    var c3 = (document.getElementById('8').innerText = '');
  }
  quitarEfecto() {
    let efecto = document.getElementById('efecto') as HTMLInputElement;
    efecto.style.display = 'none';
  }
}
