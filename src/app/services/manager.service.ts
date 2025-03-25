import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { }

  private getToken(): string|null {
    return localStorage.getItem('token');
  }

  URL = 'http://127.0.0.1:8000/api/manager/requests/'
  getData(): Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    
    return this.http.get(this.URL, {headers});
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

  getTravelRequest(request_id:number):Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/manager/requests/${request_id}/`,{headers})
  }

  takeAction(request_id:number, action:string, note:string): Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);

    const actionBody = {
      action: action,
      note: note
    };

    return this.http.post(`http://127.0.0.1:8000/api/manager/requests/${request_id}/action/`, actionBody, {headers})
  }

  
  
}
