import { Juego } from '../clases/juego';

export class JuegoAgilidad extends Juego {
    primerNumero: number;
    operador: any;
    segundoNumero: number;
    resultado: number;
    numeroIngresado:number;
    gano:boolean;

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super("Agilidad Aritmetica", gano, jugador);
    }

    public verificar() {
        
        if (this.resultado == this.numeroIngresado) {
            return true;
        } else {
            return false;
        }
    }

    public generarnumero() {
        this.primerNumero = Math.floor((Math.random() * 100) + 1);
        /* console.log(this.primerNumero); */
        this.segundoNumero = Math.floor((Math.random() * 100) + 1);
        /* console.log(this.segundoNumero); */
        let nameAgeMapping = new Map();
        nameAgeMapping.set(0, '+');
        nameAgeMapping.set(1, '-');
        nameAgeMapping.set(2, '*');
        let op = Math.floor((Math.random() * 2) + 1);
        this.operador = nameAgeMapping.get(op);
        /* console.log(this.operador); */
        if(this.operador=='+'){
            this.resultado = this.primerNumero + this.segundoNumero;
        }
        else if( this.operador == '-'){
            this.resultado = this.primerNumero - this.segundoNumero;
        }else if( this.operador == '*'){
            this.resultado = this.primerNumero * this.segundoNumero;
        }
        console.info('Resultado: ',this.resultado);
        this.gano = false;
    }



}
