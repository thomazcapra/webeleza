import { NgModule } from '@angular/core';
import { CardInfoComponent } from './card-info.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: CardInfoComponent
    }
];

@NgModule({
    declarations: [CardInfoComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class CardInfoModule { }
