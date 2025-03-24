import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @Input() title: string = 'Login Portal';
  errorMessage: string = '';

  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  constructor(private loginService: LoginService, private router: Router) {}

  login():void{
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const creds = {
        ...this.loginForm.value,
        title: this.title,
        username: this.loginForm.value.username || '',  
        password: this.loginForm.value.password || ''   
      };
      this.loginService.login(creds).subscribe({
        next:(response: any)=>{
          const token = response["Token Generated"];
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('title', this.title);

            if (this.title === 'Employee Portal') {
              this.router.navigate(['/employees/dashboard']);
            } else if (this.title === 'Manager Portal') {
              this.router.navigate(['/managers/dashboard']);
            } else if (this.title === 'Admin Portal') {
              this.router.navigate(['/admin/dashboard']);
            }
        }},                                                                                  
        error: () => {
          this.errorMessage = 'Invalid username or password!';
        }
      })
    } else {
      this.errorMessage = 'Please enter a valid username and password!';}
  }
  
}
