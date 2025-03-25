import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrl: './view-form.component.css'
})
export class ViewFormComponent implements OnInit {
  travelRequestForm!: FormGroup;
    data: any;
    employeeName: string | undefined;
    managerName:string | undefined;
    requestId: number | any;
    status: string | undefined;
    resubmission: boolean | undefined
    managerMessage: string | any;
    adminMessage: string | any;

  
    constructor(private employeeService:EmployeeService, private route:ActivatedRoute, private loginService:LoginService){}
  
    ngOnInit(): void {
      this.loadEmployeeDetails();
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.requestId = +id; // Convert string to number
          this.loadTravelRequest(this.requestId);
        }
      });
      this.travelRequestForm = new FormGroup({
        name: new FormControl('',Validators.required),
        purpose_of_travel: new FormControl('', Validators.required),
        from_date: new FormControl('', Validators.required),
        to_date: new FormControl('', Validators.required),
        from_where: new FormControl('', Validators.required),
        to_where: new FormControl('', Validators.required),
        mode_of_travel: new FormControl('', Validators.required),
        manager: new FormControl(''),
        additional_request: new FormControl(''),
        lodging: new FormControl(''),
        lodging_info: new FormControl(''),
        additional_info: new FormControl('')
        
      })
      
    }
  
    loadEmployeeDetails() {
      this.employeeService.getLoggedInEmployeeDetails().subscribe(
        (employee) => {
          this.travelRequestForm.patchValue({
            name: employee.employee_name,
            manager: employee.manager_name  
          });
          this.employeeName = employee.employee_name
          this.managerName = employee.manager_name  
  
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
    }

    loadTravelRequest(request_id: number) {
      this.employeeService.getTravelRequest(request_id).subscribe(  //need to pass req id here.
        (content:any) => {
          if(content){
            this.requestId = content.id;
            this.status = content.status_of_request;
            if(this.status=='rejected' || this.status=='approved' || this.status=='closed'){
              this.travelRequestForm.disable();
            }
            this.managerMessage = content.message_from_manager;
            this.adminMessage = content.message_from_admin;
            if(content.resubmission_request == 1 && content.is_resubmitted == 1){
              this.resubmission = true;
            }else if(content.resubmission_request == 1 && content.is_resubmitted == 0){
              this.resubmission = false;
            }
            this.travelRequestForm.patchValue({...content,lodging: content.lodging === 1 ? "true" : "false", manager: this.managerName })
          }
        },
        (error:any)=> {
          console.error('Error fetching travel request:', error);
        }
      );
    }


  
  
    submitRequest(): void {
      if (this.travelRequestForm.valid) {
        if (this.requestId) {
          // Update existing request
          this.employeeService.updateTravelRequest(this.requestId, this.travelRequestForm.value).subscribe({
            next: (response) => {
              console.log('Update response:', response);
              this.loadTravelRequest(this.requestId)
            },
            error: (error) => {
              console.error('Error updating request:', error);
            }
          });
        }
}}
  logout(): void {
    this.loginService.logout()
}
}

