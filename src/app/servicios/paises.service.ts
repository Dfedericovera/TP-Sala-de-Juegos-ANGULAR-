import { Injectable } from '@angular/core';
@Injectable()
export class PaisesService {

  constructor( ) { }

/* 
  public listar():Promise<Array<any>> {
       return   this.miHttp.httpGetP("https://restcountries.eu/rest/v2/all")
          .then( data => {
            console.log( data );
            return data;
          })
          .catch( err => {
            console.log( err );
            return null;
          });
          //return null;
    }
} */
}