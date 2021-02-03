import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<boolean> {
  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const name = route.paramMap.get('name');
    return this.profileService.getProfile(name);
  }
}
