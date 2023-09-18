var EncyclopediaEquipments = {
    preinit: function()
    {
        Encyclopedia._slides.push({ label: EncyclopediaEquipments._i18n.tab, shortLabel: EncyclopediaEquipments._i18n.shorttab, id: "encyclopedia-equipment", onShow: EncyclopediaEquipments.onShow,  onHide: EncyclopediaEquipments.onHide });

        EncyclopediaEquipments._facets = Utils.mergeObject([
            {
                id: 'keyword',
                filter: function(item, value)
                {
                    return item.title && Rules._deemphasize(item.title).indexOf(Rules._deemphasize(value)) != -1;
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
                id:'type',
                sort: true,
                operator: "or/and",
                values: [
                    { id: "melee" },
                    { id: "ranged" },
                    { id: "manipulation" },
                    { id: "throwable" },
                    { id: "area" },
                    { id: "guard" },
                    { id: "armor" },
                    { id: "skill" },
                    { id: "other" }
                ],
                filter: function(item, selectedValues) {
                    
                    return (selectedValues.indexOf('melee')!=-1 && item.melee['0'] != "none")
                        || (selectedValues.indexOf('ranged')!=-1 && (item.ranged['0'] != "none" || item.ranged['throwable']))
                        || (selectedValues.indexOf('throwable')!=-1 && item.ranged['throwable'])
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
                values: [ { id: "no", defaults: true }, { id: "yes" } ],
                filter: function(item, selectedValues) {
                    var nodata = item.title == ''
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
        ], EncyclopediaEquipments._facets);
    },
    
    init: function() 
    {
        EncyclopediaEquipments.debouncedUpdateDisplayEquipments = $.debounce(250, EncyclopediaEquipments.updateDisplayEquipments);
        Encyclopedia.displaySearchEngine("encyclopedia-equipment", EncyclopediaEquipments._facets, "EncyclopediaEquipments.updateDisplayEquipments()", "EncyclopediaEquipments.debouncedUpdateDisplayEquipments()", "ee");
        $("#encyclopedia-equipment .search-wrapper").append("<div id='encyclopedia-equipment-wrapper'></div>");
        AutoZoom.autozoom("encyclopedia-equipment-wrapper", 204, 302.5);  
        EncyclopediaEquipments.displayEquipments();
    },
    
    displayEquipments: function()
    {
        var equipments = "";
        
        Encyclopedia.equipments.list.sort(function(s1, s2) {
            if (!s2.title && !s1.title)
            {
                return s1.image && s2.image ? s1.image.toLowerCase().localeCompare(s2.image.toLowerCase()) : 0;
            }
            else if (!s2.title)
            {
                return 1;
            }
            else if (!s1.title)
            {
                return -1;
            }
            else
            {
                return s1.title.toLowerCase().localeCompare(s2.title.toLowerCase());
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
            name: equipment.title,
            text: equipment.text ? equipment.text : "",
            encumbrance: equipment.encumbrance,
            movement: equipment.movement || "",
            melee: equipment.melee,
            ranged: equipment.ranged,
            manipulation: equipment.manipulation,
            active: equipment.active,
            passive: equipment.passive,
            skills: equipment.skills || { 0: "none", 1: "none" },
            skillsatbottom: equipment.skillsatbottom || false,
            image: equipment.image ? equipment.image + "?version=" + Version : null,
            imagelocation: equipment.imagelocation || {x: "50", y: "50"},
            imagezoom: equipment.imagezoom || "100",
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
            if (originString) originString += " " + EncyclopediaEquipments._i18n.fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaEquipments._i18n.card : EncyclopediaEquipments._i18n.cards) + ")";
        }
        
        var c = "";
        for (var e in displayEquipments)
        {
            var equipment = displayEquipments[e]; 
            c += CardEquipment._cardCode(EncyclopediaEquipments._convertEquipmentToStudio(equipment, i));
        }
        
        Nav.dialog(equipment.title || "",
            "<div class='equipmentdetails'>" 
                + c
                + "<div class='minwidth'></div>"
                + "<div class='from'>" + EncyclopediaEquipments._i18n.from + " "
                    + originString
                + "</div>"
                + ((equipment.skills && equipment.skills[0] != 'none') ?
                    ("<div class='skill'>" 
                        + EncyclopediaEquipments._i18n.skill 
                        + " " 
                        + Rules._linkToSkill(equipment.skills[0], true) 
                         + (equipment.skills[1] != 'none' ? ", " + Rules._linkToSkill(equipment.skills[1], true) : "")
                    + "</div>") : "") 
            + "</div>",
            null,
            [{
                label: EncyclopediaEquipments._i18n.transfertToStudio,
                icon: "encyclopedia-equipment-tostudio",
                fn: "EncyclopediaEquipments._transfert('" + id + "');"
            }]
        );
    },
    
    _transfert: function(id) {
        if (confirm(EncyclopediaEquipments._i18n.transfertConfirm))
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
            
            About.warnToast(EncyclopediaEquipments._i18n.transfertOK)
            Nav.closeDialog(true);
        }
    },
    
    _linkToEquipment: function(id) {
        return "<a href='javascript:void(0)' onclick='EncyclopediaEquipments.openEquipment(\"" + id + "\")'>" + EncyclopediaEquipments._findEquipmentsById(id)[0].title + "</a>";
    }
}
