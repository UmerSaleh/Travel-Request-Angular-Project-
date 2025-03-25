import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
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

      constructor(private adminService:AdminService, private route:ActivatedRoute, private loginService:LoginService){}
      
      ngOnInit(): void{
        this.route.paramMap.subscribe(params =>{
          const id = params.get('id')
          if(id){
            this.requestId = +id;
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
      loadTravelRequest(request_id: number) {
        this.adminService.getTravelRequest(request_id).subscribe(  //need to pass req id here.
          (content:any) => {
            if(content){
              this.requestId = content.id;
              this.status = content.status_of_request;
              this.travelRequestForm.disable()
              if(content.resubmission_request == 1 && content.is_resubmitted == 1){
                this.resubmission = true;
              }else if(content.resubmission_request == 1 && content.is_resubmitted == 0){
                this.resubmission = false;
              }
              this.managerName = content.manager.user.username
              this.travelRequestForm.patchValue({...content,lodging: content.lodging === 1 ? "true" : "false", manager: content.manager.user.username, name: content.employee.user.username })
            }
          },
          (error:any)=> {
            console.error('Error fetching travel request:', error);
          }
        );
      }

    
      takeClose(note: string): void {      
        this.adminService.takeClose(this.requestId, note).subscribe({
          next: (response) => {
            console.log("Action successful:", response);
            alert("Action successful!");
            this.loadTravelRequest(this.requestId);
          },
          error: (error) => {
            console.error("Action failed! Error details:", error);
            alert(`Action failed! ${error.message || 'Unknown error'}`);
          }
        });
      }
  
      logout(): void{
        this.loginService.logout()
      }
    }