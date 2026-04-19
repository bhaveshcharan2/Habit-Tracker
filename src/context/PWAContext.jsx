import React, { createContext, useContext, useEffect, useState } from 'react';

const PWAContext = createContext();

export const usePWA = () => useContext(PWAContext);

export const PWAProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      setIsInstallable(true);

      // Check if we should show the one-time popup
      const hasShownPopup = localStorage.getItem('pwa_popup_shown');
      if (!hasShownPopup) {
        setShowPopup(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      // Clear the deferredPrompt so it can be garbage collected
      setDeferredPrompt(null);
      setIsInstallable(false);
      setShowPopup(false);
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsInstallable(false);
    setShowPopup(false);
    localStorage.setItem('pwa_popup_shown', 'true');
  };

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('pwa_popup_shown', 'true');
  };

  return (
    <PWAContext.Provider value={{ isInstallable, installApp, showPopup, closePopup }}>
      {children}
    </PWAContext.Provider>
  );
};
