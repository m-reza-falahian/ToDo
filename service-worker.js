let version = 2;
let currentCache = "ToDoCache-v" + version;

//service-worker installing
self.addEventListener("install", (event) => {
})

//service-worker activing
self.addEventListener("activate", (event) => {
    let expectedCacheNames = currentCache;

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.forEach(cacheName => {
                    if (!expectedCacheNames.includes(cacheName)) return caches.delete(cacheName);
                }
                )
            )
        })
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.open(currentCache).then(cache => {
            return cache.match(event.request).then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request).then(networkReponse => {
                    cache.put(event.request, networkReponse.clone());
                    return networkReponse;
                }).catch(err => {
                })
            })
        })
    );
})