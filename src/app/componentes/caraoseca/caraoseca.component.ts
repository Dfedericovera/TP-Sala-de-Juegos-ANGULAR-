import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { JuegoCaraoceca } from "../../clases/juego-caraoseca";
@Component({
  selector: 'app-caraoseca',
  templateUrl: './caraoseca.component.html',
  styleUrls: ['./caraoseca.component.scss'],
  animations: [
    trigger('cardState', [
      state('spin', style({
        transform: 'rotateY(1080deg) rotateZ(0deg)',
      })),
      state('blank', style({
        /* transform: 'rotateY(360deg) rotateZ(0deg)', */
      })),
      transition('* => *', animate('1000ms ease')),
      /* transition('close => spin', animate('500ms ease')), */
    ])
  ]
})
export class CaraosecaComponent implements OnInit {

  caraoceca: JuegoCaraoceca;
  suerte: number = 1;
  progressbar: any;
  isPlaying = false;//cambia entre menu y el juego
  selecciono = false;// validar si selecciono (disable jugar)
  lanzoMoneda = false;//booleano para animacion
  isSpining = false; //si esta girando no muestro la moneda
  monedaActual: any; //moneda que se muestra
  constructor() {
    this.caraoceca = new JuegoCaraoceca();
  }

  ngOnInit(): void {
  }
  //devulve true si gano, false si perdio
  verificar() {
    /* Probabilidad segun la regla de Laplace P(A)= numeroDeCasosFavorablesaA/numerosDeCasosPosibles*/
    var gano = false;
    var casosFavorables = new Array<any>();
    for (var i = 0; i < this.suerte; i++) {
      casosFavorables.push(Math.floor(Math.random() * 100));
    }
    var numeroGanador = Math.floor(Math.random() * 100);//casos posibles 100

    casosFavorables.forEach(minumero => {
      if (minumero == numeroGanador) {
        gano = true;
      }
    });
    return gano;
  }
  aumentarProbabilidad(bar: HTMLElement) {
    this.suerte += 1;
    bar.style.height = this.suerte.toString() + '%';
  }
  lanzarMoneda(bar: HTMLElement) {
    this.isSpining = true;
    console.log(this.lanzoMoneda);
    this.lanzoMoneda = !this.lanzoMoneda;
    if (this.verificar() == true) {

      this.monedaActual = this.caraoceca.monedaSeleccionada.img;
      setTimeout(t => {
        this.caraoceca.gano = true;
        this.isPlaying = false;
      }, 2000)

    }
    else {
      this.mostrarMonedaActual();
      this.aumentarProbabilidad(bar);
    }
    setTimeout(t => {
      this.isSpining = false;
    }, 1000);

  }

  mostrarMonedaActual() {
    if (this.caraoceca.monedaSeleccionada == this.caraoceca.monedas[0]) {
      this.monedaActual = this.caraoceca.monedas[1].img;
    }
    else {
      this.monedaActual = this.caraoceca.monedas[0].img;
    }

  }

  jugar() {
    this.monedaActual = this.caraoceca.monedaSeleccionada.img;
    this.isPlaying = true;
  }
  reiniciar() {
    this.suerte = 1;
    this.isPlaying = true;
  }
  seleccionarCara(indexMoneda) {
    if (indexMoneda == 0) {
      this.caraoceca.monedas[0].isTouched = true;
      this.caraoceca.monedas[1].isTouched = false;
    }
    else {
      this.caraoceca.monedas[0].isTouched = false;
      this.caraoceca.monedas[1].isTouched = true;
    }
    this.selecciono = true;
    this.caraoceca.monedaSeleccionada = this.caraoceca.monedas[indexMoneda];

  }

}
