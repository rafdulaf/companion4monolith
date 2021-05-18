var Rules = {
    _i18n: {
        'fr': {
            'menu': "Règles",
            'skills': "Compétences",
            'clarification': "Clarification :",

            'viewer-search': "Recherche dans le document",
            'viewer-download': "Télécharger le document",
            'viewer-zoomin': "Zoomer",
            'viewer-zoomout': "Dézoomer",

            'search': "Rechercher",
            'search-input': "Mot clé",
            'search-inputPh': "Entrez un mot clé à chercher (3 caractères minimum)",
            'search-loose': "Aucun résultat ne correspond au mot clé saisi",

            'copyright': "Les règles proposés sont basées sur les règles officielles et leurs compléments mais ont été en partie reformulées.",
            
            'userpref_showall': "Afficher seulement les livre de règles que je possède"
        },
        'en': {
            'menu': "Rules",
            'skills': "Skills",
            'clarification': "Clarification:",

            'viewer-search': "Search in the document",
            'viewer-download': "Download the document",
            'viewer-zoomin': "Zoom in",
            'viewer-zoomout': "Zoom out",

            'search': "Search",
            'search-input': "Keyword",
            'search-inputPh': "Enter the keyword to search (3 characters minimum)",
            'search-loose': "No result is matching the entered keyword",

            'copyright': "The proposed rules are based upon the official rules and their complements but were partially rewriten.",
            
            'userpref_showall': "Display only rule books that I own"
        },
        'it': {
            'menu': "Regole",
            'skills': "Abilità",
            'clarification': "Chiarificazione:",

            'viewer-search': "Cerca nell'intero documento",
            'viewer-download': "Scarica il documento",
            'viewer-zoomin': "Zoom in",
            'viewer-zoomout': "Zoom out",

            'search': "Cerca",
            'search-input': "Parola chiave",
            'search-inputPh': "Inserisci la parola chiave da cercare (minimo 3 caratteri)",
            'search-loose': "Nessun risultato corrispondente alla parola cercata",

            'copyright': "Le regole sono basate sul regolamento ufficiale e sui suoi complementi, ma sono parzialmente riscritte.",
            
            'userpref_showall': "Mostra solo le regole che ho"
        }
    },
    
    init: function()
    {
		About.addPreference("rules-showmine", Rules._i18n[Language].menu, Rules._i18n[Language].userpref_showall, 'boolean', 'true');

		Rules._lastSearch = "";

        Nav.addIcon(Rules._i18n[Language].menu, "rules-icon", "rules");

        Rules._rules = [{
            label: Rules._i18n[Language].skills, 
            id: "skills", 
            download: Encyclopedia.skills.link[Language]
        }];
        for (var i = 0; i < Encyclopedia.rules.list.length; i++)
        {
            if (About._hasExpansion(Encyclopedia.rules.list[i].origins) || window.About && About.getPreference("rules-showmine") === "false")
            {
                Rules._rules.push({
                    label: Encyclopedia.rules.list[i].title[Language], 
                    id: Encyclopedia.rules.list[i].id,
                    download: Encyclopedia.rules.list[i].download[Language],
                    pages: Encyclopedia.rules.list[i].pages[Language]
                });
            }
        }
        
        Nav.createTabs('rules', Rules._rules, Rules._onChange);

        Rules._initSkills();

        for (var i = 0; i < Encyclopedia.rules.list.length; i++)
        {
            if (About._hasExpansion(Encyclopedia.rules.list[i].origins))
            {
                Nav.addFloatingAction(Encyclopedia.rules.list[i].id, Rules._i18n[Language]['viewer-search'], "rules-search-icon", "search", Rules._search);
                $("#" + Encyclopedia.rules.list[i].id).html("<div class='zoom0 rules-viewer'><div>" + Rules._createViewer("data/rules/" + Encyclopedia.rules.list[i].id + "/" + Language, Encyclopedia.rules.list[i].pages[Language]) + "</div></div>");
                Nav.createFloatingBar(Encyclopedia.rules.list[i].id);
                Rules._attachEvents("#" + Encyclopedia.rules.list[i].id);
            }
        }
        
        Nav.addAction("rules", Rules._i18n[Language]['viewer-zoomin'], "rules-zoomin-icon", "zoomin", Rules._zoomIn);
        Nav.addAction("rules", Rules._i18n[Language]['viewer-zoomout'], "rules-zoomout-icon", "zoomout", Rules._zoomOut);
        Nav.addAction("rules", Rules._i18n[Language]['viewer-download'], "rules-download-icon", "download", Rules._download);
        Rules._onChange();

        About.addCopyright(Rules._i18n[Language].menu, Rules._i18n[Language].copyright);
    },
    
    _initSkills: function()
    {
        $("#skills").html("<div></div>");

        for (var i in Encyclopedia.skills.types)
        {
            var type = Encyclopedia.skills.types[i];

            $('#skills > div').append("<div id='skills_" + type.id + "' class='skill-tab'><h2>" + type.title[Language] + "</h2><div class='cols'></div></div>");

            for (var j in Encyclopedia.skills.list)
            {
                var skill = Encyclopedia.skills.list[j];
                if (skill.type == type.id)
                {
                    Rules._addSkill(skill.id,
                                         skill.type,
                                         skill.image,
                                         skill.title[Language],
                                         skill.text[Language],
                                         skill.clarification ? skill.clarification[Language] : null);
                }
            }
        }
        Rules._initSkillsSpecific();
    },
    
    _initSkillsSpecific: function() {
        // for inheritance
    },
    
    _addSkill: function(id, type, image, title, text, clarification)
    {
        $('#skills_' + type + " .cols").append("<a href='javascript:void(0)'" + (id ? " onclick='Rules.openSkill(\"" + id + "\")'" : "") + ">"
            + Rules._skill2HTML(id, type, image, title, text, clarification)
            + "</a>");
    },

    _skill2HTML: function(id, type, image, title, text, clarification)
    {
        return "<div class='skills-skill'>"
            +   "<img " + LazyImage + " src='" + image + "?version=" + Version + "'/>"
            +   "<div class='skills-title'>" + title + "</div>"
            +   "<div class='skills-text'>" + About._replace(text) + " " 
            + (clarification ? "<span title=\"" + Rules._i18n[Language].clarification + " " + clarification + "\">[...]</span>" : "") 
            + "</div>"
            + "</div>";
    },

    _linkToSkill: function(id, big)
    {
        big = big || false;

        var index = id.indexOf('/');
        if (index > 0)
        {
            id = id.substring(index + 1);
        }

        var skill = Rules._findSkillById(id);

        var s = "<a href='javascript:void(0)' class='openskill' onclick='Rules.openSkill(\"" + id + "\")'>";
        if (!big)
        {
            s += skill.title[Language];
        }
        else
        {
            s += Rules._skill2HTML(skill.id, skill.type, skill.image, skill.title[Language], skill.text[Language], skill.clarification ? skill.clarification[Language] : null);
        }
        s += "</a>";

        return s;
    },

    _findSkillById: function(id)
    {
        var index = id.indexOf('/');
        if (index > 0)
        {
            id = id.substring(index + 1);
        }

        for (var i in Encyclopedia.skills.list)
        {
            var skill = Encyclopedia.skills.list[i];
            if (skill.id == id)
            {
                return skill;
            }
        }

        throw new Error("Cannot find skill " + id);
    },
    
    openSkill: function(id) {
        var skill = Rules._findSkillById(id);
        
        let clarifications = ((skill.clarification && skill.clarification[Language]) ?"<div class='clarification'>" + Rules._i18n[Language].clarification + " " + skill.clarification[Language].replace(/\n/g, "<br/>") + "</div>" : "")
        

        Nav.dialog(skill.title[Language],
            "<div class='skillsdetails'>"
                + Rules._skill2HTML(skill.id, skill.type, skill.image, skill.title[Language], skill.text[Language], null)
                + clarifications
                + Rules._openSkillSpecific(skill)
            + "</div>",
            null,
            []
        );
    },
    
    _openSkillSpecific: function(skill)
    {
        // For inheritance
        return "";
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

    _deemphasizeRegexp: {
        'A': new RegExp(/[ÀÁÂÃÄÅ]/g),
        'AE': new RegExp(/Æ/g),
        'C': new RegExp(/Ç/g),
        'E': new RegExp(/[ÈÉÊË]/g),
        'I': new RegExp(/[ÌÍÎÏ]/g),
        'N': new RegExp(/Ñ/g),
        'O': new RegExp(/[ÒÓÔÕÖ]/g),
        'OE': new RegExp(/Œ/g),
        'U': new RegExp(/[ÙÚÛÜ]/g),
        'Y': new RegExp(/[ÝŸ]/g)
    },
    _cache:  {},
    _deemphasize: function (s)
    {
        if (!s) return s;
        
        return Rules._cache[s]
               || 
             (Rules._cache[s] = s.toUpperCase()
             .replace(Rules._deemphasizeRegexp.A,"A")
             .replace(Rules._deemphasizeRegexp.AE,"AE")
             .replace(Rules._deemphasizeRegexp.C,"C")
             .replace(Rules._deemphasizeRegexp.E,"E")
             .replace(Rules._deemphasizeRegexp.I,"I")
             .replace(Rules._deemphasizeRegexp.N,"N")
             .replace(Rules._deemphasizeRegexp.O,"O")
             .replace(Rules._deemphasizeRegexp.OE,"OE")
             .replace(Rules._deemphasizeRegexp.U,"U")
             .replace(Rules._deemphasizeRegexp.Y,"Y"));
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
        Rules._loadIframes();
        
        var div = $("#" + Rules._rules[Rules._currentSlide].id + " div.rules-viewer");
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
        	Nav.showAction("rules", "download");
            Nav.hideAction("rules", "zoomin");
            Nav.hideAction("rules", "zoomout");
            Nav.hideFloatingAction("rules", "search");
        }
        else
        {
        	if (Rules._rules[Rules._currentSlide].download)
    		{
        		Nav.showAction("rules", "download");
    		}
        	else
    		{
        		Nav.hideAction("rules", "download");
    		}

        	Nav.showAction("rules", "zoomin");
            Nav.showAction("rules", "zoomout");
            Nav.showFloatingAction("rules", "search");
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
            var id = "rules-" + Math.round(Math.random() * 100000);
            s += "<iframe name=\"" + id + "\" id=\"" + id + "\" loading=\"lazy\" data-page='" + i + "' src=\"\about:blank\" data-src=\"" + url + "/" + i + ".html?version=" + Version + "\"></iframe>";
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
        var div = $("#" + Rules._rules[Rules._currentSlide].id + " div.rules-viewer");

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
    
    _loadIframes: function()
    {
        // Ensure iframes are lazy loaded
        $("#" + Rules._rules[Rules._currentSlide].id + " iframe[data-src]").each(function(index, iframe) {
            var $iframe = $(iframe);
            iframe.src = $iframe.attr("data-src");
            $iframe.attr("data-src", null)
        });
    },

    _zoom: function(direction, specificPage, ratioX, ratioY)
    {
        Rules._loadIframes();
        
        var div = $("#" + Rules._rules[Rules._currentSlide].id + " div.rules-viewer");
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

Utils._toInitialize.push(Rules.init);