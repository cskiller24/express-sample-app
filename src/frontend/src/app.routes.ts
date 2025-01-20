import { Router, Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { Balance } from './app/pages/balance/balance';
import { inject } from '@angular/core';
import { UserService } from './app/pages/auth/services/user.service';
import { map, tap } from 'rxjs';

// TODO SUBJECT FOR CHANGE

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [{ path: '', component: Balance }],
        canActivateChild: [() => inject(UserService).checkAndRedirect('/auth/login', false)]
    },
    { path: '404', component: Notfound },
    {
        path: 'auth',
        loadChildren: () => import('./app/pages/auth/auth.routes'),
        canActivate: [() => inject(UserService).checkAndRedirect('/', true)]

    },
    { path: '**', redirectTo: '/404' }
];
