import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../auth/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(private user: UserService) {}

  form: FormGroup = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.user.loginUser(this.form.value);
      this.submitEM.emit(this.form.value);
    }
  }
  ngOnInit() {}
}
