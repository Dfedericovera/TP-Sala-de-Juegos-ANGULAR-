import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';
import { Subscription } from "rxjs";
import { JuegoServiceService } from "../../servicios/juego-service.service";

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  @Output()

  enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  gano:Boolean;
  perdio:boolean;
  private subscription: Subscription;

  ngOnInit() {
  }
  constructor(private juegoService:JuegoServiceService) {
    this.ocultarVerificar = true;    
    this.nuevoJuego = new JuegoAgilidad();/* 'Agilidad',false, */
    console.info("Inicio agilidad");
  }
  
  NuevoJuego() {
    this.ocultarVerificar = false;
    this.perdio=false;
    this.nuevoJuego.generarnumero();
    this.Tiempo = 10;
    this.repetidor = setInterval(() => {

      this.Tiempo--;
     /*  console.log("llego", this.Tiempo); */
      if (this.Tiempo == 0) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar = true;
      }
    }, 900);
    this.nuevoJuego.numeroIngresado = 0;
    this.gano=false;
  }


  verificar() {
    this.ocultarVerificar = true;
    this.gano= this.nuevoJuego.verificar();
    this.perdio=!this.gano;
    //this.ocultarVerificar=false;
    clearInterval(this.repetidor);
    
   /*  this.juegoService.registrarJuego("/juegos/registrar",this.nuevoJuego.nombreJuego,this.nuevoJuego.verificar()); */

  }

}
