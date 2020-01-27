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
    },
    
    init: function() 
    {
        EncyclopediaSpells.displaySpells();
    },
    
    displaySpells: function()
    {
        var spells = "";
        
        Encyclopedia.spells.list.sort(function(s1, s2) { return s1.title[Language].toLowerCase().localeCompare(s2.title[Language].toLowerCase()); })
        for (var i in Encyclopedia.spells.list)
        {
            var spell = Encyclopedia.spells.list[i];
            
            if (spell.text[Language])
            {
                spells += "<a href='javascript:void(0)' onclick='EncyclopediaSpells.openSpell(\"" + spell.id + "\")'>";
                spells += CardSpell._cardCode(EncyclopediaSpells._convertSpellToStudio(spell));
                spells += "</a>";
            }
        }
        
        $("#encyclopedia-spell").html(spells);
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
    }
}
