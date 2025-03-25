  import { Component, OnInit } from '@angular/core';
  import { EmployeeService } from '../../services/employee.service';
  import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';


  @Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
  })
  export class DashboardComponent implements OnInit {
    request_data: any
    employee_name: string | undefined;
    selectedRequestId: number | null = null;
    
    constructor(private employeeService: EmployeeService, private router:Router,private loginService:LoginService){}

    ngOnInit(): void {
      this.fetchData();
    }

    fetchData(): void {
      this.employeeService.getData().subscribe({
        next: (data) => {
          this.request_data = data;
          if (this.request_data && this.request_data.length > 0) {
            this.employee_name = this.request_data[0].employee.user.username;
          }
        },
        error: (error) => {
          console.error('Error fetching data', error);
        },
        complete: () => {
          console.log('Data fetch complete');
        }
      });
    }


    edit(request_id:number):void {
      this.router.navigate([`employees/view-form/`, request_id]);
    }
    save_id(request_id:number): void {
      this.selectedRequestId = request_id;
    }
    confirm_delete():void{
      if (this.selectedRequestId !== null){
        this.employeeService.delete_request(this.selectedRequestId).subscribe({
          next: ()=> {
            console.log('Request deleted successfully');
            this.fetchData();
          },
          error: (error) => {
            console.error('Error deleting request', error);
          }
        });
      }
    }

    logout(): void {
      this.loginService.logout()
    }

    // logout(): void {
    
    //   const title = localStorage.getItem('title');
    //   if (title === 'Employee Portal') {
    //     this.router.navigate(['/employees/login']);
    //   } else if (title === 'Manager Portal') {
    //     this.router.navigate(['/managers/login']);
    //   } else if (title === 'Admin Portal') {
    //     this.router.navigate(['/admin/login']);
    //   }
  
    // }
    
    
    
  }
