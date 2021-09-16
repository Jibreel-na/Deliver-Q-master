import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase) {
  }

  tracking(id) {
   return  this.db.object('/trackings/' + id).valueChanges();
  }
}
