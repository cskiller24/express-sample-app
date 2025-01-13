import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtService {
    getToken(): string {
        return window.localStorage.getItem('access_token') ?? '';
    }

    putToken(token: string): void {
        window.localStorage.setItem('access_token', token);
    }

    removeToken(): void {
        window.localStorage.removeItem('access_token');
    }
}
