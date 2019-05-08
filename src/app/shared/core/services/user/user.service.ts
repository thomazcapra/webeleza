import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CONSTANTS } from '@webeleza/constants';
import { ICardInfo, IUser } from '@webeleza/models';
import * as firebase from 'firebase/app';
import 'firebase/storage'; // <----
import { filter, map } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  provider: firebase.auth.GoogleAuthProvider;
  authState: firebase.User;
  user: IUser;
  // private _cardInfo: ICardInfo;

  private _loading: boolean;

  constructor(private af: AngularFireAuth, public db: AngularFirestore, private notificationService: NotificationService) {
    this.provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    this._loading = true;

    this.af.authState.subscribe((auth) => {
      this.authState = auth;
      this._loading = false;
      if (this.authenticated) {
        this.notificationService.showSucess(`Bem vindo ${this.currentUser.displayName}`);
        // this.getUserData();
      }
    });
  }

  login(): void {

    this.af.auth.signInWithRedirect(this.provider);

    this.af.auth.getRedirectResult()
      .then((result) => {
        const { email, displayName, photoURL, refreshToken } = result.user;

        this.user = {
          email,
          displayName,
          photoURL,
        };
      }).catch((error) => {
      });
  }

  logout(): void {
    this.af.auth.signOut()
      .then(() => {
        // Sign-out successful.
        this.user = null;
        this.notificationService.showInfo(`Desconectado com sucesso!`);
      }).catch((error) => {
        // An error happened.
      });
  }

  get authenticated(): boolean {
    return !!this.authState;
  }

  get currentUser(): IUser {
    if (!this.authState) {
      return null;
    }

    const { email, displayName, photoURL } = this.authState;

    return <IUser>{
      email,
      displayName,
      photoURL
    };
  }

  // getcardInfo(): ICardInfo {
  //   return this._cardInfo;
  // }

  public getUserData(): Promise<ICardInfo> {
    // const storageRef = firebase.storage().ref();
    try {
      return this.db.collection(CONSTANTS.COLLECTION)
        .doc(this.currentUser.email)
        .get()
        .pipe(
          filter((snap) => !!snap),
          map((snap) => {
            return <ICardInfo>snap.data();
          })
        ).toPromise();
    } catch (error) {
      console.log('Erro ao obter dados');
      return Promise.reject(error);
    }
  }

  get loading(): boolean {
    return this._loading;
  }
}
