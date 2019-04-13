import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { NotificationService } from '../notification/notification.service';


const USER_STORAGE_KEY = 'WEBELEZA_STORAGE_USER';


export interface IUser {
  displayName: string;
  email: string;
  refreshToken: string;
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

    const savedUser = localStorage.getItem(USER_STORAGE_KEY);

    this._loading = true;
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }

    console.log('constructor');
    this.af.authState.subscribe((auth) => {
      this.authState = auth;
      console.log(auth);
      this._loading = false;
      if (this.authenticated) {
        this.notificationService.showSucess(`Bem vindo ${this.currentUser.displayName}`);
      }
    });

    // db.collection('cities').doc('LA').set({
    //   name: 'Los Angeles',
    //   state: 'CA',
    //   country: 'USA'
    // })
    //   .then(function () {
    //     console.log('Document successfully written!');
    //   })
    //   .catch(function (error) {
    //     console.error('Error writing document: ', error);
    //   });


    // db.collection('items').valueChanges().subscribe((v) => console.log(v));
  }

  login(): void {

    console.log('init login');
    this.af.auth.signInWithRedirect(this.provider)
      .then(() => console.log('then'))
      .catch(() => console.log('catch'));

    this.af.auth.getRedirectResult()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // // The signed-in user info.
        const { email, displayName, photoURL, refreshToken } = result.user;

        this.user = {
          email,
          displayName,
          photoURL,
          refreshToken
        };

        console.log('redirect');
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.user));

        // ...
      }).catch(function (error) {

        console.log('catch redirect');

        // // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
  }

  logout(): void {
    this.af.auth.signOut()
      .then(() => {
        // Sign-out successful.
        this.user = null;
        localStorage.removeItem(USER_STORAGE_KEY);
        this.notificationService.showInfo(`Desconectado com sucesso!`);
      }).catch(function (error) {
        // An error happened.
      });
  }

  // isAuthenticated(): boolean {
  //   return !!this.user && !!this.user.refreshToken;
  // }

  get authenticated(): boolean {
    return !!this.authState;
  }

  get currentUser(): IUser {
    if (!this.authState) {
      return null;
    }

    const { email, displayName, photoURL, refreshToken } = this.authState;

    return <IUser>{
      email,
      displayName,
      photoURL,
      refreshToken
    };
  }

  get loading(): boolean {
    return this._loading;
  }
}
