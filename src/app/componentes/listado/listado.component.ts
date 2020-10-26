import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../servicios/juego.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;

  constructor(servicioJuego:JuegoService) {  
  }  
  ngOnInit() {    
  }
}
