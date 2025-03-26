import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  request_data: any
  manager_name: string | undefined;
  selectedRequestId: number | undefined;
  action: string | undefined;

  searchName = new FormControl('');
  statusFilter = new FormControl('');
  sortBy = new FormControl('');
  startDate = new FormControl('');
  endDate = new FormControl('');  

  constructor(private managerService: ManagerService, private router:Router, private loginService:LoginService){}

  ngOnInit(): void {


    
    this.managerService.getData().subscribe({
      next: (data) => {
        this.request_data = data;
        this.manager_name = this.request_data[0]?.manager?.user?.username ?? 'Manager';

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

    this.managerService.processRequests(params).subscribe(
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


  view(request_id:number):void {
      this.router.navigate([`managers/view-form/`, request_id]);
    }

  beforeAction(request_id:number, action:string):void{
    this.selectedRequestId = request_id;
    this.action = action;
  }

  takeAction(note: string): void {
    console.log("Attempting action:", this.action, "on request ID:", this.selectedRequestId, "with note:", note);
  
    if (!this.selectedRequestId || !this.action) {
      console.error("Missing request_id or action.");
  
      return;
    }
  
    this.managerService.takeAction(this.selectedRequestId, this.action, note).subscribe({
      next: (response) => {
        console.log("Action successful:", response);
        this.processRequests();
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

    

    
    
    