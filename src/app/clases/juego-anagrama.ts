import { Juego } from '../clases/juego';

export class JuegoAnagrama extends Juego {

    value: string;
    gano: boolean = null;
    palabraIngresada: string;
    palabra: string;
    anagrama: string = "";
    respuesta: string;
    ayuda: string;
    palabras: Array<string> = ["perro", "gato", "elefante", "pajaro", "hormiga", "tortuga", "Águilas", "Avestruz", "Ballena",
        "Bisonte", "Búfalo", "Búhos", "Buitre", "Burro", "Caballo", "Cabra", "Camaleón", "Camello", "Canario", "Castor", "Cebra", "Cerdo", "Chancho", "Ciervo",
        "Cobra", "Colibrí", "Comadreja", "Cóndor", "Conejo", "Delfín", "Elefante", "Faisan", "Flamenco", "Foca", "Gallina", "Gallo", "Gato", "Gorila", "Guepardo", "Hámster", "Hiena", "Hipopótamo",
        "Jabalí", "Jaguar", "Jirafa", "Koala", "Lagarto", "León", "Llama", "Lobo", "Loro", "Mapache", "Mono", "Murciélago",
        "Nutria", "Ñandú", "Orca", "Oso", "Pájaro", "Paloma", "Panda", "Pato", "Pelícano", "Perro", "Puercoespín", "Puma", "Rana", "Ratón", "Reno", "Rinoceronte", "Salamandra", "Sapo", "Serpiente", "Tapir", "Tejon",
        "Tiburón", "Tigre", "Topo", "Toro", "Tucán", "Vaca", "Vicuñas", "Zorrillo", "Zorro"];

    constructor() {
        super('Anagrama');
    }

    public verificar(): boolean {
        if (this.palabraIngresada != null) {
            if (this.respuesta == this.palabraIngresada.toLocaleLowerCase()) {
                this.gano = true;
            }
            else {
                this.gano = false;
            }
        } else if (this.palabraIngresada == null) {
            console.log("ingrese una palabra");
        }
        return this.gano;
    }

    bill() {
        this.anagrama = "";
        var palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
        this.respuesta = palabra.toLocaleLowerCase();
        palabra = palabra.toLocaleLowerCase();
        var myarray = [];
        var c = palabra.length
        for (var ii = 0; ii < c; ii++) {
            myarray[ii] = palabra.charAt(ii);
        }

        myarray.sort(function () { return 0.5 - Math.random() });


        for (var i = 0; i < myarray.length; i++) {
            this.anagrama += (myarray[i]);
        }
    }
    help() {
        if (this.respuesta != null) {


            var letra1 = this.respuesta.substr(0, 1).toLowerCase();
            var array: Array<string> = []; /* = this.anagrama.split(","); */
            for (var i = 0; i < this.anagrama.length; i++) {
                array[i] = this.anagrama[i];
            }

            for (var i = 0; i < array.length; i++) {
                if (array[i] == letra1) {
                    array[i] = letra1.toUpperCase();
                }
            }

            var nuevoanagrama = array.join("");/* join(); */
            this.anagrama = nuevoanagrama;
        }
        else {
            console.log("Inicie un nuevo juego");
        }
    }


}