import { Component, Input, OnInit } from '@angular/core';
import { MatchShortDetails } from 'src/app/common/model';
import { GameDataService } from 'src/app/services/game-data/game-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {

  @Input()
  matchData: MatchShortDetails;

  championName: string;
  championIconUrl: string;
  spell1IconUrl: string;
  spell2IconUrl: string;
  keystoneIconUrl: string;
  matchDate: string;
  itemUrls: string[];
  noItems: number[];
  gameDuration: string;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    const championDetails = this.gameDataService.getChampionDetails(this.matchData.champion);
    const spell1Name = this.gameDataService.getSummonerSpellName(this.matchData.spell1Id);
    const spell2Name = this.gameDataService.getSummonerSpellName(this.matchData.spell2Id);
    const versionParts = this.matchData.gameVersion.split('.');
    const version = versionParts[0] + '.' + versionParts[1] + '.1';
    this.championIconUrl = environment.assetBaseUrl + version + '/img/champion/' + championDetails.id + '.png';
    this.spell1IconUrl = environment.assetBaseUrl + version + '/img/spell/' + spell1Name + '.png';
    this.spell2IconUrl = environment.assetBaseUrl + version + '/img/spell/' + spell2Name + '.png';
    this.championName = championDetails.name;
    const date = new Date(this.matchData.timestamp);
    this.matchDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

    const minutes = Math.floor(this.matchData.gameDuration / 60);
    const seconds = this.matchData.gameDuration % 60;
    this.gameDuration = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);

    this.itemUrls = [];
    this.noItems = [];
    const itemBaseUrl = environment.assetBaseUrl + version + '/img/item/';
    for (let i = 0; i < 7; i++) {
      if (this.matchData['item' + i] !== 0) {
        this.itemUrls.push(itemBaseUrl + this.matchData['item' + i] + '.png');
      } else {
        this.noItems.push(i);
      }
    }
  }
}
