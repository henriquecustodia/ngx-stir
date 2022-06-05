import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NamesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getNames() {
    return lastValueFrom(this.httpClient.get<string[]>('/get-names'));
  }
}
