import { Injectable } from '@angular/core';
import { ChampionDetails, GlobalConstants } from '../../common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  champions = GlobalConstants.champions;
  spells = GlobalConstants.spells;

  constructor() { }

  getChampionDetails(key: number): ChampionDetails{
    return this.champions[key];
  }

  getSummonerSpellName(key: number): string {
    return this.spells[key];
  }
}
