import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  debounceTime,
  delay,
  map,
  Observable,
  of,
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
    //const obs$: Observable<string> = of('11', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii');
    const obs$: Observable<string> = sub.asObservable();

    setTimeout(() => {
      sub.next('00');
    }, 100);

    obs$
      .pipe(
        //map((x) => x),
        debounceTime(200)
      )
      .subscribe((x) => console.log(x));

    new Observable((x) => {
      x.next();
    })
      .pipe(delay(200))
      .subscribe(() => sub.next('yy'));

    new Observable((x) => {
      x.next();
    })
      .pipe(delay(200))
      .subscribe(() => sub.next('zz'));

    setTimeout(() => {
      sub.next('aa');
    }, 100);
    setTimeout(() => {
      sub.next('bb');
    }, 100);
    setTimeout(() => {
      sub.next('cc');
    }, 100);
    setTimeout(() => {
      sub.next('dd');
    }, 100);
    setTimeout(() => {
      sub.next('ee');
    }, 100);
    setTimeout(() => {
      sub.next('ff');
    }, 100);
    //obs.subscribe((x) => console.log('second',x)); // OUTPUT => 1,2
    setTimeout(() => {
      sub.next('gg');
    }, 100);
    setTimeout(() => {
      sub.next('hh');
    }, 100);
    //obs.subscribe((x) => console.log('third', x)); // OUTPUT => 2,3,4 (log of last 3 values from new subscriber)
    setTimeout(() => {
      sub.next('ii');
    }, 100);
  }
}

bootstrapApplication(App);
