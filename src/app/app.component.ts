import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud_app';
  constructor(private authService: AuthService) {}


  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

}
