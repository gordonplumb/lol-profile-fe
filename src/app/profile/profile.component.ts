import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile/profile.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any;
  iconUrl: string;

  constructor(private route: ActivatedRoute, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.route.params.pipe(skip(1)).subscribe(params => {
      this.profileService.getProfile(params.name).subscribe(profile => {
        this.loadProfile(profile);
        window.location.reload();
      });
    });
    this.loadProfile(this.route.snapshot.data.profileResolver);
  }

  onClick(): void {
    this.profileService.updateProfile(this.profile.name).subscribe(() => {
      window.location.reload();
    });
  }

  loadProfile(profile: any): void {
    this.profile = profile;
    this.iconUrl = environment.assetBaseUrl + environment.version + '/img/profileicon/' + this.profile.profileIconId + '.png';
    console.log(this.profile);
  }
}
