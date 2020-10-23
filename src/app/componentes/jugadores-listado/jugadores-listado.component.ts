import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { JugadoresService } from '../../servicios/jugadores.service';
import { PaisesService } from '../../servicios/paises.service';
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
    private authService: AuthService
  ) {
    this.serviceJugadores.getJugadores().subscribe(data=>{
      this.listado = data;
    })
  }

  ngOnInit() {
    this.TraerTodos();
  }

  TraerTodos() {
    /*  this.miJugadoresServicio.traertodos('/usuario/listar','todos').then(data=>{
      this.listado= data;
    }) */
  }
}
