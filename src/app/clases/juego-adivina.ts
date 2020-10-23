import { Juego } from '../clases/juego'
import { Jugador } from './jugador';

export class JuegoAdivina extends  Juego {
    numeroSecreto: number = 0;
    numeroIngresado: number;
    constructor(jugador?:Jugador ) {
        super(null,"Adivina el número",false,jugador);      
      }
    public verificar() {
        if (this.numeroIngresado == this.numeroSecreto) {
          this.gano = true;
        }
        if (this.gano) {
          return true;
        } else {
          return false;
        }
     }
     public generarnumero() {
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
        console.info('numero Secreto:' + this.numeroSecreto);
        this.gano = false;
      }
      public retornarAyuda() {
        if (this.numeroIngresado < this.numeroSecreto) {
          return "Falta";
        }
        return "Te pasate";
      }
}
