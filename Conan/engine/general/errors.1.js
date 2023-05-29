if (window.location.search && window.location.search.substring(1).split("&").indexOf("error") != -1)
{
    window.onerror = function (msg, url, line, col, error) {
        var chaine = msg.toLowerCase();
        var souschaine = "script error";
        if (chaine.indexOf(souschaine) > -1)
        {
            alert('Script Error: see console');
        } 
        else 
        {
            var origin = window.location.href.substring(0, window.location.href.lastIndexOf("/", window.location.href.lastIndexOf("/") - 1));
            
            var message = 
                msg + "\n"
                + "at " + url  + ":" + line + ":" + col + "\n\n"
                + (error && error.stack ? error.stack : JSON.stringify(error));

            alert(message.replaceAll(origin, ''));
        }

        return false;
    };
}