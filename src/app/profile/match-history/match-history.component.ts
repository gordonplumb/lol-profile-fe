import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatchShortDetails } from 'src/app/common/model';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss']
})
export class MatchHistoryComponent implements OnInit {
  pageEvent: PageEvent;
  length = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50, 100];
  data: MatchShortDetails[];
  count = 0;

  private _accountId: string;

  @Input()
  set accountId(value: string) {
    this._accountId = value;
    this.profileService.getMatches(this._accountId, 0, 10).subscribe((result) => {
      this.data = result.content;
      this.length = result.totalElements;
    });
  }
  get accountId(): string {
    return this._accountId;
  }

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    const pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = this.pageSize;
    this.getData(pageEvent);
  }

  getData(event: PageEvent): PageEvent {
    this.profileService.getMatches(this.accountId, event.pageIndex, event.pageSize).subscribe((result) => {
      this.data = result.content;
      this.length = result.totalElements;
    });

    return event;
  }
}
