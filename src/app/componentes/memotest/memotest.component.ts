import { Component, OnInit, ViewChild } from '@angular/core';
import {  trigger,  state,  style,  animate,  transition } from '@angular/animations';
import { JuegoMemotest } from "../../clases/juego-memotest";
import { AuthService } from 'src/app/servicios/auth.service';
import { JuegoService } from 'src/app/servicios/juego.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service';


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

  constructor(
    private authService:AuthService,
    private jugadoresService:JugadoresService,
    private juegoService:JuegoService
    ) {
    this.memotest = new JuegoMemotest(this.jugadoresService.jugador);
  }

  ngOnInit(): void {
  }

  toggle(card) {
    //if it is not discovered, discover it and verificate. If it is discovered dont do anything else
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
      this.memotest.tiempo = this.minutos+'min '+this.segundos+'seg';
      //Guardar Datos!!! y reiniciar el juego
      this.juegoService.addJuego(this.memotest).then(()=>{
        console.log('Juego guardado----');
      })
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
    },1000);
  }
  reiniciar(){
    this.memotest = new JuegoMemotest(this.jugadoresService.jugador);
  }

}
