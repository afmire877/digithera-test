import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../auth/user.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(private user: UserService) {}

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.user.registerUser(this.form.value);
      this.submitEM.emit(this.form.value);
    }
  }

  ngOnInit() {}
}
