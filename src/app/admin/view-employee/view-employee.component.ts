import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  data: any;
  employeeName: string | undefined;
  managerName:string | undefined;
  employeeId: number | any;
  employeeStatus: string | undefined;
  managers: any

  constructor(private adminService:AdminService, private route:ActivatedRoute, private loginService:LoginService){}

  ngOnInit(): void{
    this.getManagers()
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.employeeId = +id; // Convert string to number
        this.loadEmployee(this.employeeId);
      }
    });
    this.employeeForm = new FormGroup({
      first_name: new FormControl('',),
      last_name: new FormControl('', ),
      id: new FormControl('', ),
      email: new FormControl('', ),
      is_manager: new FormControl('',),
      manager: new FormControl('',),
      date_joined: new FormControl('',),
      employee_status: new FormControl('',)
    })
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

  loadEmployee(employee_id: number) {
    this.adminService.getEmployee(employee_id).subscribe(  //need to pass emp id here.
      (content:any) => {
        if(content){
          console.log(content)
          console.log('Employee Content:', content);
          this.employeeId = content.id;
          this.employeeStatus = content.employee_status;
          this.employeeForm.patchValue({
            first_name: content.user?.first_name || '',
            last_name: content.user?.last_name || '',
            id: content.id || '',
            email: content.user?.email || '',
            is_manager: content.is_manager ? 'Manager' : 'Employee',
            manager: content.manager ? content.manager.id : '',
            date_joined: content.user?.date_joined || '',
            employee_status: content.employee_status || ''
          });
        }
      },
      (error:any)=> {
        console.error('Error fetching travel request:', error);
      }
    );
  }
  updateEmployee(): void {
    if (this.employeeForm.valid) {
      if (this.employeeId) {
        console.log("Form Data Before Update:", this.employeeForm.value); // Debugging
        // Update existing request
        this.adminService.updateEmployee(this.employeeId,{ ...this.employeeForm.value, manager_id: this.employeeForm.value.manager,is_manager: this.employeeForm.value.is_manager === 'Manager' ? 1 : 0, }).subscribe({
          next: (response) => {
            console.log('Update response:', response);
          },
          error: (error) => {
            console.error('Error updating request:', error);
          }
        });
      }
  }}

  deleteEmployee(): void {
      if (this.employeeId) {
        this.adminService.deleteEmployee(this.employeeId).subscribe({
          next: () => {
            console.log('Travel request deleted successfully!');
          },
          error: () => {
            console.error('Error updating request:');
          }
        });
      }
  }

  logout(): void{
    this.loginService.logout()
  }

}
