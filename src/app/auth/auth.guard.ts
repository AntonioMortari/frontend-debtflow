import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const stringAuthData = localStorage.getItem('@auth');

  if(!stringAuthData){
    router.navigate(['/']);
    return false; 
  }

  return true

};
