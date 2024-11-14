import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData = { email: '', password: '', retypedPassword:'' ,username: '', firstName: '', lastName: '',};

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register(this.userData).subscribe(
      () => alert('Registration successful!'),
      (error) => alert('Registration failed')
    );
  }
}
