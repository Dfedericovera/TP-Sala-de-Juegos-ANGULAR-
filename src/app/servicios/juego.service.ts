import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Juego } from '../clases/juego';

@Injectable()
export class JuegoService implements OnInit
{
  public juegos: Array<Juego>;
  constructor(private db: AngularFirestore)
  {
  }

  ngOnInit(){
  }

  //Devuelve un Observable de tipo Juego Array.
  getJuegos(): Observable<Juego[]>
  {
    console.log("Get juegos;")
    return this.db.collection("juegos",(ref) =>
      ref.orderBy('date')).snapshotChanges().pipe(
        map((snaps) =>
          snaps.map((snap) =>
          {
            return snap.payload.doc.data() as Juego;
          }))
      )
  }

  //Metodo para crear un nuevo Juego en la DB
  addJuego(juego: Juego)
  {
    var date = new Date();
    var fecha = date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear();
    var hora = date.getHours().toString();
    var minutos = date.getMinutes();
    if (minutos < 10)
    {
      hora += ':' + '0' + minutos.toString();
    }
    else
    {
      hora += ':' + minutos.toString();
    }
    juego.fecha = fecha;
    juego.hora = hora;
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo record a la tabla.
    console.log(juego);
    try
    {
      return new Promise<any>((resolve, reject) =>
      {
        this.db
          .collection("juegos")
          .add(JSON.parse(JSON.stringify(juego)))
          .then(res => { console.log('Guardado---', res) }, err => reject(console.error(err)));
      });
    } catch (error)
    {
      console.error('Error: ', error);
    }

  }

  //Borrar un Juego de la DB
  deleteJuego(juego: Juego)
  {
    try
    {
      return this.db
        .collection("juegos")
        .doc(juego.id)
        .delete()
        .then(res => { console.log(res) });

    } catch (error)
    {
      console.log('Error: ', error);
    }

  }

  //Editar un Juego
  editJuego(newJuego)
  {
    return this.db
      .collection("juegos")
      .doc(newJuego.payload.doc.id)
      .set({ completed: true }, { merge: true });

  }

}
