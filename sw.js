/* global self */

const CACHE_NAME = "qd-web-v6";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css?v=2025-12-24-8",
  "./script.js?v=2025-12-24-8",
  "./favicon.svg?v=2025-12-24-8",
  "./manifest.webmanifest?v=2025-12-24-8",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin GET requests (no caching for API calls).
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // SPA navigation: serve cached index.html when offline.
      if (req.mode === "navigate") {
        try {
          const fresh = await fetch(req);
          cache.put("./index.html", fresh.clone());
          return fresh;
        } catch {
          const cached = await cache.match("./index.html");
          if (cached) return cached;
          return new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
        }
      }

      const cached = await cache.match(req);
      if (cached) return cached;

      try {
        const fresh = await fetch(req);
        if (fresh.ok) cache.put(req, fresh.clone());
        return fresh;
      } catch {
        return new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
      }
    })(),
  );
});
