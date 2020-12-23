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
    public juegoService: JuegoService,
    private jugadoresService: JugadoresService,)
  { }
  ngOnDestroy()
  {
    this.snake.restart();
  }
  ngOnInit()
  {
    this.snake = new JuegoSnake(this.jugadoresService.jugador);
    this.snake.gameOver$.subscribe(juego=>{
      var juegoParaGuardar = new JuegoSnake(this.jugadoresService.jugador);
      juegoParaGuardar.score = juego.score;
      console.log("Nuevo juego",juegoParaGuardar);
      this.juegoService.addJuego(juegoParaGuardar);
    })
  }

  iniciar()
  {
    this.snake.start();
  }
  detener()
  {
    this.snake.stop();
    this.snake.die();
  }

  mostrar()
  {
    this.showModal = true;
  }

}
