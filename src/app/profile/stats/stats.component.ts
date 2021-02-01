import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChampionDetails } from 'src/app/common/global.constants';
import { GameDataService } from 'src/app/services/game-data/game-data.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input()
  accountId: string;

  filterForm = new FormGroup({
    championControl: new FormControl(),
    queueControl: new FormControl(),
    roleControl: new FormControl()
  });

  filterControl = new FormControl();

  champions: Array<[number, ChampionDetails]>;

  queues: Array<[number, string]> = [
    [400, 'Draft'],
    [420, 'Solo'],
    [430, 'Blind'],
    [440, 'Flex'],
    [700, 'Clash']
  ];
  queueList = [400, 420, 430, 440, 700];

  roles = [
    [0, 'Top'],
    [1, 'Jungle'],
    [2, 'Mid'],
    [3, 'Bot Carry'],
    [4, 'Support']
  ];
  roleList = [0, 1, 2, 3, 4];

  stats: any;
  gameDuration: string;

  // win chart
  winChartView: any[] = [150, 150];
  winChartResults: any[];
  winChartColourScheme = {
    domain: ['green', 'red']
  };

  // multikill chart
  multiKillChartView: any[] = [400, 250];
  multikillChartResults: any[];

  constructor(private gameDataService: GameDataService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.champions = this.gameDataService.getChampionsAsArray();

    this.filterForm.get('championControl').setValue(-1);
    this.filterForm.get('queueControl').setValue(this.queueList);
    this.filterForm.get('roleControl').setValue(this.roleList);
  }

  onSubmit(): void {
    let champion = this.filterForm.get('championControl').value;
    let queues = this.filterForm.get('queueControl').value;
    let roles = this.filterForm.get('roleControl').value;

    if (typeof champion !== 'number') {
      champion = champion[0];
    }

    if (queues.length === 0) {
      queues = this.queueList;
      this.filterForm.get('queueControl').setValue(this.queueList);
    }

    if (roles.length === 0) {
      roles = this.roleList;
      this.filterForm.get('roleControl').setValue(this.roleList);
    }

    this.profileService.getStats(this.accountId, champion, queues, roles).subscribe(result => {
      this.stats = result;
      if (result.gamesPlayed > 0) {
        this.winChartResults = [
          { name: 'Win', value: this.stats.wins },
          { name: 'Loss', value: this.stats.gamesPlayed - this.stats.wins }
        ];
        this.multikillChartResults = [
          { name: 'Double Kill', value: this.stats.doubleKills },
          { name: 'Triple Kill', value: this.stats.tripleKills },
          { name: 'Quadra Kill', value: this.stats.quadraKills },
          { name: 'Penta Kill', value: this.stats.pentaKills }
        ];
        const minutes = Math.floor(result.gameDuration / 60);
        const seconds = result.gameDuration % 60;
        this.gameDuration = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
      }
    });
  }

}
