// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE__AUTH_DOMAIN,
	databaseUrl: process.env.NEXT_PUBLIC_FIREBASE__DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE__PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE__STORAGEBUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE__MESSAGINGSENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE__APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE__MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
