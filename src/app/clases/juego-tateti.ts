import { Juego } from './juego';
import { Jugador } from './jugador';

export class JuegoTateti extends Juego {
    constructor(jugador?:Jugador ) {
        super(null,"TaTeTi",false,jugador);      
      }
}