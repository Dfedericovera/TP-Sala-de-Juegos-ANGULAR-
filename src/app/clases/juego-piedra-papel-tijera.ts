import { Juego } from './juego';
import { Jugador } from './jugador';

export class JuegoPiedraPapelTijera extends Juego {
    constructor(jugador?:Jugador ) {
        super(null,"Piedra Paple o Tijera",false,jugador);      
      }
}
