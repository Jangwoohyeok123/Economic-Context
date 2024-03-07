// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
	apiKey: 'AIzaSyAQtF-7V72XwQHoKJQUhWjpW-FfOblin04',
	authDomain: 'economic-context-415504.firebaseapp.com',
	databaseURL: 'https://economic-context-415504-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'economic-context-415504',
	storageBucket: 'economic-context-415504.appspot.com',
	messagingSenderId: '201145904598',
	appId: '1:201145904598:web:e7c2c6e33247f03ee90877',
	measurementId: 'G-53WP2MMD5V'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export default app;
