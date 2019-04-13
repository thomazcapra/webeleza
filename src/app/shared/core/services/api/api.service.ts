import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';

import { mergeMap, map } from 'rxjs/operators';

export interface IGeoPoint {
  latitude: number;
  longitude: number;
}

export interface ICardInfo {
  name: string;
  description: string;
  birthDate: Date;
  photo: string;
  mainPhoto: string;
  phone: string;
  address: IGeoPoint;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data: ICardInfo[];

  constructor(public db: AngularFirestore,
    private notificationService: NotificationService,
    private userService: UserService) {
    this._getDataFromServer();
  }

  private _getDataFromServer(): void {
    this.db.collection('items')
      .valueChanges()
      .subscribe((data: ICardInfo[]) => {
        this.data = data;
      });
  }

  get items(): ICardInfo[] {
    return this.data;
  }

  updateData(payload: ICardInfo): void {

    if (this.userService.authenticated) {
      this.db.collection('items')
        .doc(this.userService.currentUser.email)
        .set({
          ...payload,
          birthDate: payload.birthDate && payload.birthDate.getTime()
        })
        .then(() => {
          this.notificationService.showSucess('Dados Atualizados com Sucesso!');
        })
        .catch((error) => {
          this.notificationService.showError('Erro ao atualizar informações');
          console.dir(error);
        });
    }
  }

  getUserData(): Promise<ICardInfo> {
    if (this.userService.authenticated) {
      try {
        return this.db.collection('items')
          .doc(this.userService.currentUser.email)
          .get()
          .pipe(
            map((snap) => <ICardInfo>snap.data())
          ).toPromise();
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(null);
  }
}
