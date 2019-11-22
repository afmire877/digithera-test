import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.sass']
})
export class ConfirmPageComponent implements OnInit {
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(private user: UserService) {}

  form: FormGroup = new FormGroup({
    code: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      try {
        const result = this.user.confirmUser(this.form.value.code);
      } catch (e) {
        console.log(e, 'From Submit');
      }
      this.submitEM.emit(this.form.value);
    }
  }
  ngOnInit() {}
}
