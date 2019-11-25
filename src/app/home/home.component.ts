import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CognitoService } from '../auth/cognito.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(
    private user: UserService,
    public http: HttpClient,
    public cognito: CognitoService,
    public router: Router
  ) {}
  currentUser: any;
  jwtToken: any;
  isLoggedIn: boolean;
  gamesHistory: any;
  gamesPlayed: number;

  getGames() {
    const headers = new HttpHeaders().set('Authorization', this.jwtToken);
    return this.http
      .get('https://p8iyqk0j8h.execute-api.us-east-1.amazonaws.com/dev/games', { headers })
      .subscribe(res => {
        this.gamesHistory = res;
        this.gamesPlayed = this.gamesHistory.games.reduce((curr, acc) => {
          return curr + acc;
        }, 0);
      });
  }

  ngOnInit() {
    this.currentUser = this.cognito.getCurrentUser();
    console.log(this.currentUser);
    if (this.currentUser === null) {
      this.router.navigate(['/login']);
    }
    this.jwtToken = this.user.getCurrentToken();
    this.getGames();
  }
}
