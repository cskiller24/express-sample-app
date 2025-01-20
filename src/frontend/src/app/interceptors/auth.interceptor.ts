import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { JwtService } from '../pages/auth/services/jwt.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(JwtService).getToken();

    return next(
        req.clone({
            setHeaders: {
                ...(token ? { Authorization: `Token ${token}` } : {})
            }
        })
    );
};
