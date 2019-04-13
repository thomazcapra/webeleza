import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { NotificationService } from '../notification/notification.service';

export interface IUser {
  displayName: string;
  email: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  provider: firebase.auth.GoogleAuthProvider;
  authState: firebase.User;
  user: IUser;
  private _loading: boolean;

  constructor(private af: AngularFireAuth, private notificationService: NotificationService) {
    this.provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    this._loading = true;

    this.af.authState.subscribe((auth) => {
      this.authState = auth;
      this._loading = false;
      if (this.authenticated) {
        this.notificationService.showSucess(`Bem vindo ${this.currentUser.displayName}`);
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

        console.log('redirect');

        // ...
      }).catch(function (error) {

        console.log('catch redirect');

      });
  }

  logout(): void {
    this.af.auth.signOut()
      .then(() => {
        // Sign-out successful.
        this.user = null;
        this.notificationService.showInfo(`Desconectado com sucesso!`);
      }).catch(function (error) {
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

  get loading(): boolean {
    return this._loading;
  }
}
