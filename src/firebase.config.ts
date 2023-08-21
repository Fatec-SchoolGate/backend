import admin from "firebase-admin";

export const initializeFirebase = () => {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "gs://schoolgate-aab6d.appspot.com"
    });
}