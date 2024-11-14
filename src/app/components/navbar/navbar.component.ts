import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}


  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  onLogout(): void {
    this.authService.logout();
  }


  
}
