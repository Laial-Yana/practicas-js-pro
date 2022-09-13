self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});

self.addEventListener("fetch", (e) => {
  const request = e.request;
  // solo con las peticiones get
  if (request.method !== "GET") {
    return;
  }
  // en este punto es get si o si y queremos buscar en cache a ver si tenemos la info
  e.respondWith(cachedResponse(request));

  //actualizar el cache
  e.waitUntil(updateCache(request));
});
async function precache() {
  const cache = await caches.open("v1");
  return cache.addAll([
    "/",
    "/index.html",
    "/assets/index.js",
    "/assets/MediaPlayer.js",
    "/assets/plugins/AutoPlay.js",
    "/assets/plugins/AutoPause.js",
    "/assets/index.css",
    "/assets/BigBuckBunny.mp4",
  ]);
}

async function cachedResponse(request) {
  //obtenemos el cache
  const cache = await caches.open("v1");
  //chequeamos que en el cache este la info de la peticion.
  //Se le pregunta al cache si tiene una copia que le corresponde al request
  const response = await cache.match(request);
  return response || fetch(request);
}
async function updateCache(request) {
  const cache = await caches.open("v1");
  const response = await fetch(request);
  return cache.put(request, response);
}
