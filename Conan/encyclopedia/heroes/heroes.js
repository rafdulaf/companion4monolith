var EncyclopediaHeroes = {
    _i18n: {
        'fr': {
            'tab': "Héros",
            'transfertToStudio': "Copier la fiche dans le studio",
            'transfertOK': "La fiche a été copiée dans le studio des fiches de héros",
            'transfertConfirm': "Voulez-vous copier la fiche dans le studio pour pouvoir la modifier ou l'imprimer ?",
            'download': "Télécharger le document",
            'from': "Disponible dans :",
            'fromAnd': "<br/>et",
            'skill': "Compétences :",
            'story': "Histoire :"
        },
        'en': {
            'tab': "Heroes",
            'transfertToStudio': "Copy the sheet into the studio",
            'transfertOK': "The sheet was copied to the heroes sheets studio",
            'transfertConfirm': "Do you want to copy the sheet into the studio in order to edit it or print it?",
            'download': "Download the document",
            'from': "Available in:",
            'fromAnd': "<br/>and",
            'skill': "Skills:",
            'story': "Story :"
        },
        'it': {
            'tab': "Eroi",
            'transfertToStudio': "Copia nello Studio",
            'transfertOK': "La scheda dell'Eroe è stata copiata nello Studio",
            'transfertConfirm': "Vuoi copiare la scheda nello Studio per modificarla o stamparla?",
            'download': "Scarica il documento",
            'from': "Disponibile in:",
            'fromAnd': "<br/>e",
            'skill': "Abilità:",
            'story': "Storia:"
        }
    },

    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaHeroes._i18n[Language].tab, id: "encyclopedia-heroes", onShow: EncyclopediaHeroes.onShow,  onHide: EncyclopediaHeroes.onHide });


        EncyclopediaHeroes._facets = [
            {
                id: 'keyword',
                label: {
                    'fr': "Mot-clé",
                    'en': "Keyword",
                    'it': "Parola chiave"
                },
                filter: function(item, value)
                {
                    return Rules._deemphasize(item.name[Language] + (item.subname ? " " + item.subname[Language] : "")).indexOf(Rules._deemphasize(value)) != -1;
                }
            },

            {
                id: 'expansions',
                label: {
                    'fr': "Status",
                    'en': "Status",
                    'it': "Stato"
                },
                values: [
                    {
                        id: "yes",
                        label: {
                            'fr': "Possédées",
                            'en': "Owned",
                            'it': "Nella collezione"
                        }
                    },
                    {
                        id: "no",
                        label: {
                            'fr': "Manquantes",
                            'en': "Missing",
                            'it': "Mancante"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    if (selectedValues.length != 1)
                    {
                        return true;
                    }
                    else
                    {
                        var hasExpansion = About._hasExpansion(item.origins);
                        return hasExpansion && selectedValues[0] == 'yes'
                                || !hasExpansion && selectedValues[0] == 'no'
                    }
                }
            },

            {
                id: 'origins',
                label: {
                    'fr': "Origine",
                    'en': "Origin",
                    'it': "Origine"
                },
                sort: true,
                values: (function() {
                    var values = [];
                    for (var i in Encyclopedia.expansions.types)
                    {
                        var type = Encyclopedia.expansions.types[i];

                        for (var j in Encyclopedia.expansions.list)
                        {
                            var expansion = Encyclopedia.expansions.list[j];
                            if (expansion.type == type.id)
                            {
                                values.push({
                                    id: expansion.id,
                                    label: expansion.short
                                });
                            }
                        }
                    }
                    return values;
                })(),
                filter: function(item, selectedValues) {
                    var origins = item.origins.slice(0);
                    for (var i in Encyclopedia.expansions.types)
                    {
                        var startRemove = false;

                        var type = Encyclopedia.expansions.types[i];

                        for (var j in Encyclopedia.expansions.list)
                        {
                            var expansion = Encyclopedia.expansions.list[j];
                            if (expansion.type == type.id)
                            {
                                if (startRemove)
                                {
                                    origins = origins.filter(o => o != expansion.id);
                                }
                                else if (origins.indexOf(expansion.id) != -1)
                                {
                                    startRemove = true;
                                }
                            }
                        }
                    }
                    return origins.filter(v => selectedValues.indexOf(v) != -1).length > 0;
                }
            },

            {
                id: 'gems',
                label: {
                    'fr': "Gemmes",
                    'en': "Gems",
                    'it': "Gemme"
                },
                values: [
                        { id: '-9', label: { 'fr': 'Moins de 9', 'en': 'Less than 9', 'it': 'Meno di 9' }},
                        { id: '10-11', label: { 'fr': '10 ou 11', 'en': '10 or 11', 'it': '10 o 11' }},
                        { id: '12-', label: { 'fr': 'Plus de 12', 'en': 'More than 12', 'it': 'Più di 12' }}
                ],
                filter: function(item, selectedValues) {
                    return (item.gems <= 9 && selectedValues.indexOf('-9') != -1)
                        || (item.gems > 9 && item.gems < 12 && selectedValues.indexOf('10-11') != -1)
                        || (item.gems >= 12 && selectedValues.indexOf('12-') != -1);
                }
            },

            {
                id: 'reddie',
                label: {
                    'fr': "Force",
                    'en': "Strenght",
                    'it': "Talento"
                },
                sort: true,
                operator: "or/and",
                values: [
                    { id: 'melee', label: {'fr':"Corps à corps", 'en':"Melee", 'it':"Mischia" } },
                    { id: 'ranged', label: {'fr':"A distance", 'en':"Ranged", 'it':"Distanza"} },
                    { id: 'guard', label: {'fr':"Défense", 'en':"Guard", 'it':"Difesa"} },
                    { id: 'manipulation', label: {'fr':"Manipulation", 'en':"Manipulation", 'it':"Manipolazione"} }
                ],
                filter: function(item, selectedValues) {
                    return (selectedValues.indexOf("melee") != -1 && (item.melee.dice.startsWith("red") || item.melee.dice.startsWith("orangereroll")))
                        || (selectedValues.indexOf("ranged") != -1 && (item.ranged.dice.startsWith("red") || item.ranged.dice.startsWith("orangereroll")))
                        || (selectedValues.indexOf("defense") != -1 && (item.defense.dice.startsWith("red") || item.defense.dice.startsWith("orangereroll")))
                        || (selectedValues.indexOf("manipulation") != -1 && (item.manipulation.dice.startsWith("red") || item.manipulation.dice.startsWith("orangereroll")));
                }
            },

            {
                id: 'skills',
                label: {
                    'fr': "Compétences",
                    'en': "Skills",
                    'it': "Abilità"
                },
                sort: true,
                operator: "or/and",
                values: (function() {
                    var v = [];
                    for (var i in Encyclopedia.skills.list)
                    {
                        var skill = Encyclopedia.skills.list[i];
                        v.push({
                            id: skill.id,
                            label: skill.title
                        })
                    }
                    return v;
                })(),
                filter: function(item, selectedValues) {
                    for (var s in item.skills)
                    {
                        var skill = item.skills[s];
                        if (selectedValues.indexOf(skill.id) != -1) return true;
                    }
                    return false;
                }
            },

            {
                id: 'class',
                label: {
                    'fr': "Classe COOP",
                    'en': "COOP class",
                    'it': "Classe COOP"
                },
                operator: "or/and",
                values: [
                    { id: 'warrior', label: {'fr':"Guerrier", 'en':"Warrior", 'it':"Guerriero" } },
                    { id: 'rogue', label: {'fr':"Voleur", 'en':"Rogue", 'it':"Ladro"} },
                    { id: 'sorcerer', label: {'fr':"Sorcier", 'en':"Sorcerer", 'it':"Mago"} },
                    { id: 'mercenary', label: {'fr':"Mercenaire", 'en':"Sellsword", 'it':"Mercenario"} },
                    { id: 'warrior-nr', label: {'fr':"Guerrier (déconseillé)", 'en':"Warrior (not recommended)", 'it':"Guerriero (sconsigliato)"} },
                    { id: 'rogue-nr', label: {'fr':"Voleur (déconseillé)", 'en':"Rogue (not recommended)", 'it':"Ladro (sconsigliato)"} },
                    { id: 'sorcerer-nr', label: {'fr':"Sorcier (déconseillé)", 'en':"Sorcerer (not recommended)", 'it':"Mago (sconsigliato)"} },
                    { id: 'mercenary-nr', label: {'fr':"Mercenaire (déconseillé)", 'en':"Sellsword (not recommended)", 'it':"Mercenario (sconsigliato)"} },
                    { id: 'none', label: {'fr':"Aucun", 'en':"None", 'it':"Nessuna"} }
                ],
                filter: function(item, selectedValues) {
                    for (var i=0 ; i < selectedValues.length; i++)
                    {
                        if (item['class'] && item['class'].length > 0)
                        {
                            for (var j=0; j < item['class'].length; j++)
                            {
                                var clazz = item['class'][j];
                                if ((selectedValues[i].startsWith(clazz['type'])
                                    && ((clazz['not-recommanded'] && selectedValues[i].endsWith("-nr"))
                                        || (!clazz['not-recommanded'] && !selectedValues[i].endsWith("-nr")))))
                                {
                                    return true;
                                }
                            }
                        }
                        else if (selectedValues[i] == "none")
                        {
                            return true;
                        }
                    }
                    return false;
                }
            }
        ]
    },

    init: function()
    {
        $("#encyclopedia-heroes").append(Encyclopedia.displaySearchEngine(EncyclopediaHeroes._facets, "EncyclopediaHeroes.updateDisplayHeroes()", "ehs"));
        $("#encyclopedia-heroes").append("<div id='encyclopedia-heroessheet-wrapper'></div>");
        EncyclopediaHeroes.displayHeroes();
    },

    displayHeroes: function()
    {
        var heroes = "";

        Encyclopedia.heroes.list.sort(function(s1, s2) {
            var c = s1.name[Language].toLowerCase().localeCompare(s2.name[Language].toLowerCase());
            if (c == 0)
                return (s1.subname ? s1.subname[Language] : "").localeCompare(s2.subname ? s2.subname[Language] : "");
            else
                return c;
        });

        var heroList = Encyclopedia.heroes.list;
        for (var i in heroList)
        {
            i = parseInt(i);
            var hero = heroList[i];

            heroes += "<a id='hero-" + hero.id + "' href='javascript:void(0)' onclick='EncyclopediaHeroes.openSheet(\"" + hero.id + "\")'>";
            heroes += HeroSheet._sheetCode(EncyclopediaHeroes._convertHeroToStudio(hero, false));
            heroes += "</a>";
        }

        $("#encyclopedia-heroessheet-wrapper").html(heroes);
        EncyclopediaHeroes.updateDisplayHeroes();
    },

    updateDisplayHeroes: function()
    {
        Encyclopedia.updateFacets(EncyclopediaHeroes._facets, Encyclopedia.heroes.list, "ehs");

        $("#encyclopedia-heroessheet-wrapper a").hide();

        var heroList = Encyclopedia.heroes.list.filter(Encyclopedia.filter(EncyclopediaHeroes._facets, "ehs"));
        for (var i in heroList)
        {
            i = parseInt(i);
            var hero = heroList[i];

            $("#hero-" + hero.id).show();
        }
    },

    _convertHeroToStudio: function(hero, hd)
    {
        return {
            id: hero.id + "-" + Math.random(),
            name: hero.name[Language],
            subname: hero.subname ? hero.subname[Language] : "",

            image: hero.imageHD && hd ? hero.imageHD + "?version=" + Version : (hero.image ? hero.image + "?version=" + Version : null),
            imagelocation: hero.image_location || {x: "0", y: "50"},
            imagezoom: hero.image_zoom || "100",
            imagerotation: "0",

            gem: hero.gems,
            encumbrance: hero.encumbrance[0],
            encumbrance_movement: [hero.encumbrance[1], hero.encumbrance[2]],

            melee: hero.melee,
            ranged: hero.ranged,
            defense: hero.defense,
            movement: hero.movement,
            manipulation: hero.manipulation,

            skills: hero.skills
        };
    },

    _findHeroById: function(id)
    {
        for (var i in Encyclopedia.heroes.list)
        {
            var hero = Encyclopedia.heroes.list[i];
            if (hero.id == id)
            {
                return hero;
            }
        }

        throw new Error("No hero with id " + id);
    },

    _findHeroesBySkill: function(id)
    {
        var heroes = [];

        for (var i in Encyclopedia.heroes.list)
        {
            var hero = Encyclopedia.heroes.list[i];
            for (var j=0; j < hero.skills.length; j++)
            {
                if (hero.skills[j].id == id)
                {
                    heroes.push(hero);
                }
            }
        }

        return heroes;
    },

    onShow: function() {
    },

    onHide: function() {
    },

    openSheet: function(id) {
        var sheet = EncyclopediaHeroes._findHeroById(id);

        var originString = "";
        var origins = Encyclopedia._removeExtraExpansion(sheet.origins.slice());
        for (var i in origins)
        {
            if (originString) originString += " " + EncyclopediaHeroes._i18n[Language].fromAnd + " ";
            originString += Encyclopedia._getOrigin(origins[i]);
        }

        var skills = "";
        for (var s in sheet.skills)
        {
            skills += Rules._linkToSkill(sheet.skills[s].id, true);
        }
        skills = "<div class='skill'>" + EncyclopediaHeroes._i18n[Language].skill + "<br/>" + skills;
        skills += "</div>";

        var superdetails = "";
        if (sheet.quote)
        {
            superdetails += "<div class='superdetails'>" + EncyclopediaHeroes._i18n[Language].story + "<br/><div class='img' style='background-image: url(" + sheet.image + "?version=" + Version + ")'></div>";
            superdetails += "<div><p>" + sheet.quote.text[Language].replace(/\n/g,'<br/><br/>') + "</p><p><span>" + sheet.quote.author.name + " - " + sheet.quote.origin[Language] + "</span></p>";
            superdetails += "</div></div>";
        }

        var model = "";
        if (sheet.model)
        {
            var m = EncyclopediaModels._findModelsById(sheet.model)[0];
            if (m)
            {
                model = "<div class='models'>"
                        + EncyclopediaModels._linkToModel(sheet.model, true)
                        + "</div>";
            }
        }

        var actions = [];
        if (sheet.pdf)
        {
            actions.push({
                label: EncyclopediaHeroes._i18n[Language].download,
                icon: "encyclopedia-heroes-download",
                fn: "EncyclopediaHeroes._download('" + id + "');"
            });
        }
        actions.push({
            label: EncyclopediaHeroes._i18n[Language].transfertToStudio,
            icon: "encyclopedia-heroes-tostudio",
            fn: "EncyclopediaHeroes._transfert('" + id + "');"
        });

        Nav.dialog((sheet.name[Language] + (sheet.subname ? " " + sheet.subname[Language] : "")) || "",
            "<div class='herodetails'>"
                + "<div class='from'>" + EncyclopediaHeroes._i18n[Language].from + " "
                    + originString
                + "</div>"
                + model
                + HeroSheet._sheetCode(EncyclopediaHeroes._convertHeroToStudio(sheet, false))
                + skills
                + superdetails
            + "</div>",
            null,
            actions
        );
    },

    _download: function(id) {
        var hero = EncyclopediaHeroes._findHeroById(id);
        window.open(hero.pdf);
    },

    _transfert: function(id) {
        if (confirm(EncyclopediaHeroes._i18n[Language].transfertConfirm))
        {
            var cards = JSON.parse(localStorage.getItem(Application + "_StudioHeroSheets")) || [];

            var images = {};

            var hero = EncyclopediaHeroes._findHeroById(id);
            var studioHero = EncyclopediaHeroes._convertHeroToStudio(hero, true);
            cards.push(studioHero);

            localStorage.setItem(Application + "_StudioHeroSheets", JSON.stringify(cards));

            HeroSheet._displayCards();

            Nav.switchTo($("*[for=studio]")[0]);
            $("#studio .nav-wrapper").slick('slickGoTo', $("#hero").index());
            $("#hero").animate({ scrollTop: $('#hero > *:last()').position().top },500);

            About.warnToast(EncyclopediaHeroes._i18n[Language].transfertOK)
            Nav.closeDialog(true);
        }
    },

    _linkToHero: function(id) {
        var hero = EncyclopediaHeroes._findHeroById(id);
        return "<a href='javascript:void(0)' onclick='EncyclopediaHeroes.openSheet(\"" + id + "\")'>" + hero.name[Language] + (hero.subname ? " " + hero.subname[Language] : "") + "</a>";
    }
};
