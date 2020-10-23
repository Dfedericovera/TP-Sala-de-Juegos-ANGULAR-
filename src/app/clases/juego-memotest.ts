import { Juego } from '../clases/juego'
import { Jugador } from './jugador';

export class JuegoMemotest extends Juego {

    tiempo:any;

    cartaSeleccionada: any;
    cards = [
        {
            name: "batman",
            img: "../../../assets/imagenes/svg/batman.svg",
            id: 1,
            isTouched: false,

        },
        {
            name: "ciclope",
            img: "../../../assets/imagenes/svg/ciclope.svg",
            id: 2,
            isTouched: false,
        },
        {
            name: "flash",
            img: "../../../assets/imagenes/svg/flash.svg",
            id: 3,
            isTouched: false,
        },
        {
            name: "freddy",
            img: "../../../assets/imagenes/svg/freddy.svg",
            id: 4,
            isTouched: false,
        },
        {
            name: "hulk",
            img: "../../../assets/imagenes/svg/hulk.svg",
            id: 5,
            isTouched: false,
        },
        {
            name: "jason",
            img: "../../../assets/imagenes/svg/jason.svg",
            id: 6,
            isTouched: false,
        },
        {
            name: "luigi",
            img: "../../../assets/imagenes/svg/luigi.svg",
            id: 7,
            isTouched: false,
        },
        {
            name: "mario",
            img: "../../../assets/imagenes/svg/mario.svg",
            id: 8,
            isTouched: false,
        },
        {
            name: "robocop",
            img: "../../../assets/imagenes/svg/robocop.svg",
            id: 9,
            isTouched: false,
        },
        {
            name: "superman",
            img: "../../../assets/imagenes/svg/superman.svg",
            id: 10,
            isTouched: false,
        },
        {
            name: "thor",
            img: "../../../assets/imagenes/svg/thor.svg",
            id: 11,
            isTouched: false,
        },
        {
            name: "wolverine",
            img: "../../../assets/imagenes/svg/wolverine.svg",
            id: 12,
            isTouched: false,
        },
    ];

    constructor(jugador?:Jugador) {
        super(null,'Memotest',null,jugador);
        this.duplicarCartas();
    }

    private duplicarCartas() {
        var clone = new Array();
        this.cards.forEach(card => {
            clone.push(JSON.parse(JSON.stringify(card))

            );
        });
        clone.forEach(c => {
            c.name = "duplicated" + c.name;
        })
        this.cards = this.cards.concat(clone);
        this.cards.sort(function () { return Math.random() - 0.5 });
    }

    public verificarCarta(card?: any): boolean {
        if (card.id && card.id == this.cartaSeleccionada.id) {
            return true;
        }
        else {
            return false;
        }
    }
    public verificarJuego(){
        var gameover = true;
        this.cards.forEach( card =>{
            if(!card.isTouched){
                gameover = false;
            }
        })
        return gameover;
    }

}
