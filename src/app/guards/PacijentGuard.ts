import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../service/AuthService';

@Injectable({
  providedIn: 'root'
})
export class PacijentGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (!this.authService.isUserLogged()) {
      this.router.navigate(['/login']);
    }
    
    return this.authService.isUserLogged();
  }
}