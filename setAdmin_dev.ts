// setAdmin.js
import admin from "firebase-admin";

import serviceAccount_dev from "./serviceAccountKey_dev.json";

// Initialize Firebase Admin with your service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount_dev as admin.ServiceAccount),
});

const makeAdmin = async (uid: string) => {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log(`✅ Set admin claim for UID: ${uid}`);
};

// Replace with the UID of the user
makeAdmin("WqmjF5p6UtQgAq2RRPPcD2VmjNt1");
