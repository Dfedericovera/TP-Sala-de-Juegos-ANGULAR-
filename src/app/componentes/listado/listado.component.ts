import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../servicios/juego.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;
   miServicioJuego:JuegoService

  constructor(servicioJuego:JuegoService) {
    this.miServicioJuego = servicioJuego;
    
  }
  
  ngOnInit() {
    
  }

 /*  llamaService(){
    console.log("llamaService");
    this.listadoParaCompartir= this.miServicioJuego.listar();
  }

  llamaServicePromesa(){
    console.log("llamaServicePromesa");
    this.miServicioJuego.listarPromesa().then((listado) => {
        this.listadoParaCompartir = listado;
    });
  } */
}
