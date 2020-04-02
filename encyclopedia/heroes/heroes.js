var EncyclopediaHeroes = {
    _i18n: {
        'fr': {
            'tab': "Héros",
            'from': "Disponible dans :",
            'fromAnd': "<br/>et",
            'skill': "Compétences :"
        },
        'en': {
            'tab': "Heroes",
            'from': "Available in:",
            'fromAnd': "<br/>and",
            'skill': "Skills:"
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
                    'en': "Keyword"
                },
                filter: function(item, value)
                {
                    return ConanRules._deemphasize(item.name[Language] + (item.subname ? " " + item.subname[Language] : "")).indexOf(ConanRules._deemphasize(value)) != -1;
                }
            },
            
            {
                id: 'expansions',
                label: {
                    'fr': "Status",
                    'en': "Status" 
                },
                values: [
                    {
                        id: "yes",
                        label: {
                            'fr': "Possédées",
                            'en': "Owned"
                        }
                    },
                    {
                        id: "no",
                        label: {
                            'fr': "Manquantes",
                            'en': "Missing"
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
                        var hasExpansion = ConanAbout._hasExpansion(item.origins); 
                        return hasExpansion && selectedValues[0] == 'yes'
                                || !hasExpansion && selectedValues[0] == 'no'
                    }
                }
            },
            
            {
                id: 'origins',
                label: {
                    'fr': "Origine",
                    'en': "Origin"
                },
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
            }
        ]        
    },
    
    init: function() 
    {
        $("#encyclopedia-heroes").append(Encyclopedia.displaySearchEngine(EncyclopediaHeroes._facets, "EncyclopediaHeroes.displayHeroes()", "ehs"));
        $("#encyclopedia-heroes").append("<div id='encyclopedia-heroessheet-wrapper'></div>");
        EncyclopediaHeroes.displayHeroes();
    },
    
    updateFacets: function()
    {
        for (var i in EncyclopediaHeroes._facets)
        {
            var facet = EncyclopediaHeroes._facets[i];
            if (facet.values)
            {
                var nonEmptyFacets = 0;
                for (var v in facet.values)
                {
                    var value = facet.values[v];
                    
                    var count = Encyclopedia.heroes.list.filter(EncyclopediaHeroes._filter(facet, value)).length;
                    $("#ehs-" + facet.id + "-" + value.id).parent().attr('data-count', count);
                    if (count) nonEmptyFacets++;
                }                
                $("#ehs-" + facet.id).attr("data-count", nonEmptyFacets);
            }
        }
    },
    
    _filter: function(forcedFacet, forcedValue)
    {
        return function(e) {
            for (var i in EncyclopediaHeroes._facets)
            {
                var facet = EncyclopediaHeroes._facets[i];
                
                var selectedValues = [];
                if (forcedFacet && facet.id == forcedFacet.id)
                {
                    selectedValues.push(forcedValue.id);
                }
                else
                {
                    if (facet.values)
                    {
                        for (var v in facet.values)
                        {
                            var value = facet.values[v];
                            
                            if ($("#ehs-" + facet.id + "-" + value.id)[0].checked)
                            {
                                selectedValues.push(value.id);
                            }
                        }
                    }
                    else
                    {
                        selectedValues.push($("#ehs-" + facet.id + "-input").val());
                    }
                }
                
                if ((facet.values
                    && selectedValues.length > 0
                    && !facet.filter(e, selectedValues))
                    
                    ||
                    
                    (!facet.values && selectedValues[0] && !facet.filter(e, selectedValues[0])))
                {
                    return false;
                }
            }
            
            return true;
        }
    },
        
    displayHeroes: function()
    {
        EncyclopediaHeroes.updateFacets();
        
        var heroes = "";
        
        Encyclopedia.heroes.list.sort(function(s1, s2) {
            var c = s1.name[Language].toLowerCase().localeCompare(s2.name[Language].toLowerCase());
            if (c == 0)
                return (s1.subname ? s1.subname[Language] : "").localeCompare(s2.subname ? s2.subname[Language] : "");
            else
                return c; 
        });
        
        var heroList = Encyclopedia.heroes.list.filter(EncyclopediaHeroes._filter());
        for (var i in heroList)
        {
            i = parseInt(i);
            var hero = heroList[i];
                        
            heroes += "<a href='javascript:void(0)' onclick='EncyclopediaHeroes.openSheet(\"" + hero.id + "\")'>";
            heroes += HeroSheet._sheetCode(EncyclopediaHeroes._convertHeroToStudio(hero));
            heroes += "</a>";
        }
        
        $("#encyclopedia-heroessheet-wrapper").html(heroes);
    },
    
    _convertHeroToStudio: function(hero)
    {
        return {
            id: hero.id + "-" + Math.random(),
            name: hero.name[Language],
            subname: hero.subname ? hero.subname[Language] : "",
            
            image: hero.image ? hero.image + "?version=" + Version : null,
            imageEffect: false,
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
            if (skills) skills += ", "
            skills += ConanRules._linkToSkill(sheet.skills[s].id); 
        }
        skills = "<div class='skill'>" + EncyclopediaHeroes._i18n[Language].skill + " " + skills;
        skills += "</div>";
        
        var superdetails = "";
        superdetails += "<div class='superdetails'>";
        superdetails += "<img src=\"" + sheet.image + "?version=" + Version + "\"/>";
        if (sheet.quote)
        {
            superdetails += "<div class='text'>" + sheet.quote.text[Language] + "<br/>" + sheet.quote.author.name + " - " + sheet.quote.origin[Language] + "</div>";
        }
        superdetails += "</div>";
        
        var model = "";
        if (sheet.model)
        {
            var m = EncyclopediaModels._findModelsById(sheet.model)[0];
            model = "<div class='models'>" 
                    + EncyclopediaModels._linkToModel(sheet.model, true) 
                    + "</div>";
        }
         
        Nav.dialog((sheet.name[Language] + (sheet.subname ? " " + sheet.subname[Language] : "")) || "",
            "<div class='herodetails'>" 
                + "<div class='from'>" + EncyclopediaHeroes._i18n[Language].from + " "
                    + originString
                + "</div>"
                + skills
                + model
                + HeroSheet._sheetCode(EncyclopediaHeroes._convertHeroToStudio(sheet))
                + superdetails
            + "</div>",
            null,
            [{
                label: EncyclopediaHeroes._i18n[Language].transfertToStudio,
                icon: "encyclopedia-heroes-tostudio",
                fn: "EncyclopediaHeroes._transfert('" + id + "');"
            }]
        );
    },
    
    _transfert: function(id) {
        // TODO
        alert("In contruction")
    },
        
    _linkToHero: function(id) {
        var hero = EncyclopediaHeroes._findHeroById(id);
        return "<a href='javascript:void(0)' onclick='Nav.closeDialog(); EncyclopediaHeroes.openSheet(\"" + id + "\")'>" + hero.name[Language] + (hero.subname ? " " + hero.subname[Language] : "") + "</a>";
    }
};
