import { Juego } from '../clases/juego';
import { Jugador } from './jugador';

export class JuegoAgilidad extends Juego {

    tiempo:any;

    constructor(jugador?:Jugador) {
        super(null,'Memotest',null,jugador);
    }

    
}