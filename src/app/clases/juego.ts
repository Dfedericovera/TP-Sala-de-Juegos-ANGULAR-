import { Jugador } from './jugador';

export class Juego
{
  public id: string;
  public nombreJuego = 'Sin Nombre';
  public jugador: Jugador;
  public fecha: any
  public hora: any;
  public date
  public gano;

  constructor(id?: string, nombreDelJuego?: string, gano?: boolean, jugador?: Jugador)
  {
    this.date = Date.now();
    if (nombreDelJuego)
      this.nombreJuego = nombreDelJuego;
    if (id)
      this.id = id;
    if (gano)
      this.gano = gano;
    if (jugador)
      this.jugador = jugador;
  }







}
