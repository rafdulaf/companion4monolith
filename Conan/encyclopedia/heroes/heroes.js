var EncyclopediaHeroes = {
    preinit: function()
    {
        Encyclopedia._slides.push({ label: EncyclopediaHeroes._i18n.tab, shortLabel: EncyclopediaHeroes._i18n.shorttab, id: "encyclopedia-heroes", onShow: EncyclopediaHeroes.onShow,  onHide: EncyclopediaHeroes.onHide });


        EncyclopediaHeroes._facets = Utils.mergeObject([
            {
                id: 'keyword',
                filter: function(item, value)
                {
                    return (item.name_deemphasized + (item.subname ? ' ' + item.subname_deemphasized : '')).indexOf(Rules._deemphasize(value)) != -1;
                }
            },

            {
                id: 'expansions',
                values: [ { id: "yes" }, { id: "no" } ],
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
                values: [ { id: '-9' }, { id: '10-11' }, { id: '12-' } ],
                filter: function(item, selectedValues) {
                    return (item.gems <= 9 && selectedValues.indexOf('-9') != -1)
                        || (item.gems > 9 && item.gems < 12 && selectedValues.indexOf('10-11') != -1)
                        || (item.gems >= 12 && selectedValues.indexOf('12-') != -1);
                }
            },

            {
                id: 'reddie',
                sort: true,
                operator: "or/and",
                values: [ { id: 'melee' }, { id: 'ranged' }, { id: 'guard' }, { id: 'manipulation' } ],
                filter: function(item, selectedValues) {
                    return (selectedValues.indexOf("melee") != -1 && (item.melee.dice.startsWith("red") || item.melee.dice.startsWith("orangereroll")))
                        || (selectedValues.indexOf("ranged") != -1 && (item.ranged.dice.startsWith("red") || item.ranged.dice.startsWith("orangereroll")))
                        || (selectedValues.indexOf("defense") != -1 && (item.defense.dice.startsWith("red") || item.defense.dice.startsWith("orangereroll")))
                        || (selectedValues.indexOf("manipulation") != -1 && (item.manipulation.dice.startsWith("red") || item.manipulation.dice.startsWith("orangereroll")));
                }
            },

            {
                id: 'skills',
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
                operator: "or/and",
                values: [
                    { id: 'warrior' }, { id: 'rogue' }, { id: 'sorcerer' }, { id: 'mercenary' },
                    { id: 'warrior-nr' }, { id: 'rogue-nr' }, { id: 'sorcerer-nr' }, { id: 'mercenary-nr' },
                    { id: 'none' }
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
        ], EncyclopediaHeroes._facets);
    },

    init: function()
    {
        EncyclopediaHeroes.debouncedUpdateDisplayHeroes = $.debounce(250, EncyclopediaHeroes.updateDisplayHeroes);
        Encyclopedia.displaySearchEngine("encyclopedia-heroes", EncyclopediaHeroes._facets, "EncyclopediaHeroes.updateDisplayHeroes()", "EncyclopediaHeroes.debouncedUpdateDisplayHeroes()", "ehs");
        $("#encyclopedia-heroes .search-wrapper").append("<div id='encyclopedia-heroessheet-wrapper'></div>");
        AutoZoom.autozoom("encyclopedia-heroessheet-wrapper", 604, 346.9);
        EncyclopediaHeroes.displayHeroes();
    },

    displayHeroes: function()
    {
        var heroes = "";

        Encyclopedia.heroes.list.sort(function(s1, s2) {
            var c = s1.name.toLowerCase().localeCompare(s2.name.toLowerCase());
            if (c == 0)
                return (s1.subname ? s1.subname : "").localeCompare(s2.subname ? s2.subname : "");
            else
                return c;
        });

        var heroList = Encyclopedia.heroes.list;
        for (var i in heroList)
        {
            i = parseInt(i);
            var hero = heroList[i];

            heroes += "<a id='hero-" + hero.id + "' href='javascript:void(0)' onclick='EncyclopediaHeroes.openSheet(\"" + hero.id + "\")'>";
            heroes += HeroSheet._cardCode(EncyclopediaHeroes._convertHeroToStudio(hero, false));
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
            name: hero.name,
            subname: hero.subname ? hero.subname : "",

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

    openSheet: async function(id) {
        var sheet = EncyclopediaHeroes._findHeroById(id);

        var originString = "";
        var origins = sheet.origins.slice();
        for (var i in origins)
        {
            if (originString) originString += " " + EncyclopediaHeroes._i18n.fromAnd + " ";
            originString += Encyclopedia._getOrigin(origins[i]);
        }

        var skills = "";
        for (var s in sheet.skills)
        {
            skills += Rules._linkToSkill(sheet.skills[s].id, true);
        }
        skills = "<div class='skill'>" + EncyclopediaHeroes._i18n.skill + "<br/>" + skills;
        skills += "</div>";

        var superdetails = "";
        if (sheet.quote)
        {
            superdetails += "<div class='superdetails'>" + EncyclopediaHeroes._i18n.story + "<br/><div class='img' style='background-image: url(" + sheet.image + "?version=" + Version + ")'></div>";
            superdetails += "<div><p>" + sheet.quote.text.replace(/\n/g,'<br/><br/>') + "</p><p><span>" + sheet.quote.author.name + " - " + sheet.quote.origin + "</span></p>";
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
        
        var classText = "";
        if (sheet['class'])
        {
            classText = "<div class='classtext'>" + EncyclopediaHeroes._i18n['class'] + " ";
            for (var i = 0; i < sheet['class'].length; i++)
            {
                if (i != 0)
                {
                    classText += ", ";
                }
                
                classText += EncyclopediaHeroes._i18n['class-' + sheet['class'][i].type];
                if (sheet['class'][i]['not-recommanded'])
                {
                    classText += EncyclopediaHeroes._i18n['class-nr'];
                }
            }
            classText += ".</div>";
        }

        var actions = [];
        if (sheet.pdf)
        {
            actions.push({
                label: EncyclopediaHeroes._i18n.download,
                icon: "encyclopedia-heroes-download",
                fn: "EncyclopediaHeroes._download('" + id + "');"
            });
        }
        actions.push({
            label: EncyclopediaHeroes._i18n.transfertToStudio,
            icon: "encyclopedia-heroes-tostudio",
            fn: "EncyclopediaHeroes._transfert('" + id + "');"
        });
        
        let altTitle = "";
        if (Language2 && Language2 != Language)
        {
            try
            {
                if (!EncyclopediaHeroes._secondaryData)
                {
                    EncyclopediaHeroes._secondaryData = await Utils.loadJSON("data/heroes/lang/heroes." + Language2 + ".json");
                }
                let sheet2 = EncyclopediaHeroes._secondaryData.list[sheet.id];
                altTitle = sheet2.name
                        + (sheet2.subname ? " " + sheet2.subname : "");
            }
            catch (e)
            {
                console.error("Cannot download the " + Language2 + " file of heroes", e);
            }
        }   
        let title =  ((sheet.name + (sheet.subname ? " " + sheet.subname : "")) || "");    

        Nav.dialog(title + ((altTitle && altTitle != title) ? " / " + altTitle : ""),
            "<div class='herodetails'>"
                + "<div class='from'>" + EncyclopediaHeroes._i18n.from + " "
                    + originString
                + "</div>"
                + model
                + HeroSheet._cardCode(EncyclopediaHeroes._convertHeroToStudio(sheet, false))
                + classText
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
        if (confirm(EncyclopediaHeroes._i18n.transfertConfirm))
        {
            var cards = JSON.parse(localStorage.getItem(HeroSheet.storage)) || [];

            var hero = EncyclopediaHeroes._findHeroById(id);
            var studioHero = EncyclopediaHeroes._convertHeroToStudio(hero, true);
            cards.push(studioHero);

            localStorage.setItem(HeroSheet.storage, JSON.stringify(cards));

            HeroSheet._displayCards();

            Nav.switchTo($("*[for=studio]")[0]);
            $("#studio .nav-wrapper").slick('slickGoTo', $("#hero").index());
            $("#hero").animate({ scrollTop: $('#hero > *:last()').position().top },500);

            About.warnToast(EncyclopediaHeroes._i18n.transfertOK)
            Nav.closeDialog(true);
        }
    },

    _linkToHero: function(id) {
        var hero = EncyclopediaHeroes._findHeroById(id);
        return "<a href='javascript:void(0)' onclick='EncyclopediaHeroes.openSheet(\"" + id + "\")'>" + hero.name + (hero.subname ? " " + hero.subname : "") + "</a>";
    }
};
