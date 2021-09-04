var EncyclopediaTiles = {
    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaTiles._i18n.tab, id: "encyclopedia-tile", onShow: EncyclopediaTiles.onShow,  onHide: EncyclopediaTiles.onHide });

        EncyclopediaTiles._facets = Utils.mergeObject([
            {
                id: 'keyword',
                filter: function(item, value)
                {
                    return item.name && item.name_deemphasized.indexOf(Rules._deemphasize(value)) != -1;
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
                id:'kind',
                sort: true,
                values: [ { id: "melee" }, { id: "ranged" }, { id: "none" } ],
                filter: function(item, selectedValues) {

                    return (selectedValues.indexOf('melee')!=-1 && item.attacktype == "contact" && item.dices['0'] != "none")
                        || (selectedValues.indexOf('ranged')!=-1 && item.attacktype == "ranged" && item.dices['0'] != "none")
                        || (selectedValues.indexOf('none')!=-1 && item.dices['0'] == "none");
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
                            id: skill.type + "/" + skill.id,
                            label: skill.title
                        })
                    }
                    return v;
                })(),
                filter: function(item, selectedValues) {
                    for (var s in item.skills)
                    {
                        var skill = item.skills[s];
                        if (selectedValues.indexOf(skill) != -1) return true;
                    }
                    return false;
                }
            },

            {
                id: 'type',
                sort: true,
                values: [ { id: "human" }, { id: "animal" }, { id: "monster" }, { id: "none" } ],
                filter: function(item, selectedValues) {
                    var modelType = item.modelType; // modelType specified on tile => no model (corinthia...)
                    if (modelType == null)
                    {
                        // otherwise seek type on model
                        for (var i = 0; i < Encyclopedia.models.list.length; i++)
                        {
                            if (item.model == Encyclopedia.models.list[i].id)
                            {
                                modelType = Encyclopedia.models.list[i].type;
                                break;
                            }
                        }
                    }
                    // Depend on modelType
                    for (var i = 0; i < selectedValues.length; i++)
                    {
                        if (selectedValues[i] == (modelType || 'none'))
                        {
                            return true;
                        }
                    }
                    return false;
                }
            },

            {
                id: 'token',
                sort: true,
                values: [ { id: "with" }, { id: "without" } ],
                filter: function(item, selectedValues) {
                    // Tokens can be shared by several tiles. Model links them
                    var tokens = EncyclopediaTiles._getTokensOrSharedTokens(item);
                    for (var i = 0; i < selectedValues.length; i++)
                    {
                        if (selectedValues[i] == 'with' && tokens.length > 0
                            || selectedValues[i] == 'without' && tokens.length == 0)
                        {
                            return true;
                        }
                    }
                    return false;
                }
            },

            {
                id: 'move',
                values: (function() {
                    var v = [];
                    for (var i = 0 ; i < 10 ; i++)
                    {
                        v.push({
                            id: i + "",
                            label: i
                        })
                    }
                    return v;
                })(),
                filter: function(item, selectedValues) {
                    return selectedValues.indexOf(item.movement || "0") != -1;
                }
            },

            {
                id: 'defense',
                values: (function() {
                    var v = [];
                    for (var i = 0 ; i < 20 ; i++)
                    {
                        v.push({
                            id: i + "",
                            label: i
                        })
                    }
                    return v;
                })(),
                filter: function(item, selectedValues) {
                    return selectedValues.indexOf(item.defense || 0) != -1;
                }
            },

            {
                id: 'dice',
                values: (function() {
                    var dices = [];
                    for (var i = 0 ; i < Encyclopedia.tiles.list.length ; i++)
                    {
                        var item = Encyclopedia.tiles.list[i];
                        var dice = Math.floor(EncyclopediaTiles._tilePower(item));
                        if (dices.indexOf(dice) == -1)
                        {
                            dices.push(dice);
                        }
                    }
                    dices.sort(function(a,b) { return a - b; })

                    var v = [];
                    for (var i = 0 ; i < dices.length ; i++)
                    {
                        v.push({
                            id: dices[i],
                            label: dices[i] + " " + EncyclopediaTiles._facets.dice.to +  " " + (dices[i] + 1) + " " + EncyclopediaTiles._facets.dice.axes
                        })
                    }
                    return v;
                })(),
                filter: function(item, selectedValues) {
                    return selectedValues.indexOf(Math.floor(EncyclopediaTiles._tilePower(item))) != -1;
                }
            }
        ], EncyclopediaTiles._facets);    
    },

    _tilePower: function(tile)
    {
        var dice = 0;
        for (var j in tile.dices)
        {
            switch(tile.dices[j])
            {
                case "redreroll": dice += 1.92; break;
                case "red": dice += 1.5; break;
                case "orangereroll": dice += 1.33; break;
                case "orange": dice += 1; break;
                case "yellowreroll": dice += 1; break;
                case "yellow": dice += 0.67; break;
            }
        }
        return dice;
    },

    _getTokensOrSharedTokens: function(tile)
    {
        var tokens = [];

        if (tile.model)
        {
            // Tokens can be shared by several tiles. Model links them
            var tiles = [];
            for (var i in Encyclopedia.tiles.list)
            {
                var stile = Encyclopedia.tiles.list[i];
                if (stile.model == tile.model)
                {
                    tiles.push(stile);
                }
            }
    
            for (var j = 0; j < tiles.length; j++)
            {
                var stile = tiles[j];
                if (stile.tokens)
                {
                    for (var k = 0; k < stile.tokens.length; k++)
                    {
                        tokens.push(stile.tokens[k]);
                    }
                }
            }
        }

        return tokens;
    },

    init: function()
    {
        EncyclopediaTiles.debouncedUpdateDisplayTiles = $.debounce(250, EncyclopediaTiles.updateDisplayTiles);
        Encyclopedia.displaySearchEngine("encyclopedia-tile", EncyclopediaTiles._facets, "EncyclopediaTiles.updateDisplayTiles()", "EncyclopediaTiles.debouncedUpdateDisplayTiles()", "et");
        $("#encyclopedia-tile .search-wrapper").append("<div id='encyclopedia-tile-wrapper'></div>");
        AutoZoom.autozoom("encyclopedia-tile-wrapper", 204, 308.9);
        EncyclopediaTiles.displayTiles();
    },

    displayTiles: function()
    {
        var tiles = "";

        Encyclopedia.tiles.list.sort(function(s1, s2) {
            var s1Name = s1.sort && s1.sort ? s1.sort : s1.name;
            var s2Name = s2.sort && s2.sort ? s2.sort : s2.name;
            
            if (!s2Name && !s1Name)
            {
                return s1.image && s2.image ? s1.image.toLowerCase().localeCompare(s2.image.toLowerCase()) : 0;
            }
            else if (!s2Name)
            {
                return 1;
            }
            else if (!s1Name)
            {
                return -1;
            }
            else
            {
                var c = s1Name.toLowerCase().localeCompare(s2Name.toLowerCase())
                if (c != 0)
                {
                    return c;
                }

                return s1.id.toLowerCase().localeCompare(s2.id.toLowerCase());
            }
        });

        var tileList = Encyclopedia.tiles.list;
        var ignoredPrevious = 0;
        for (var i in tileList)
        {
            i = parseInt(i);
            var tile = tileList[i];

            if (i < tileList.length - 1
                && tileList[i+1].id == tile.id)
            {
                ignoredPrevious++;
                continue;
            }

            tile = tileList[i - ignoredPrevious];

            tiles += "<a id='tile-" + tile.id + "' href='javascript:void(0)' data-count='" + (ignoredPrevious+1) + "' onclick='EncyclopediaTiles.openTile(\"" + tile.id + "\")'>";
            tiles += Tile._cardCode(EncyclopediaTiles._convertTileToStudio(tile, false));
            tiles += "</a>";

            ignoredPrevious = 0;
        }

        $("#encyclopedia-tile-wrapper").html(tiles);
        EncyclopediaTiles.updateDisplayTiles()
    },

    updateDisplayTiles: function()
    {
        Encyclopedia.updateFacets(EncyclopediaTiles._facets, Encyclopedia.tiles.list, "et");

        $("#encyclopedia-tile-wrapper a").hide();

        var tileList = Encyclopedia.tiles.list.filter(Encyclopedia.filter(EncyclopediaTiles._facets, "et"));
        var ignoredPrevious = 0;
        for (var i in tileList)
        {
            i = parseInt(i);
            var tile = tileList[i];

            if (i < tileList.length - 1
                && tileList[i+1].id == tile.id)
            {
                ignoredPrevious++;
                continue;
            }

            tile = tileList[i - ignoredPrevious];

            $("#tile-" + tile.id).attr('data-count', ignoredPrevious+1).show();

            ignoredPrevious = 0;
        }
    },

    _convertTileToStudio: function(tile, hd)
    {
        return {
            id: tile.id + "-" + Math.random(),
            name: tile.name,
            color: tile.color,
            movement: tile.movement || "",
            defense: tile.defense || "",
            attacktype: tile.attacktype || "",
            dices: { 0: tile.dices[0], 1: tile.dices[1], 2: tile.dices[2], 3: tile.dices[3] },
            skills: { 0: tile.skills[0], 1: tile.skills[1], 2: tile.skills[2], 3: tile.skills[3] },
            reinforcement: tile.reinforcement || "",
            image: tile.imageHD && hd ? (tile.imageHD + "?version=" + Version) : (tile.image ? (tile.image + "?version=" + Version) : null),
            imagelocation: {x: tile.image_location.x, y: tile.image_location.y},
            imagezoom: tile.image_zoom,
            imagerotation: tile.image_rotation ||"0",
            tokens: (tile.tokens || []).map(function(t) { return {active: true, image: t.image, imagelocation: {x: t.image_location.x, y: t.image_location.y}, imagezoom: t.image_zoom, imagerotation: 0}})
        };
    },

    _findTilesById: function(id)
    {
        var tiles = [];

        for (var i in Encyclopedia.tiles.list)
        {
            var tile = Encyclopedia.tiles.list[i];
            if (tile.id == id)
            {
                tiles.push(tile);
            }
        }

        return tiles;
    },

    _findTilesBySkill: function(id)
    {
        id = Rules._findSkillById(id).type + "/" + id;

        var tiles = [];
        var tilesIds = {};

        for (var i in Encyclopedia.tiles.list)
        {
            var tile = Encyclopedia.tiles.list[i];
            if (tile.skills
                && !tilesIds[tile.id]
                && (tile.skills[0] == id
                    || (tile.skills[0] != "none" && tile.skills[1] == id)
                    || (tile.skills[0] != "none" && tile.skills[1] != "none" && tile.skills[2] == id)
                    || (tile.skills[0] != "none" && tile.skills[1] != "none" && tile.skills[2] != "none" && tile.skills[3] == id)))
            {
                tiles.push(tile);
                tilesIds[tile.id] = true;
            }
        }

        return tiles;
    },

    onShow: function() {
    },

    onHide: function() {
    },

    openTile: function(id) {
        var tiles = EncyclopediaTiles._findTilesById(id);
        var displayTiles = [];

        var colors = {};
        var images = {};
        var originsCount = {};
        for (var e in tiles)
        {
            var tile = tiles[e];

            var origins = tile.origins.slice();
            for (var i in origins)
            {
                var origin = origins[i];
                originsCount[origin] = originsCount[origin] ? originsCount[origin]+1 : 1;
            }

            if (!colors[tile.color])
            {
                images[tile.image] = true;
                displayTiles.push(tile);
            }
            if (!images[tile.image])
            {
                images[tile.image] = true;
                displayTiles.push(tile);
            }
            else
            {
                colors[tile.color] = colors[tile.color] ? colors[tile.color] + 1 : 1;
            }
        }

        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaTiles._i18n.fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaTiles._i18n.card : EncyclopediaTiles._i18n.cards) + ")";
        }

        var c = "";
        for (var e in displayTiles)
        {
            var tile = displayTiles[e];
            c += "<div class='tile-wrapindetails' data-count='" + colors[tile.color] + "'>" + Tile._cardCode(EncyclopediaTiles._convertTileToStudio(tile, false)) + "</div>";
        }

        var skills = ((tile.skills && tile.skills[0] != 'none') ?
        ("<div class='skill'>"
            + EncyclopediaTiles._i18n.skill
            + " "
            + (tile.skills[1] != 'none' && tile.skills[2] != 'none' && tile.skills[3] != 'none' && tile.skills[3] != 'space' ? "" + Rules._linkToSkill(tile.skills[3], true) : "")
            + (tile.skills[1] != 'none' && tile.skills[2] != 'none' && tile.skills[2] != 'space' ? "" + Rules._linkToSkill(tile.skills[2], true) : "")
            + (tile.skills[1] != 'none' && tile.skills[1] != 'space' ? "" + Rules._linkToSkill(tile.skills[1], true) : "")
            + (tile.skills[0] != 'space' ? Rules._linkToSkill(tile.skills[0], true) : "")
        + "</div>") : "")

        var superdetails = "";
        if (tile.quote)
        {
            superdetails += "<div class='superdetails'>" + EncyclopediaTiles._i18n.story + "<br/><div class='img' style='background-image: url(" + tile.image + "?version=" + Version + ")'></div>";
            superdetails += "<div><p>" + tile.quote.text.replace(/\n/g,'<br/><br/>') + "</p><p><span>" + tile.quote.author.name + " - " + tile.quote.origin + "</span></p>";
            superdetails += "</div></div>";
        }

        var model = "";
        if (tile.model)
        {
            var m = EncyclopediaModels._findModelsById(tile.model)[0];
            if (m)
            {
                model = "<div class='models'>"
                        + EncyclopediaModels._linkToModel(tile.model, true)
                        + "</div>";
            }
        }

        Nav.dialog(tile.name || "",
            "<div class='tiledetails'>"
                + "<div class='minwidth'></div>"
                + "<div class='from'>" + EncyclopediaTiles._i18n.from + " "
                    + originString
                + "</div>"
                + model
                + c
                + skills
                + superdetails
            + "</div>",
            null,
            [{
                label: EncyclopediaTiles._i18n.transfertToStudio,
                icon: "encyclopedia-tile-tostudio",
                fn: "EncyclopediaTiles._transfert('" + id + "');"
            }]
        );
    },

    _transfert: function(id) {
        if (confirm(EncyclopediaTiles._i18n.transfertConfirm))
        {
            var studiotiles = JSON.parse(localStorage.getItem(Application + "_StudioTiles")) || [];

            var colors = {};
            var images = {};

            var tiles = EncyclopediaTiles._findTilesById(id);
            for (var i in tiles)
            {
                var tile = tiles[i];

                if (colors[tile.color] && images[tile.image])
                {
                    continue;
                }

                colors[tile.color] = true;
                images[tile.image] = true;
                var studioTile = EncyclopediaTiles._convertTileToStudio(tile, true);
                studiotiles.push(studioTile);
            }

            localStorage.setItem(Application + "_StudioTiles", JSON.stringify(studiotiles));

            Tile._displayCards();

            Nav.switchTo($("*[for=studio]")[0]);
            $("#studio .nav-wrapper").slick('slickGoTo', $("#tile").index());
            $("#tile").animate({ scrollTop: $('#tile > *:last()').position().top },500);

            About.warnToast(EncyclopediaTiles._i18n.transfertOK)
            Nav.closeDialog(true);
        }
    },

    _linkToTile: function(id) {
        var tile = EncyclopediaTiles._findTilesById(id)[0];
        var colors = "";
        if (tile.colors.length > 1)
        {
            colors += " (";
            colors += tile.colors.map(c => Tile._i18n['color' + c.charAt(0).toUpperCase() + c.slice(1)]).join(", ");
            colors += ")";
        }
        return "<a href='javascript:void(0)' onclick='EncyclopediaTiles.openTile(\"" + id + "\")'>" + tile.name + colors + "</a>";
    }

};
