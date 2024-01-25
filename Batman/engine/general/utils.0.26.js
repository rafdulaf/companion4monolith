Utils = {
    isInStandaloneMode: window.matchMedia('(display-mode: standalone)').matches || (window.navigator.standalone) || document.referrer.includes('android-app://'),
    autodetectLanguage: function() {
        for (var i = 0; i < Languages.length; i++)
        {
            if (navigator.language == Languages[i] 
                || navigator.language.indexOf(Languages[i] + '-') == 0)
            {
                return Languages[i];
            }
        }
        return "en"; 
    },
    
    autodetectTheme: function() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark";
        } else {
            return "light";
        }
    },
    
    loadJSON: function(url, withLanguage)
    {
        let versionedUrl = url;
        try 
        {
            versionedUrl += "?version=" + Version;
        }
        catch (e)
        {
            versionedUrl += "?foo=" + Math.random() + "&Install=" + Utils.isInStandaloneMode + "&Language=" + Language;
        }
        
        return new Promise(function (resolve, reject) { 
            $.ajax({
              dataType: "json",
              url: versionedUrl,
              success: function(data) {
                if (withLanguage)
                {
                    Utils.loadJSON(url.replace(/^(data\/)(.*)\.json$/, "$1$2/lang/$2." + Language + ".json")).then(function(subdata) { resolve(Utils.mergeObject(data, subdata)); }, function() { console.log("Error loading language " + url); reject(); });
                } 
                else
                {
                    resolve(data); 
                }
              },
              error: function(c, e, msg) {
                  console.log("Error loading " + url + "\n" + e + "\n" + msg); 
                  reject(); 
              }
            });
        });
    },
        
    mergeObject: function(data, subdata)
    {
        if (typeof subdata == "string")
        {
            data = subdata;
        }
        else if (data.length && subdata.length)
        {
            // Both arrays => apply by index
            for (let c = 0; c < data.length; c++)
            {
                data[c] = Utils.mergeObject(data[c], subdata[c]);
            }
        }
        else if (data.length)
        {
            // Source is an array, Dest an object => apply by key
            for (let c = 0; c < data.length; c++)
            {
                data[c] = Utils.mergeObject(data[c], subdata[data[c].id]);
            }
        }
        else
        {
            for (let i in subdata)
            {
                if (data[i])
                {
                    // Both objets => just recuse
                    Utils.mergeObject(data[i], subdata[i]);
                }
                else
                {
                    // Replacing final string
                    data[i] = subdata[i];
                }
            }
        }
        return data;
    },
    
    _getUpdateMessage() {
        return {
            'fr': "Une nouvelle version est disponible. Voulez-vous mettre à jour maintenant ?",
            'en': "A new version is available. Do you want to update now?",
            'it': "Una nuova versione è disponibile. Vuoi installarla adesso?"
        }[Language];
    },
    _getDownloadingMessage() {
        return {
            'fr': "Le téléchargement de l'application a commencé mais vous pouvez l'utiliser sans attendre.<br/>Lorsque le téléchargement sera terminé vous pourrez utiliser l'application hors-connexion.<br/>Téléchargement en cours :",
            'en': "The application is downloading but you can already use it.<br/>When the dowload is complete you may use the application offline.<br/>Downloading:",
            'it': "Il download dell'applicazione è iniziato, ma puoi già usarla senza aspettare.<br/>Quando il download è terminato potrai utilizzare l'applicazione offline.<br/>Download in corso:"
        }[Language];
    },
    _getDownloadedMessage() {
        return {
            'fr': "Le téléchargement est terminé. Vous pouvez utiliser l'application hors-ligne.",
            'en': "The download is over. You can now use the application offline.",
            'it': "Il download è finito. Adesso puoi utilizzare l'applicazione offline."
        }[Language];
    },
    _getLanguageChangeOfflineErrorMessage() {
        return {
            'fr': "Il n'est pas possible de changer de langue hors connexion",
            'en': "You cannot change the language when offline",
            'it': "Non puoi cambiare la lingua quando sei offline"
        }[Language];
    },
    
    loadApplication: async function()
    {
        // Set language
        Language = localStorage.getItem(Application + "_Language") || Utils.autodetectLanguage();
        Language2 = localStorage.getItem(Application + "_Language2");        
        Theme = localStorage.getItem(Application + "_Theme") || Utils.autodetectTheme();
        
        // Load version
        const versions = (await Utils.loadJSON("engine/Version.json")); 
        Version = versions.version;
        
        if (versions.resetCache
            || versions.resetLanguage
            || versions.newVersion && confirm(Utils._getUpdateMessage()))
        {
            navigator.serviceWorker.getRegistration().then((registration) => { registration && registration.unregister().then((success) => { window.location.reload(true); }); });
        }
        if (versions.offlineLanguage && versions.offlineLanguage != Language)
        {
            About.warnToast(Utils._getLanguageChangeOfflineErrorMessage());
            console.log("Cannot change language when working offline... switching back from " + Language + " to " + versions.offlineLanguage);
            Language = versions.offlineLanguage;
            localStorage.setItem(Application + "_Language", Language);
        }
        
        // Load CSS files
        var commonFiles = await Utils.loadJSON("engine/Files.json");
        commonFiles.css.forEach(function(file) {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'engine/' + file + "?version=" + Version) );
        });
        
        var applicationFiles = await Utils.loadJSON("Files.json");
        applicationFiles.css.push("general/skin-" + Theme + ".css");
        applicationFiles.css.forEach(function(file) {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', file + "?version=" + Version) );
        });
        
        // Load JS files
        for (let i = 0; i < commonFiles.scripts.length; i++)
        {
            const file = commonFiles.scripts[i];
            await $.ajax({
                  dataType: "script",
                  cache: true,
                  crossDomain:true,
                  url: 'engine/' + file.replace('LANGUAGE', Language) + "?version=" + Version
                })
        }

        for (let i = 0; i < applicationFiles.scripts.length; i++)
        {
            const file = applicationFiles.scripts[i];
            await $.ajax({
                  dataType: "script",
                  cache: true,
                  crossDomain:true,
                  url: file.replace('LANGUAGE', Language) + "?version=" + Version
                })
        }

        if (navigator.userAgent.indexOf('Firefox') != -1)
        {
            $(document.body).addClass('ff');
        }
    },
    
    _toInitialize: [],
    
    initialize: function()
    {
        Utils._toInitialize.forEach(fn => fn());
    }
}

var LazyImage = " loading=\"lazy\"";
let installPrompt;
