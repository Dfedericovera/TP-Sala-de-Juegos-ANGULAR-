import { Component, OnInit } from '@angular/core';
import {  trigger,  state,  style,  animate,  transition } from '@angular/animations';
import { JuegoCaraoceca } from "../../clases/juego-caraoseca";
@Component({
  selector: 'app-caraoseca',
  templateUrl: './caraoseca.component.html',
  styleUrls: ['./caraoseca.component.scss'],
  animations: [
    trigger('cardState', [
      state('spin', style({
        transform: 'rotateY(360deg) rotateZ(0deg)',
      })),
      state('blank', style({
      })),
      transition('* => *', animate('500ms ease')),
    ])
  ]
})
export class CaraosecaComponent implements OnInit {

  caraoceca:JuegoCaraoceca;
  suerte:number=0;
  progressbar:any;
  isPlaying=false;
  
  constructor() {
    this.caraoceca = new JuegoCaraoceca();
   }

  ngOnInit(): void {
  }
  verificar(moneda){
    moneda.isTouched = !moneda.isTouched;
  }
  aumentarProbabilidad(bar:HTMLElement){
    this.suerte +=1;
    bar.style.height = this.suerte.toString()+'%';
    //lanzarmoneda : deberia ajustar la probabilidad de que salga la cara seleccionada
    this.caraoceca.mezclarMonedas();
  }
  lanzarMoneda(bar:HTMLElement){
    this.aumentarProbabilidad(bar);

  }

  jugar(){
    this.isPlaying = true;
  }
  reiniciar(){

  }
  seleccionarCara(indexMoneda){
    if(indexMoneda == 0){
      this.caraoceca.monedas[0].isTouched = true;
      this.caraoceca.monedas[1].isTouched = false;
    }
    else{
      this.caraoceca.monedas[0].isTouched = false;
      this.caraoceca.monedas[1].isTouched = true;
    }
    this.caraoceca.monedaSeleccionada = this.caraoceca.monedas[indexMoneda];

  }

}
