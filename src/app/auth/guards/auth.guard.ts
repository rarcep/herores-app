import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      return this.authService.verificaAutentificaion()
      .pipe(
        tap( estaAutenticado => {
          if(!estaAutenticado){
            console.log('Bloqueado por el GAuthGuard - CanActivate');
            this.router.navigate(['./auth/login']);
          }
        })
        );
      /* if(localStorage.getItem('id')){
        return true;
      }
    console.log('Bloqueado por el GAuthGuard - CanActivate');
    return false; */
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificaAutentificaion()
      .pipe(
        tap( estaAutenticado => {
          if(!estaAutenticado){
            console.log('Bloqueado por el GAuthGuard - CanLoad');
            this.router.navigate(['./auth/login']);
          }
        })
        );
  }
}
