import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.sass"]
})
export class GameComponent implements OnInit {
  handleClick = e => {
    console.log(e);
  };

  constructor() {}

  ngOnInit() {}
}
