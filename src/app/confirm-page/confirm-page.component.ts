import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../auth/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.sass']
})
export class ConfirmPageComponent implements OnInit {
  username: string;
  private sub: any;
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(private user: UserService, public route: ActivatedRoute, public router: Router) {}

  form: FormGroup = new FormGroup({
    code: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      try {
        const result = this.user.confirmUser(this.form.value.code, this.username);
        this.router.navigate(['/login']);
      } catch (e) {
        console.log(e, 'From Submit');
      }
      this.submitEM.emit(this.form.value);
    }
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.username = params.username;
    });
    console.log(this.username);
  }
}
