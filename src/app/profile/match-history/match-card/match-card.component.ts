import { Component, Input, OnInit } from '@angular/core';
import { GameDataService } from 'src/app/services/game-data/game-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {

  @Input()
  matchData: any;

  championName: string;
  championIconUrl: string;
  matchDate: string;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    const championDetails = this.gameDataService.getChampionDetails(this.matchData.champion);
    this.championIconUrl = environment.assetBaseUrl + environment.version + '/img/champion/' + championDetails.id + '.png';
    this.championName = championDetails.name;
    const date = new Date(this.matchData.timestamp);
    this.matchDate = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
  }
}
