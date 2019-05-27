import { Component, OnInit, HostBinding } from '@angular/core';
import { ICardInfo } from '@webeleza/models';

import { ApiService, UserService } from '@webeleza/services';
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    searchedValue: string;
    @HostBinding('class.loading') get loadingClass(): boolean {
        return this.loading();
    }

    private get data() {
        return this.apiService.cards;
    }

    get filteredCards(): ICardInfo[] {
        if (!this.searchedValue) {
            return this.data;
        }

        const search = this.searchedValue.toLowerCase();

        return this.data && this.data.filter(({ clientName, description }) => {
            return clientName && clientName.toLowerCase().includes(search)
                || description && description.toLowerCase().includes(search);
        });
    }

    search(): void {
        console.log(this.searchedValue);
    }

    constructor(private apiService: ApiService, private userService: UserService) { }

    ngOnInit() {
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
