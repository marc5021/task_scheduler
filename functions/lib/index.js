"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
exports.updateDiff = functions.firestore.document('timelogs/{timelogId}').onWrite(((change, context) => {
    // Get an object with the previous document value (for update or delete)
    const data = change.after.data();
    const diff = data.endTimestamp - data.startTimestamp;
    return change.after.ref.set({
        diff: diff,
    }, { merge: true });
}));
//# sourceMappingURL=index.js.map