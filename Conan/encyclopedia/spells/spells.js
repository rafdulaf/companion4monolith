var EncyclopediaSpells = {
    preinit: function()
    {
        Encyclopedia._slides.push({ label: EncyclopediaSpells._i18n.tab, shortLabel: EncyclopediaSpells._i18n.shorttab, id: "encyclopedia-spell", onShow: EncyclopediaSpells.onShow,  onHide: EncyclopediaSpells.onHide });

        EncyclopediaSpells._facets = Utils.mergeObject([
            {
                id: 'keyword',
                filter: function(item, value)
                {
                    return (item.title_deemphasized + item.text_deemphasized).indexOf(Rules._deemphasize(value)) != -1;
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
                id:'zone',
                values: [ { id: "no" }, { id: "yes" } ],
                filter: function(item, selectedValues) {
                    return (item.explosion == true && (selectedValues.indexOf('yes')!=-1))
                        || (item.explosion == false && (selectedValues.indexOf('no')!=-1));
                }
            },

            {
                id:'reaction',
                values: [ { id: "no" }, { id: "yes" } ],
                filter: function(item, selectedValues) {
                    return (item.reaction == true && (selectedValues.indexOf('yes')!=-1))
                        || (item.reaction == false && (selectedValues.indexOf('no')!=-1));
                }
            },

            {
                id:'side',
                operator: "or/and",
                values: [ { id: "heroes" }, { id: "overlord" } ],
                filter: function(item, selectedValues) {
                    return (item.forOverlord == true && (selectedValues.indexOf('overlord')!=-1))
                        || (item.forHeroes == true && (selectedValues.indexOf('heroes')!=-1));
                }
            },

            {
                id:'theme',
                sort: true,
                operator: "or/and",
                values: [
                    { id: "forAttack" }, { id: "forFight" }, { id: "forDefense" }, { id: "forMove" },
                    { id: "forManipulation" }, { id: "forSkill" }, { id: "forRange" }, { id: "forEnergy" }
                ],
                filter: function(item, selectedValues) {
                    return (item.forSkill != false && (selectedValues.indexOf('forSkill')!=-1))
                        || (item.forAttack == true && (selectedValues.indexOf('forAttack')!=-1))
                        || (item.forDefense == true && (selectedValues.indexOf('forDefense')!=-1))
                        || (item.forFight == true && (selectedValues.indexOf('forFight')!=-1))
                        || (item.forManipulation == true && (selectedValues.indexOf('forManipulation')!=-1))
                        || (item.forMove == true && (selectedValues.indexOf('forMove')!=-1))
                        || (item.forRange == true && (selectedValues.indexOf('forRange')!=-1))
                        || (item.forEnergy == true && (selectedValues.indexOf('forEnergy')!=-1));
                }
            },

            {
                id:'type',
                values: [ { id: "normal" }, { id: "versus" } ],
                filter: function(item, selectedValues) {
                    return ((!item.type || item.type == "normal") && (selectedValues.indexOf('normal')!=-1))
                        || (item.type == "versus" && (selectedValues.indexOf('versus')!=-1));
                }
            },

            {
                id:'empty',
                values: [ { id: "no", defaults: true }, { id: "yes" } ],
                filter: function(item, selectedValues) {
                    return (item.text == '' && (selectedValues.indexOf('yes')!=-1))
                        || (item.text != '' && (selectedValues.indexOf('no')!=-1));
                }
            }
        ], EncyclopediaSpells._facets);
    },

    init: function()
    {
        EncyclopediaSpells.debouncedUpdateDisplaySpells = $.debounce(250, EncyclopediaSpells.updateDisplaySpells);
        Encyclopedia.displaySearchEngine("encyclopedia-spell", EncyclopediaSpells._facets, "EncyclopediaSpells.updateDisplaySpells()", "EncyclopediaSpells.debouncedUpdateDisplaySpells()", "es");
        $("#encyclopedia-spell .search-wrapper").append("<div id='encyclopedia-spell-wrapper'></div>");
        AutoZoom.autozoom("encyclopedia-spell-wrapper", 204, 302.5);        
        EncyclopediaSpells.displaySpells();
    },

    displaySpells: function()
    {
        var spells = "";

        Encyclopedia.spells.list.sort(function(s1, s2) { 
            var name1 = (s1.sort && s1.sort ? s1.sort : s1.title) + s1.type;
            var name2 = (s2.sort && s2.sort ? s2.sort : s2.title) + s2.type;
            return name1.toLowerCase().localeCompare(name2.toLowerCase()); 
        })

        var spellList = Encyclopedia.spells.list;
        var ignoredPrevious = 0;
        for (var i in spellList)
        {
            i = parseInt(i);
            var spell = spellList[i];

            if (i < spellList.length - 1
                && spellList[i+1].id == spell.id)
            {
                ignoredPrevious++;
                continue;
            }

            spell = spellList[i - ignoredPrevious];

            spells += "<a id='spell-" + spell.id + "' href='javascript:void(0)' data-count='" + (ignoredPrevious+1) + "' onclick='EncyclopediaSpells.openSpell(\"" + spell.id + "\")'>";
            spells += CardSpell._cardCode(EncyclopediaSpells._convertSpellToStudio(spell));
            spells += "</a>";

            ignoredPrevious = 0;
        }

        $("#encyclopedia-spell-wrapper").html(spells);
        EncyclopediaSpells.updateDisplaySpells();
    },

    updateDisplaySpells: function()
    {
        Encyclopedia.updateFacets(EncyclopediaSpells._facets, Encyclopedia.spells.list, "es");

        $("#encyclopedia-spell-wrapper a").hide();

        var spellList = Encyclopedia.spells.list.filter(Encyclopedia.filter(EncyclopediaSpells._facets, "es"));
        var ignoredPrevious = 0;
        for (var i in spellList)
        {
            i = parseInt(i);
            var spell = spellList[i];

            if (i < spellList.length - 1
                && spellList[i+1].id == spell.id)
            {
                ignoredPrevious++;
                continue;
            }

            spell = spellList[i - ignoredPrevious];

            $("#spell-" + spell.id).attr('data-count', ignoredPrevious+1).show();

            ignoredPrevious = 0;
        }
    },

    _convertSpellToStudio: function(spell, spell2)
    {
        return {
            id: spell.id + "-" + Math.random(),
            name: (spell2 || spell).title,
            type: spell.type,
            longName: (spell2 || spell).titleLong,
            text: (spell2 || spell).text,
            textSize: (spell2 || spell).textStyle.textSize,
            textInter: (spell2 || spell).textStyle.textInter,
            cost: spell.cost,
            saturation: spell.saturation,
            image: spell.image ? spell.image + "?version=" + Version : null,
            imageEffect: false,
            imagelocation: {x: "50", y: "50"},
            imagezoom: "100",
            imagerotation: "0",
            explosion: spell.explosion,
            reaction: spell.reaction
        };
    },

    _findSpellsById: function(id)
    {
        var spells = [];
        for (var i in Encyclopedia.spells.list)
        {
            var spell = Encyclopedia.spells.list[i];
            if (spell.id == id)
            {
                spells.push(spell);
            }
        }
        return spells;
    },

    _findSpellsBySkill: function(id)
    {
        var spells = [];
        var spellsIds = {};

        for (var i in Encyclopedia.spells.list)
        {
            var spell = Encyclopedia.spells.list[i];
            if (spell.forSkill == id && !spellsIds[id])
            {
                spells.push(spell);
                spellsIds[id] = true;
            }
        }

        return spells;
    },

    _findSpellsByToken: function(tokenId)
    {
        var spells = [];
        var spellsIds = {};

        for (var i in Encyclopedia.spells.list)
        {
            var spell = Encyclopedia.spells.list[i];
            if (!spellsIds[spell.id] && spell.tokens && spell.tokens.indexOf(tokenId) >= 0)
            {
                spells.push(spell);
                spellsIds[spell.id] = true;
            }
        }

        return spells;
    },

    onShow: function() {
    },

    onHide: function() {
    },

    openSpell: async function(id) {
        EncyclopediaSpells._language = Language;
        
        var spells = EncyclopediaSpells._findSpellsById(id);

        var originsCount = {};

        for (var e in spells)
        {
            var spell = spells[e];

            var origins = spell.origins.slice();
            for (var i in origins)
            {
                var origin = origins[i];
                originsCount[origin] = originsCount[origin] ? originsCount[origin]+1 : 1;
            }
        }

        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaSpells._i18n.fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaSpells._i18n.card : EncyclopediaSpells._i18n.cards) + ")";
        }
        
        var forVersus = "";
        if (spell.type == "versus")
        {
            forVersus = "<div class='from'>" + EncyclopediaSpells._i18n.forVersus + "</div>";
        }

        var tokens = "";
        if (spell.tokens)
        {
            for (var i = 0; i < spell.tokens.length; i++)
            {
                var token = spell.tokens[i];
                tokens += EncyclopediaTokens._linkToToken(token, true);
            }
        }
        
        var spell = spells[0];

        let spell2 = null;
        if (Language2 && Language2 != Language)
        {
            try
            {
                if (!EncyclopediaSpells._secondaryData)
                {
                    EncyclopediaSpells._secondaryData = await Utils.loadJSON("data/spells/lang/spells." + Language2 + ".json");
                }
                spell2 = EncyclopediaSpells._secondaryData.list[id]
            }
            catch (e)
            {
                console.error("Cannot download the " + Language2 + " file of spells", e);
            }
        }

        Nav.dialog(spell.title,
            "<div class='spelldetails'>"
                + CardSpell._cardCode(EncyclopediaSpells._convertSpellToStudio(spell))
                + (spell2 ? CardSpell._cardCode(EncyclopediaSpells._convertSpellToStudio(spell, spell2)) : '')
                + "<div class='minwidth'></div>"
                + "<div class='from'>" + EncyclopediaSpells._i18n.from + " " + originString + "</div>"
                + forVersus
                + ((spell && spell.clarification) ?"<div class='clarification'>" + EncyclopediaSpells._i18n.clarification + " " + spell.clarification.replace(/\n/g, "<br/>") + "</div>" : "")
                + ((spell2 && spell2.clarification) ?"<div class='clarification'>" + EncyclopediaSpells._i18n.clarification + " " + spell2.clarification.replace(/\n/g, "<br/>") + "</div>" : "")
                + (spell.forSkill ? "<div class='skill'>" + EncyclopediaSpells._i18n.skill + " " + Rules._linkToSkill(spell.forSkill, true) + "</div>" : "")
                + (tokens ? ("<div class='tokens'>" + EncyclopediaSpells._i18n.tokensUsed + " " + tokens + "</div>") : "")
            + "</div>",
            null,
            [{
                label: EncyclopediaSpells._i18n.transfertToStudio,
                icon: "encyclopedia-spell-tostudio",
                fn: "EncyclopediaSpells._transfert('" + id + "');"
            }]
        );
    },

    _transfert: function(id) {
        if (confirm(EncyclopediaSpells._i18n.transfertConfirm))
        {
            var spell = EncyclopediaSpells._findSpellsById(id)[0];
            var studioSpell = EncyclopediaSpells._convertSpellToStudio(spell);

            var cards = JSON.parse(localStorage.getItem(Application + "_StudioSpellCards")) || [];
            cards.push(studioSpell);
            localStorage.setItem(Application + "_StudioSpellCards", JSON.stringify(cards));

            CardSpell._displayCards();

            Nav.switchTo($("*[for=studio]")[0]);
            $("#studio .nav-wrapper").slick('slickGoTo', $("#spell").index());
            $("#spell").animate({ scrollTop: $('#spell > *:last()').position().top },500);

            About.warnToast(EncyclopediaSpells._i18n.transfertOK)
            Nav.closeDialog(true);
        }
    },

    _linkToSpell: function(id) {
        return "<a href='javascript:void(0)' onclick='EncyclopediaSpells.openSpell(\"" + id + "\")'>" + EncyclopediaSpells._findSpellsById(id)[0].title + "</a>";
    }
}
