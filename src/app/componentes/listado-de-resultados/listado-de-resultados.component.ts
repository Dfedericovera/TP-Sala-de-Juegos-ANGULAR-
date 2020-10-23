
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { JuegoService } from "../../servicios/juego.service";

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 @Input()
 listado: Array<any>;


  constructor(private juegosService:JuegoService) {
   }

  ngOnInit() {
  }

  ver() {
    console.info(this.listado);
  }

  TraerTodos(){
    this.juegosService.getJuegos().subscribe(juegos=>{
      this.listado = juegos.map(juego=>{
        juego.hora = new Date(juego.fecha).toLocaleTimeString();
        juego.fecha = new Date(juego.fecha).toLocaleDateString();
        
        return juego;
      })
      console.log(this.listado);
    })
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
