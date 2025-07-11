// setAdmin.js
import admin from "firebase-admin";

import serviceAccount from "./serviceAccountKey.json";

// Initialize Firebase Admin with your service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const makeAdmin = async (uid) => {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log(`✅ Set admin claim for UID: ${uid}`);
};

// Replace with the UID of the user
makeAdmin("wawOgc0zClPys0B4KeETWubbVTi1");
