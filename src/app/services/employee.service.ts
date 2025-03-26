import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient){
  
  }
  private getToken(): string|null {
    return localStorage.getItem('token');
  }
  URL = 'http://127.0.0.1:8000/api/employee/requests/'
  getData(): Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.get(this.URL, {headers})
  }

  delete_request(request_id:number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.delete(`http://127.0.0.1:8000/api/employee/requests/${request_id}/action/`,{headers})
  }

  getLoggedInEmployeeDetails(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.get('http://127.0.0.1:8000/employee/me/',{headers}); 
  }

  submitTravelRequest(data:any): Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);

    return this.http.post<any>(`http://127.0.0.1:8000/api/employee/requests/new/`,data,{headers})
  }

  getTravelRequest(request_id:number):Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/employee/requests/${request_id}/view/`,{headers})
  }

  updateTravelRequest(request_id:number,value:any):Observable<any>{
    const token = this.getToken();
    if (!token) {
      console.error("No token found in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization',`Token ${token}`);
    return this.http.patch(`http://127.0.0.1:8000/api/employee/requests/${request_id}/edit/`, value, {headers});
  }

}
