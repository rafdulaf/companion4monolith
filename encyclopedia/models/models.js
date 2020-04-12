var EncyclopediaModels = {
    _i18n: {
        'fr': {
            'tab': "Figu<wbr/>rines",
            'from': "Disponible dans :",
            'fromAnd': "<br/>et",
            'model': "figurine",
            'models': "figurines",
            'paintedBy': "Peint par: ",
            'zoom': "Zoom",
            'print': "Imprimer",
            'heroes': "Utilisée par les héros :"
        },
        'en': {
            'tab': "Models",
            'from': "Available in:",
            'fromAnd': "<br/>and",
            'model': "model",
            'models': "models",
            'paintedBy': "Painted par: ",
            'zoom': "Zoom",
            'print': "Print",
            'heroes': "Used by the heroes:"
        }
    },
    
    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaModels._i18n[Language].tab, id: "encyclopedia-models", onShow: EncyclopediaModels.onShow,  onHide: EncyclopediaModels.onHide });
        
        
        EncyclopediaModels._facets = [
            {
                id: 'keyword',
                label: {
                    'fr': "Mot-clé",
                    'en': "Keyword"
                },
                filter: function(item, value)
                {
                    return ConanRules._deemphasize(EncyclopediaModels._findModelNames(item)).indexOf(ConanRules._deemphasize(value)) != -1;
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
            }
        ]        
    },
    
    init: function() 
    {
        $("#encyclopedia-models").append(Encyclopedia.displaySearchEngine(EncyclopediaModels._facets, "EncyclopediaModels.displayModels()", "ems"));
        $("#encyclopedia-models").append("<div id='encyclopedia-models-wrapper'></div>");
        EncyclopediaModels.displayModels();
    },
    
    displayModels: function()
    {
        Encyclopedia.updateFacets(EncyclopediaModels._facets, Encyclopedia.models.list, "ems");
        
        var models = "";
        
        Encyclopedia.models.list.sort(function(s1, s2) { return EncyclopediaModels._findModelNames(s1).toLowerCase().localeCompare(EncyclopediaModels._findModelNames(s2).toLowerCase()); })
        
        var modelList = Encyclopedia.models.list.filter(Encyclopedia.filter(EncyclopediaModels._facets, "ems"));
        var ignoredPrevious = 0;
        for (var i in modelList)
        {
            i = parseInt(i);
            var model = modelList[i];

            if (i < modelList.length - 1
                && modelList[i+1].id == model.id)
            {
                ignoredPrevious++;
                continue;
            }
            
            model = modelList[i - ignoredPrevious];
            
            models += "<a href='javascript:void(0)' data-count='" + (ignoredPrevious+1) + "' onclick='EncyclopediaModels.openModel(\"" + model.id + "\")'>";
            models += "<div>";
            models += "<img src='" + model.images[0] + "?version=" + Version + "'/>";
            models += "<span>" + EncyclopediaModels._findModelNames(model) + "</span>"
            models += "</div>";
            models += "</a>";
            
            ignoredPrevious = 0;
        }
        
        $("#encyclopedia-models-wrapper").html(models);
    },
    
    _findModelNames: function(model)
    {
        var names = [];
        
        if (model)
        {
            for (var i in Encyclopedia.heroes.list)
            {
                var hero = Encyclopedia.heroes.list[i];
                if (hero.model == model.id)
                {
                    var name = hero.name[Language] + (hero.subname ? " <span>" + hero.subname[Language] + "</span>" : "");
                    if (names.indexOf(name) == -1)
                        names.push(name);
                }
            }
        }
        
        return names.join(" / ") || "...";
    },
    
    _findModelsById: function(id)
    {
        var models = [];
        
        for (var i in Encyclopedia.models.list)
        {
            var model = Encyclopedia.models.list[i];
            if (model.id == id)
            {
                models.push(model);
            }
        }
        
        return models;
    },
    
        
    onShow: function() {
    },
    
    onHide: function() {
    },
    
    openModel: function(id) {
        var models = EncyclopediaModels._findModelsById(id);

        var originsCount = {};
        for (var e in models)
        {
            var model = models[e];
            
            var origins = Encyclopedia._removeExtraExpansion(model.origins.slice());
            for (var i in origins)
            {
                var origin = origins[i];
                originsCount[origin] = originsCount[origin] ? originsCount[origin]+1 : 1;
            }
        }
        
        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaModels._i18n[Language].fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaModels._i18n[Language].model : EncyclopediaModels._i18n[Language].models) + ")";
        }
        
        var model = models[0];
        
        var photos = "<div class='photos'>";
        for (var i in model.images)
        {
            photos += "<img src='" + model.images[i] + "?version=" + Version + "'/>"
        }
        photos += "</div>";
        
        var heroes = "";
        for (var i in Encyclopedia.heroes.list)
        {
            var hero = Encyclopedia.heroes.list[i];
            if (hero.model == model.id)
            {
                if (heroes) heroes += ", ";
                heroes += EncyclopediaHeroes._linkToHero(hero.id);
            }
        }
        if (heroes) heroes = "<div class='heroes'>" + EncyclopediaModels._i18n[Language].heroes + " " + heroes + "</div>";
         
        Nav.dialog(EncyclopediaModels._findModelNames(model) || "",
            "<div class='modeldetails'>" 
                + "<div class='from'>" + EncyclopediaModels._i18n[Language].from + " "
                    + originString
                + "</div>"
                + heroes
                + (model.paint ? ("<div class='painter'>" + EncyclopediaModels._i18n[Language].paintedBy + " <a target='_blank' href='" + model.paint.link + "'>" + model.paint.name + "</a></div>") : "")
                + photos
            + "</div>",
            null,
            [{
                label: EncyclopediaModels._i18n[Language].zoom,
                icon: "encyclopedia-models-zoom",
                fn: "EncyclopediaModels._zoom();"
            }, {
                label: EncyclopediaModels._i18n[Language].print,
                icon: "encyclopedia-models-print",
                fn: "window.print()"
            }]
        );
    },
    
    _zoom: function()
    {
        $(".modeldetails .photos").toggleClass("zoom");
    },
    
    _linkToModel: function(id, image) {
        var model = EncyclopediaModels._findModelsById(id)[0];
        var name = EncyclopediaModels._findModelNames(model);
        
        var s = "";
        if (model)
        {
            s += "<a href='javascript:void(0)' onclick='EncyclopediaModels.openModel(\"" + id + "\")'>";
            if (image)
            {
                s += "<img src='" + model.images[0] + "?version=" + Version + "'/>";
                s += "<span>" + name + "</span>"
            }
            else
            {
                s += name;
            }
            s += "</a>";
        }
        return s;
    }
};
