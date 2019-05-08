import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';  // <----

import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';
import { ICardInfo } from '@webeleza/models';
import { CONSTANTS } from '@webeleza/constants';

export interface IGeoPoint {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data: ICardInfo[];
  private uploadTask: firebase.storage.UploadTask;
  private _uploadProgress = 0;
  private _loading: boolean;

  constructor(public db: AngularFirestore,
    private notificationService: NotificationService,
    private userService: UserService) {
    this._getDataFromServer();
  }

  private _getDataFromServer(): void {
    this.db.collection(CONSTANTS.COLLECTION)
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
      this.db.collection(CONSTANTS.COLLECTION)
        .doc(this.userService.currentUser.email)
        .update(payload)
        .then(() => {
          this.notificationService.showSucess('Dados Atualizados com Sucesso!');
        })
        .catch((error) => {
          this.notificationService.showError('Erro ao atualizar informações');
          console.dir(error);
        });
    }
  }

  uploadImage(file: File): Promise<string> {
    const storageRef = firebase.storage().ref();

    storageRef.child(`${CONSTANTS.BASE_DATABASE}/${this.userService.currentUser.email}`).put(file);

    this.uploadTask = storageRef
      .child(`${CONSTANTS.BASE_DATABASE}/${this.userService.currentUser.email}`)
      .put(file);

    this._loading = true;
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => {
        this._uploadProgress = (snapshot.bytesTransferred / snapshot.bytesTransferred) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
      });

    return this.uploadTask.snapshot.ref.getDownloadURL()
      .then((url) => {
        this._loading = false;
        return url;
      });
  }

  get uploadProgress(): number {
    return this._uploadProgress;
  }

  get loading(): boolean {
    return this._loading;
  }
}
