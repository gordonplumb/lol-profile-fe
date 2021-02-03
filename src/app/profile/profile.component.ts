import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, skip } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ProfileService } from '../services/profile/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any;
  iconUrl: string;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private snackBar: MatSnackBar) {}

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
    this.loading = true;
    this.profileService.updateProfile(this.profile.name).pipe(
      finalize(() => this.loading = false)
    ).subscribe(
      res => this.openSnackBar(this.profile.name + ' updated. Reload to see new matches', 'Dismiss'),
      err => {
        if (err.status === 404) {
          if (err.error.message.includes('Get Matches')) {
            this.openSnackBar('No new matches found', 'Dismiss');
          } else if (err.error.message.includes('Get Account')) {
            this.openSnackBar('Account not found', 'Dismiss');
          }
        } else if (err.status === 503) {
          this.openSnackBar('Update unavailable, please try again later', 'Dismiss');
        }
      }
    );
  }

  loadProfile(profile: any): void {
    this.profile = profile;
    this.iconUrl = environment.assetBaseUrl + environment.version + '/img/profileicon/' + this.profile.profileIconId + '.png';
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, { duration: 5000 });
  }
}
