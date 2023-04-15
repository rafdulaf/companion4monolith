var EncyclopediaModels = {
    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaModels._i18n.tab, id: "encyclopedia-models", onShow: EncyclopediaModels.onShow,  onHide: EncyclopediaModels.onHide });

        EncyclopediaModels._facets = Utils.mergeObject([
            {
                id: 'keyword',
                filter: function(item, value)
                {
                    return Rules._deemphasize(EncyclopediaModels._findModelNames(item)).indexOf(Rules._deemphasize(value)) != -1;
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
                id: 'usage',
                sort: true,
                values: [ { id: "hero" }, { id: "overlord" }, { id: "none" } ],
                filter: function(item, selectedValues) {
                    for (var i = 0; i < selectedValues.length; i++)
                    {
                        switch (selectedValues[i])
                        {
                            case 'hero':
                                if (EncyclopediaModels._findHeroesByModel(item).length > 0)
                                {
                                    return true;
                                }
                                break;
                            case 'overlord':
                                if (EncyclopediaModels._findTilesByModel(item).length > 0)
                                {
                                    return true;
                                }
                                break;
                            case 'none':
                                if (EncyclopediaModels._findHeroesByModel(item).length == 0
                                    && EncyclopediaModels._findTilesByModel(item).length == 0)
                                {
                                    return true;
                                }
                        }
                    }
                    return false;
                }
            },
            
            {
                id: 'type',
                sort: true,
                values: [ { id: "human" }, { id: "animal" }, { id: "monster" }, { id: "scenery" } ],
                filter: function(item, selectedValues) {
                    for (var i = 0; i < selectedValues.length; i++)
                    {
                        if (selectedValues[i] == item.type)
                        {
                            return true;
                        }
                    }
                    return false;
                }
            }
        ], EncyclopediaModels._facets);
    },

    init: function()
    {
        EncyclopediaModels.debouncedUpdateDisplayModels = $.debounce(250, EncyclopediaModels.updateDisplayModels);
        Encyclopedia.displaySearchEngine("encyclopedia-models", EncyclopediaModels._facets, "EncyclopediaModels.updateDisplayModels()", "EncyclopediaModels.debouncedUpdateDisplayModels()", "ems");
        $("#encyclopedia-models .search-wrapper").append("<div id='encyclopedia-models-wrapper'></div>");
        AutoZoom.autozoom("encyclopedia-models-wrapper", 204, 274);
        EncyclopediaModels.displayModels();
        
        About.addCopyright(EncyclopediaModels._i18n.tab, EncyclopediaModels._i18n.copyright);
    },

    displayModels: function()
    {
        var models = "";

        Encyclopedia.models.list.sort(function(s1, s2) { return EncyclopediaModels._findModelNames(s1, true).toLowerCase().localeCompare(EncyclopediaModels._findModelNames(s2, true).toLowerCase()); })

        var modelList = Encyclopedia.models.list;
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

            models += "<a id='model-" + model.id + "' href='javascript:void(0)' data-count='" + (ignoredPrevious+1) + "' onclick='EncyclopediaModels.openModel(\"" + model.id + "\")'>";
            models += "<div>";
            models += "<img " + LazyImage + " src='" + model.thumb + "?version=" + Version + "'/>";
            models += "<span>" + EncyclopediaModels._findModelNames(model) + "</span>"
            models += "</div>";
            models += "</a>";

            ignoredPrevious = 0;
        }

        $("#encyclopedia-models-wrapper").html(models);
        EncyclopediaModels.updateDisplayModels();
    },

    updateDisplayModels: function()
    {
        Encyclopedia.updateFacets(EncyclopediaModels._facets, Encyclopedia.models.list, "ems");

        $("#encyclopedia-models-wrapper a").hide();

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

            $("#model-" + model.id).attr('data-count', ignoredPrevious+1).show();

            ignoredPrevious = 0;
        }
    },

    _findTilesByModel: function(model)
    {
        var tiles = [];
        var found = {};

        if (model)
        {
            for (var i in Encyclopedia.tiles.list)
            {
                var tile = Encyclopedia.tiles.list[i];
                if (tile.model == model.id && !found[tile.id])
                {
                    found[tile.id] = true;
                    tiles.push(tile);
                }
            }
        }
        
        return tiles;
    },
    
    _findHeroesByModel: function(model)
    {
        var heroes = [];

        if (model)
        {
            for (var i in Encyclopedia.heroes.list)
            {
                var hero = Encyclopedia.heroes.list[i];
                if (hero.model == model.id)
                {
                    heroes.push(hero);
                }
            }
        }
        
        return heroes;
    },
    
    _findTokensByModel: function(model)
    {
        var tokens = [];

        if (model)
        {
            for (var i in Encyclopedia.tokens.list)
            {
                var token = Encyclopedia.tokens.list[i];
                if (token.model == model.id)
                {
                    tokens.push(token);
                }
            }
        }
        
        return tokens;
    },
    
    _findModelNames: function(model, sort)
    {
        var names = [];
        var noSpanNames = [];

        function withoutSpan(name)
        {
            return name.replace(/<\/?span>/g, '');
        }

        if (model)
        {
            if (model.name)
            {
                let name = (sort && model.sort && model.sort[Lanugage]) ? model.sort[Lanugage] : model.name;
                names.push(name);
                noSpanNames.push(name);
            }
            
            var heroes = EncyclopediaModels._findHeroesByModel(model);
            for (var i in heroes)
            {
                var hero = heroes[i];
                var name = (sort && hero.sort && hero.sort) ? hero.sort : hero.name; 
                name += (hero.subname ? " <span>" + hero.subname + "</span>" : "");
                let nameWithoutSpan = withoutSpan(name);
                if (noSpanNames.indexOf(nameWithoutSpan) == -1)
                {
                    names.push(name);
                    noSpanNames.push(nameWithoutSpan)
                }
            }

            var tiles = EncyclopediaModels._findTilesByModel(model);
            for (var i in tiles)
            {
                var tile = tiles[i];
                var name = (sort && tile.sort && tile.sort) ? tile.sort : tile.name;
                let nameWithoutSpan = withoutSpan(name);
                if (noSpanNames.indexOf(nameWithoutSpan) == -1)
                {
                    names.push(name);
                    noSpanNames.push(nameWithoutSpan)
                }
            }

            var tokens = EncyclopediaModels._findTokensByModel(model);
            for (var i in tokens)
            {
                var token = tokens[i];
                var name = (sort && token.sort && token.sort) ? token.sort : token.name;
                let nameWithoutSpan = withoutSpan(name);
                if (noSpanNames.indexOf(nameWithoutSpan) == -1)
                {
                    names.push(name);
                    noSpanNames.push(nameWithoutSpan)
                }
            }
        }
        
        return names.join(" / ") || (model ? model.id : '-');
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

            var origins = model.origins.slice();
            for (var i in origins)
            {
                var origin = origins[i];
                originsCount[origin] = originsCount[origin] ? originsCount[origin]+1 : 1;
            }
        }

        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaModels._i18n.fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaModels._i18n.model : EncyclopediaModels._i18n.models) + ")";
        }
        
        
        var modelImages = [];
        var painters = [];
        var sculptors = [];
        for (var i in models)
        {
            var model = models[i];
            
            for (var j in model.images)
            {
                var image = model.images[j];
                if (modelImages.indexOf(image) == -1) modelImages.push(image);
            }
            
            if (model.paint
                && painters.map(function (p) {return p.name;}).indexOf(model.paint.name) == -1)
            {
                painters.push(model.paint);
            }

            if (model.sculptor
                && sculptors.map(function (p) {return p.name;}).indexOf(model.sculptor.name) == -1)
            {
                sculptors.push(model.sculptor);
            }
        }

        var photos = "<div class='photos'>";
        for (var i in modelImages)
        {
            photos += "<img src='" + modelImages[i] + "?version=" + Version + "'/>"
        }
        photos += "</div>";

        var painter = "";
        if (painters.length)
        {
            painter = "<div class='painter'>" + EncyclopediaModels._i18n.paintedBy; 
            for (var i in painters)
            {
                if (i != 0) painter += ",";
                painter += " <a target='_blank' href='" + painters[i].link + "'>" + painters[i].name + "</a>";
            }
            painter += "</div>";
        }
        
        var sculptor = "";
        if (sculptors.length)
        {
            sculptor = "<div class='scultor'>" + EncyclopediaModels._i18n.sculptedBy; 
            for (var i in sculptors)
            {
                if (i != 0) sculptor += ",";
                if (sculptors[i].link)
                {
                    sculptor += " <a target='_blank' href='" + sculptors[i].link + "'>" + sculptors[i].name + "</a>";
                }
                else
                {
                    sculptor += " " + sculptors[i].name;
                }
            }
            sculptor += "</div>";
        }
        
        var model = models[0];
        
        var heroes = EncyclopediaModels._findHeroesByModel(model).map(hero => EncyclopediaHeroes._linkToHero(hero.id)).join(", ")
        if (heroes) heroes = "<div class='heroes'>" + EncyclopediaModels._i18n.heroes + " " + heroes + "</div>";

        var tiles = EncyclopediaModels._findTilesByModel(model).map(tile => EncyclopediaTiles._linkToTile(tile.id)).join(", ");
        if (tiles) tiles = "<div class='tiles'>" + EncyclopediaModels._i18n.tiles + " " + tiles + "</div>";
        
        var tokens = EncyclopediaModels._findTokensByModel(model).map(token => EncyclopediaTokens._linkToToken(token.id));
        if (tokens.length > 0) tokens = "<div class='tokens'>" + EncyclopediaModels._i18n.tokens + " " + tokens[0] + "</div>";

        var dialogActions = [{
            label: EncyclopediaModels._i18n.zoom,
            icon: "encyclopedia-models-zoom",
            fn: "EncyclopediaModels._zoom();"
        }, {
            label: EncyclopediaModels._i18n.print,
            icon: "encyclopedia-models-print",
            fn: "window.print()"
        }];

        if (model.forum) {
            dialogActions.push({
                label: EncyclopediaModels._i18n.forum, 
                icon: "encyclopedia-models-forum",
                fn: "window.open('" + model.forum + "');"
            });
        }
        
        Nav.dialog(EncyclopediaModels._findModelNames(model) || "",
            "<div class='modeldetails'>"
                + "<div class='from'>" + EncyclopediaModels._i18n.from + " "
                    + originString
                + "</div>"
                + heroes
                + tiles
                + tokens
                + sculptor
                + painter
                + photos
            + "</div>",
            null,
            dialogActions 
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
                s += "<img src='" + model.thumb + "?version=" + Version + "'/>";
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
