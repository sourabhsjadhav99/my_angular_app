import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  isLoading=false

  constructor(private authService: AuthService, private router: Router) {
    
  }

  // login(): void {
  //   this.authService.login(this.credentials).subscribe(
  //     () => {},
  //     (error) => alert('Login failed')
  //   )
  //   this.router.navigate(['/list']);
  // }

  ngOnInit(): void {
    // Subscribe to loading state
    this.authService.isLoading.subscribe(loading => {
      this.isLoading = loading;
    });
  }
  
  login(): void {
    this.authService.login(this.credentials).subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/list']); 
        } else {
          alert('Login failed'); 
        }
      },
      (error) => {
        console.error(error);
        alert('Login failed due to an error'); 
      }
    );
  }
  
}
