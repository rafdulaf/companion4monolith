var EncyclopediaSpells = {
    _i18n: {
        'fr': {
            'tab': "Sorts",
            'transfertToStudio': "Copier la carte dans le studio",
            'transfertOK': "La carte a été copiée dans le studio des cartes de sorts",
            'transfertConfirm': "Voulez-vous copier la carte dans le studio ?",
            'from': "Disponible dans :",
            'fromAnd': "<br/>et",
            'card': "exemplaire",
            'cards': "exemplaires",
            'clarification': "Clarification :"
        },
        'en': {
            'tab': "Spells",
            'transfertToStudio': "Copy the card into the studio",
            'transfertOK': "The card was copied to the spell cards studio",
            'transfertConfirm': "Do you want to copy the card into the studio?",
            'from': "Available in:",
            'fromAnd': "<br/>and",
            'card': "copy",
            'cards': "copies",
            'clarification': "Clarification:"
        }
    },
    
    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaSpells._i18n[Language].tab, id: "encyclopedia-spell", onShow: EncyclopediaSpells.onShow,  onHide: EncyclopediaSpells.onHide });
        
        EncyclopediaSpells._facets = [
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
                    return item.origins.filter(v => selectedValues.indexOf(v) != -1).length > 0;
                }
            }
        ]
    },
    
    init: function() 
    {
        EncyclopediaSpells.displaySearchEngine(EncyclopediaSpells._facets);
        $("#encyclopedia-spell").append("<div id='encyclopedia-spell-wrapper'></div>");
        EncyclopediaSpells.displaySpells();
    },
    
    updateFacets: function()
    {
        for (var i in EncyclopediaSpells._facets)
        {
            var facet = EncyclopediaSpells._facets[i];
            {
                var nonEmptyFacets = 0;
                for (var v in facet.values)
                {
                    var value = facet.values[v];
                    
                    var count = Encyclopedia.spells.list.filter(EncyclopediaSpells._filter(facet, value)).length;
                    $("#es-" + facet.id + "-" + value.id).parent().attr('data-count', count);
                    if (count) nonEmptyFacets++;
                }                
                $("#es-" + facet.id).attr("data-count", nonEmptyFacets);
            }
        }
    },
    
    _filter: function(forcedFacet, forcedValue)
    {
        return function(e) {
            for (var i in EncyclopediaSpells._facets)
            {
                var facet = EncyclopediaSpells._facets[i];
                
                var selectedValues = [];
                if (forcedFacet && facet.id == forcedFacet.id)
                {
                    selectedValues.push(forcedValue.id);
                }
                else
                {
                    for (var v in facet.values)
                    {
                        var value = facet.values[v];
                        
                        if ($("#es-" + facet.id + "-" + value.id)[0].checked)
                        {
                            selectedValues.push(value.id);
                        }
                    }
                }
                
                if (selectedValues.length > 0
                    && selectedValues.length < facet.values.length
                    && !facet.filter(e, selectedValues))
                {
                    return false;
                }
            }
            
            return true;
        }
    },
    
    displaySpells: function()
    {
        EncyclopediaSpells.updateFacets();
        
        var spells = "";
        
        Encyclopedia.spells.list.sort(function(s1, s2) { return s1.title[Language].toLowerCase().localeCompare(s2.title[Language].toLowerCase()); })
        
        var spellList = Encyclopedia.spells.list.filter(EncyclopediaSpells._filter());
        for (var i in spellList)
        {
            var spell = spellList[i];
            
            if (spell.text[Language])
            {
                spells += "<a href='javascript:void(0)' onclick='EncyclopediaSpells.openSpell(\"" + spell.id + "\")'>";
                spells += CardSpell._cardCode(EncyclopediaSpells._convertSpellToStudio(spell));
                spells += "</a>";
            }
        }
        
        $("#encyclopedia-spell-wrapper").html(spells);
    },
    
    _convertSpellToStudio: function(spell)
    {
        return {
            id: spell.id + "-" + Math.random(),
            name: spell.title[Language],
            longName: spell.titleLong && spell.titleLong[Language],
            text: spell.text[Language],
            textSize: spell.textStyle[Language].textSize,
            textInter: spell.textStyle[Language].textInter,
            cost: spell.cost,
            saturation: spell.saturation,
            image: Version + "/" + spell.image,
            imageEffect: false,
            imagelocation: {x: "50", y: "50"},
            imagezoom: "100",
            imagerotation: "0",
            explosion: spell.explosion,
            reaction: spell.reaction
        };
    },
    
    _findSpellById: function(id)
    {
        for (var i in Encyclopedia.spells.list)
        {
            var spell = Encyclopedia.spells.list[i];
            if (spell.id == id)
            {
                return spell;
            }
        }
        throw new Error("No spell with id '" + id + "'");
    },
    
    onShow: function() {
    },
    
    onHide: function() {
    },
    
    _removeExtraExpansion: function(origins)
    {
        for (var i in Encyclopedia.expansions.types)
        {
            var type = Encyclopedia.expansions.types[i];
            if (type.single)
            {
                var values = [];
                for (var j in Encyclopedia.expansions.list)
                {
                    var expansion = Encyclopedia.expansions.list[j];
                    if (expansion.type == type.id)
                    {
                        values.push(expansion.id);
                    }
                }

                var neworigins = [];
                for (var l=0; l < origins.length; l++)
                {
                    var origin = origins[l];
                    for (var k in values)
                    {
                        var value = values[k];
                        if (origin == value)
                        {
                            l += values.length - 1 - k;
                            break;
                        }
                    }
                    neworigins.push(origin);
                }
                origins = neworigins;
            }
        }
        return origins;
    },

    _getOrigin: function(origin)
    {
        for (var j in Encyclopedia.expansions.list)
        {
            var expansion = Encyclopedia.expansions.list[j];
            if (origin == expansion.id)
            {
                return expansion.title[Language];  
            }
        }
        return null;
    },

    openSpell: function(id) {
        var spell = EncyclopediaSpells._findSpellById(id);
        
        var origins = EncyclopediaSpells._removeExtraExpansion(spell.origins.slice());
        var originsCount = {};
        for (var i in origins)
        {
            var origin = origins[i];
            originsCount[origin] = originsCount[origin] ? originsCount[origin]++ : 1;
        }
        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaSpells._i18n[Language].fromAnd + " ";
            originString += EncyclopediaSpells._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaSpells._i18n[Language].card : EncyclopediaSpells._i18n[Language].cards) + ")";
        }
        
        Nav.dialog(spell.title[Language],
            "<div class='spelldetails'>" 
                + CardSpell._cardCode(EncyclopediaSpells._convertSpellToStudio(spell))
                + "<div class='from'>" + EncyclopediaSpells._i18n[Language].from + " "
                    + originString
                + "</div>"
                + "<div class='clarification'>" + EncyclopediaSpells._i18n[Language].clarification + " " + ((spell.clarification && spell.clarification[Language]) ? spell.clarification[Language] : "-") + "</div>" 
            + "</div>",
            null,
            [{
                label: EncyclopediaSpells._i18n[Language].transfertToStudio,
                icon: "encyclopedia-spell-tostudio",
                fn: "EncyclopediaSpells._transfert('" + id + "');"
            }]
        );
    },
    
    _transfert: function(id) {
        if (confirm(EncyclopediaSpells._i18n[Language].transfertConfirm))
        {
            var spell = EncyclopediaSpells._findSpellById(id);
            var studioSpell = EncyclopediaSpells._convertSpellToStudio(spell);
            
            var cards = JSON.parse(localStorage.getItem("StudioSpellCards")) || [];
            cards.push(studioSpell);
            localStorage.setItem("StudioSpellCards", JSON.stringify(cards));
            
            CardSpell._displayCards();
            
            ConanAbout.warnToast(EncyclopediaSpells._i18n[Language].transfertOK)
        }
    },
    
    displaySearchEngine: function(facets)
    {
        var se = "<div class='search-engine'>";
        
        for (var f in facets)
        {
            var facet = facets[f];
            
            se += "<div class='facet' id='es-" + facet.id + "'>"
            se += "<span>" + facet.label[Language] + "</span>"
            for (var v in facet.values)
            {
                var value = facet.values[v];
                se += "<label>" 
                    + "<input type='checkbox' id='es-" + facet.id + "-" + value.id + "' onclick='EncyclopediaSpells.displaySpells()' onchange='EncyclopediaSpells.displaySpells()'/>"
                    + "<span>" 
                    + value.label[Language]
                    + "</span>"
                    + "</label>";
            }
            se += "</div>"
        }
        
        se += "</div>"
        
        $("#encyclopedia-spell").append(se);
    }
}
