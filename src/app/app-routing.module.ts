import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
    },
    {
        path: 'card-info',
        loadChildren: './card-info/card-info.module#CardInfoModule',
    },
    {
        path: '**',
        redirectTo: '',
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
