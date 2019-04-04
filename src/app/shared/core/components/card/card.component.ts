import { Component, OnInit, Input } from '@angular/core';
import { ICardInfo } from '../../services/api/api.service';

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
