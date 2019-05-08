import { Component, OnInit, Input } from '@angular/core';
import { ICardInfo } from '@webeleza/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  public clientInfo: ICardInfo;

  constructor() {}

  ngOnInit() {}
}
