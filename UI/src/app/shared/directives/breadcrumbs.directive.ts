import { Directive } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Directive({
  selector: '[appBreadcrumbs]'
})
export class BreadcrumbsDirective {
  breadcrumbs;
  label: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {

        const snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];
        const url = snapshot.url;
        const routeData = route.snapshot.data;
        // console.log(routeData);
        this.label = routeData['breadcrumb'];
        // const params = snapshot.root.params;
        // console.log(label);
        // console.log(params);
        // this.breadcrumbs.push({
        //   url,
        //   label,
        //   params
        // });

      });

    return this.label;
  }
}

