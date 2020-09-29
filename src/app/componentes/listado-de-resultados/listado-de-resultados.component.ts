
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { JuegoServiceService } from "../../servicios/juego-service.service";

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 @Input()
 listado: Array<any>;


  constructor(private juegosService:JuegoServiceService) {
   }

  ngOnInit() {
  }

  ver() {
    console.info(this.listado);
  }

  TraerTodos(){
    /* this.miJugadoresServicio.traertodos('/juegos/listar','todos').then(data=>{
      console.info("jugadores listado",(data));
      this.listado= data;
    }) */
 /*    this.juegosService.traertodos('/juegos/listar','todos').then(data =>{
      this.listado= data;
    }) */
  }
  TraerGanadores(){
    /* this.juegosService.traertodos('/juegos/listar','ganadores').then(data=>{
      this.listado= data;

    }) */
  }
  TraerPerdedores(){
    /* this.juegosService.traertodos('/juegos/listar','perdedores').then(data=>{
      this.listado= data;

    }) */
  }

}
