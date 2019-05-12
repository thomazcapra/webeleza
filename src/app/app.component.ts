import { Component, HostBinding } from '@angular/core';
import { UserService } from './shared/core/services/user/user.service';
import { ICardInfo } from '@webeleza/models';
import { ApiService } from '@webeleza/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchedValue: string;
  data$ = this.apiService.cards$();

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
    return this.userService.loading || this.apiService.loading;
  }
}
