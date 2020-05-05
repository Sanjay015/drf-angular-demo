import { Component } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  username = new FormControl('admin');
  password = new FormControl('');

  constructor(public restApiService: RestApiService) {}

  login() {
    this.restApiService.login(this.username.value, this.password.value);
  }

  logout() {
    this.restApiService.logout();
  }
}
