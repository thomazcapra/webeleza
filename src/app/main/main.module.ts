import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    }
];

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class MainModule { }
