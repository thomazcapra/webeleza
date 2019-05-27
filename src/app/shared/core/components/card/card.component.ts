import { Component, OnInit, Input } from '@angular/core';
import { ICardInfo } from '@webeleza/models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input()
    public clientInfo: ICardInfo;

    constructor(private router: Router) { }

    ngOnInit() { }

    public handleShareClick() {
        this.router.navigate(['/card-info']);
    }

}
