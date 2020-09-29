import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from "../../clases/juego-anagrama";
import { JuegoServiceService } from "../../servicios/juego-service.service";


@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  anagrama: string = "";
  respuesta: boolean;
  palabraIngresada: string=null;
  juego: JuegoAnagrama;
  gano: Boolean;
  perdio: boolean;
  null: boolean;

  ngOnInit(): void {
  }

  constructor(private juegoService: JuegoServiceService) {
    this.juego = new JuegoAnagrama();
  }

  nuevo() {
    this.juego.bill();
    this.anagrama = this.juego.anagrama;
    this.gano = null;
  }
  verificar() {
    /* this.juego.palabraIngresada = this.palabraIngresada; */  
    if(this.palabraIngresada==null || this.palabraIngresada==""){
      this.null=true;
      this.gano=undefined;
      this.perdio=undefined;
    }else if(this.juego.respuesta!=null){
      this.null=false;
      this.juego.palabraIngresada= this.palabraIngresada;
      this.juego.verificar();
    }
    
    if (this.juego.gano != null && this.juego.respuesta != null) {
      this.gano = this.juego.gano;
      this.perdio = !this.gano;
      /* this.juegoService.registrarJuego("/juegos/registrar", this.juego.nombreJuego, this.juego.gano); */
      this.juego.gano=null;
    }
  }
  ayuda() {
    this.juego.help();
    this.anagrama = this.juego.anagrama;
  }




}