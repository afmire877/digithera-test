import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  winner: string;
  squares: string[];
  x: boolean;

  handleClick = $event => {
    const index = $event.target.id;
    if (!this.squares[index]) {
      console.log(parseInt($event.target.id));
      this.squares.splice(index, 1, this.getPlayer());
      this.x = !this.x;
    }
  };

  constructor() {}

  ngOnInit() {
    this.winner = null;
    this.squares = Array(9).fill(null);
  }

  getPlayer() {
    return this.x ? 'X' : 'O';
  }
}
