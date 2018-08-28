import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {User, UserInfo} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  public doGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.fireAuth.auth.signInWithPopup(provider)
      .then((response) => {
        this.updateUserData(response.user);
        this.router.navigate(['/']);
      });
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
