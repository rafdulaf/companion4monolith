var EncyclopediaHeroes = {
    _i18n: {
        'fr': {
            'tab': "Héros"
        },
        'en': {
            'tab': "Heroes"
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
                    return ConanRules._deemphasize(item.title[Language] + item.text[Language]).indexOf(ConanRules._deemphasize(value)) != -1;
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
        
        Encyclopedia.heroes.list.sort(function(s1, s2) { return s1.name[Language].toLowerCase().localeCompare(s2.name[Language].toLowerCase()); })
        
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
        // TODO
        return {
            id: hero.id + "-" + Math.random(),
            name: hero.name[Language],
            image: hero.image ? hero.image + "?version=" + Version : null,
            imageEffect: false,
            imagelocation: {x: "0", y: "50"},
            imagezoom: "100",
            imagerotation: "0"
        };
    },
    
    onShow: function() {
    },
    
    onHide: function() {
    },
    
    openSheet: function(id) {
        // TODO
    }
};
