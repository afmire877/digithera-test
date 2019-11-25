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
    const index = parseInt($event.target.id);
    if (!this.squares[index]) {
      // tslint:disable-next-line: radix
      this.squares.splice(index, 1, this.getPlayer());
      this.x = !this.x;
    }
    this.winner = this.calculateWinner();
  };

  constructor() {}

  ngOnInit() {
    this.winner = null;
    this.squares = Array(9).fill(null);
  }

  getPlayer() {
    return this.x ? 'X' : 'O';
  }
  // Helper Function
  closest(num) {
    return this.squares.reduce((prev: any, curr: any) => {
      return Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev;
    });
  }

  playOpponenet() {
    const rand = Math.floor(Math.random() * 8);
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }
    return null;
  }
}
