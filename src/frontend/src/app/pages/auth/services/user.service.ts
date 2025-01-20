import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, shareReplay, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);

    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

    constructor(
        private readonly http: HttpClient,
        private readonly jwtService: JwtService,
        private readonly router: Router
    ) {}

    login(credentials: { email: string; password: string }): Observable<{ name: string; email: string; token: string }> {
        return this.http.post<{ name: string; email: string; token: string }>('/login', { ...credentials }).pipe(tap(({ name, email, token }) => this.setAuth({ name, email }, token)));
    }

    register(credentials: { name: string; email: string; password: string; password_confirmation: string }): Observable<{ user: { name: string; email: string } }> {
        return this.http.post<{ user: { name: string; email: string } }>('/register', { ...credentials }).pipe(tap(({ user }) => this.router.navigate(['/login'])));
    }

    logout(): void {
        this.unsetAuth();
        this.router.navigate(['/login']);
    }

    checkAndRedirect(redirectTo: string, forGuest: boolean): Observable<boolean> {
        return this.isAuthenticated.pipe(
            map((isAuth) => {
                if ((forGuest && isAuth) || (! forGuest && ! isAuth)) {
                    this.router.navigate([redirectTo]);
                }

                const x = forGuest ? !isAuth : isAuth
                return x;
            })
        );
    }

    getCurrentUser(): Observable<{ user: User }> {
        return this.http.get<{ user: User }>('/user').pipe(
            tap({
                next: ({ user }) => this.setAuth(user, this.jwtService.getToken()),
                error: () => this.unsetAuth()
            }),
            shareReplay(1)
        );
    }

    setAuth(user: User, token: string): void {
        this.jwtService.putToken(token);
        this.currentUserSubject.next(user);
    }

    unsetAuth(): void {
        this.jwtService.removeToken();
        this.currentUserSubject.next(null);
    }
}

interface User {
    email: string;
    name: string;
}
