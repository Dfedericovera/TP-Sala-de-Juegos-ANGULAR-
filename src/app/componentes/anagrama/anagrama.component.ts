import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service';
import { JuegoAnagrama } from "../../clases/juego-anagrama";
import { JuegoService } from "../../servicios/juego.service";


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

  constructor(
    private juegoService: JuegoService,
    private jugadoresService:JugadoresService,
    private authService:AuthService
    ) {
    this.juego = new JuegoAnagrama(this.jugadoresService.jugador);
  }

  nuevo() {
    this.juego.build();
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
      this.juegoService.addJuego(this.juego);
      /* this.juegoService.registrarJuego("/juegos/registrar", this.juego.nombreJuego, this.juego.gano); */
      this.juego.gano=null;
    }
  }
  ayuda() {
    this.juego.help();
    this.anagrama = this.juego.anagrama;
  }




}