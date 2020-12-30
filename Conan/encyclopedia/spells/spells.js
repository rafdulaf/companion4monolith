var EncyclopediaSpells = {
    _i18n: {
        'fr': {
            'tab': "Sorts",
            'transfertToStudio': "Copier la carte dans le studio",
            'transfertOK': "La carte a été copiée dans le studio des cartes de sorts",
            'transfertConfirm': "Voulez-vous copier la carte dans le studio pour pouvoir la modifier ou l'imprimer ?",
            'from': "Disponible dans :",
            'fromAnd': "et",
            'card': "exemplaire",
            'cards': "exemplaires",
            'clarification': "Clarification :",
            'skill': "Compétence :",
            'tokensUsed': "Utilise les jetons :"
        },
        'en': {
            'tab': "Spells",
            'transfertToStudio': "Copy the card into the studio",
            'transfertOK': "The card was copied to the spell cards studio",
            'transfertConfirm': "Do you want to copy the card into the studio in order to edit it or print it?",
            'from': "Available in:",
            'fromAnd': "and",
            'card': "copy",
            'cards': "copies",
            'clarification': "Clarification:",
            'skill': "Skill:",
            'tokensUsed': "Use the tokens:"
          },
          'it': {
              'tab': "Incantesimi",
              'transfertToStudio': "Copia la carta nello Studio",
              'transfertOK': "La carta è stata copiata nello Studio",
              'transfertConfirm': "Vuoi copiare la carta nello Studio per modificarla o stamparla?",
              'from': "Disponibile in:",
              'fromAnd': "e",
              'card': "copia",
              'cards': "copie",
              'clarification': "Chiarificazione:",
              'skill': "Abilità:",
              'tokensUsed': "Usa il segnalino :"
          }
    },

    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaSpells._i18n[Language].tab, id: "encyclopedia-spell", onShow: EncyclopediaSpells.onShow,  onHide: EncyclopediaSpells.onHide });

        EncyclopediaSpells._facets = [
            {
                id: 'keyword',
                label: {
                    'fr': "Mot-clé",
                    'en': "Keyword",
                    'it': "Parola chiave"
                },
                filter: function(item, value)
                {
                    return Rules._deemphasize(item.title[Language] + item.text[Language]).indexOf(Rules._deemphasize(value)) != -1;
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
                        var hasExpansion = About._hasExpansion(item.origins);
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
                id:'zone',
                label: {
                    'fr': "Sort de zone",
                    'en': "Area spell",
                    'it': "Ad Area"
                },
                values: [
                    {
                        id: "no",
                        label: {
                            'fr': "Non",
                            'en': "No",
                            'it': "No"
                        }
                    },
                    {
                        id: "yes",
                        label: {
                            'fr': "Oui",
                            'en': "Yes",
                            'it': "Sì"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    return (item.explosion == true && (selectedValues.indexOf('yes')!=-1))
                        || (item.explosion == false && (selectedValues.indexOf('no')!=-1));
                }
            },

            {
                id:'reaction',
                label: {
                    'fr': "Sort réaction",
                    'en': "Reaction spell",
                    'it': "Di Reazione"
                },
                values: [
                    {
                        id: "no",
                        label: {
                            'fr': "Non",
                            'en': "No",
                            'it': "No"
                        }
                    },
                    {
                        id: "yes",
                        label: {
                            'fr': "Oui",
                            'en': "Yes",
                            'it': "Sì"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    return (item.reaction == true && (selectedValues.indexOf('yes')!=-1))
                        || (item.reaction == false && (selectedValues.indexOf('no')!=-1));
                }
            },

            {
                id:'side',
                label: {
                    'fr': "Camp",
                    'en': "Side",
                    'it': "Fazione"
                },
                operator: "or/and",
                values: [
                    {
                        id: "heroes",
                        label: {
                            'fr': "Héros",
                            'en': "Heroes",
                            'it': "Eroi"
                        }
                    },
                    {
                        id: "overlord",
                        label: {
                            'fr': "Overlord",
                            'en': "Overlord",
                            'it': "Overlord"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    return (item.forOverlord == true && (selectedValues.indexOf('overlord')!=-1))
                        || (item.forHeroes == true && (selectedValues.indexOf('heroes')!=-1));
                }
            },

            {
                id:'theme',
                label: {
                    'fr': "Thème",
                    'en': "Theme",
                    'it': "Tipologia"
                },
                sort: true,
                operator: "or/and",
                values: [
                    {
                        id: "forAttack",
                        label: {
                            'fr': "Attaque",
                            'en': "Attack",
                            'it': "Attacco"
                        }
                    },
                    {
                        id: "forFight",
                        label: {
                            'fr': "Dé de combat",
                            'en': "Fight die",
                            'it': "Combattimento"
                        }
                    },
                    {
                        id: "forDefense",
                        label: {
                            'fr': "Dé de défense",
                            'en': "Defense die",
                            'it': "Difesa"
                        }
                    },
                    {
                        id: "forMove",
                        label: {
                            'fr': "Déplacement",
                            'en': "Move",
                            'it': "Movimento"
                        }
                    },
                    {
                        id: "forManipulation",
                        label: {
                            'fr': "Manipulation",
                            'en': "Manipulation",
                            'it': "Manipolazione"
                        }
                    },
                    {
                        id: "forSkill",
                        label: {
                            'fr': "Compétence",
                            'en': "Skill",
                            'it': "Abilità"
                        }
                    },
                    {
                        id: "forRange",
                        label: {
                            'fr': "A distance",
                            'en': "Range",
                            'it': "Distanza"
                        }
                    },
                    {
                        id: "forEnergy",
                        label: {
                            'fr': "Gemmes",
                            'en': "Gems",
                            'it': "Gemme"
                        }
                    }
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
                id:'empty',
                label: {
                    'fr': "Cartes",
                    'en': "Cards",
                    'it': "Carte"
                },
                values: [
                    {
                        id: "no",
                        label: {
                            'fr': "Remplies",
                            'en': "Filled",
                            'it': "Piene"
                        },
                        defaults: true
                    },
                    {
                        id: "yes",
                        label: {
                            'fr': "Vierges",
                            'en': "Blank",
                            'it': "Vuote"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    return (item.text[Language] == '' && (selectedValues.indexOf('yes')!=-1))
                        || (item.text[Language] != '' && (selectedValues.indexOf('no')!=-1));
                }
            }
        ]
    },

    init: function()
    {
        $("#encyclopedia-spell").append(Encyclopedia.displaySearchEngine(EncyclopediaSpells._facets, "EncyclopediaSpells.updateDisplaySpells()", "es"));
        $("#encyclopedia-spell").append("<div id='encyclopedia-spell-wrapper'></div>");
        EncyclopediaSpells.displaySpells();
    },

    displaySpells: function()
    {
        var spells = "";

        Encyclopedia.spells.list.sort(function(s1, s2) { 
            var name1 = s1.sort && s1.sort[Language] ? s1.sort[Language] : s1.title[Language];
            var name2 = s2.sort && s2.sort[Language] ? s2.sort[Language] : s2.title[Language];
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
            if (!spellsIds[tokenId] && spell.tokens && spell.tokens.indexOf(tokenId) >= 0)
            {
                spells.push(spell);
                spellsIds[tokenId] = true;
            }
        }

        return spells;
    },

    onShow: function() {
    },

    onHide: function() {
    },

    openSpell: function(id) {
        var spells = EncyclopediaSpells._findSpellsById(id);

        var originsCount = {};

        for (var e in spells)
        {
            var spell = spells[e];

            var origins = Encyclopedia._removeExtraExpansion(spell.origins.slice());
            for (var i in origins)
            {
                var origin = origins[i];
                originsCount[origin] = originsCount[origin] ? originsCount[origin]+1 : 1;
            }
        }

        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaSpells._i18n[Language].fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaSpells._i18n[Language].card : EncyclopediaSpells._i18n[Language].cards) + ")";
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
        Nav.dialog(spell.title[Language],
            "<div class='spelldetails'>"
                + CardSpell._cardCode(EncyclopediaSpells._convertSpellToStudio(spell))
                + "<div class='minwidth'></div>"
                + "<div class='from'>" + EncyclopediaSpells._i18n[Language].from + " "
                    + originString
                + "</div>"
                + ((spell.clarification && spell.clarification[Language]) ?"<div class='clarification'>" + EncyclopediaSpells._i18n[Language].clarification + " " + spell.clarification[Language] + "</div>" : "")
                + (spell.forSkill ? "<div class='skill'>" + EncyclopediaSpells._i18n[Language].skill + " " + Rules._linkToSkill(spell.forSkill, true) + "</div>" : "")
                + (tokens ? ("<div class='tokens'>" + EncyclopediaSpells._i18n[Language].tokensUsed + " " + tokens + "</div>") : "")
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
            var spell = EncyclopediaSpells._findSpellsById(id)[0];
            var studioSpell = EncyclopediaSpells._convertSpellToStudio(spell);

            var cards = JSON.parse(localStorage.getItem(Application + "_StudioSpellCards")) || [];
            cards.push(studioSpell);
            localStorage.setItem(Application + "_StudioSpellCards", JSON.stringify(cards));

            CardSpell._displayCards();

            Nav.switchTo($("*[for=studio]")[0]);
            $("#studio .nav-wrapper").slick('slickGoTo', $("#spell").index());
            $("#spell").animate({ scrollTop: $('#spell > *:last()').position().top },500);

            About.warnToast(EncyclopediaSpells._i18n[Language].transfertOK)
            Nav.closeDialog(true);
        }
    },

    _linkToSpell: function(id) {
        return "<a href='javascript:void(0)' onclick='EncyclopediaSpells.openSpell(\"" + id + "\")'>" + EncyclopediaSpells._findSpellsById(id)[0].title[Language] + "</a>";
    }

}
