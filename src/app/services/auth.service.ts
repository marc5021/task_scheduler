import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {UserInfo} from 'firebase';
import {BehaviorSubject} from 'rxjs';
import {Authentication} from '../models/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: BehaviorSubject<Authentication>;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.auth = new BehaviorSubject({
      isLoggedIn: false,
      user: null,
      loaded: false
    });

    this.fireAuth.auth.onAuthStateChanged(user => {
      const obj: Authentication = {
        loaded: true,
        user: user,
        isLoggedIn: user !== null
      };
      this.auth.next(obj);
    });
  }

  public doGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.fireAuth.auth.signInWithPopup(provider)
      .then((response) => {
        this.updateUserData(response.user);
        this.router.navigate(['/']);
      });
  }

  public getAuth(): BehaviorSubject<Authentication> {
    return this.auth;
  }

  public getCurrentAuth(): Authentication {
    return this.auth.getValue();
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<UserInfo> = this.firestore.doc(`users/${user.uid}`);

    const data: UserInfo = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId
    };

    return userRef.set(data);
  }
  public logout() {
    this.fireAuth.auth.signOut().then();
  }
}
