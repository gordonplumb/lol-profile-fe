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
    const params = new HttpParams().append('name', name);
    return this.http.get(this.baseUrl + '/account', { params });
  }

  updateProfile(name: string): Observable<any> {
    return this.http.post(this.baseUrl + '/updateAccount', name);
  }

  getMatches(accountId: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .append('accountId', accountId)
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get(this.baseUrl + '/matches', { params });
  }

  getStats(accountId: string, champion: number, queues: number[], roles: string[]): Observable<any> {
    const params = new HttpParams()
      .append('accountId', accountId)
      .append('champion', champion.toString())
      .append('queues', queues.toString())
      .append('roles', roles.toString());
    return this.http.get(this.baseUrl + '/stats', { params });
  }
}
