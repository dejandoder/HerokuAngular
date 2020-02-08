import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isUserLogged()) {
      this.router.navigate(['/registrovan']);
    }
    return !this.authService.isUserLogged();
  }
}
