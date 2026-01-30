// sw.js の修正例
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.text() : 'Aurora Alert!';
  const options = {
    body: data,
    icon: 'icon.png',
    badge: 'icon.png'
  };

  // Promiseを返して、処理が完了したことをブラウザに明確に伝える
  event.waitUntil(
    self.registration.showNotification('Aurora Forecast Pro', options)
  );
});
