import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jugador } from '../clases/jugador';
import { AuthService } from './auth.service';

@Injectable()
export class JugadoresService {
  //Este contendra una Coleccion de jugadores de la DB.
  private jugadoresDB: AngularFirestoreCollection<Jugador>;
  public jugador: any;
  private jugadores: Array<Jugador>;
  constructor(private db: AngularFirestore, private authService: AuthService) {
    //? Accedemos a la base de datos de firebase.
    //? Vamos a acceder la lista de jugadores en la db.
    //? y se implementa la funcionalidad en el segundo argumento.
    //? La referencia que es nuestra lista de jugadores, se va a ordenar por nombre.
    this.jugadoresDB = this.db.collection('/jugadores', (ref) =>
      ref.orderBy('nombre')
    );
  }

  //Devuelve un Observable de tipo Jugador Array.
  getJugadores(): Observable<Jugador[]> {
    return this.db
      .collection('jugadores')
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) => {
            var jugador = snap.payload.doc.data() as Jugador;
            0;
            return new Jugador(snap.payload, jugador.correo, jugador.alias);
          })
        )
      );
  }
  //Devuelve un Observable de tipo Jugador.
  async getJugador(correo: string) {
    let jugador:Jugador;
    await this.getJugadores().toPromise().then(jugadores=>{
      jugadores.forEach(user=>{
        if(user.correo == correo){
          jugador = user;
        }
      })      
    })
    return jugador;
  }

  //Metodo para crear un nuevo Jugador en la DB
  addJugador(jugador: Jugador) {
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo record a la tabla.
    try {
      return new Promise<any>((resolve, reject) => {
        this.db
          .collection('jugadores')
          .add(JSON.parse(JSON.stringify(jugador)))
          .then(
            (res) => {
              console.log('Guardado---', res);
            },
            (err) => reject(console.error(err))
          );
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  //Borrar un Jugador de la DB
  deleteJugador(jugador: Jugador) {
    try {
      return this.db
        .collection('jugadores')
        .doc(jugador.id)
        .delete()
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  //Editar un Jugador
  editJugador(newJugador) {
    return this.db
      .collection('jugadores')
      .doc(newJugador.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }
}
