var V="highlights-v8",SHELL=["./","index.html","manifest.webmanifest","icon-192.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 var r=e.request;if(r.method!=="GET")return;
 var u=new URL(r.url),fonts=u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com";
 if(u.origin!==location.origin&&!fonts)return; // ESPN data is cached by the app itself
 if(fonts){e.respondWith(caches.match(r).then(function(h){return h||fetch(r).then(function(n){var cp=n.clone();caches.open(V).then(function(c){c.put(r,cp)});return n})}));return}
 e.respondWith(fetch(r).then(function(n){var cp=n.clone();caches.open(V).then(function(c){c.put(r,cp)});return n}).catch(function(){return caches.match(r).then(function(h){return h||caches.match("./")})}));
});
