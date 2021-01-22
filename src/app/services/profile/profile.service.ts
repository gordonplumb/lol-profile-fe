import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getProfile(name: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('name', name);
    return this.http.get(this.baseUrl + '/account', { params });
  }

  updateProfile(name: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('name', name);
    return this.http.get(this.baseUrl + '/updateAccount', { params });
  }

  getMatches(accountId: string, page: number, size: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('accountId', accountId);
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    return this.http.get(this.baseUrl + '/matches', { params });
  }

  getStats(accountId: string, champion: number, queues: number[], roles: string[]): Observable<any> {
    let params = new HttpParams();
    params = params.append('accountId', accountId);
    params = params.append('champion', champion.toString());
    params = params.append('queues', queues.toString());
    params = params.append('roles', roles.toString());
    return this.http.get(this.baseUrl + '/stats', { params });
  }
}
