import { Component } from '@angular/core';
import { JugadoresService } from 'src/app/servicios/jugadores.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false,
  };
  constructor(private jugadoresService:JugadoresService) {}
}
