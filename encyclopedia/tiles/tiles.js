var EncyclopediaTiles = {
    _i18n: {
        'fr': {
            'tab': "Tuiles",
            'transfertToStudio': "Copier la carte dans le studio",
            'transfertOK': "La carte a été copiée dans le studio des tuiles",
            'transfertConfirm': "Voulez-vous copier la carte dans le studio pour pouvoir la modifier ou l'imprimer ?",
            'from': "Disponible dans :",
            'fromAnd': "et",
            'card': "exemplaire",
            'cards': "exemplaires",
            'skill': "Compétences :",
            'story': "Histoire :"
        },
        'en': {
            'tab': "Tiles",
            'transfertToStudio': "Copy the card into the studio",
            'transfertOK': "The card was copied to the tiles studio",
            'transfertConfirm': "Do you want to copy the card into the studio in order to edit it or print it?",
            'from': "Available in:",
            'fromAnd': "and",
            'card': "copy",
            'cards': "copies",
            'skill': "Skills:",
            'story': "Story :"
          },
          'it': {
            'tab': "Tessere",
            'transfertToStudio': "Copia la carta nello Studio",
            'transfertOK': "TODO_TRANSLATE",
            'transfertConfirm': "Vuoi copiare la carta nello Studio per modificarla o stamparla?",
            'from': "Disponibile in:",
            'fromAnd': "e",
            'card': "copia",
            'cards': "copie",
            'skill': "TODO_TRANSLATE",
            'story': "Storia:"
        }
    },

    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaTiles._i18n[Language].tab, id: "encyclopedia-tile", onShow: EncyclopediaTiles.onShow,  onHide: EncyclopediaTiles.onHide });
        
        EncyclopediaTiles._facets = [
            {
                id: 'keyword',
                label: {
                    'fr': "Mot-clé",
                    'en': "Keyword",
                    'it': "Parola chiave"
                },
                filter: function(item, value)
                {
                    return item.name[Language] && ConanRules._deemphasize(item.name[Language]).indexOf(ConanRules._deemphasize(value)) != -1;
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
                id:'type',
                label: {
                    'fr': "Type",
                    'en': "Kind",
                    'it': "Tipologia"
                },
                sort: true,
                operator: "or/and",
                values: [
                    {
                        id: "melee",
                        label: {
                            'fr': "Corps-à-corps",
                            'en': "Melee",
                            'it': "Mischia"
                        }
                    },
                    {
                        id: "ranged",
                        label: {
                            'fr': "Distance",
                            'en': "Ranged",
                            'it': "A Distanza"
                        }
                    },
                    {
                        id: "none",
                        label: {
                            'fr': "Aucun",
                            'en': "None",
                            'it': "Nessuno"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    
                    return (selectedValues.indexOf('melee')!=-1 && item.attacktype == "contact" && item.dices['0'] != "none")
                        || (selectedValues.indexOf('ranged')!=-1 && item.attacktype == "ranged" && item.dices['0'] != "none")
                        || (selectedValues.indexOf('none')!=-1 && item.dices['0'] == "none");
                }
            }
        ]        
    },

    init: function()
    {
        $("#encyclopedia-tile").append(Encyclopedia.displaySearchEngine(EncyclopediaTiles._facets, "EncyclopediaTiles.updateDisplayTiles()", "et"));
        $("#encyclopedia-tile").append("<div id='encyclopedia-tile-wrapper'></div>");
        EncyclopediaTiles.displayTiles();
    },

    displayTiles: function()
    {
        var tiles = "";
        
        Encyclopedia.tiles.list.sort(function(s1, s2) {
            if (!s2.name[Language] && !s1.name[Language])
            {
                return s1.image && s2.image ? s1.image.toLowerCase().localeCompare(s2.image.toLowerCase()) : 0;
            }
            else if (!s2.name[Language])
            {
                return 1;
            }
            else if (!s1.name[Language])
            {
                return -1;
            }
            else
            {
                return s1.name[Language].toLowerCase().localeCompare(s2.name[Language].toLowerCase());
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
            tiles += Tile._tileCode(EncyclopediaTiles._convertTileToStudio(tile));
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
    
    _convertTileToStudio: function(tile, i)
    {
        i = i ? i : 0;
        return {
            id: tile.id + "-" + Math.random(),
            name: tile.name[Language],
            color: tile.color,
            movement: tile.movement || "",
            defense: tile.defense || "",
            attacktype: tile.attacktype || "",
            dices: { 0: tile.dices[0], 1: tile.dices[1], 2: tile.dices[2], 3: tile.dices[3] },
            skills: { 0: tile.skills[0], 1: tile.skills[1], 2: tile.skills[2], 3: tile.skills[3] },
            reinforcement: tile.reinforcement || "",
            image: tile.imageHD ? tile.imageHD + "?version=" + Version : null,
            imagelocation: {x: tile.image_location.x, y: tile.image_location.y},
            imagezoom: tile.image_zoom,
            imagerotation: "0"
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
        id = ConanRules._findSkillById(id).type + "/" + id;
        
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
        var originsCount = {};
        for (var e in tiles)
        {
            var tile = tiles[e];
            
            var origins = Encyclopedia._removeExtraExpansion(tile.origins.slice());
            for (var i in origins)
            {
                var origin = origins[i];
                originsCount[origin] = originsCount[origin] ? originsCount[origin]+1 : 1;
            }
            
            if (!colors[tile.color])
            {
                colors[tile.color] = true;
                displayTiles.push(tile);
            }
        }
        
        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaTiles._i18n[Language].fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaTiles._i18n[Language].card : EncyclopediaTiles._i18n[Language].cards) + ")";
        }
        
        var c = "";
        for (var e in displayTiles)
        {
            var tile = displayTiles[e]; 
            c += Tile._tileCode(EncyclopediaTiles._convertTileToStudio(tile, i));
        }

        var skills = ((tile.skills && tile.skills[0] != 'none') ?
        ("<div class='skill'>" 
            + EncyclopediaTiles._i18n[Language].skill 
            + " " 
            + (tile.skills[1] != 'none' && tile.skills[2] != 'none' && tile.skills[3] != 'none'? "" + ConanRules._linkToSkill(tile.skills[3], true) : "")
            + (tile.skills[1] != 'none' && tile.skills[2] != 'none' ? "" + ConanRules._linkToSkill(tile.skills[2], true) : "")
            + (tile.skills[1] != 'none' ? "" + ConanRules._linkToSkill(tile.skills[1], true) : "")
            + ConanRules._linkToSkill(tile.skills[0], true) 
        + "</div>") : "") 

        var superdetails = "";
        if (tile.quote)
        {
            superdetails += "<div class='superdetails'>" + EncyclopediaTiles._i18n[Language].story + "<br/><div class='img' style='background-image: url(" + tile.image + "?version=" + Version + ")'></div>";
            superdetails += "<div><p>" + tile.quote.text[Language].replace(/\n/g,'<br/><br/>') + "</p><p><span>" + tile.quote.author.name + " - " + tile.quote.origin[Language] + "</span></p>";
            superdetails += "</div></div>";
        }

        var model = "";
        if (tile.model)
        {
            var m = EncyclopediaModels._findModelsById(tile.model)[0];
            model = "<div class='models'>"
                    + EncyclopediaModels._linkToModel(tile.model, true)
                    + "</div>";
        }
        
        Nav.dialog(tile.name[Language] || "",
            "<div class='tiledetails'>" 
                + "<div class='minwidth'></div>"
                + "<div class='from'>" + EncyclopediaTiles._i18n[Language].from + " "
                    + originString
                + "</div>"
                + model
                + c
                + skills
                + superdetails
            + "</div>",
            null,
            [{
                label: EncyclopediaTiles._i18n[Language].transfertToStudio,
                icon: "encyclopedia-tile-tostudio",
                fn: "EncyclopediaTiles._transfert('" + id + "');"
            }]
        );
    },
    
    _transfert: function(id) {
        if (confirm(EncyclopediaTiles._i18n[Language].transfertConfirm))
        {
            var studiotiles = JSON.parse(localStorage.getItem("StudioTiles")) || [];
            
            var colors = {};
            
            var tiles = EncyclopediaTiles._findTilesById(id);
            for (var i in tiles)
            {
                var tile = tiles[i];
                
                if (colors[tile.color])
                {
                    continue;
                }
                
                colors[tile.color] = true;
                var studioTile = EncyclopediaTiles._convertTileToStudio(tile);
                studiotiles.push(studioTile);
            }
            
            localStorage.setItem("StudioTiles", JSON.stringify(studiotiles));
            
            Tile._displayTiles();
            
            Nav.switchTo($("*[for=studio]")[0]);
            $("#studio .nav-wrapper").slick('slickGoTo', $("#tile").index());
            $("#tile").animate({ scrollTop: $('#tile > *:last()').position().top },500);
            
            ConanAbout.warnToast(EncyclopediaTiles._i18n[Language].transfertOK)
            Nav.closeDialog(true);
        }
    },
    
    _linkToTile: function(id) {
        var tile = EncyclopediaTiles._findTilesById(id)[0];
        var colors = "";
        if (tile.colors.length > 1)
        {
            colors += " (";
            colors += tile.colors.map(c => Tile._i18n[Language]['color' + c.charAt(0).toUpperCase() + c.slice(1)]).join(", ");
            colors += ")";
        }
        return "<a href='javascript:void(0)' onclick='EncyclopediaTiles.openTile(\"" + id + "\")'>" + tile.name[Language] + colors + "</a>";
    }
    
};
