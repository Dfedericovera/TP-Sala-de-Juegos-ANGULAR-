import { Subject } from 'rxjs';
import { Juego } from '../clases/juego';
import { Jugador } from './jugador';

const WIDTH = 90; // numero de cuadrados vertical
const HEIGHT = 30; // numero de cuadrados horizontal
const CELLSIZE = 15; // tamaño de un cuadrado
const SCALE = 2.0; // dibujar todo 2 veces mas grande
const SPEED = 100; // velocidad inicial
const MAX_LEVEL = 10;
const APPLES = 5;

// level background colors
const COLORS = [
    '#fafafa',
    '#ffffcc',
    '#ffe6ee',
    '#e6f2ff',
    '#e6ffe6',
    '#fff0e6',
    '#e6e6ff',
    '#f9f2ec',
    '#e6ffe6',
    '#ff4d4d',
];

interface Configuration
{
    level: number;
    speed: number;
    nbCellsX: number;
    nbCellsY: number;
    width: number;
    height: number;
    cellWidth: number;
    cellHeight: number;
    color: string;
}

type Direction = 'Up' | 'Right' | 'Left' | 'Down';

export class JuegoSnake extends Juego
{
    
    private canvas: HTMLCanvasElement;
    public gameOver$ = new Subject<JuegoSnake>();

    public score: number = 0;
    private running: boolean = false;
    private grid: Grid;
    private worm: Worm;
    private configuration: Configuration;
    private nextMove: number;

    constructor(jugador: Jugador)
    {
        super(null, 'Snake', null, jugador);
    }

    start()
    {
        this.canvas = document.createElement('Canvas') as HTMLCanvasElement;
        document.body.appendChild(this.canvas);
        // canvas element size in the page
        this.canvas.style.width = WIDTH * CELLSIZE + 'px';
        this.canvas.style.height = HEIGHT * CELLSIZE + 'px';

        // image buffer size 
        this.canvas.width = WIDTH * CELLSIZE * SCALE;
        this.canvas.height = HEIGHT * CELLSIZE * SCALE;

        // event listeners
        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this), false);
        this.score = 0;
        // configuration
        this.configuration = {
            level: 0,
            speed: SPEED,
            width: this.canvas.width,
            height: this.canvas.height,
            nbCellsX: WIDTH,
            nbCellsY: HEIGHT,
            cellWidth: this.canvas.width / WIDTH,
            cellHeight: this.canvas.height / HEIGHT,
            color: COLORS[0]
        };
        this.worm = new Worm(this.configuration);
        this.grid = new Grid(this.configuration);
        this.nextMove = 0;
        this.running = true;
        requestAnimationFrame(this.loop.bind(this));
    }
    restart()
    {
        document.body.removeChild(this.canvas);
    }

    stop()
    {
        this.running = false;
    }

    getConfiguration()
    {
        return this.configuration
    }

    loop(time: number)
    {

        if (this.running)
        {

            requestAnimationFrame(this.loop.bind(this));

            if (time >= this.nextMove)
            {

                this.nextMove = time + this.configuration.speed;

                // move once
                this.worm.move();

                // check what happened  
                switch (this.checkState())
                {
                    case -1:
                        this.die();
                        break;
                    case 1:
                        this.worm.grow();
                        this.score += 100;
                        this.grid.eat(this.worm.getHead());
                        if (this.grid.isDone())
                        {
                            this.levelUp();
                        }
                    default:
                        // update display
                        this.paint(time);
                }
            }
        }
        else
        {
            console.log("Juego terminado. Puntaje: ", this.score);
            this.gano = true;
            this.gameOver$.next(this);
        }
    }

    paint(time: number)
    {

        const { width, height, color, level } = this.configuration;
        const context = this.canvas.getContext("2d");

        // background
        context.fillStyle = color;
        context.fillRect(0, 0, width, height);

        // level
        context.font = height + 'px Arial';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillStyle = 'rgba(0,0,0,0.1)';
        context.fillText((level + 1).toString(), width / 2, height / 2);/////////////

        // score
        context.font = 35 * SCALE + 'px Arial';
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.fillStyle = 'rgba(0,0,0,0.25)';
        context.fillText(this.score.toString(), 10 * SCALE, 10 * SCALE);/////////////////////////////

        // grid
        this.grid.draw(time, context);
        // worm
        this.worm.draw(time, context);
    }

    checkState()
    {

        const cell = this.worm.getHead();

        // left the play area or ate itself?? 
        if (this.isOutside(cell) || this.worm.isWorm(cell))
        {
            // dead
            return -1;
        }

        // ate apple?
        if (this.grid.isApple(cell))
        {
            return 1;
        }

        // nothing special
        return 0;
    }

    levelUp()
    {
        this.score += 1000;
        this.configuration.level++;
        if (this.configuration.level < MAX_LEVEL)
        {
            this.configuration.speed -= 7;
            this.configuration.color = COLORS[this.configuration.level];
            this.grid.seed();
        } else
        {
            this.win();
        }
    }

    win()
    {
        alert("Felicidades ganaste!\r\n\r\nPuntaje Final: " + this.score);
        this.stop();
    }

    die()
    {
        alert("Juego terminado!!\r\n\r\nPuntaje Final: " + this.score);
        this.stop();
    }

    isOutside(cell: Cell)
    {
        const { nbCellsX, nbCellsY } = this.configuration;
        return cell.x < 0 || cell.x >= nbCellsX || cell.y < 0 || cell.y >= nbCellsY;
    }

    onKeyDown(event: KeyboardEvent)
    {
        switch (event.key)
        {
            case 'ArrowUp':
                event.preventDefault();
                this.worm.setDirection('Up');
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.worm.setDirection('Down');
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.worm.setDirection('Left');
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.worm.setDirection('Right');
                break;
        }
    }

    onTouchStart(e)
    {
        var touch = e.changedTouches[0];
        e.preventDefault();
    }

    onTouchMove(e)
    {
        e.preventDefault();
    }

    onTouchEnd(e)
    {

        const touch = e.changedTouches[0]

        const distX = touch.pageX - touch.pageX;
        const distY = touch.pageY - touch.pageY;

        let direction = null;

        if (Math.abs(distX) >= 100)
        {
            direction = (distX < 0) ? 'Left' : 'Right';
        }
        else if (Math.abs(distY) >= 100)
        {
            direction = (distY < 0) ? 'Up' : 'Down';
        }

        if (direction)
        {
            this.worm.setDirection(direction);
        }

        e.preventDefault()
    }

}

class Grid
{

    private configuracion: any;
    private apples: Cell[];

    constructor(configuracion: Configuration)
    {
        this.configuracion = configuracion;
        this.apples = [];
        this.seed();
    }

    seed()
    {
        const { nbCellsX, nbCellsY, level } = this.configuracion;
        const nbApples = APPLES * (level + 1);
        for (let count = 0; count < nbApples; count++)
        {
            let x = Math.floor(Math.random() * nbCellsX);
            let y = Math.floor(Math.random() * nbCellsY);
            this.apples.push(new Cell(x, y));
        }
    }

    draw(time: number, context: CanvasRenderingContext2D)
    {

        const { width, height, cellWidth, cellHeight } = this.configuracion;

        context.fillStyle = 'black';
        context.lineWidth = 1 * SCALE;

        for (let x = 0; x <= width; x += cellWidth)
        {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
        }

        for (let y = 0; y <= height; y += cellHeight)
        {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.stroke();
        }

        // apples
        context.fillStyle = 'red';
        this.apples.forEach(cell => context.fillRect(cellWidth * cell.x, cellHeight * cell.y, cellWidth, cellHeight));
    }

    isApple(cell: Cell)
    {
        return this.apples.find(el => cell.x == el.x && cell.y == el.y);
    }

    eat(cell: Cell)
    {
        this.apples = this.apples.filter(el => cell.x != el.x || cell.y != el.y)
    }

    isDone()
    {
        return this.apples.length == 0;
    }
}

class Cell
{

    x: number;
    y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }
}

class Worm
{

    readonly INITIAL_SIZE = 3;
    readonly INITIAL_DIRECTION = 'Right';
    readonly INITIAL_POSITION = { x: 1, y: 1 };

    private head: Cell;
    private tail: Cell[];
    private directions: Direction[];
    private size: number;
    private configuration: Configuration;

    constructor(configuration: Configuration)
    {
        this.configuration = configuration;

        this.size = this.INITIAL_SIZE;
        this.directions = [this.INITIAL_DIRECTION];

        // initial head
        this.head = new Cell(this.INITIAL_POSITION.x, this.INITIAL_POSITION.y);

        // initial tail
        this.tail = [];
    }

    setDirection(direction: Direction)
    {
        const lastDirection = this.directions[this.directions.length - 1];
        if (lastDirection == 'Up' && (direction == 'Down' || direction == 'Up'))
        {
            return;
        }
        if (lastDirection == 'Down' && (direction == 'Up' || direction == 'Down'))
        {
            return;
        }
        if (lastDirection == 'Left' && (direction == 'Right' || direction == 'Left'))
        {
            return;
        }
        if (lastDirection == 'Right' && (direction == 'Left' || direction == 'Right'))
        {
            return;
        }
        this.directions.push(direction);
    }

    move()
    {

        // add current head to tail
        this.tail.push(this.head);

        // get next position
        this.head = this.getNext();

        // fix the worm size
        if (this.tail.length > this.size)
        {
            this.tail.splice(0, 1);
        }
    }

    getNext(): Cell
    {
        const direction = this.directions.length > 1 ? this.directions.splice(0, 1)[0] : this.directions[0];
        switch (direction)
        {
            case 'Up':
                return new Cell(this.head.x, this.head.y - 1);
            case 'Right':
                return new Cell(this.head.x + 1, this.head.y);
            case 'Down':
                return new Cell(this.head.x, this.head.y + 1);
            case 'Left':
                return new Cell(this.head.x - 1, this.head.y);
        }
    }

    draw(time: number, context: CanvasRenderingContext2D)
    {
        const { cellWidth, cellHeight } = this.configuration;
        // head
        const size = CELLSIZE * SCALE / 10;
        const offset = CELLSIZE * SCALE / 3;
        const x = cellWidth * this.head.x;
        const y = cellHeight * this.head.y;
        context.fillStyle = "#111111";
        context.fillRect(x, y, cellWidth, cellHeight)
        // eyes
        switch (this.directions[0])
        {
            case 'Up':
                context.beginPath();
                context.arc(x + offset, y + offset, size, 0, 2 * Math.PI, false);
                context.arc(x + 2 * offset, y + offset, size, 0, 2 * Math.PI, false);
                context.fillStyle = 'white';
                context.fill();
                break;
            case 'Down':
                context.beginPath();
                context.arc(x + offset, y + 2 * offset, size, 0, 2 * Math.PI, false);
                context.arc(x + 2 * offset, y + 2 * offset, size, 0, 2 * Math.PI, false);
                context.fillStyle = 'white';
                context.fill();
                break;
            case 'Right':
                context.beginPath();
                context.arc(x + 2 * offset, y + offset, size, 0, 2 * Math.PI, false);
                context.arc(x + 2 * offset, y + 2 * offset, size, 0, 2 * Math.PI, false);
                context.fillStyle = 'white';
                context.fill();
                break;
            case 'Left':
                context.beginPath();
                context.arc(x + offset, y + offset, size, 0, 2 * Math.PI, false);
                context.arc(x + offset, y + 2 * offset, size, 0, 2 * Math.PI, false);
                context.fillStyle = 'white';
                context.fill();
                break;
        }
        // tail
        context.fillStyle = "#333333";
        this.tail.forEach(cell => context.fillRect(cellWidth * cell.x, cellHeight * cell.y, cellWidth, cellHeight));
    }

    grow(qty: number = 3)
    {
        this.size += qty;
    }

    shrink(qty: number = 3)
    {
        this.size -= qty;
    }

    getHead()
    {
        return this.head;
    }

    isWorm(cell: Cell)
    {
        return this.tail.find(el => cell.x == el.x && cell.y == el.y);
    }
}