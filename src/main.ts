import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  BehaviorSubject,
  debounceTime,
  delay,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular
    </a>
  `,
})
export class App implements OnInit {
  name = 'Angular';

  constructor() {}

  ngOnInit() {
    const sub = new Subject<string>();
    //const sub = new BehaviorSubject('initial');
    //const sub = new ReplaySubject<string>(1);

    //const obs$: Observable<string> = of('11', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff');
    const obs$: Observable<string> = sub.asObservable();

    setTimeout(() => {
      sub.next('00');
    }, 100); // test before subscribe

    obs$
      .pipe(
        map((x) => x),
        debounceTime(200) //comment out
      )
      .subscribe((x) => console.log(x));

    // test after subscribe
    setTimeout(() => {
      sub.next('aa');
    }, 2000);
    setTimeout(() => {
      sub.next('bb');
    }, 4000);
    setTimeout(() => {
      sub.next('cc');
    }, 6000);
    setTimeout(() => {
      sub.next('dd');
    }, 8000);
    setTimeout(() => {
      sub.next('ee');
    }, 10000);
    setTimeout(() => {
      sub.next('ff');
    }, 12000);
  }
}

bootstrapApplication(App);
