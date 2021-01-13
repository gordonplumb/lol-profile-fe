import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile/profile.service';

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
    this.profile = this.route.snapshot.data.profileResolver;
    this.iconUrl = environment.assetBaseUrl + environment.version + '/img/profileicon/' + this.profile.profileIconId + '.png';
    console.log(this.profile);
  }

  onClick(): void {
    this.profileService.updateProfile(this.profile.name).subscribe(() => {
      window.location.reload();
    });
  }
}
