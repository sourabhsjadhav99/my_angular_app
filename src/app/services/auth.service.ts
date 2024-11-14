
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Observable, BehaviorSubject, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000';
//   private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

//   constructor(private http: HttpClient, private router: Router) {}

//   // Register method
//   register(userData: any): Observable<any> {
//     console.log(userData)
//     return this.http.post(`${this.apiUrl}/register`, userData).pipe(
//       tap((response: any) => {
//         if (response) {
//           this.router.navigate(['/login']);
//         }
//       })
//     );
//   }

//   isLoggedIn: boolean = false;

//   login(userDetails: { email: string; password: string }): Observable<boolean> {
//     return this.http.post<any>(`${this.apiUrl}/auth/login`, userDetails)
//       .pipe(
//         map(response => {
//           localStorage.setItem('JWT_Token', response.token);
//           this.isLoggedIn = true;
//           return true;
//         }),
//         catchError(error => {
//           console.log(error);
//           this.isLoggedIn = false;
//           return of(false);
//         })
//       );
//   }

//   logout(): void {
//     localStorage.removeItem('JWT_Token');
//     this.isLoggedIn = false;
//   }

//   isAuthenticated(): boolean {
//     return this.isLoggedIn;
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your backend URL
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  private loadingSubject = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router) {}

  // Register method
  register(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(`${this.apiUrl}/user/register`, userData).pipe(
      tap((response: any) => {
        if (response) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  isLoggedIn: boolean = false;

  // login(userDetails: { email: string; password: string }): Observable<boolean> {
  //   return this.http.post<any>(`${this.apiUrl}/auth/login`, userDetails).pipe(
  //     map(response => {
  //       localStorage.setItem('JWT_Token', response.data.token);
  //       this.isLoggedIn = true;
  //       return true;
  //     }),
  //     catchError(error => {
  //       console.log(error);
  //       this.isLoggedIn = false;
  //       return of(false);
  //     })
  //   );
  // }




  get isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable(); // Expose loading state
  }

  
  // login(userDetails: { email: string; password: string }): Observable<boolean> {
  //   return this.http.post<any>(`${this.apiUrl}/auth/login`, userDetails).pipe(
  //     map(response => {
  //       const token = response.data?.token || response.token;
  //       if (token) {
  //         localStorage.setItem('JWT_Token', token);
  //         this.isLoggedIn = true;
  //         return true;
  //       } else {
  //         console.error('Token not found in response');
  //         this.isLoggedIn = false;
  //         return false;
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('Login error:', error);
  //       this.isLoggedIn = false;
  //       return of(false);
  //     })
  //   );
  // }

  login(userDetails: { email: string; password: string }): Observable<boolean> {
    this.loadingSubject.next(true); // Set loading to true at the start
    return this.http.post<any>(`${this.apiUrl}/auth/login`, userDetails).pipe(
      map(response => {
        const token = response.data?.token || response.token;
        if (token) {
          localStorage.setItem('JWT_Token', token);
          this.authStatus.next(true); // Update authentication status
          return true;
        } else {
          console.error('Token not found in response');
          this.authStatus.next(false); // Ensure the status is set to false
          return false;
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        this.authStatus.next(false); // Ensure the status is set to false on error
        return of(false);
      }),
      finalize(() => this.loadingSubject.next(false)) // Ensure loading is set to false after the process
    );
  }
  

  logout(): void {
    localStorage.removeItem('JWT_Token');
    this.isLoggedIn = false;
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('JWT_Token');
  }


  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
}
