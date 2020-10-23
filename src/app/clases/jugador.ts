export class Jugador {

    public id:any;
    public correo: string;
    public alias: string;

    constructor(id?:any,correo?: string, AliasJugador?: string) {
        if (correo) {
            this.correo = correo;
        }
        if (id) {
            this.id = id;
        }
        if (AliasJugador) {
            this.alias = AliasJugador;
        }
    }


}