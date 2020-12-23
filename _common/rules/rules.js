var Rules = {
    _i18n: {
        'fr': {
            'menu': "Règles",

            'viewer-search': "Recherche dans le document",
            'viewer-download': "Télécharger le document",
            'viewer-zoomin': "Zoomer",
            'viewer-zoomout': "Dézoomer",

            'search': "Rechercher",
            'search-input': "Mot clé",
            'search-inputPh': "Entrez un mot clé à chercher (3 caractères minimum)",
            'search-loose': "Aucun résultat ne correspond au mot clé saisi",

            'copyright': "Les règles proposés sont basées sur les règles officielles et leurs compléments mais ont été en partie reformulées."
        },
        'en': {
            'menu': "Rules",

            'viewer-search': "Search in the document",
            'viewer-download': "Download the document",
            'viewer-zoomin': "Zoom in",
            'viewer-zoomout': "Zoom out",

            'search': "Search",
            'search-input': "Keyword",
            'search-inputPh': "Enter the keyword to search (3 characters minimum)",
            'search-loose': "No result is matching the entered keyword",

            'copyright': "The proposed rules are based upon the official rules and their complements but were partially rewriten."
        },
        'it': {
            'menu': "Regole",

            'viewer-search': "Cerca nell'intero documento",
            'viewer-download': "Scarica il pdf",
            'viewer-zoomin': "Zoom in",
            'viewer-zoomout': "Zoom out",

            'search': "Cerca",
            'search-input': "Parola chiave",
            'search-inputPh': "Inserisci la parola chiave da cercare (minimo 3 caratteri)",
            'search-loose': "Nessun risultato corrispondente alla parola cercata",

            'copyright': "Le regole sono basate sul regolamento ufficiale e sui suoi complementi, ma sono parzialmente riscritte."
        }
    },
    
    _beforeRuleList: function() {
        // Nothing
    },
    
    _afterRuleList: function() {
        // Nothing
    },
    
    _rules: [],

    init: function()
    {
        Rules._lastSearch = "";

        Nav.addIcon(Rules._i18n[Language].menu, "rules-icon", "rules");

        for (var i = 0; i < Encyclopedia.rules.list.length; i++)
        {
            Rules._rules.push({
                label: Encyclopedia.rules.list[i].title[Language], 
                id: Encyclopedia.rules.list[i].id,
                download: Encyclopedia.rules.list[i].download[Language],
                pages: Encyclopedia.rules.list[i].pages[Language]
            });
        }
        Rules._beforeRuleList();
        
        Nav.createTabs('rules', Rules._rules, Rules._onChange);

        Rules._afterRuleList();

        for (var i = 0; i < Encyclopedia.rules.list.length; i++)
        {
            $("#" + Encyclopedia.rules.list[i].id).addClass("zoom0 rules-viewer").html("<div>" + this._createViewer("data/rules/" + Encyclopedia.rules.list[i].id + "/" + Language, Encyclopedia.rules.list[i].pages[Language]) + "</div>");
            Rules._attachEvents("#" + Encyclopedia.rules.list[i].id);
        }
        

        Nav.addAction("rules", Rules._i18n[Language]['viewer-zoomin'], "rules-zoomin-icon", "zoomin", Rules._zoomIn);
        Nav.addAction("rules", Rules._i18n[Language]['viewer-zoomout'], "rules-zoomout-icon", "zoomout", Rules._zoomOut);
        Nav.addAction("rules", Rules._i18n[Language]['viewer-search'], "rules-search-icon", "search", Rules._search);
        Nav.addAction("rules", Rules._i18n[Language]['viewer-download'], "rules-download-icon", "download", Rules._download);
        Rules._onChange();

        About.addCopyright(Rules._i18n[Language].menu, Rules._i18n[Language].copyright);
    },

    _download: function()
    {
        window.open(Rules._rules[Rules._currentSlide].download);
    },

    _search: function()
    {
        Nav.dialog(Rules._i18n[Language].search,
            "<div id='rulessearch' class='rulessearch'>"
            +   "<div class='form'>"
            +       "<label for='rulessearch'>" + Rules._i18n[Language]['search-input'] + "</label>"
            +       "<input type='text' id='rulessearch' onkeyup='Rules._doSearch()' onchange='Rules._doSearch()' placeholder='" + Rules._i18n[Language]['search-inputPh'] + "'/>"
            +   "</div>"
            +   "<div class='results'>"
            +   "</div>"
            + "</div>"
        );
        $("#rulessearch input").focus()[0].value = Rules._lastSearch;

        // loading keywords
        if (!Rules.keywords || !Rules.keywords[Rules._currentSlide])
        {
            $("#rulessearch input").prop('disabled', true);
            Rules.keywords = Rules.keywords || {};
            $.getJSON("data/rules/" + Rules._rules[Rules._currentSlide].id + "/" + Language + "/search.json?version=" + Version, null, function(data) { Rules.keywords[Rules._currentSlide] = data; $("#rulessearch input").prop('disabled', false).focus(); Rules._doSearch(true); });
        }
        else
        {
            Rules._doSearch(true);
        }
    },

    _deemphasize: function (s)
    {
        if (!s) return s;

        s = s.replace(new RegExp(/[ÀÁÂÃÄÅ]/g),"A");
        s = s.replace(new RegExp(/[àáâãäå]/g),"a");
        s = s.replace(new RegExp(/Æ/g),"AE");
        s = s.replace(new RegExp(/æ/g),"ae");
        s = s.replace(new RegExp(/Ç/g),"C");
        s = s.replace(new RegExp(/ç/g),"c");
        s = s.replace(new RegExp(/[ÈÉÊË]/g),"E");
        s = s.replace(new RegExp(/[èéêë]/g),"e");
        s = s.replace(new RegExp(/[ÌÍÎÏ]/g),"I");
        s = s.replace(new RegExp(/[ìíîï]/g),"i");
        s = s.replace(new RegExp(/Ñ/g),"N");
        s = s.replace(new RegExp(/ñ/g),"n");
        s = s.replace(new RegExp(/[ÒÓÔÕÖ]/g),"O");
        s = s.replace(new RegExp(/[òóôõö]/g),"o");
        s = s.replace(new RegExp(/Œ/g),"OE");
        s = s.replace(new RegExp(/œ/g),"oe");
        s = s.replace(new RegExp(/[ÙÚÛÜ]/g),"U");
        s = s.replace(new RegExp(/[ùúûü]/g),"u");
        s = s.replace(new RegExp(/[ÝŸ]/g),"y");
        s = s.replace(new RegExp(/[ýÿ]/g),"y");

        return s.toUpperCase();
    },

    _doSearch: function(force)
    {
        var searchTerm = $("#rulessearch input")[0].value;
        if (Rules._lastSearch == searchTerm && force !== true)
        {
            return;
        }

        Rules._lastSearch = searchTerm;
        searchTerm = Rules._deemphasize(searchTerm);

        $("#rulessearch input").attr('data-last-search', searchTerm);
        if ((searchTerm || '').length < 3)
        {
            $("#rulessearch .results").html("");
            return;
        }

        var textContent = Rules.keywords[Rules._currentSlide];

        var results = "";
        for (var i = 0; i < textContent.length; i++)
        {
            var pageContent = Rules._deemphasize(textContent[i]);
            var index = -1;
            var pageHasResults = false;

            do
            {
                index = pageContent.indexOf(searchTerm, index + 1);
                if (index >= 0)
                {
                    var foundExact = textContent[i].substring(index, index + searchTerm.length);

                    var SNIPPET_LENGTH = 120;
                    var snippetStart = index >= SNIPPET_LENGTH ? index - SNIPPET_LENGTH : 0;
                    var snippetEnd = index + searchTerm.length < textContent[i].length - SNIPPET_LENGTH ? index + searchTerm.length + SNIPPET_LENGTH : textContent[i].length;

                    var prefix = snippetStart > 0 ? "..." : "";
                    var suffix = snippetEnd < pageContent.length ? "..." : "";

                    var guessRatioY = (index / pageContent.length) * 0.8 + 0.1;

                    if (!pageHasResults) results += "<li><a href='#' onclick='Rules._endPageSearch(this, arguments[0], " + (i+1) + ")'><img src=\"data/rules/" + Rules._rules[Rules._currentSlide].id + "/" + Language + "/thumbnails/" + (i+1) + ".jpg?version=" + Version + "\"/><br/>Page " + (i+1) + "</a><ul>";
                    results += "<li>"
                                    + "<a href='#rules' onclick='Rules._endSearch(" + (i+1) +", 0, " + guessRatioY + ")'>"
                                        + prefix + textContent[i].substr(snippetStart, snippetEnd - snippetStart).replace(foundExact, '<em>' + foundExact + '</em>') + suffix
                                    + "</a>"
                             + "</li>";
                    pageHasResults = true;
                }
            } while (index !== -1);

            if (pageHasResults) results += "</ul></li>";
        }

        if (results)
        {
            $("#rulessearch .results").html("<ul>" + results + "</ul>");
        }
        else
        {
            $("#rulessearch .results").html(Rules._i18n[Language]['search-loose'])
        }
    },

    _endPageSearch: function(me, e, page)
    {
        var imgLocation = $(me).offset();
        var ratioX = (e.pageX - imgLocation.left) / $(me).width();
        var ratioY = (e.pageY - imgLocation.top) / $(me).height();

        Rules._endSearch(page, ratioX, ratioY)
    },

    _endSearch: function(page, ratioX, ratioY)
    {
        var div = $("#" + Rules._rules[Rules._currentSlide].id);
        if (!div.is("zoom3") && !div.is("zoom2"))
        {
            div.removeClass("zoom1").removeClass("zoom0").addClass("zoom2");
        }

        Rules._scrollTo(page, ratioX, ratioY);

        Nav.closeDialog();
    },

    _attachEvents: function(selector)
    {
        // Attach thumbnails events
        $(selector + " .thumbnails img").on('click', function(e) {
            var imgLocation = $(this).offset();
            var ratioX = (e.pageX - imgLocation.left) / $(this).width();
            var ratioY = (e.pageY - imgLocation.top) / $(this).height();
            Rules._zoom(1, $(this).attr('data-page'), ratioX, ratioY);
        });

       // Attach iframe events
       $(selector + " iframe").on('load', function() {
            var iframe = this;
            var page = $(iframe).attr('data-page');
            $(iframe.contentDocument).on('click', function(e) {
                var body = $(e.target.ownerDocument.body);
                var zoom = body.css('zoom') || 1.0;
                var ratioX = e.pageX / zoom / body.width();
                var ratioY = e.pageY / zoom / body.height();

                Rules._zoom(1, page, ratioX, ratioY);
            });
       });
    },

    _onChange: function(event, slick)
    {
        var slide = slick && slick.currentSlide || 0;
        Rules._currentSlide = slide;

        if (!Rules._rules[Rules._currentSlide].pages)
        {
            Nav.hideAction("rules", "zoomin");
            Nav.hideAction("rules", "zoomout");
            Nav.hideAction("rules", "search");
        }
        else
        {
            Nav.showAction("rules", "zoomin");
            Nav.showAction("rules", "zoomout");
            Nav.showAction("rules", "search");
        }
    },

    _createViewer: function(url, size)
    {
        var s = "";

        // thumbnails
        s += "<div class='thumbnails'>"
        for (var i = 0; i <= size; i+=2)
        {
            s += "<div>"
            if (i > 0) s += "<img" + LazyImage + " data-page='" + i + "' src='" + url + "/thumbnails/" + i + ".jpg?version=" + Version + "'/>"
            if (i < size) s += "<img" + LazyImage + " data-page='" + (i+1) + "' src='" + url + "/thumbnails/" + (i+1) + ".jpg?version=" + Version + "'/>"
            s += "</div>"
        }
        s += "</div>"

        // pages
        for (var i = 1; i <= size; i++)
        {
            s += "<iframe loading=\"lazy\" data-page='" + i + "' src=\"" + url + "/" + i + ".html?version=" + Version + "\"></iframe>";
        }

        return s;
    },

    _zoomIn: function()
    {
        Rules._zoom(1);
    },

    _zoomOut: function()
    {
        Rules._zoom(-1);
    },

    _scrollTo: function(specificPage, ratioX, ratioY)
    {
        var div = $("#" + Rules._rules[Rules._currentSlide].id);

        ratioX = ratioX || 0;
        ratioY = ratioY || 0;

        var iframe = div.find("iframe[data-page=" + specificPage + "]");

        var top = div.scrollTop()
                  + iframe.offset().top
                  - div.offset().top
                  + ratioY * iframe.height()
                  - 0.5 * div.height();

        var left = div.scrollLeft()
                  + iframe.offset().left
                  - div.offset().left
                  + ratioX * iframe.width()
                  - 0.5* div.width();

        div.scrollTop(top);
        div.scrollLeft(left);
    },

    _zoom: function(direction, specificPage, ratioX, ratioY)
    {
        var div = $("#" + Rules._rules[Rules._currentSlide].id);

        var top = div.scrollTop();
        var height = div.height();

        var fullHeight = div.children("div").height();

        var cursor = (top + height/2) / fullHeight;

        if (div.hasClass("zoom0"))
            div.removeClass("zoom0").addClass(direction == 1 ? "zoom1" : "zoom0")
        else if (div.hasClass("zoom1"))
            div.removeClass("zoom1").addClass(direction == 1 ? "zoom2" : "zoom0")
        else if (div.hasClass("zoom2"))
            div.removeClass("zoom2").addClass(direction == 1 ? "zoom3" : "zoom1")
        else if (div.hasClass("zoom3"))
            div.removeClass("zoom3").addClass(direction == 1 ? "zoom3" : "zoom2")

        var newFullHeight = div.children("div").height();

        if (specificPage)
        {
            Rules._scrollTo(specificPage, ratioX, ratioY);
        }
        else
        {
            // Try to auto stay at the same place
            div.scrollTop(cursor * newFullHeight - height / 2);
        }
    }
}
