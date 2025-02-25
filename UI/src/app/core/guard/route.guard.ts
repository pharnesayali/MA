import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot) {
    const token = sessionStorage.getItem('AccessToken');
    if (token !== null) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
