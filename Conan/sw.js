const m = self.location.search.match(/^\?Version=([0-9.]*)&Application=([a-zA-Z0-9_-]*)&Install=(true|false)&Language=([a-zA-Z0-9_-]*)$/)
const Version = m[1];
const Application = m[2];
const CACHE_NAME_PREFIX = 'Companion-' + Application + '-';
const Languages = ["fr", "en", "it"];

let installRequired = m[3] === 'true';
let Language  = m[4];

importScripts('general/sw-files.js?version=' + Version);

function acceptOnlyLanguagesUrl(url)
{
    for (let m in Languages)
    {
        if (Languages[m] != Language 
            && url.indexOf('/' + Languages[m] + '/') >= 0)
        {
            return false;
        }
    }
    return true;
}

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install ' + Version);
  e.waitUntil(caching());
});

async function isCacheComplete() 
{
    if (!installRequired)
    {
        return true;
    }
    
    const CACHE_NAME = CACHE_NAME_PREFIX + Language + "-" + Version;
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    const shouldBeCacheSize = urlsToCache.filter(f => acceptOnlyLanguagesUrl(f)).length;
    const isComplete = keys.length == shouldBeCacheSize + 1;
    if (!isComplete)
    {
        await caches.delete(CACHE_NAME);
    } 
    return isComplete;
}

async function caching()
{
    if (!installRequired)
    {
        return;
    }
    
    const CACHE_NAME = CACHE_NAME_PREFIX + Language + "-" + Version;
    
    try
    {
        const localizedURLsToCache = urlsToCache.map(f => f.replace('.LANGUAGE.', '.' + Language + '.')).filter(f => acceptOnlyLanguagesUrl(f)).map(u => u + "?version=" + Version);
        localizedURLsToCache.push("./?version=" + Version); // Cache needs to be filled with ?version= to ensure to fill the cache with the right memory/disk cache version
        
        const cache = await caches.open(CACHE_NAME);
        console.log('Initial filling cache ' + CACHE_NAME + " with " + localizedURLsToCache.length + " files");
        await cache.addAll(localizedURLsToCache);
        console.log("Cache ready");

        const channel = new BroadcastChannel('sw-messages');
        channel.postMessage({type: 'cache_filled'});
    }
    catch (e)
    {
        console.log("Unregistering");
        self.registration.unregister();
        throw e;
    }
    finally 
    {
        return caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key.startsWith(CACHE_NAME_PREFIX) && key != CACHE_NAME) 
            {
                console.log('Removing old cache ' + key);
                return caches.delete(key);
            }
          }));
        });
    }
}

self.addEventListener('activate', function(event) {
  // Claim any clients immediately, so that the page will be under SW control without reloading.
  event.waitUntil(self.clients.claim());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        if (e.request.url.includes("/engine/Version.json?foo="))
        {
            try
            {
                let cacheIsComplete = await isCacheComplete();
                const versionResponse = { "version": Version };
                
                let timeoutPromise = new Promise(resolve => setTimeout(resolve, 5000))
                let fetchPromise = fetch(e.request)
                const response = cacheIsComplete ? await Promise.race([fetchPromise, timeoutPromise]) : await fetchPromise;
                if (!response)
                {
                    throw new Error("Timeout on Version.json");
                }

                // Check for updates
                const serverVersion = await response.clone().json(); 
                if (serverVersion.version != Version)
                {
                    // New version released
                    console.log("A new version " + serverVersion.version + " is available. Current version is " + Version);
                    versionResponse["newVersion"] = serverVersion.version;
                }
                
                // Is installation required?
                if (!installRequired && e.request.url.substring(e.request.url.indexOf("&Install=true")))
                {
                    console.log("Installation required");
                    installRequired = true;
                }
                
                // Has change language?
                const NewLanguage = e.request.url.substring(e.request.url.indexOf("&Language=") + "&Language=".length);
                if (NewLanguage != Language)
                {
                    console.log("Switching language from " + Language + " to " + NewLanguage);
                    versionResponse["resetLanguage"] = true;
                }
                
                // Checking cache
                if (!await isCacheComplete())
                {
                    console.log("Cache is not complete");
                    versionResponse["resetCache"] = true;
                }
                
                return new Response(JSON.stringify(versionResponse), {headers: {'Content-Type': 'application/json'}});
            }
            catch (e)
            {
                console.log("Working offline");
                return new Response(JSON.stringify({ "version": Version, "offlineLanguage": Language }), {headers: {'Content-Type': 'application/json'}});
            }
        }
        else if (e.request.method !== "POST" && e.request.url.startsWith(self.registration.scope))
    	{
            const modifiedUrl = e.request.url.split('?')[0].split('#')[0]; // Remove after ? and/or #
            
            const cachedResponse = await caches.match(modifiedUrl + "?version=" + Version);
            if (cachedResponse) 
            {
    	       return cachedResponse;
            }
            else
            {
                try
                {
                    const response = await fetch(e.request);
                    // All is cached, so no need to add to cache on the fly anymore
                    // const cache = await caches.open(CACHE_NAME);
                    // cache.put(e.request, response.clone());
                    return response;
                }
                catch (ex)
                {
                    // offline ?
                    if (modifiedUrl.includes("_hd.webp"))
                    {
                        // switching to non hd image
                        const cachedResponse = await caches.match(modifiedUrl.replace('_hd', ''));
                        if (cachedResponse) 
                        {
                           return cachedResponse;
                        }
                    }
                    
                    throw new Error("Cannot fetch " + modifiedUrl, ex);
                }
            }
        }
        else
        {
            try
            {
                const response = await fetch(e.request);
                return response;
            }
            catch (ex)
            {
                console.debug("Cannot fetch " + e.request.url, ex)
                return new Response("{}", { headers: {'Content-Type': 'application/json'} });
            }
        }
    })());
});
