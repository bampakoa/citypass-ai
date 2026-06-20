import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp } from 'firebase/app';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyCDrh2hsYY34XHa5Pc0usJO8tJs2sFreeY",
  authDomain: "citypass-ai.firebaseapp.com",
  projectId: "citypass-ai",
  storageBucket: "citypass-ai.firebasestorage.app",
  messagingSenderId: "953720790935",
  appId: "1:953720790935:web:1986e6d926f037925ceed2"
};

const firebaseApp = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: 'FIREBASE_APP', useValue: firebaseApp }
  ]
};
