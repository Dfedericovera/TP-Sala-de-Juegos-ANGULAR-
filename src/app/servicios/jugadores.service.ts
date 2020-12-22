import { Injectable } from '@angular/core';
import
  {
    AngularFirestore,
    AngularFirestoreCollection,
  } from '@angular/fire/firestore';
import { User } from 'firebase';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jugador } from '../clases/jugador';
import { AuthService } from './auth.service';

@Injectable()
export class JugadoresService
{
  //Este contendra una Coleccion de jugadores de la DB.
  private jugadoresDB: AngularFirestoreCollection<Jugador>;
  public jugador: any;
  constructor(private db: AngularFirestore, private authService: AuthService)
  {
    //? Accedemos a la base de datos de firebase.
    //? Vamos a acceder la lista de jugadores en la db.
    //? y se implementa la funcionalidad en el segundo argumento.
    //? La referencia que es nuestra lista de jugadores, se va a ordenar por nombre.
    this.jugadoresDB = this.db.collection('/jugadores', (ref) =>
      ref.orderBy('nombre')
    );
    this.getJugadores().subscribe(jugadores =>
      {
        var jug = JSON.parse(localStorage.getItem('user')) as User;
        jugadores.forEach(jugador =>
        {
  
          if (jugador.correo == jugador.correo)
          {
            this.jugador = jugador;
          }
  
        })
      })
  }

  //Devuelve un Observable de tipo Jugador Array.
  getJugadores(): Observable<Jugador[]>
  {
    return this.db
      .collection('jugadores')
      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap) =>
          {
            var jugador = snap.payload.doc.data() as Jugador;
            0;
            return new Jugador(jugador.id, jugador.correo, jugador.alias);
          })
        )
      );
  }

  //Metodo para crear un nuevo Jugador en la DB
  addJugador(jugador: Jugador)
  {
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo record a la tabla.
    try
    {
      return new Promise<any>((resolve, reject) =>
      {
        this.db
          .collection('jugadores')
          .add(JSON.parse(JSON.stringify(jugador)))
          .then(
            (res) =>
            {
              jugador.id = res.id;
              console.log('Guardado---', res);
              this.editJugador(jugador);
            },
            (err) => reject(console.error(err))
          );
      });
    } catch (error)
    {
      console.error('Error: ', error);
    }
  }

  //Borrar un Jugador de la DB
  deleteJugador(jugador: Jugador)
  {
    try
    {
      return this.db
        .collection('jugadores')
        .doc(jugador.id)
        .delete()
        .then((res) =>
        {
          console.log(res);
        });
    } catch (error)
    {
      console.log('Error: ', error);
    }
  }

  //Editar un Jugador
  editJugador(newJugador)
  {
    return this.db
      .collection('jugadores')
      .doc(newJugador.id)
      .set({ id: newJugador.id }, { merge: true });
  }
}
