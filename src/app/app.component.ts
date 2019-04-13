import { Component, HostBinding } from '@angular/core';
import { ApiService, ICardInfo } from './shared/core/services/api/api.service';
import { UserService } from './shared/core/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchedValue: string;
  get data(): ICardInfo[] {
    return this.apiService.items;
  }

  @HostBinding('class.loading') get loadingClass(): boolean {
    return this.loading();
  }

  constructor(private apiService: ApiService,
    private userService: UserService) {
  }

  search(): void {
    console.log(this.searchedValue);
  }

  isAnyUser(): boolean {
    return this.userService.authenticated;
  }

  userName(): string | null {
    return this.userService.currentUser && this.userService.currentUser.displayName;
  }

  loading(): boolean {
    return this.userService.loading;
  }
}
