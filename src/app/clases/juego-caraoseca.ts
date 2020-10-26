import { Juego } from '../clases/juego'
import { Jugador } from './jugador';

export class JuegoCaraoceca extends Juego {

    suerte:any;
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }
    monedas = [
        {
            name: "cara",
            img: "../../../assets/imagenes/caraoceca/cara.png",
            id: 1,
            isTouched: false,

        },
        {
            name: "ceca",
            img: "../../../assets/imagenes/caraoceca/ceca.png",
            id: 2,
            isTouched: false,
        }
    ];
    public monedaSeleccionada:any;

    constructor(jugador?:Jugador) {
        super(null,'Cara o Ceca',null,jugador);
    }

    mezclarMonedas(){
        /* this.monedas.sort(function () { return Math.random() - 0.5 }); */
    }

    elegirMoneda(moneda){
        this.monedaSeleccionada = moneda;
    }

    

}
