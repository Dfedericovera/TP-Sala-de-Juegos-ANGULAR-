import { Juego } from '../clases/juego'

export class JuegoCaraoceca extends Juego {
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

    constructor() {
        super();
    }

    mezclarMonedas(){
        /* this.monedas.sort(function () { return Math.random() - 0.5 }); */
    }

    elegirMoneda(moneda){
        this.monedaSeleccionada = moneda;
    }

    

}
