import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: '**', component: LoginComponent}
];
