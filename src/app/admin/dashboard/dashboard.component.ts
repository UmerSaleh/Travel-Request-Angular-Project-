import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    request_data: any;
    selectedRequestId: number | any;

    searchName = new FormControl('');
    statusFilter = new FormControl('');
    sortBy = new FormControl('');
    startDate = new FormControl('');
    endDate = new FormControl('');     
    action: string | any;
  
    constructor(private adminService: AdminService, private router:Router, private loginService:LoginService){}
  
    ngOnInit(): void {
      this.adminService.getData().subscribe({
        next: (data) => {
          this.request_data = data; 
          console.log(this.request_data)
        },
        error: (error) => {
          console.error('Error fetching data', error);  // Log error message
        },
        complete: () => {
          console.log('Data fetch complete');  // Optional: log when the request completes
        }
      });
    }

    onEnter(event: any): void {
      event.preventDefault();  // Prevent form submission (page refresh)
      this.processRequests();   // Trigger search logic
    }

    processRequests():void{
      const params = {
        search_name: this.searchName.value,
        status: this.statusFilter.value,
        sort_by: this.sortBy.value,
        start_date: this.startDate.value,
        end_date: this.endDate.value,
      };

      this.adminService.processRequests(params).subscribe(
        (data: any)=> { if (Array.isArray(data) && data.length === 0) {
          console.log('No requests found.');
          this.request_data = [];  // Handle empty response
        } else {
          this.request_data = data;  // Normal case, data is returned
        }},
        (error: any) => console.error('Error fetching requests', error)
    );
    }
    applyDateFilter() {
      this.processRequests();
    }
    selectFilter(status: string) {
      this.statusFilter.setValue(status);
      this.processRequests();
    }
  
    selectSort(sortOption: string) {
      this.sortBy.setValue(sortOption);
      this.processRequests();
    }

    beforeClose(request_id:number):void{
      this.selectedRequestId = request_id;
    }
  
    takeClose(note: string): void {
      this.adminService.takeClose(this.selectedRequestId, note).subscribe({
        next: (response) => {
          console.log("Action successful:", response);
          this.processRequests();
        },
        error: (error) => {
          console.error("Action failed! Error details:", error);
        }
      });
    }


    view(request_id:number):void {
        this.router.navigate([`admin/view-form/`, request_id]);
    }
    logout(): void{
      this.loginService.logout()
    }
  }


