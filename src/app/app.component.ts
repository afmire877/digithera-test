import { Component } from '@angular/core';
import { AdminLocalStorageService } from '../app/admin-local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private service: AdminLocalStorageService) {}
  title = 'digithera-test';
  today;
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.today = this.service.getToken()
  }

}
