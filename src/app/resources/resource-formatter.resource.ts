import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  DocumentChangeAction,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists
} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {QueryFn} from 'angularfire2/firestore/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ResourceFormatter {

  private observables: {[path: string]: Observable<any>} = {};

  constructor(
    private firestore: AngularFirestore
  ) { }

  public formatCollection(docs: DocumentChangeAction<any>[]): any[] {
    const changed = [];

    for (const action of docs) {
      const doc = action.payload.doc;
      changed.push({
        data: doc.data(),
        ref: {
          id: doc.id,
          path: doc.ref.path
        }
      });
    }
    return changed;
  }

  public formatDoc(action: Action<DocumentSnapshotExists<any> | DocumentSnapshotDoesNotExist>): any {
    const doc = action.payload;
    return {
      data: doc.data(),
      ref: {
        id: doc.id,
        path: doc.ref.path
      }
    };
  }

  public doc(path: string): Observable<any> {
    if (this.observables[path] !== undefined) {
      return this.observables[path];
    } else {
      return this.firestore.doc(path).snapshotChanges().pipe(map(value => {
          return this.formatDoc(value);
        }
      ));
    }
  }

  public collection(path: string, queryFn?: QueryFn) {
    if (queryFn === undefined && this.observables[path] !== undefined) {
      return this.observables[path];
    } else {
      return this.firestore.collection(path, queryFn).snapshotChanges().pipe(map(value => {
        return this.formatCollection(value);
      }));
    }
  }

  public get<T>(obs: Observable<T>): Promise<T> {
    return new Promise<T>(resolve => {
      const sub = obs.subscribe(data => {
        sub.unsubscribe();
        resolve(data);
      });
    });
  }

}
