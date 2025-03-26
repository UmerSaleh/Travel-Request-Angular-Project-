import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private http:HttpClient, private router: Router) {}

  login(creds: { title: string; username: string; password: any; }): Observable<any> {
    if (creds.title === 'Employee Portal') {
      return this.http.post<any>(`http://127.0.0.1:8000/api/auth/employee/login/`, creds);
    } else if (creds.title === 'Manager Portal') {
        return this.http.post<any>(`http://127.0.0.1:8000/api/auth/manager/login/`, creds);
    } else if (creds.title === 'Admin Portal') {
        return this.http.post<any >(`http://127.0.0.1:8000/api/auth/admin/login/`, creds);
    } else {
      // Return an empty observable or a fallback if creds.title doesn't match
      return of({ token: '', title: '' }); // You can customize the fallback response if needed
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    const title = localStorage.getItem('title');
    if (title === 'Employee Portal') {
      this.router.navigate(['/employees/login']);
    } else if (title === 'Manager Portal') {
      this.router.navigate(['/managers/login']);
    } else if (title === 'Admin Portal') {
      this.router.navigate(['/admin/login']);
    }

  }

}
