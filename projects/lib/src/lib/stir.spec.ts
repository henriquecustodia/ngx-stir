import { fakeAsync } from '@angular/core/testing';
import { Observable, Subject } from 'rxjs';
import { Stir } from './stir';

class TestState { }

describe('Stir', () => {

  let stir: Stir<TestState>;

  beforeEach(() => {
    stir = new Stir();
  });

  describe('initial state', () => {
    it('should set an initial state', () => {
      stir = new Stir(new TestState);
      expect(stir.state).toBeInstanceOf(TestState);
    });
  });

  describe('state property', () => {
    it('should be equal null', () => {
      expect(stir.state).toEqual(null);
    });
  });
  
  describe('changes property', () => {
    it('should be defined', () => {
      expect(stir.changes).toBeTruthy();
    });

    it('should return an observable', () => {
      expect(stir.changes).toBeInstanceOf(Observable);
    });
  });

  describe('stateChanged property', () => {
    it('should be defined', () => {
      expect(stir['stateChanged']).toBeInstanceOf(Subject);
    });
  });

  describe('setState method', () => {
    it('should be defined', () => {
      expect(stir.setState).toBeTruthy();
    });

    it('should set a TestState instance in state property', () => {
      const value = new TestState();

      stir.setState(value);

      expect(stir.state).toEqual(value);
    });

    it('should emit onChange event when called', fakeAsync(() => {
      const value = new TestState();
      const onChangeFn = jasmine.createSpy('onChange');

      stir.changes.subscribe(onChangeFn);

      stir.setState(value);

      expect(onChangeFn).toHaveBeenCalledOnceWith(value);
    }));

  });

});
