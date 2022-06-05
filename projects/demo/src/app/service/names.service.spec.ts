import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NamesService } from './names.service';

describe('NamesService', () => {
  let service: NamesService;
  let mockedHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockedHttpClient }
      ]
    });
    service = TestBed.inject(NamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getNames method', () => {
    it('should be defined', () => {
      expect(service.getNames).toBeTruthy();
    });

    it('should return a promise', () => {
      mockedHttpClient.get.and.returnValue(of(null));
      expect(service.getNames()).toBeInstanceOf(Promise);
    });

    it('should return a resolved promise with array of string', fakeAsync(async () => {
      const mockedNames = ['John', 'Jack'];

      mockedHttpClient.get.and.returnValue(of(mockedNames));

      const names = await service.getNames();

      expect(names).toBeInstanceOf(Array);
      expect(names.length).toEqual(mockedNames.length);
    }));

  })

});
