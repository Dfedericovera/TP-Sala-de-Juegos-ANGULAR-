import { Component, OnInit, ViewChild } from '@angular/core';
import {  trigger,  state,  style,  animate,  transition } from '@angular/animations';
import { JuegoMemotest } from "../../clases/juego-memotest";


@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss'],
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
export class MemotestComponent implements OnInit {


  memotest: JuegoMemotest;
  isPlaying:boolean = false;
  segundos:number=0;
  minutos:number=0;
  contador:any;
  constructor() {
    this.memotest = new JuegoMemotest();
    console.log(this.memotest.cards);
  }

  ngOnInit(): void {
  }

  toggle(card) {
    //if it is not discovered, discover it. If it is discovered dont do anything else
    if (!card.isTouched) {
      card.isTouched = !card.isTouched;
      //verificate
      this.verificarCarta(card);
    }
    else {
      return 0;
    }
  }

  verificarCarta(card) {
    setTimeout(t => {
      if (this.memotest.cartaSeleccionada && this.memotest.cartaSeleccionada.name != card.name) {
        if (this.memotest.verificarCarta(card)) {
          //keep them visible
          //and verificar si gano
          this.memotest.cartaSeleccionada = null;
          this.verificarJuego();
        } else {
          card.isTouched = false;
          this.memotest.cartaSeleccionada.isTouched = false;
          this.memotest.cartaSeleccionada = null;
        }
      }
      else {
        this.memotest.cartaSeleccionada = card;
      }
    }, 1000);
  }

  verificarJuego(){    
    if(this.memotest.verificarJuego()){
      clearInterval(this.contador);
      this.isPlaying = false;      
      this.memotest.gano = true;
      //Guardar Datos!!!
    }
    
  }

  jugar(){
    this.isPlaying = true;
    this.contador = setInterval( t=>{
      this.segundos += 1;
      if(this.segundos == 60){
        this.segundos = 0;
        this.minutos+=1;
      }
      console.log('un segundo');
    },1000);
  }

}
