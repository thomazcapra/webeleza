import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CONSTANTS } from '@webeleza/constants';
import { ICardInfo } from '@webeleza/models';
import * as firebase from 'firebase/app';
import 'firebase/storage'; // <----
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';


export interface IGeoPoint {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _uploadTask: firebase.storage.UploadTask;
  private _uploadProgress = 0;
  private _loading: boolean;

  constructor(public db: AngularFirestore,
    private notificationService: NotificationService,
    private userService: UserService) {
  }

  public cards$(): Observable<ICardInfo[]> {
    return this.db.collection(CONSTANTS.COLLECTION)
      .valueChanges()
      .pipe(
        map((data) => <ICardInfo[]>data)
      );
  }

  updateData(payload: ICardInfo, newImage?: File): void {
    if (this.userService.authenticated) {
      if (newImage) {
        this.uploadImage(payload, newImage);
      } else {
        this.uploadForm(payload);
      }
    }
  }

  private uploadForm(payload: ICardInfo): void {
    this.db.collection(CONSTANTS.COLLECTION)
      .doc(this.userService.currentUser.email)
      .update(payload)
      .then(() => {
        this._loading = false;
        this.notificationService.showSucess('Dados Atualizados com Sucesso!');
      })
      .catch((error) => {
        this.db.collection(CONSTANTS.COLLECTION)
          .doc(this.userService.currentUser.email)
          .set(payload)
          .then(() => {
            this._loading = false;
            this.notificationService.showSucess('Dados Atualizados com Sucesso!');
          }).catch((e) => {
            this.notificationService.showError('Erro ao atualizar informações');
          });
      });
  }

  private uploadImage(payload: ICardInfo, file: File): void {
    const storageRef = firebase.storage().ref();

    storageRef.child(`${CONSTANTS.BASE_DATABASE}/${this.userService.currentUser.email}`).put(file);

    this._uploadTask = storageRef
      .child(`${CONSTANTS.BASE_DATABASE}/${this.userService.currentUser.email}`)
      .put(file);

    this._loading = true;
    this._uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => {
        this._uploadProgress = (snapshot.bytesTransferred / snapshot.bytesTransferred) * 100;
      },
      (error) => {
        this._loading = false;
        this.notificationService.showError('Erro ao alterar imagem');
      },
      // After uploaded success
      () => {
        this._uploadTask.snapshot.ref.getDownloadURL()
          .then((url) => {
            this.uploadForm(
              {
                ...payload,
                mainPhotoUrl: url
              }
            );
          });
      });

  }

  get uploadProgress(): number {
    return this._uploadProgress;
  }

  get loading(): boolean {
    return this._loading;
  }
}
