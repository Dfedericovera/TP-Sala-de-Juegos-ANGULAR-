import { Component, OnInit, OnDestroy } from '@angular/core';
import { JuegoSnake } from 'src/app/clases/juego-snake';
import { JuegoService } from 'src/app/servicios/juego.service';
@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit, OnDestroy
{

  showModal = false;
  snake: JuegoSnake;
  constructor(private juegoService: JuegoService)
  {
    this.snake = new JuegoSnake;
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
