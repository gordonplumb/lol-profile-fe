import { Injectable } from '@angular/core';
import { ChampionDetails, GlobalConstants } from '../../common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  champions = GlobalConstants.champions;
  spells = GlobalConstants.spells;

  constructor() { }

  getChampionDetails(key: number): ChampionDetails {
    return this.champions.get(key);
  }

  getChampionsAsArray(): Array<[number, ChampionDetails]> {
    const championArray = new Array();
    for (const iterator of this.champions.entries()) {
      championArray.push(iterator);
    }

    return championArray;
  }

  getSummonerSpellName(key: number): string {
    return this.spells.get(key);
  }
}
