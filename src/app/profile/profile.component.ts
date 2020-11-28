import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any;
  name: string;
  level: number;
  iconId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.getProfile(params.name);
    // });
    this.profile = this.route.snapshot.data.profileResolver;
    console.log(this.profile);
  }

  // getProfile(name: string): void {
  //   this.profileService.getProfile(name).subscribe(profile => {
  //     this.name = profile.name;
  //     this.level = profile.summonerLevel;
  //     this.iconId = profile.profileIconId;
  //     console.log(profile);
  //   });
  // }

}
