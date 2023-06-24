import { precacheAndRoute } from "workbox-precaching";
// eslint-disable-next-line no-var
declare var self: ServiceWorkerGlobalScope;

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", () => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("push", () => {
  console.log("Service Worker: Pushed");
});
