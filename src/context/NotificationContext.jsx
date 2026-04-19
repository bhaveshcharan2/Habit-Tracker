import React, { createContext, useContext, useEffect, useState } from 'react';
import { messaging, db } from '../firebase/config';
import { getToken, onMessage } from 'firebase/messaging';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [permission, setPermission] = useState(Notification.permission);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (permission === 'granted' && currentUser) {
      requestToken();
    }
  }, [permission, currentUser]);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received in foreground: ', payload);
      // You can trigger a custom toast or UI notification here
      if (Notification.permission === 'granted') {
         new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: '/icon-512.png'
         });
      }
    });

    return () => unsubscribe();
  }, []);

  const requestToken = async () => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });
      if (currentToken) {
        setToken(currentToken);
        await saveTokenToFirestore(currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } catch (err) {
      console.log('An error occurred while retrieving token. ', err);
    }
  };

  const saveTokenToFirestore = async (token) => {
    if (!currentUser) return;
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        fcmTokens: arrayUnion(token)
      });
    } catch (err) {
      console.error('Error saving FCM token: ', err);
    }
  };

  const requestPermission = async () => {
    try {
      const status = await Notification.requestPermission();
      setPermission(status);
      if (status === 'granted') {
        await requestToken();
      }
      return status;
    } catch (err) {
      console.error('Error requesting notification permission: ', err);
      return 'denied';
    }
  };

  return (
    <NotificationContext.Provider value={{ permission, token, requestPermission }}>
      {children}
    </NotificationContext.Provider>
  );
};
