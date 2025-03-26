import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dash-employee',
  templateUrl: './dash-employee.component.html',
  styleUrl: './dash-employee.component.css'
})
export class DashEmployeeComponent implements OnInit {
  employee_data: any[] = [];
  selectedEmployeeId: number | null = null;


  searchName = new FormControl('');

  constructor(private adminService: AdminService, private router:Router, private loginService:LoginService){}

  ngOnInit(): void {
    this.adminService.getEmployeeData().subscribe({
      next: (data) => {
        this.employee_data = data || [];
      },
      error: (error) => {
        console.error('Error fetching data', error);  // Log error message
      },
      complete: () => {
        console.log('Data fetch complete');  // Optional: log when the request completes
      }
    });
  }
  viewEmployee(employee_id:number):void {
    this.router.navigate([`admin/view-employee/`, employee_id]);
  }
  GotoCreation(): void {
    this.router.navigate([`admin/create-employee/`]);
  }

  processEmployees(){
    const params = {
      search_name: this.searchName.value || '',
    };

    this.adminService.processEmployees(params).subscribe(
      (data: any)=> { if (Array.isArray(data) && data.length === 0) {
        console.log('No employees found.');
        this.employee_data = [];  // Handle empty response
      } else {
        this.employee_data = data;  // Normal case, data is returned
      }},
      (error: any) => console.error('Error fetching employees', error)
  );

  }

  onEnter(event: any): void {
    event.preventDefault();  // Prevent form submission (page refresh)
    this.processEmployees();   // Trigger search logic
  }


  logout(): void{
    this.loginService.logout()
  }


}