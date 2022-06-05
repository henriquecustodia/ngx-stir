import { Injectable } from '@angular/core';
import { Stir } from 'projects/lib/src/public-api';
import { NamesService } from '../service/names.service';

@Injectable({
  providedIn: 'root'
})
export class NamesStoreService extends Stir<Array<string>>{

  constructor(
    private namesService: NamesService
  ) { 
    super([]);
  }

  async init() {
    const names = await this.namesService.getNames();
    this.setState(names);
  }

  add(name: string) {
    this.setState([...this.state, name]);
  }

  remove(name: string) {
    const newState = this.state.filter(item => item != name);
    this.setState(newState);
  }
  
}
