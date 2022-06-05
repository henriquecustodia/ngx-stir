import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let el: HTMLElement;
  let componentInstance: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have a container element`, () => {
    expect(el.querySelector('div.container')).toBeTruthy();
  });

  it(`should have a element with the title 'Stir Demo'`, () => {
    expect(el.querySelector('h3')?.textContent).toEqual('Stir Demo');
  });

  it(`should have a container to components`, () => {
    expect(el.querySelector('div.row')).toBeTruthy();
  });

  it(`should have an app-form in template`, () => {
    expect(el.querySelector('app-form')).toBeTruthy();
  });

  it(`app-form should have a col class`, () => {
    expect(el.querySelector('app-form.col')).toBeTruthy();
  });

  it(`should have an app-list in template`, () => {
    expect(el.querySelector('app-list')).toBeTruthy();
  });

  it(`app-list should have a col class`, () => {
    expect(el.querySelector('app-list.col')).toBeTruthy();
  });
});
