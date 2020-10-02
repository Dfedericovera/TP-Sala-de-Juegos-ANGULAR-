import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss'],
  animations: [
    trigger('cardState', [
      state('spin',   style({
        transform: 'rotateY(360deg) rotateZ(0deg)',
      })),
      state('blank',   style({
      })),
      transition('* => *', animate('500ms ease')),
    ])
  ]
})
export class MemotestComponent implements OnInit {

  cards = [
    {
      name: "batman",
      img: "../../../assets/imagenes/svg/batman.svg",
      id: 1,
      isTouched: false,
    },
    {
      name: "ciclope",
      img: "../../../assets/imagenes/svg/ciclope.svg",
      id: 2,
      isTouched: false,
    },
    {
      name: "flash",
      img: "../../../assets/imagenes/svg/flash.svg",
      id: 3,
      isTouched: false,
    },
    {
      name: "freddy",
      img: "../../../assets/imagenes/svg/freddy.svg",
      id: 4,
      isTouched: false,
    },
    {
      name: "hulk",
      img: "../../../assets/imagenes/svg/hulk.svg",
      id: 5,
      isTouched: false,
    },
    {
      name: "jason",
      img: "../../../assets/imagenes/svg/jason.svg",
      id: 6,
      isTouched: false,
    },
    {
      name: "luigi",
      img: "../../../assets/imagenes/svg/luigi.svg",
      id: 7,
      isTouched: false,
    },
    {
      name: "mario",
      img: "../../../assets/imagenes/svg/mario.svg",
      id: 8,
      isTouched: false,
    },
    {
      name: "robocop",
      img: "../../../assets/imagenes/svg/robocop.svg",
      id: 9,
      isTouched: false,
    },
    {
      name: "superman",
      img: "../../../assets/imagenes/svg/superman.svg",
      id: 10,
      isTouched: false,
    },
    {
      name: "thor",
      img: "../../../assets/imagenes/svg/thor.svg",
      id: 11,
      isTouched: false,
    },
    {
      name: "wolverine",
      img: "../../../assets/imagenes/svg/wolverine.svg",
      id: 12,
      isTouched: false,
    },
  ];

  constructor() {
    var clone  = new Array();     
    this.cards.forEach( card =>{
      clone.push(JSON.parse(JSON.stringify(card))

      );
    });
    clone.forEach(c =>{
      c.name = "duplicate";
    })
    this.cards= this.cards.concat(clone);
    this.cards.sort(function() {return Math.random()-0.5});
    console.log(this.cards);
   }

  ngOnInit(): void {
  }

  toggle(card) {
    console.log(card);
    card.isTouched = !card.isTouched;
  }




}
