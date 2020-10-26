import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css'],
})
export class JugadoresListadoComponent implements OnInit {
  listado: any;
  miJugadoresServicio: JugadoresService;

  constructor(
    private serviceJugadores: JugadoresService,
  ) {
    this.serviceJugadores.getJugadores().subscribe(data=>{
      this.listado = data;
    })
  }

  ngOnInit() {
  }
}
