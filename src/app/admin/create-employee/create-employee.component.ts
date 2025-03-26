import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  data: any;
  employeeName?: string;
  managers: any[] = [];
  created = false;

  constructor(private adminService:AdminService, private loginService:LoginService){}

  ngOnInit(): void {
    this.getManagers()
    this.employeeForm = new FormGroup({
      first_name: new FormControl('',Validators.required),
      last_name: new FormControl('',Validators.required ),
      email: new FormControl('',Validators.email ),
      is_manager: new FormControl('',Validators.required),
      username: new FormControl('',Validators.required),
      password1: new FormControl('',Validators.required),
      password2: new FormControl('',Validators.required),
      manager: new FormControl('',Validators.required),
    })
    
  }
  
  createEmployee(): void {
    if (this.employeeForm.valid) {
      const role = this.employeeForm.get('is_manager')?.value;
      const is_manager = role === 'Manager' ? 1 : 0;
      const employeeData = { ...this.employeeForm.value, is_manager: is_manager };
      this.adminService.createNewEmployee(employeeData).subscribe({
        next: (response) => {
          console.log('Response:',response);
          alert('Employee Created');
          this.created = true;
        },
        error: (error) => {
          console.error('error',error);
          alert('Failed to create employee');
        }     
      });
    }else {
      alert("Please fill in all required fields.");
    }
  }

  getManagers(): void {
    this.adminService.getEmployeeData().subscribe({
      next: (data) => {
        // Filter employees who are managers (is_manager = 1)
        this.managers = data.filter((employee: any) => employee.is_manager == 1);
        console.log('Filtered Managers:', this.managers);  // Log the filtered managers
      },
      error: (error) => {
        console.error('Error fetching data', error);  // Log error message
      },
      complete: () => {
        console.log('Data fetch complete');  // Optional: log when the request completes
      }
    });
  }



  logout(): void{
    this.loginService.logout()
  }

}
