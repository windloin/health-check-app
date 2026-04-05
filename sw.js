const CACHE_NAME = 'health-app-v1';

// 1. App 安裝時，把重要檔案存進手機的百寶袋 (Cache)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './manifest.json',
                './healthicon.ico'
            ]);
        })
    );
    self.skipWaiting(); // 確保每次有新版本都會立刻更新
});

// 2. 當 App 需要抓資料時的策略：先找網路最新版，沒網路再用百寶袋裡的
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
