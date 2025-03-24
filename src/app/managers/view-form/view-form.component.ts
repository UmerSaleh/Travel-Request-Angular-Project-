import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrl: './view-form.component.css'
})
export class ViewFormComponent {
    travelRequestForm!: FormGroup;
    data: any;
    employeeName: string | undefined;
    managerName:string | undefined;
    requestId: number | any;
    status: string | undefined;
    resubmission: boolean | undefined;
    action: string | undefined;
  
    constructor(private managerService:ManagerService, private route:ActivatedRoute, private loginService:LoginService){}

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
      this.managerService.getTravelRequest(request_id).subscribe(  //need to pass req id here.
        (content:any) => {
          if(content){
            this.requestId = content.id;
            if(content.resubmission_request == 1 && content.is_resubmitted == 1){
              this.resubmission = true;
            }else if(content.resubmission_request == 1 && content.is_resubmitted == 0){
              this.resubmission = false;
            }
            this.status = content.status_of_request;
            this.travelRequestForm.disable()
            this.managerName = content.manager.user.username
            this.travelRequestForm.patchValue({...content,lodging: content.lodging === 1 ? "true" : "false", manager: content.manager.user.username, name: content.employee.user.username })
          }
        },
        (error:any)=> {
          console.error('Error fetching travel request:', error);
        }
      );
    }

    beforeAction(action:string):void{
      this.action = action;
    }
  
    takeAction(note: string): void {
      console.log("Attempting action:", this.action, "on request ID:", this.requestId, "with note:", note);
    
      if (!this.requestId || !this.action) {
        console.error("Missing request_id or action.");
        return;
      }
    
      this.managerService.takeAction(this.requestId, this.action, note).subscribe({
        next: (response) => {
          console.log("Action successful:", response);
          this.loadTravelRequest(this.requestId);
        },
        error: (error) => {
          console.error("Action failed! Error details:", error);

        }
      });
    }

    logout(): void{
      this.loginService.logout()
    }
    
}


