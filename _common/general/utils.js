Utils = {
    autodetectLanguage: function() {
        if (navigator.language == 'fr' || navigator.language.indexOf('fr-') == 0) return 'fr';
        else if (navigator.language == 'it' || navigator.language.indexOf('it-') == 0) return 'it';
        else return 'en'; 
    }
}

Language = localStorage.getItem("Language") || Utils.autodetectLanguage();

//var LazyImage = " loading=\"lazy\"";
//if (/firefox/.test(navigator.userAgent.toLowerCase())) LazyImage = ""; // Not working correctly on FF75/FF76
var LazyImage = "";
                    
