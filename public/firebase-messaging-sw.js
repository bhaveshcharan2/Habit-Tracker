// Import and configure the Firebase SDK
// These scripts are made available when the app is served or built
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBMqoDjv9QZSq7E9UCP-YuJTjsu63S-dQM",
  authDomain: "habit-tracker-c4c53.firebaseapp.com",
  projectId: "habit-tracker-c4c53",
  storageBucket: "habit-tracker-c4c53.firebasestorage.app",
  messagingSenderId: "352609032640",
  appId: "1:352609032640:web:4341ada578c8090d5c9025"
});

const messaging = firebase.messaging();

// If you want to handle background messages:
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-512.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
