import { Component } from '@angular/core';
import { JugadoresService } from 'src/app/servicios/jugadores.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent
{
  constructor(
    private jugadoresService: JugadoresService,
  ){}
}
