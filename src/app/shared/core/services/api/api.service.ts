import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user/user.service';

export interface IGeoPoint {
  latitude: number;
  longitude: number;
}

export interface ICardInfo {
  name: string;
  description: string;
  age: number;
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

  constructor(public db: AngularFirestore, private userService: UserService) {
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
      const docRef = this.db.collection('items').doc(this.userService.currentUser.email);

      docRef.update(payload)
        .then(() => {
          console.log('Updated');
        }).catch((error) => {
          docRef.set(payload);
          console.log('Could not update, so, it was added');
        });
    } else {
      console.log('You need to be conected');
    }
  }
}
