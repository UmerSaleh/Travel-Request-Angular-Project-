import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.css'
})
export class RequestFormComponent implements OnInit {
  travelRequestForm!: FormGroup;
  data: any;
  employeeName: string | undefined;
  id:number | undefined;
  status:string |undefined

  constructor(private employeeService:EmployeeService, private loginService:LoginService){}

  ngOnInit(): void {
    this.status = "to_submit";
    
    this.travelRequestForm = new FormGroup({
      name: new FormControl('',Validators.required),
      purpose_of_travel: new FormControl('', Validators.required),
      from_date: new FormControl('', Validators.required),
      to_date: new FormControl('', [Validators.required, this.dateRangeValidator.bind(this)]),
      from_where: new FormControl('', Validators.required),
      to_where: new FormControl('', Validators.required),
      mode_of_travel: new FormControl('', Validators.required),
      manager: new FormControl(''),
      additional_request: new FormControl(''),
      lodging: new FormControl('', Validators.required),
      lodging_info: new FormControl(''),
      additional_info: new FormControl('')
    }

  )

    this.loadEmployeeDetails();
  }

  loadEmployeeDetails() {
    this.employeeService.getLoggedInEmployeeDetails().subscribe(
      (employee) => {
        this.travelRequestForm.patchValue({
          name: employee.employee_name,
          manager: employee.manager_name  
        });
        this.employeeName = employee.employee_name
        this.id = employee.id

      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }
  
  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.parent) return null; // Ensure parent form is available
  
    const fromDate = control.parent.get('from_date')?.value;
    const toDate = control.value;
  
    if (fromDate && toDate && new Date(fromDate) >= new Date(toDate)) {
      return { dateInvalid: true }; 
    }
    return null; 
  }



  submitRequest(): void {
    this.travelRequestForm.markAllAsTouched();


    if (this.travelRequestForm.valid) {
      this.status = "submitted";
      console.log('Submitting Data:', this.travelRequestForm.value); 
      this.employeeService.submitTravelRequest(this.travelRequestForm.value).subscribe({
        next: (response) => {
          console.log('Response:', response);
        },
        error: (error) => {
          console.error('Error',error);
          this.status = "to_submit"
          console.log('Failed to submit request');
        }
      });
  }else {
    console.log('Please fill in all required fields.');
  }

  }
  logout(): void {
    this.loginService.logout()
  }
}


