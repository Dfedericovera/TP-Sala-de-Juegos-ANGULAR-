
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { Juego } from 'src/app/clases/juego';
import { JuegoCaraoceca } from 'src/app/clases/juego-caraoseca';
import { JuegoMemotest } from 'src/app/clases/juego-memotest';
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
    this.listado = this.juegosService.juegos;
  }

  ver() {
    console.info(this.listado);
  }

  TraerTodos(){
    /* this.listado = this.juegosService.juegos; */
    this.juegosService.getJuegos().subscribe(juegos=>{
      this.listado = juegos;
      console.log(this.listado);
    })
  }
  TraerGanadores(){
    this.listado = this.juegosService.juegos;
    this.listado = this.listado.filter((juego:Juego)=>{
      if(juego.gano == true||juego instanceof JuegoMemotest || juego instanceof JuegoCaraoceca){
        return juego
      }
    })
  }
  TraerPerdedores(){
    this.listado = this.juegosService.juegos;
    this.listado = this.listado.filter((juego:Juego)=>{
      if(juego.gano == false){
        return juego
      }
    })
  }

}
