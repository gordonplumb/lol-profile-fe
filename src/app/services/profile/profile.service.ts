import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(name: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('name', name);
    return this.http.get('http://localhost:8080/riot/account', { params });
  }
}
