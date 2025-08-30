const CACHE_NAME = "resume-cache-v1"
const RESOURCES = ["/Ansh_Shah_Resume.jpg"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(RESOURCES))
      .catch(() => {}),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .catch(() => {}),
  )
})

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url)
  if (RESOURCES.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached
        return fetch(event.request).then((resp) => {
          const copy = resp.clone()
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, copy))
            .catch(() => {})
          return resp
        })
      }),
    )
  }
})
