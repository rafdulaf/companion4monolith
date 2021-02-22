var EncyclopediaEquipments = {
    _i18n: {
        'fr': {
            'tab': "Equipe<wbr/>ments",
            'transfertToStudio': "Copier la carte dans le studio",
            'transfertOK': "La carte a été copiée dans le studio des cartes d'équipements",
            'transfertConfirm': "Voulez-vous copier la carte dans le studio pour pouvoir la modifier ou l'imprimer ?",
            'from': "Disponible dans :",
            'fromAnd': "et",
            'card': "exemplaire",
            'cards': "exemplaires",
            'skill': "Compétence :"
        },
        'en': {
            'tab': "Equip<wbr/>ments",
            'transfertToStudio': "Copy the card into the studio",
            'transfertOK': "The card was copied to the equipment cards studio",
            'transfertConfirm': "Do you want to copy the card into the studio in order to edit it or print it?",
            'from': "Available in:",
            'fromAnd': "and",
            'card': "copy",
            'cards': "copies",
            'skill': "Skill:"
        },
        'it': {
            'tab': "Equip<wbr/>aggiamento",
            'transfertToStudio': "Copia la carta nello Studio",
            'transfertOK': "La carta è stata copiata nelle carte equipaggiamento dello Studio.",
            'transfertConfirm': "Vuoi copiare la carta nello Studio per modificarla o stamparla?",
            'from': "Disponibile in:",
            'fromAnd': "e",
            'card': "copia",
            'cards': "copie",
            'skill': "Abilità:"
        }
    },
    
    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaEquipments._i18n[Language].tab, id: "encyclopedia-equipment", onShow: EncyclopediaEquipments.onShow,  onHide: EncyclopediaEquipments.onHide });
        
        EncyclopediaEquipments._facets = [
            {
                id: 'keyword',
                label: {
                    'fr': "Mot-clé",
                    'en': "Keyword",
                    'it': "Parola chiave"
                },
                filter: function(item, value)
                {
                    return item.title[Language] && Rules._deemphasize(item.title[Language]).indexOf(Rules._deemphasize(value)) != -1;
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
                        id: "manipulation",
                        label: {
                            'fr': "Manipulation",
                            'en': "Manipulation",
                            'it': "Manipolazione"
                        }
                    },
                    {
                        id: "throwable",
                        label: {
                            'fr': "Lançable",
                            'en': "Throwable",
                            'it': "Lanciabile"
                        }
                    },
                    {
                        id: "area",
                        label: {
                            'fr': "Zone",
                            'en': "Area",
                            'it': "Area"
                        }
                    },
                    {
                        id: "guard",
                        label: {
                            'fr': "Défense active",
                            'en': "Guard",
                            'it': "Difesa"
                        }
                    },
                    {
                        id: "armor",
                        label: {
                            'fr': "Défense passive",
                            'en': "Armor",
                            'it': "Armatura"
                        }
                    },
                    {
                        id: "skill",
                        label: {
                            'fr': "Compétence",
                            'en': "Skill",
                            'it': "Abilità"
                        }
                    },
                    {
                        id: "other",
                        label: {
                            'fr': "Divers",
                            'en': "Misc.",
                            'it': "Altro"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    
                    return (selectedValues.indexOf('melee')!=-1 && item.melee['0'] != "none")
                        || (selectedValues.indexOf('ranged')!=-1 && item.ranged['0'] != "none")
                        || (selectedValues.indexOf('throwable')!=-1 && item.ranged['0'] != "none" && item.ranged['throwable'])
                        || (selectedValues.indexOf('manipulation')!=-1 && item.manipulation['0'] != "none")
                        || (selectedValues.indexOf('area')!=-1 && item.manipulation['0'] != "none" && item.manipulation['explosive'])
                        || (selectedValues.indexOf('guard')!=-1 && item.active['0'] != "none")
                        || (selectedValues.indexOf('armor')!=-1 && item.passive['0'] != "none")
                        || (selectedValues.indexOf('skill')!=-1 && item.skills && item.skills['0'] != "none")
                        || (selectedValues.indexOf('other')!=-1 && item.melee['0'] == "none" && item.ranged['0'] == "none" && item.manipulation['0'] == "none" && item.active['0'] == "none" && item.passive['0'] == "none" && (!item.skills || item.skills['0'] == "none"));
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
                    var nodata = item.title[Language] == ''
                                && !item.encumbrance
                                && item.melee['0'] == "none"
                                && item.ranged['0'] == "none"
                                && item.manipulation['0'] == "none"
                                && item.active['0'] == "none"
                                && item.passive['0'] == "none"
                                && !item.image;
                    
                    return (nodata && (selectedValues.indexOf('yes')!=-1))
                        || (!nodata && (selectedValues.indexOf('no')!=-1));
                }
            }
        ]
    },
    
    init: function() 
    {
        $("#encyclopedia-equipment").append(Encyclopedia.displaySearchEngine(EncyclopediaEquipments._facets, "EncyclopediaEquipments.updateDisplayEquipments()", "ee"));
        $("#encyclopedia-equipment").append("<div id='encyclopedia-equipment-wrapper'></div>");
        EncyclopediaEquipments.displayEquipments();
    },
    
    displayEquipments: function()
    {
        var equipments = "";
        
        Encyclopedia.equipments.list.sort(function(s1, s2) {
            if (!s2.title[Language] && !s1.title[Language])
            {
                return s1.image && s2.image ? s1.image.toLowerCase().localeCompare(s2.image.toLowerCase()) : 0;
            }
            else if (!s2.title[Language])
            {
                return 1;
            }
            else if (!s1.title[Language])
            {
                return -1;
            }
            else
            {
                return s1.title[Language].toLowerCase().localeCompare(s2.title[Language].toLowerCase());
            }
        });

        var equipmentList = Encyclopedia.equipments.list;
        var ignoredPrevious = 0;
        for (var i in equipmentList)
        {
            i = parseInt(i);
            var equipment = equipmentList[i];
            
            if (i < equipmentList.length - 1
                && equipmentList[i+1].id == equipment.id)
            {
                ignoredPrevious++;
                continue;
            }
            
            equipment = equipmentList[i - ignoredPrevious];
            
            equipments += "<a id='equipment-" + equipment.id + "' href='javascript:void(0)' data-count='" + (ignoredPrevious+1) + "' onclick='EncyclopediaEquipments.openEquipment(\"" + equipment.id + "\")'>";
            equipments += CardEquipment._cardCode(EncyclopediaEquipments._convertEquipmentToStudio(equipment));
            equipments += "</a>";
            
            ignoredPrevious = 0;
        }
        
        $("#encyclopedia-equipment-wrapper").html(equipments);
        EncyclopediaEquipments.updateDisplayEquipments()
    },
    
    updateDisplayEquipments: function()
    {
        Encyclopedia.updateFacets(EncyclopediaEquipments._facets, Encyclopedia.equipments.list, "ee");
        
        $("#encyclopedia-equipment-wrapper a").hide();
        
        var equipmentList = Encyclopedia.equipments.list.filter(Encyclopedia.filter(EncyclopediaEquipments._facets, "ee"));
        var ignoredPrevious = 0;
        for (var i in equipmentList)
        {
            i = parseInt(i);
            var equipment = equipmentList[i];
            
            if (i < equipmentList.length - 1
                && equipmentList[i+1].id == equipment.id)
            {
                ignoredPrevious++;
                continue;
            }
            
            equipment = equipmentList[i - ignoredPrevious];
            
            $("#equipment-" + equipment.id).attr('data-count', ignoredPrevious+1).show();
            
            ignoredPrevious = 0;
        }
    },
    
    _convertEquipmentToStudio: function(equipment, i)
    {
        i = i ? i : 0;
        return {
            id: equipment.id + "-" + Math.random(),
            name: equipment.title[Language],
            encumbrance: equipment.encumbrance,
            movement: equipment.movement || "",
            melee: equipment.melee,
            ranged: equipment.ranged,
            manipulation: equipment.manipulation,
            active: equipment.active,
            passive: equipment.passive,
            skills: equipment.skills || { 0: "none", 1: "none" },
            image: equipment.image ? equipment.image + "?version=" + Version : null,
            imagelocation: {x: "50", y: "50"},
            imagezoom: "100",
            imagerotation: "0"
        };
    },
    
    _findEquipmentsById: function(id)
    {
        var equipments = [];
        
        for (var i in Encyclopedia.equipments.list)
        {
            var equipment = Encyclopedia.equipments.list[i];
            if (equipment.id == id)
            {
                equipments.push(equipment);
            }
        }
        
        return equipments;
    },

    _findEquipmentsBySkill: function(id)
    {
        id = Rules._findSkillById(id).type + "/" + id;
        
        var equipments = [];
        var equipmentsIds = {};
        
        for (var i in Encyclopedia.equipments.list)
        {
            var equipment = Encyclopedia.equipments.list[i];
            if (equipment.skills
                && !equipmentsIds[equipment.id]
                && (equipment.skills[0] == id
                    || 
                    (equipment.skills[0] != "none" && equipment.skills[1] == id)))
            {
                equipments.push(equipment);
                equipmentsIds[equipment.id] = true;
            }
        }
        
        return equipments;
    },

    onShow: function() {
    },
    
    onHide: function() {
    },

    openEquipment: function(id) {
        var equipments = EncyclopediaEquipments._findEquipmentsById(id);
        var displayEquipments = [];
        
        var images = {};
        var originsCount = {};
        for (var e in equipments)
        {
            var equipment = equipments[e];
            
            var origins = equipment.origins.slice();
            for (var i in origins)
            {
                var origin = origins[i];
                originsCount[origin] = originsCount[origin] ? originsCount[origin]+1 : 1;
            }
            
            if (!images[equipment.image])
            {
                images[equipment.image] = true;
                displayEquipments.push(equipment);
            }
        }
        
        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaEquipments._i18n[Language].fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaEquipments._i18n[Language].card : EncyclopediaEquipments._i18n[Language].cards) + ")";
        }
        
        var c = "";
        for (var e in displayEquipments)
        {
            var equipment = displayEquipments[e]; 
            c += CardEquipment._cardCode(EncyclopediaEquipments._convertEquipmentToStudio(equipment, i));
        }
        
        Nav.dialog(equipment.title[Language] || "",
            "<div class='equipmentdetails'>" 
                + c
                + "<div class='minwidth'></div>"
                + "<div class='from'>" + EncyclopediaEquipments._i18n[Language].from + " "
                    + originString
                + "</div>"
                + ((equipment.skills && equipment.skills[0] != 'none') ?
                    ("<div class='skill'>" 
                        + EncyclopediaEquipments._i18n[Language].skill 
                        + " " 
                        + Rules._linkToSkill(equipment.skills[0], true) 
                         + (equipment.skills[1] != 'none' ? ", " + Rules._linkToSkill(equipment.skills[1], true) : "")
                    + "</div>") : "") 
            + "</div>",
            null,
            [{
                label: EncyclopediaEquipments._i18n[Language].transfertToStudio,
                icon: "encyclopedia-equipment-tostudio",
                fn: "EncyclopediaEquipments._transfert('" + id + "');"
            }]
        );
    },
    
    _transfert: function(id) {
        if (confirm(EncyclopediaEquipments._i18n[Language].transfertConfirm))
        {
            var cards = JSON.parse(localStorage.getItem(Application + "_StudioEquipmentCards")) || [];
            
            var images = {};
            
            var equipments = EncyclopediaEquipments._findEquipmentsById(id);
            for (var i in equipments)
            {
                var equipment = equipments[i];
                
                if (images[equipment.image])
                {
                    continue;
                }
                
                images[equipment.image] = true;
                var studioEquipment = EncyclopediaEquipments._convertEquipmentToStudio(equipment);
                cards.push(studioEquipment);
            }
            
            localStorage.setItem(Application + "_StudioEquipmentCards", JSON.stringify(cards));
            
            CardEquipment._displayCards();
            
            Nav.switchTo($("*[for=studio]")[0]);
            $("#studio .nav-wrapper").slick('slickGoTo', $("#equipment").index());
            $("#equipment").animate({ scrollTop: $('#equipment > *:last()').position().top },500);
            
            About.warnToast(EncyclopediaEquipments._i18n[Language].transfertOK)
            Nav.closeDialog(true);
        }
    },
    
    _linkToEquipment: function(id) {
        return "<a href='javascript:void(0)' onclick='EncyclopediaEquipments.openEquipment(\"" + id + "\")'>" + EncyclopediaEquipments._findEquipmentsById(id)[0].title[Language] + "</a>";
    }
}
