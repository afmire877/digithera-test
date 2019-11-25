import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../auth/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(private user: UserService, private router: Router) {}

  form: FormGroup = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl(''),
    Email: new FormControl('')
  });

  async submit() {
    if (this.form.valid) {
      console.log(this.form.value);

      this.user.registerUser(this.form.value, (err, result) => {
        if (err) {
          console.log(err.message);
          return;
        }
        console.log(result);
      });

      this.submitEM.emit(this.form.value);
    }
  }

  ngOnInit() {}
}
