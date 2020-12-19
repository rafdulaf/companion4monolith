var ConanRules = {
    _i18n: {
        'fr': {
            'menu': "Règles",

            'skills': "Compétences",
            'spell_clarification': "(Clarification du sort) ",

            'equipments': "Utilisée dans les cartes d'équipement :",
            'spells': "Utilisée dans les cartes de sort :",
            'heroesOwned': "Possédée par les héros :",
            'tilesOwned': "Possédée par les tuiles :",
            'tokensUsed': "En rapport avec le jeton :",

            'viewer-search': "Recherche dans le document",
            'viewer-download': "Télécharger le document",
            'viewer-zoomin': "Zoomer",
            'viewer-zoomout': "Dézoomer",

            'search': "Rechercher",
            'search-input': "Mot clé",
            'search-inputPh': "Entrez un mot clé à chercher (3 caractères minimum)",
            'search-loose': "Aucun résultat ne correspond au mot clé saisi",

            'copyright': "Les règles proposés sont basées sur les règles officielles et leurs compléments mais ont été en partie reformulées.",

            'heroes': "Livre des héros",
            'heroesPDF': "http://www.monolithedition.com/download/rules/CONAN_Heroesrulebook_V2_FR_SD.pdf",
            'overlord': "Livre de l'Overlord",
            'overlordPDF': "http://www.monolithedition.com/download/rules/CONAN_King_Overlordbook_V2_FR_SD.pdf"
        },
        'en': {
            'menu': "Rules",

            'skills': "Skills",
            'spell_clarification': "(Spell clarification) ",

            'equipments': "Used in the equipments cards:",
            'spells': "Used in the spells card:",
            'heroesOwned': "Owned by the heroes:",
            'tilesOwned': "Owned by the tiles:",
            'tokensUsed': "Related to the token:",

            'viewer-search': "Search in the document",
            'viewer-download': "Download the document",
            'viewer-zoomin': "Zoom in",
            'viewer-zoomout': "Zoom out",

            'search': "Search",
            'search-input': "Keyword",
            'search-inputPh': "Enter the keyword to search (3 characters minimum)",
            'search-loose': "No result is matching the entered keyword",

            'copyright': "The proposed rules are based upon the official rules and their complements but were partially rewriten.",

            'heroes': "Heroes's book",
            'heroesPDF': "http://www.monolithedition.com/download/rules/CONAN_Heroesrulebook_V2_US_SD.pdf",
            'overlord': "Overlord's book",
            'overlordPDF': "http://www.monolithedition.com/download/rules/CONAN_King_Overlordbook_V2_US_SD.pdf"
        },
        'it': {
            'menu': "Regole",

            'skills': "Abilità",
            'spell_clarification': "(Chiarimento incantesimi)",

            'equipments': "Usata nelle carte equipaggiamento :",
            'spells': "Usata nelle carte incantesimo :",
            'heroesOwned': "Possedute dagli Eroi :",
            'tilesOwned': "Usata nelle tessere :",
            'tokensUsed': "Relativo al segnalino :",

            'viewer-search': "Cerca nell'intero documento",
            'viewer-download': "Scarica il pdf",
            'viewer-zoomin': "Zoom in",
            'viewer-zoomout': "Zoom out",

            'search': "Cerca",
            'search-input': "Parola chiave",
            'search-inputPh': "Inserisci la parola chiave da cercare (minimo 3 caratteri)",
            'search-loose': "Nessun risultato corrispondente alla parola cercata",

            'copyright': "Le regole sono basate sul regolamento ufficiale e sui suoi complementi, ma sono parzialmente riscritte.",

            'heroes': "Libro degli Eroi",
            'heroesPDF': "https://the-overlord.net/index.php?/files/file/156-conan-heroesrulebook-v21-ita/&do=download&csrfKey=13ba91465f0a9eabcc05c76aca3e785f",
            'overlord': "Libro dell'Overlord",
            'overlordPDF': "https://the-overlord.net/index.php?/files/file/157-conan_king_overlordbook_v21_ita_txt/&do=download&csrfKey=13ba91465f0a9eabcc05c76aca3e785f"
        }
    },

    _allSkills: {
        'attack' : ['reach', 'ambidextrous', 'constriction', 'circular_strike', 'precision_strike', 'attack_from_beyond', 'counterattack', 'elite_shooter', 'precision_shot'],
        'movement': ['blocking', 'evasive', 'swimming', 'intangible', 'wall_wrecker', 'web_projection', 'leap', 'feline_grace', 'flying', 'climb'],
        'miscellaneous': ['alchemy', 'concentration', 'lock_picking', 'fascination', 'leadership', 'horror', 'jinx', 'poison', 'support'],
        'defense': ['sacrifice', 'bodyguard', 'untouchable', 'protected'],
        'magic': ['spell_caster', 'teleportation']
    },

    init: function()
    {
        ConanRules._lastSearch = "";

        Nav.addIcon(ConanRules._i18n[Language].menu, "rules-icon", "rules");

        Nav.createTabs('rules', [
            {label: ConanRules._i18n[Language].skills, id: "skills"},
            {label: ConanRules._i18n[Language].heroes, id: "heroes"},
            {label: ConanRules._i18n[Language].overlord, id: "overlord"}
        ], ConanRules._onChange);

        ConanRules._initSkills();

        $("#heroes").addClass("zoom0 rules-viewer").html("<div>" + this._createViewer("rules/heroes/" + Language + "/book", 24) + "</div>");
        ConanRules._attachEvents("#heroes");
        $("#overlord").addClass("zoom0 rules-viewer").html("<div>" + this._createViewer("rules/overlord/" + Language + "/book", 14) + "</div>");
        ConanRules._attachEvents("#overlord");

        Nav.addAction("rules", ConanRules._i18n[Language]['viewer-zoomin'], "rules-zoomin-icon", "zoomin", ConanRules._zoomIn);
        Nav.addAction("rules", ConanRules._i18n[Language]['viewer-zoomout'], "rules-zoomout-icon", "zoomout", ConanRules._zoomOut);
        Nav.addAction("rules", ConanRules._i18n[Language]['viewer-search'], "rules-search-icon", "search", ConanRules._search);
        Nav.addAction("rules", ConanRules._i18n[Language]['viewer-download'], "rules-download-icon", "download", ConanRules._download);
        ConanRules._onChange();

        ConanAbout.addCopyright(ConanRules._i18n[Language].menu, ConanRules._i18n[Language].copyright);
    },

    _download: function()
    {
        switch (ConanRules._currentSlide)
        {
            case 0:
                window.open(Encyclopedia.skills.link[Language]);
                break;
            case 1:
                window.open(ConanRules._i18n[Language].heroesPDF);
                break;
            case 2:
                window.open(ConanRules._i18n[Language].overlordPDF);
                break;
        }
    },

    _search: function()
    {
        Nav.dialog(ConanRules._i18n[Language].search,
            "<div id='rulessearch' class='rulessearch'>"
            +   "<div class='form'>"
            +       "<label for='rulessearch'>" + ConanRules._i18n[Language]['search-input'] + "</label>"
            +       "<input type='text' id='rulessearch' onkeyup='ConanRules._doSearch()' onchange='ConanRules._doSearch()' placeholder='" + ConanRules._i18n[Language]['search-inputPh'] + "'/>"
            +   "</div>"
            +   "<div class='results'>"
            +   "</div>"
            + "</div>"
        );
        $("#rulessearch input").focus()[0].value = ConanRules._lastSearch;

        // loading keywords
        if (!ConanRules.keywords || !ConanRules.keywords[ConanRules._currentSlide])
        {
            $("#rulessearch input").prop('disabled', true);
            ConanRules.keywords = ConanRules.keywords || {};
            $.getJSON("rules/" + (ConanRules._currentSlide == 1 ? "heroes" : "overlord") + "/" + Language + "/book/search.json?version=" + Version, null, function(data) { ConanRules.keywords[ConanRules._currentSlide] = data; $("#rulessearch input").prop('disabled', false).focus(); ConanRules._doSearch(true); });
        }
        else
        {
            ConanRules._doSearch(true);
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
        if (ConanRules._lastSearch == searchTerm && force !== true)
        {
            return;
        }

        ConanRules._lastSearch = searchTerm;
        searchTerm = ConanRules._deemphasize(searchTerm);

        $("#rulessearch input").attr('data-last-search', searchTerm);
        if ((searchTerm || '').length < 3)
        {
            $("#rulessearch .results").html("");
            return;
        }

        var textContent = ConanRules.keywords[ConanRules._currentSlide];

        var results = "";
        for (var i = 0; i < textContent.length; i++)
        {
            var pageContent = ConanRules._deemphasize(textContent[i]);
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

                    if (!pageHasResults) results += "<li><a href='#' onclick='ConanRules._endPageSearch(this, arguments[0], " + (i+1) + ")'><img src=\"rules/" + (ConanRules._currentSlide == 1 ? "heroes" : "overlord") + "/" + Language + "/book/thumbnails/" + (i+1) + ".jpg?version=" + Version + "\"/><br/>Page " + (i+1) + "</a><ul>";
                    results += "<li>"
                                    + "<a href='#' onclick='ConanRules._endSearch(" + (i+1) +", 0, " + guessRatioY + ")'>"
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
            $("#rulessearch .results").html(ConanRules._i18n[Language]['search-loose'])
        }
    },

    _endPageSearch: function(me, e, page)
    {
        var imgLocation = $(me).offset();
        var ratioX = (e.pageX - imgLocation.left) / $(me).width();
        var ratioY = (e.pageY - imgLocation.top) / $(me).height();

        ConanRules._endSearch(page, ratioX, ratioY)
    },

    _endSearch: function(page, ratioX, ratioY)
    {
        var div = $(["#heroes", "#overlord"][ConanRules._currentSlide - 1]);
        if (!div.is("zoom3") && !div.is("zoom2"))
        {
            div.removeClass("zoom1").removeClass("zoom0").addClass("zoom2");
        }

        ConanRules._scrollTo(page, ratioX, ratioY);

        Nav.closeDialog();
    },

    _attachEvents: function(selector)
    {
        // Attach thumbnails events
        $(selector + " .thumbnails img").on('click', function(e) {
            var imgLocation = $(this).offset();
            var ratioX = (e.pageX - imgLocation.left) / $(this).width();
            var ratioY = (e.pageY - imgLocation.top) / $(this).height();
            ConanRules._zoom(1, $(this).attr('data-page'), ratioX, ratioY);
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

                ConanRules._zoom(1, page, ratioX, ratioY);
            });
       });
    },

    _onChange: function(event, slick)
    {
        var slide = slick && slick.currentSlide || 0;
        ConanRules._currentSlide = slide;

        if (slide == 0)
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
        ConanRules._zoom(1);
    },

    _zoomOut: function()
    {
        ConanRules._zoom(-1);
    },

    _scrollTo: function(specificPage, ratioX, ratioY)
    {
        var div = $(["#heroes", "#overlord"][ConanRules._currentSlide - 1]);

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
        var div = $(["#heroes", "#overlord"][ConanRules._currentSlide - 1]);

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
            ConanRules._scrollTo(specificPage, ratioX, ratioY);
        }
        else
        {
            // Try to auto stay at the same place
            div.scrollTop(cursor * newFullHeight - height / 2);
        }
    },

    _initSkills: function()
    {
        $("#skills").html("<div></div>");

        for (var i in Encyclopedia.skills.types)
        {
            var type = Encyclopedia.skills.types[i];

            $('#skills > div').append("<div id='skills_" + type.id + "' class='skill-tab'><h2>" + type.title[Language] + "</h2></div>");

            for (var j in Encyclopedia.skills.list)
            {
                var skill = Encyclopedia.skills.list[j];
                if (skill.type == type.id)
                {
                    ConanRules._addSkill(skill.id,
                                         skill.type,
                                         skill.image,
                                         skill.title[Language],
                                         skill.text[Language]);
                }
            }
        }

        var handled = [];
        for (var i in Encyclopedia.spells.list)
        {
            var spell = Encyclopedia.spells.list[i];
            if (spell.clarification && spell.clarification[Language] && ConanAbout._hasExpansion(spell.origins) && handled.indexOf(spell.id) == -1)
            {
                handled.push(spell.id)
                ConanRules._addSkill(null,
                                    'magic',
                                     spell.image,
                                     spell.title[Language],
                                     ConanRules._i18n[Language].spell_clarification + spell.clarification[Language]);
            }
        }
    },

    _addSkill: function(id, type, image, title, text)
    {
        $('#skills_' + type).append((id ? "<a href='javascript:void(0)' onclick='ConanRules.openSkill(\"" + id + "\")'>" : "")
            + ConanRules._skill2HTML(id, type, image, title, text)
            + (id ? "</a>" : ""));
    },

    _skill2HTML: function(id, type, image, title, text)
    {
        return "<div class='skills-skill'>"
            +   "<img loading=\"lazy\" src='" + image + "?version=" + Version + "'/>"
            +   "<div class='skills-title'>" + title + "</div>"
            +   "<div class='skills-text'>" + ConanRules._replace(text) + "</div>"
            +   "<div class='clear'></div>"
            + "</div>";
    },

    _replace: function(text)
    {
        text = text.replace(/\{(.*?)\}/g, "<img src='resources/img/$1.png?version=" + Version + "' class='rules-character'/>");
        return text;
    },

    _linkToSkill: function(id, big)
    {
        big = big || false;

        var index = id.indexOf('/');
        if (index > 0)
        {
            id = id.substring(index + 1);
        }

        var skill = ConanRules._findSkillById(id);

        var s = "<a href='javascript:void(0)' class='openskill' onclick='ConanRules.openSkill(\"" + id + "\")'>";
        if (!big)
        {
            s += skill.title[Language];
        }
        else
        {
            s += ConanRules._skill2HTML(skill.id, skill.type, skill.image, skill.title[Language], skill.text[Language]);
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

    _findSkillByToken: function(tokenId)
    {
        for (var i in Encyclopedia.skills.list)
        {
            var skill = Encyclopedia.skills.list[i];
            if (skill.token && skill.token.indexOf(tokenId) >= 0)
            {
                return skill;
            }
        }

        return null;
    },

    openSkill: function(id) {
        var skill = ConanRules._findSkillById(id);

        var eqS = EncyclopediaEquipments._findEquipmentsBySkill(id).map(eq => EncyclopediaEquipments._linkToEquipment(eq.id)).join(", ");
        var spS = EncyclopediaSpells._findSpellsBySkill(id).map(spell => EncyclopediaSpells._linkToSpell(spell.id)).join(", ");
        var heS = EncyclopediaHeroes._findHeroesBySkill(id).map(hero => EncyclopediaHeroes._linkToHero(hero.id)).join(", ");
        var tiS = EncyclopediaTiles._findTilesBySkill(id).map(tile => EncyclopediaTiles._linkToTile(tile.id)).join(", ");
        var tokens = skill.token ? EncyclopediaTokens._linkToToken(skill.token, true) : "";

        Nav.dialog(skill.title[Language],
            "<div class='skillsdetails'>"
                + ConanRules._skill2HTML(skill.id, skill.type, skill.image, skill.title[Language], skill.text[Language])
                + (eqS ? ("<div class='equipments'>" + ConanRules._i18n[Language].equipments + " " + eqS + "</div>") : "")
                + (spS ? ("<div class='spells'>" + ConanRules._i18n[Language].spells + " " + spS + "</div>") : "")
                + (heS ? ("<div class='heroes'>" + ConanRules._i18n[Language].heroesOwned + " " + heS + "</div>") : "")
                + (tiS ? ("<div class='tiles'>" + ConanRules._i18n[Language].tilesOwned + " " + tiS + "</div>") : "")
                + (tokens ? ("<div class='tokens'>" + ConanRules._i18n[Language].tokensUsed + " " + tokens + "</div>") : "")
            + "</div>",
            null,
            []
        );
//        alert(id)
    }
}
