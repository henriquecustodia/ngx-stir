import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NamesService } from '../service/names.service';

import { NamesStoreService } from './names-store.service';

describe('NamesStoreService', () => {
  let service: NamesStoreService;
  let mockedNamesService: jasmine.SpyObj<NamesService>;
  let initStore: (names: string[]) => void;

  beforeEach(() => {
    mockedNamesService = jasmine.createSpyObj<NamesService>('NamesService', ['getNames']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: NamesService,
          useValue: mockedNamesService
        }
      ]
    });

    service = TestBed.inject(NamesStoreService);

    initStore = (names: string[]) => {
      mockedNamesService.getNames.and.returnValue(Promise.resolve(names));

      service.init();

      tick();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('state should be an array instance', () => {
    expect(service.state).toBeInstanceOf(Array);
  });

  describe('init method', () => {
    it('should be defined', () => {
      expect(service.init).toBeTruthy();
    });

    it('should return a promise', () => {
      expect(service.init()).toBeInstanceOf(Promise);
    });

    it('should set names to state', fakeAsync(() => {
      const mockedNames = ['test1', 'test2'];

      initStore(mockedNames);
      
      expect(service.state).toEqual(mockedNames);
    }));

    it('should add a name to state', fakeAsync(() => {
      const mockedNames = ['John', 'Bro'];

      initStore(mockedNames);

      const addedName = 'Yeh';

      service.add(addedName);

      expect(service.state).toEqual([...mockedNames, addedName]);
    }));

    it('should remove a name from state', fakeAsync(() => {
      const mockedNames = ['John', 'Bro'];

      initStore(mockedNames);

      const removedName = 'Bro';

      service.remove(removedName);

      expect(service.state).toEqual(['John']);
    }));

  });
});
