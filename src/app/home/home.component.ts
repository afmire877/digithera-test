import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(private user: UserService, public http: HttpClient) {}
  getGames() {
    return this.http.get('https://p8iyqk0j8h.execute-api.us-east-1.amazonaws.com/dev/games').subscribe(res => {
      console.log(res);
    });
  }
  ngOnInit() {}
}
