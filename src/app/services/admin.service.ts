import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  private getToken(): string|null {
    return localStorage.getItem('token');
  }

  URL = 'http://127.0.0.1:8000/api/admin/requests/'

  getData(): Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    
    return this.http.get(this.URL, {headers});
  }
  getTravelRequest(request_id:number):Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/admin/requests/${request_id}/`, {headers})
  }

  getEmployee(employee_id:number):Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/admin/employees/${employee_id}/`,{headers})
  }

  getEmployeeData(): Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.get(`http://127.0.0.1:8000/api/admin/employees/`, {headers})
  }

  processEmployees(filter:any): Observable<any> {
    let params = new HttpParams();
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);

    // Add parameters only if they have values
    if (filter.search_name) params = params.set('search_name', filter.search_name);

    return this.http.get<any>(`http://127.0.0.1:8000/api/admin/employees/`, { headers, params });
  }

  createNewEmployee(data:any): Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.post<any>(`http://127.0.0.1:8000/api/admin/employees/new/`,data, {headers})
  }
  updateEmployee(employee_id:number,value:any):Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.patch(`http://127.0.0.1:8000/api/admin/employees/${employee_id}/`, value, {headers});
  }

  processRequests(filters: any): Observable<any> {
      let params = new HttpParams();
      const token = this.getToken();
      if (!token) {
        console.error("No token found in localStorage");
      }
      const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
  
      // Add parameters only if they have values
      if (filters.search_name) params = params.set('search_name', filters.search_name);
      if (filters.status) params = params.set('status', filters.status);
      if (filters.sort_by) params = params.set('sort_by', filters.sort_by);
      if (filters.start_date) params = params.set('start_date', filters.start_date);
      if (filters.end_date) params = params.set('end_date', filters.end_date);
  
      return this.http.get<any>(this.URL, { headers, params });
    }


  takeClose(request_id:number, note:string): Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);

    const actionBody = {
      action:'close',
      note: note
    };

    return this.http.post(`http://127.0.0.1:8000/api/admin/requests/${request_id}/close/`, actionBody, {headers})
  }

  deleteEmployee(employee_id:number): Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.delete(`http://127.0.0.1:8000/api/admin/employees/${employee_id}/`,{headers})
  }





}
// b84dad4aa0c8f02e592196dde04569a44275e136