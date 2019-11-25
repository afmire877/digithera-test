import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../auth/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(private user: UserService, public router: Router) {}

  form: FormGroup = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.user.loginUser(this.form.value);
      this.router.navigate(['/']);
      this.submitEM.emit(this.form.value);
    }
  }
  ngOnInit() {}
}
