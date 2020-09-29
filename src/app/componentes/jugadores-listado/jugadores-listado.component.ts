import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { PaisesService } from "../../servicios/paises.service";
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado:any
  miJugadoresServicio:JugadoresService
  
    constructor(serviceJugadores:JugadoresService) {
      this.miJugadoresServicio = serviceJugadores;
      
    }

  ngOnInit() {
    this.TraerTodos();
  }

  TraerTodos(){
   /*  this.miJugadoresServicio.traertodos('/usuario/listar','todos').then(data=>{
      this.listado= data;
    }) */
  }
  

}
