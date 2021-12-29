var freeSpace = -1;
var registering = false;
if ('serviceWorker' in navigator) 
{
    registerIfNeeded(); 
    
    async function registerIfNeeded()
    {
        let isRegistered = (await navigator.serviceWorker.getRegistration()) != null;
        if (!isRegistered)
        {
            if ('storage' in navigator && 'estimate' in navigator.storage)
            {
                navigator.storage.estimate().then(function(estimate){
                    freeSpace = estimate.quota - estimate.usage;
                    if (freeSpace >= required[Language] * 1000000)
                    {
                        register();
                    }
                    else
                    {
                        console.log("Cannot install application: " + freeSpace / 1_000_000 + " MB is not enought. " + required[Language] + " MB required")
                    }  
                }); 
            }
            else
            {
                register();
            }
        }
    }
    
    async function register()
    {
        if (Utils.isInStandaloneMode)
        {
            console.log("registering = true")
            registering = true;
        }

        console.log('Service Worker registering in language ' + Language); 
        navigator
            .serviceWorker
            .register('sw.js?Version=' + Version + '&Application=' + Application + '&Install=' + Utils.isInStandaloneMode + '&Language=' + Language)
            .then(registration =>{ 
                console.log('Service Worker registered in language ' + Language);
            })
            .catch(error => {
                console.log('Service Worker not registered in language ' + Language, error);
            });
    }  
    
    const channel = new BroadcastChannel('sw-messages');
    channel.addEventListener('message', event => {
        if (event.data.type == 'cache_filled')
        {
            About.warnToast(Utils._getDownloadedMessage(), 3);
        }
    });    
}

window.addEventListener('beforeinstallprompt', async (e) => {
  if (!installPrompt)
  {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Stash the event so it can be triggered later.
      installPrompt = e;
  }
  else
  {
      // can only be used once
      installPrompt = null;
  }
});
window.addEventListener('appinstalled', () => {
    // reloading to fill the cache
    window.location.reload();
});

Utils._toInitialize.push(function() {
    // Filling cache
    window.setTimeout(function() {
        if (registering)
        {
            About.warnToast(Utils._getDownloadingMessage() + " " + required[Language] + " MB", 6);
        }
    }, 1);
});