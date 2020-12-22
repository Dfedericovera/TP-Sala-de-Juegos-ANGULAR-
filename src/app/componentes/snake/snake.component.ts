import { Component, OnInit, OnDestroy } from '@angular/core';
import { JuegoSnake } from 'src/app/clases/juego-snake';
import { JuegoService } from 'src/app/servicios/juego.service';
import { JugadoresService } from 'src/app/servicios/jugadores.service';
@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit, OnDestroy
{

  showModal = false;
  snake: JuegoSnake;
  constructor(
    private juegoService: JuegoService,
    private jugadoresService:JugadoresService,)
  {
    this.snake = new JuegoSnake(this.jugadoresService.jugador);
  }
  ngOnDestroy()
  {
    this.snake.restart();
  }
  ngOnInit()
  {
  }

  iniciar()
  {
    this.snake.start();
  }
  detener()
  {
    this.snake.stop();
    this.snake.die();
    this.juegoService.addJuego(this.snake);
  }

  mostrar()
  {
    this.showModal = true;
  }

}
