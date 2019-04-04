import { Component } from '@angular/core';
import { ApiService, ICardInfo } from './shared/core/services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchedValue: string;
  data: ICardInfo[];
  constructor(private apiService: ApiService) {
    this.data = this.apiService.data;
  }

  public search(): void {
    console.log(this.searchedValue);
  }
}
