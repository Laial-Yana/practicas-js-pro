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
    //*lo comento porque al haber integrado parcel ahora se creo la carpeta dist y ya no es necesario
    // "/",
    // "/index.html",
    // "/assets/index.js",
    // "/assets/MediaPlayer.js",
    // "/assets/plugins/AutoPlay.js",
    // "/assets/plugins/AutoPause.ts",
    // "/assets/index.css",
    // "/assets/BigBuckBunny.mp4",
  ]);
}

async function cachedResponse(request) {
  //obtenemos el cache
  const cache = await caches.open("v1");
  //chequeamos que en el cache este la info de la peticion.
  //Se le pregunta al cache si tiene una copia que le corresponde al request
  const response = await cache.match(request);
  //* ya no es necesario porque igualmente aca se va a hacer el fetch y lo guardara
  return response || fetch(request);
}
async function updateCache(request) {
  const cache = await caches.open("v1");
  const response = await fetch(request);
  return cache.put(request, response);
}
