import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const authData = authService.getAuthData();
  

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authData?.token}`
    }
  });

  return next(cloneReq);
};
