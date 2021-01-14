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
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', '../engine/' + file) );
        });
        
        var applicationFiles = await Utils.loadJSON("Files.json");
        applicationFiles.css.forEach(function(file) {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', file) );
        });
        
        // Load JS files
        commonFiles.scripts.forEach(function(file) {
            $('head').append( $('<script/>').attr('src', '../engine/' + file) );
        });

        applicationFiles.scripts.forEach(function(file) {
            $('head').append( $('<script/>').attr('src', file) );
        });
    },
    
    _toInitialize: [],
    
    initialize: function()
    {
        Utils._toInitialize.forEach(fn => fn());
    }
}

var LazyImage = " loading=\"lazy\"";
