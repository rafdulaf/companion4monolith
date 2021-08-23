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
    
    loadJSON: function(url, withLanguage)
    {
        let versionedUrl = url;
        try 
        {
            versionedUrl += "?version=" + Version;
        }
        catch (e)
        {
            versionedUrl += "?foo=" + Math.random();
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
              error: function() {
                  console.log("Error loading " + url); 
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
    
    loadApplication: async function()
    {
        // Set language
        Language = localStorage.getItem(Application + "_Language") || Utils.autodetectLanguage();
        Theme = localStorage.getItem(Application + "_Theme") || Utils.autodetectTheme();
        
        // Load version
        Version = (await Utils.loadJSON("../engine/Version.json")).version;
        
        // Load CSS files
        var commonFiles = await Utils.loadJSON("../engine/Files.json");
        commonFiles.css.forEach(function(file) {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', '../engine/' + file + "?version=" + Version) );
        });
        
        var applicationFiles = await Utils.loadJSON("Files.json");
        applicationFiles.css.push("general/skin-" + Theme + ".css");
        applicationFiles.css.forEach(function(file) {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', file + "?version=" + Version) );
        });
        
        // Load JS files
        commonFiles.scripts.forEach(function(file) {
            $('head').append( $('<script/>').attr('src', '../engine/' + file.replace('LANGUAGE', Language) + "?version=" + Version) );
        });

        applicationFiles.scripts.forEach(function(file) {
            $('head').append( $('<script/>').attr('src', file.replace('LANGUAGE', Language) + "?version=" + Version) );
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
