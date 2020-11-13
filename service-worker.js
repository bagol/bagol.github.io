importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([
  { url: "/index.html", revision: "1" },
  { url: "icon.png", revision: "1" },
  { url: "manifest.json", revision: "1" },
  { url: "team.html", revision: "1" },
  { url: "css/materialize.min.css", revision: "1" },
  { url: "css/style.css", revision: "1" },
  { url: "images/Badge-2.webp", revision: "1" },
  { url: "images/logo-192.png", revision: "1" },
  { url: "images/teams.webp", revision: "1" },
  { url: "js/api.js", revision: "1" },
  { url: "js/db.js", revision: "1" },
  { url: "js/idb.js", revision: "1" },
  { url: "js/materialize.min.js", revision: "1" },
  { url: "js/nav.js", revision: "1" },
  { url: "js/script.js", revision: "1" },
]);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "images/logo-192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});