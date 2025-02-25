import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET
} from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  breadcrumbs;
  label: any;
  currentUrl: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        const snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];
        const url = snapshot.url;
        this.currentUrl = url;
        const routeData = route.snapshot.data;
        this.label = routeData['breadcrumb'];
      });

    return this.label;
  }
}
