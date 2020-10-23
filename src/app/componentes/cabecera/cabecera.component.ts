import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  constructor(private authService: AuthService, private _location: Location) {}

  ngOnInit() {}
  logOut() {
    this.authService.logout();
  }
  back() {
    this._location.back();
  }
}
