import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any;
  iconUrl: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.profile = this.route.snapshot.data.profileResolver;
    this.iconUrl = environment.assetBaseUrl + environment.version + '/img/profileicon/' + this.profile.profileIconId + '.png';
    console.log(this.profile);
  }
}
