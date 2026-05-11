const CACHE_NAME = "taalbits-v5";
const APP_SHELL = [
  ".",
  "index.html",
  "sw.js",
  "site.webmanifest",
  "assets/icons/favicon.ico",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/favicon-16x16.png",
  "assets/icons/favicon-32x32.png",
  "assets/icons/android-chrome-192x192.png",
  "assets/icons/android-chrome-512x512.png",
  "data/themes.json",
  "data/komen.json",
  "data/zetten.json",
  "data/nemen.json",
  "data/halen.json",
  "data/kijken.json",
  "data/zoeken.json",
  "data/krijgen.json",
  "data/werken.json",
  "data/doen.json",
  "data/leggen.json",
  "data/preposities.json"
];

function scopedUrl(path) {
  return new URL(path, self.registration.scope).toString();
}

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_SHELL.map(scopedUrl));
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate" || event.request.destination === "document") {
    event.respondWith(
      fetch(event.request).then(function(response) {
        if (response && response.status === 200) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, copy);
            cache.put(scopedUrl("index.html"), response.clone());
          });
        }
        return response;
      }).catch(function() {
        return caches.match(event.request).then(function(cached) {
          return cached || caches.match(scopedUrl("index.html"));
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;

      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type === "opaque") {
          return response;
        }

        var copy = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, copy);
        });
        return response;
      }).catch(function() {
        if (event.request.mode === "navigate") {
          return caches.match(scopedUrl("index.html"));
        }
      });
    })
  );
});
