// Service Worker Registration for PILLAR Media
// Add this script to your HTML pages before </body>

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered successfully:', registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              console.log('🔄 New version available! Refresh to update.');

              // Optionally show update notification to user
              if (confirm('New version available! Reload to update?')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((error) => {
        console.log('❌ Service Worker registration failed:', error);
      });

    // Handle controller change (new SW activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🔄 Service Worker controller changed');
      window.location.reload();
    });
  });
}

// Install prompt for PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing
  e.preventDefault();

  // Save the event for later use
  deferredPrompt = e;

  // Log install prompt availability
  console.log('💾 PWA install prompt available');

  // Optionally show your own install button
  // showInstallButton();
});

window.addEventListener('appinstalled', () => {
  console.log('✅ PWA installed successfully');
  deferredPrompt = null;

  // Track installation analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install', {
      event_category: 'engagement',
      event_label: 'PWA Installation'
    });
  }
});

// Optional: Function to trigger install prompt
function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User accepted PWA install');
      } else {
        console.log('❌ User dismissed PWA install');
      }
      deferredPrompt = null;
    });
  }
}

// Check if running as PWA
function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

if (isPWA()) {
  console.log('📱 Running as PWA');
  document.body.classList.add('pwa-mode');
}
