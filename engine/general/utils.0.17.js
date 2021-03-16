Utils = {
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
    
    loadJSON: function(url)
    {
        try 
        {
            url += "?version=" + Version;
        }
        catch (e)
        {
            url += "?foo=" + Math.random();
        }
        
        return new Promise(function (resolve, reject) { 
            $.ajax({
              dataType: "json",
              url: url,
              success: function(data) { resolve(data); },
              error: function() { reject(); }
            });
        });
    },
    
    loadApplication: async function()
    {
        // Set language
        Language = localStorage.getItem(Application + "_Language") || Utils.autodetectLanguage();
        
        // Load version
        Version = (await Utils.loadJSON("../engine/Version.json")).version;
        
        // Load CSS files
        var commonFiles = await Utils.loadJSON("../engine/Files.json");
        commonFiles.css.forEach(function(file) {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', '../engine/' + file + "?version=" + Version) );
        });
        
        var applicationFiles = await Utils.loadJSON("Files.json");
        applicationFiles.css.push("general/skin-" + (localStorage.getItem(Application + "_Theme") || Utils.autodetectTheme()) + ".css");
        applicationFiles.css.forEach(function(file) {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', file + "?version=" + Version) );
        });
        
        // Load JS files
        commonFiles.scripts.forEach(function(file) {
            $('head').append( $('<script/>').attr('src', '../engine/' + file + "?version=" + Version) );
        });

        applicationFiles.scripts.forEach(function(file) {
            $('head').append( $('<script/>').attr('src', file + "?version=" + Version) );
        });
        
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
