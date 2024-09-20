var CardEquipment = mergeObject(StudioItem, {
    name: 'equipment',
    cls: 'CardEquipment',
    storage: Application + "_StudioEquipmentCards", 
    _itemWidth: 204,
    _itemHeight: 302.5,
    
    _getDisplayItemsCode: function(withEditLink, printPurpose, data)
    {
        var html = "";

        var cards = data || JSON.parse(localStorage.getItem(this.storage)) || [];
        if (cards.length > 0)
        {
            for (var i in cards)
            {
                var prefix = "", suffix = "";
                if (withEditLink !== false)
                {
                    prefix = "<a href='javascript:void(0)' onclick='CardEquipment.add(JSON.parse(localStorage.getItem(\"" + this.storage + "\"))[" + i + "])'>";
                    suffix = "</a>";
                }
                else
                {
                    prefix = "<input type='checkbox'" + (cards[i].prechecked ? " checked='checked'" : "") + " id='equipment-" + i + "' name='equipment' data-index='" + i + "' onchange=\"$('#equipment-back-" + i + "').toggleClass('invisible');\"/><label for='equipment-" + i + "'>";
                    suffix = "</label>";
                }

                html += prefix + "<div class='printoverflow'>" + CardEquipment._cardCode(cards[i]) + "</div>" + suffix;
            }
        }
        else
        {
            html += "<div class=\"nocards\">" + CardEquipment._i18n.nocard + (withEditLink !== false ? CardEquipment._i18n.nocard2 : '') + "</div>";
        }

        if (!withEditLink)
        {
            for (var i in cards)
            {
                html += "<div id=\"equipment-back-" + i + "\"  class='printoverflow back invisible'><img src=\"studio/card_equipment/img/back.webp?version=" + Version + "\"/></div>"
            }
        }

        return html;
    },

    _cardCode: function(card) {
        var code = "<div class=\"equipement card\">"
                + "<picture class=\"background\">"
                    + "<source media=\"print\" srcset=\"studio/card_equipment/img/background_hd.webp?version=" + Version + "\"/>"
                    + "<img src=\"studio/card_equipment/img/background.webp?version=" + Version + "\"/>"
                + "</picture>";

        var imageCode = "<div class=\"image\"><img " + LazyImage + " src=\"" + card.image + "\" style=\"left: " + card.imagelocation.x + "%; top: " + card.imagelocation.y + "%; width: " + card.imagezoom + "%; transform: translate(-50%, -50%) rotate(" + card.imagerotation + "deg)\"/></div>";

        var lastIsLarge = false;
        
        if (card.image && !card.imageatfront)
        {
            code += imageCode;
        }

        if (card.name !== undefined && card.name !== null)
        {
               code += "<img class=\"background-name\" src=\"studio/card_equipment/img/name-background.webp?version=" + Version + "\"/>"
                    + "<div class=\"name\">" + card.name + "</div>";
        }

        var level = 0;
        var textMalus = 0;
        
        function drawSkillAtBottom(size)
        {
            size = size || 20;
            
            level+=size;
            
            code += "<div class=\"skillsbonus level" + level + "\">"
                     + "<img class=\"bonus\" src=\"studio/card_equipment/img/bonus.webp?version=" + Version + "\"/>"
                     + "<img class=\"background-skills\" src=\"" + CardEquipment._getSkillImage(card.skills[0]) + "?version=" + Version + "\"/>"
                   + "</div>";
            level++;

            if (card.skills && card.skills[1] != 'none')
            {
                code += "<div class=\"skillsbonus level" + level + "\">"
                     + "<img class=\"bonus\" src=\"studio/card_equipment/img/bonus.webp?version=" + Version + "\"/>"
                     + "<img class=\"background-skills\" src=\"" + CardEquipment._getSkillImage(card.skills[1]) + "?version=" + Version + "\"/>"
                   + "</div>";
                
                level-=size;
            }
        }
        if (card.skills && (card.skillsatbottom === true || card.skillsatbottom === "true") && card.skills[0] != 'none')
        {
            drawSkillAtBottom(10);
        }
        
        let manipLevel = -1;
        if (card.manipulation && (card.manipulation.force == "notext" || card.manipulation.force == "text"))
        {
            textMalus++;
            code += "<div class=\"manipulation" + " level" + level + "\">"
                  + ((card.manipulation.force == "notext") ? ("<img class=\"background-manipulation simple\" src=\"studio/card_equipment/img/manip-simple.webp?version=" + Version + "\"/>") : 
                     "<img class=\"background-manipulation simple\" src=\"studio/card_equipment/img/manip-text.webp?version=" + Version + "\"/>")
                   + "</div>";
            manipLevel = level;
            level++;
            lastIsLarge = card.manipulation[0] != 'none';
        }
        
        if (card.passive && card.passive[0] != 'none')
        {
            textMalus++;
            code += "<div class=\"passive level" + level + "\">"
                   + (card.passive[1] == 'none' ?
                        "<img class=\"background-passive\" src=\"studio/card_equipment/img/armor-1.webp?version=" + Version + "\"/>" :
                        "<img class=\"background-passive duo\" src=\"studio/card_equipment/img/armor-2.webp?version=" + Version + "\"/>")
                     + "<img src=\"studio/card_equipment/img/dice_" + card.passive[0] + ".webp?version=" + Version + "\"/>"
                     + (card.passive[1] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.passive[1] + ".webp?version=" + Version + "\"/>")
                   + "</div>"
            level++;
            lastIsLarge = true;
        }
        if (card.skills && card.skillsatbottom === "true2" && level == 1 && card.skills[0] != 'none')
        {
            drawSkillAtBottom();
        }
        if (card.ranged && (card.ranged[0] != 'none' || card.ranged.throwable))
        {
            textMalus++;
            code += "<div class=\"ranged" + (card.ranged.throwable ? " throw": "") + " level" + level + ((card.ranged[1] != 'none' && card.ranged[2] != 'none' && card.ranged[2] && card.ranged[3] != 'none' && card.ranged[3]) ? " small": "") + "\">"
                   + (card.ranged[0] == 'none' ? "<img class=\"background-ranged\" src=\"studio/card_equipment/img/throw-0.webp?version=" + Version + "\"/>" : 
                       (card.ranged[1] == 'none' ?
                        "<img class=\"background-ranged\" src=\"studio/card_equipment/img/" + (!card.ranged.throwable ? "remote" : "throw") + "-1.webp?version=" + Version + "\"/>" :
                        ((card.ranged[2] == 'none' || !card.ranged[2] ?
                            "<img class=\"background-ranged duo\" src=\"studio/card_equipment/img/" + (!card.ranged.throwable ? "remote" : "throw") + "-2.webp?version=" + Version + "\"/>" :
                            "<img class=\"background-ranged duo\" src=\"studio/card_equipment/img/" + (!card.ranged.throwable ? "remote" : "throw") + "-3.webp?version=" + Version + "\"/>"))))
                     + (card.ranged[0] == 'none' ? "" : ("<img src=\"studio/card_equipment/img/dice_" + card.ranged[0] + ".webp?version=" + Version + "\"/>"
                    + (card.ranged[1] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.ranged[1] + ".webp?version=" + Version + "\"/>")
                    + (card.ranged[2] == 'none' || !card.ranged[2] ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.ranged[2] + ".webp?version=" + Version + "\"/>")
                    + (card.ranged[3] == 'none' || !card.ranged[3] ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.ranged[3] + ".webp?version=" + Version + "\"/>")))
                   + "</div>"
            level++;
            lastIsLarge = card.ranged[0] != 'none';
        }

        if (card.encumbrance || card.encumbrance === "0")
        {
            let up = card.ranged && card.ranged[0] != 'none' && card.ranged[1] != 'none' && card.ranged.throwable;
            
            code += "<img class=\"background-encumbrance" + (up ? " up" : "") + "\" src=\"studio/card_equipment/img/weight.webp?version=" + Version + "\"/>"
                + "<div class=\"encumbrance" + (up ? " up" : "") + "\">" + card.encumbrance + "</div>";
        }

        
        if (card.skills && card.skillsatbottom === "true2" && level == 1 && card.skills[0] != 'none')
        {
            drawSkillAtBottom();
        }
        if (card.active && card.active[0] != 'none')
        {
            textMalus++;
            code += "<div class=\"active level" + level + "\">"
                   + (card.active[1] == 'none' ?
                        "<img class=\"background-active\" src=\"studio/card_equipment/img/defense-1.webp?version=" + Version + "\"/>" :
                        "<img class=\"background-active duo\" src=\"studio/card_equipment/img/defense-2.webp?version=" + Version + "\"/>")
                     + "<img src=\"studio/card_equipment/img/dice_" + card.active[0] + ".webp?version=" + Version + "\"/>"
                     + (card.active[1] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.active[1] + ".webp?version=" + Version + "\"/>")
                   + "</div>"
            level++;
            lastIsLarge = true;
        }
        if (card.skills && card.skillsatbottom === "true2" && level == 1 && card.skills[0] != 'none')
        {
            drawSkillAtBottom();
        }
        if (card.melee && card.melee[0] != 'none')
        {
            textMalus++;
            code += "<div class=\"melee level" + level + ((card.melee[1] != 'none' && card.melee[2] != 'none' && card.melee[2] && card.melee[3] != 'none' && card.melee[3]) ? " small": "") + "\">"
                   + (card.melee[1] == 'none' ?
                        "<img class=\"background-melee\" src=\"studio/card_equipment/img/contact-1.webp?version=" + Version + "\"/>" :
                        ((card.melee[2] == 'none' || !card.melee[2]) ? 
                            "<img class=\"background-melee duo\" src=\"studio/card_equipment/img/contact-2.webp?version=" + Version + "\"/>" :
                            "<img class=\"background-melee duo\" src=\"studio/card_equipment/img/contact-3.webp?version=" + Version + "\"/>"))
                     + "<img src=\"studio/card_equipment/img/dice_" + card.melee[0] + ".webp?version=" + Version + "\"/>"
                     + (card.melee[1] == 'none' ? "" : ("<img src=\"studio/card_equipment/img/dice_" + card.melee[1] + ".webp?version=" + Version + "\"/>"
                        + ((card.melee[2] == 'none' || !card.melee[2]) ? "" : ("<img src=\"studio/card_equipment/img/dice_" + card.melee[2] + ".webp?version=" + Version + "\"/>"
                            + (card.melee[3] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.melee[3] + ".webp?version=" + Version + "\"/>")
                        ))
                     ))
                   + "</div>";
            level++;
            lastIsLarge = true;
        }
        if (card.skills && card.skillsatbottom === "true2" && level == 1 && card.skills[0] != 'none')
        {
            drawSkillAtBottom();
        }

        if (card.movement)
        {
            textMalus++;
            code += "<div class=\"movement level" + level + "\">"
                        + "<img class=\"background-movement\" src=\"studio/card_equipment/img/movement.webp?version=" + Version + "\"/>"
                        + "<div>" + card.movement + "</div>"
                   + "</div>";
            level++;
            lastIsLarge = true;
        }

        if (manipLevel == -1 && card.manipulation && (card.manipulation[0] != 'none' || card.manipulation.explosive))
        {
            textMalus++;
            code += "<div class=\"manipulation" + (card.manipulation.explosive ? " explosive": "") + " level" + level + "\">"
                  + (card.manipulation[1] == 'none' ?
                        "<img class=\"background-manipulation\" src=\"studio/card_equipment/img/" + (!card.manipulation.explosive ? "manip" : "launch") + "-1.webp?version=" + Version + "\"/>" :
                        "<img class=\"background-manipulation duo\" src=\"studio/card_equipment/img/" + (!card.manipulation.explosive ? "manip" : "launch") + "-2.webp?version=" + Version + "\"/>")
                     + (card.manipulation[0] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.manipulation[0] + ".webp?version=" + Version + "\"/>")
                     + (card.manipulation[1] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.manipulation[1] + ".webp?version=" + Version + "\"/>")
                   + "</div>";
            manipLevel = level;
            level++;
            lastIsLarge = card.manipulation[0] != 'none';
        }

                if (card.skills && (card.skillsatbottom === false || card.skillsatbottom === "false" || card.skillsatbottom === "false2") && card.skills[0] != 'none')
        {
            if (level != 0 && (card.skillsatbottom === false || card.skillsatbottom === "false"))
            {
                code += "<div class=\"skills-separator level" + level + "\">"
                         + "<img class=\"background-separator\" src=\"studio/card_equipment/img/separator.webp?version=" + Version + "\"/>"
                       + "</div>";
            }
            
            code += "<div class=\"skills level" + level + "\">"
                     + "<img class=\"background-skills\" src=\"" + CardEquipment._getSkillImage(card.skills[0]) + "?version=" + Version + "\"/>"
                   + "</div>";
            level++;

            if (card.skills && card.skills[1] != 'none')
            {
                code += "<div class=\"skills level" + level + "\">"
                     + "<img class=\"background-skills\" src=\"" + CardEquipment._getSkillImage(card.skills[1]) + "?version=" + Version + "\"/>"
                   + "</div>";
                level++;
            }
        }

        if (card.text)
        {
            if (card.manipulation.force == "text")
            {
                code += "<div class='text manip-text" + " level" + (manipLevel) + "' style='font-size: " + card.textSize + "%; line-height: " + card.textInter + "%;'><div>" + toText(About._replace(card.text)) + "</div></div>";
            }
            else
            {
                if (level == 0 && card.image && !card.textStartLeft)
                {
                    code += "<div class='text-separator'><img class=\"background-text-separator\" src=\"studio/card_equipment/img/text-separator.webp?version=" + Version + "\"/></div>";
                }
                
                if (textMalus > 0) textMalus--;
                
                code += "<div class='text lastIsLarge-" + lastIsLarge + " level" + (level - textMalus) + (card.textStartLeft ? " startAtLeft" : "") + "' style='font-size: " + card.textSize + "%; line-height: " + card.textInter + "%;'><div>" + toText(About._replace(card.text)) + "</div></div>";
            }
            
            function toText(text) {
                return text.split('\n').map(s => s.replace(/^( *)|( *)\n|\n( *)|( *)$/gim, function(match){ return match.replaceAll(' ',' ') })).join('<br/>');
            }
        }

        if (card.image && card.imageatfront)
        {
            code += imageCode;
        }

        code += "</div>";
        return code;
    },

    _getSkillImage: function(id)
    {
        for (var i in Encyclopedia.skills.list)
        {
            var skill = Encyclopedia.skills.list[i];
            if (skill.type + '/' + skill.id == id)
            {
                return skill.image;
            }
        }
        console.warn("The skill " + id + " is not referenced");
        return undefined;
    },

    _add: function(card, dlabel, actions)
    {
        function _skills()
        {
            var s = "";

            for (var i in Encyclopedia.skills.types)
            {
                var type = Encyclopedia.skills.types[i];

                s += "<optgroup label=\"" + type.title + "\">";

                for (var j in Encyclopedia.skills.list)
                {
                    var skill = Encyclopedia.skills.list[j];
                    if (skill.type == type.id)
                    {
                        s += "<option value=\"" + type.id  + "/" + skill.id + "\">" + skill.title + "</option>";
                    }
                }
            }

            return s;
        }



        Nav.dialog(dlabel,
            "<div class=\"studiodialog\">"
            + "<div class=\"eqcol\">"
            + "<div class=\"equipment\">"
                + "<h1>" + CardEquipment._i18n.header1 + "</h1>"
                + "<input type=\"hidden\" name=\"cardpos\"/>"
                + "<div class=\"field name\">"
                    + "<label for=\"eqname\">" + CardEquipment._i18n.name + "</label>"
                    + "<input id=\"eqname\" name=\"cardname\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.namePh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
                + "<div class=\"field melee\">"
                    + "<label for=\"eqmelee\">" + CardEquipment._i18n.meleeAttack + "</label>"
                    + "<select id=\"eqmelee\" class=\"dice\" name=\"cardmelee1\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option data-class=\"yellowreroll\" value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<select id=\"eqmelee2\" class=\"dice\" name=\"cardmelee2\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option data-class=\"yellowreroll\" value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<select id=\"eqmelee3\" class=\"dice\" name=\"cardmelee3\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option data-class=\"yellowreroll\" value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<select id=\"eqmelee4\" class=\"dice\" name=\"cardmelee4\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option data-class=\"yellowreroll\" value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                + "</div>"
                + "<div class=\"field ranged\">"
                    + "<label for=\"eqranged\">" + CardEquipment._i18n.rangedAttack + "</label>"
                    + "<select id=\"eqranged\" class=\"dice\" name=\"cardranged1\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<select id=\"eqranged2\" class=\"dice\" name=\"cardranged2\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<select id=\"eqranged3\" class=\"dice\" name=\"cardranged3\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<select id=\"eqranged4\" class=\"dice\" name=\"cardranged4\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<div class=\"rangedthrow\"><input type=\"checkbox\" id=\"eqthrowable\" name=\"cardthrowable\" onchange=\"CardEquipment._preview();\"/><label for=\"eqthrowable\">" + CardEquipment._i18n.rangedAttackThrowable + "</label></div>"
                + "</div>"
                + "<div class=\"field active\">"
                    + "<label for=\"eqactive\">" + CardEquipment._i18n.activeDefense + "</label>"
                    + "<select id=\"eqactive\" class=\"dice\" name=\"cardactive1\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<select id=\"eqactive2\" class=\"dice\" name=\"cardactive2\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                + "</div>"
                + "<div class=\"field passive\">"
                    + "<label for=\"eqpassive\">" + CardEquipment._i18n.passiveDefense + "</label>"
                    + "<select id=\"eqpassive\" class=\"dice\" name=\"cardpassive1\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<select id=\"eqpassive2\" class=\"dice\" name=\"cardpassive2\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                + "</div>"
                + "<div class=\"field manipulation\">"
                    + "<label for=\"eqmanipulation\">" + CardEquipment._i18n.manipulation + "</label>"
                    + "<input id=\"eqmanipulationforce\" name=\"cardmanipforce\" type=\"checkbox\" onchange=\"CardEquipment._preview();\"/>"
                    + "<select id=\"eqmanipulationforcetext\" name=\"cardmanipforcetext\" onchange=\"CardEquipment._preview();\"><option value=\"notext\">" + CardEquipment._i18n.manipulationForcedNoText + "</option><option value=\"text\">" + CardEquipment._i18n.manipulationForcedText + "</option></select>"
                    + "<select id=\"eqmanipulation\" class=\"dice\" name=\"cardmanip1\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<select id=\"eqmanipulation2\" class=\"dice\" name=\"cardmanip2\"><option value=\"none\">" + CardEquipment._i18n.diceNone + "</option><option value=\"red\">" + CardEquipment._i18n.diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n.diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n.diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n.diceYellowReroll + "</option></select>"
                    + "<div class=\"manipexplosive\"><input type=\"checkbox\" id=\"eqexplosive\" name=\"cardexplosive\" onchange=\"CardEquipment._preview();\"/><label for=\"eqexplosive\">" + CardEquipment._i18n.manipulationExplosive + "</label></div>"
                + "</div>"
                + "<div class=\"field movement\">"
                    + "<label for=\"eqmovement\">" + CardEquipment._i18n.movement + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"eqmovement\" name=\"cardmovement\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.movementPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
                + "<div class=\"field skills\">"
                    + "<label for=\"eqskills\">" + CardEquipment._i18n.skills + "</label>"
                    + "<select id=\"eqskills\" class=\"skills\" name=\"cardskills1\" onchange=\"CardEquipment._preview();\"><option value=\"none\">" + CardEquipment._i18n.skillsNone + "</option>" + _skills() + "</select>"
                    + "<select id=\"eqskills2\" class=\"skills\" name=\"cardskills2\" onchange=\"CardEquipment._preview();\"><option value=\"none\">" + CardEquipment._i18n.skillsNone + "</option>" + _skills() + "</select>"
                    + "<label for=\"eqskillsposition\">" + CardEquipment._i18n.skillsPosition + "</label>"
                    + "<select id=\"eqskillsposition\" name=\"cardskillsposition\" onchange=\"CardEquipment._preview();\"><option value=\"false\">" + CardEquipment._i18n.skillsPosition1 + "</option><option value=\"false2\">" + CardEquipment._i18n.skillsPosition2 + "</option><option value=\"true\">" + CardEquipment._i18n.skillsPosition3 + "</option><option value=\"true2\">" + CardEquipment._i18n.skillsPosition4 + "</option></select>"
                + "</div>"
                + "<div class=\"field weight\">"
                    + "<label for=\"eqweight\">" + CardEquipment._i18n.weight + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"eqweight\" name=\"cardweight\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.weightPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
                + "<div class=\"field text\">"
                    + "<label for=\"eqtext\"><span data-help=\"" + CardEquipment._i18n.textHelp + "\"></span>" + CardEquipment._i18n.text + "</label>"
                    + "<textarea id=\"eqtext\" name=\"cardtext\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.textPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"></textarea>"
                + "</div>"
                + "<div class=\"field textsize\">"
                    + "<label for=\"eqtextsize\">" + CardEquipment._i18n.textSize + "</label>"
                    + "<input id=\"eqtextsize\" name=\"cardtextsize\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.textSizePh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"\"/>"
                + "</div>"
                + "<div class=\"field textinter\">"
                    + "<label for=\"eqtextinter\">" + CardEquipment._i18n.textInter + "</label>"
                    + "<input id=\"eqtextinter\" name=\"cardtextinter\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.textInterPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
                + "<div class=\"field textalign\">"
                    + "<input id=\"eqtextalign\" name=\"cardtextalign\" type=\"checkbox\" onchange=\"CardEquipment._preview();\"/><label for=\"eqtextalign\">" + CardEquipment._i18n.textAlignLeft + "</label>"
                + "</div>"
            + "</div>"
            + "</div>"
            + "<div class=\"eqcol\">"
            + "<div class=\"equipment\">"
                + "<h1>" + CardEquipment._i18n.header1bis + "</h1>"
                + "<div class=\"field\">"
                    + "<label for=\"eqimage\">" + CardEquipment._i18n.image + "</label>"
                    + "<input id=\"eqimage\" name=\"cardimage\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.imagePh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                    + "<div class=\"imageatfront\"><input type=\"checkbox\" id=\"eqimageatfront\" name=\"cardimageatfront\" onchange=\"CardEquipment._preview();\"/><label for=\"eqimageatfront\">" + CardEquipment._i18n.imageatfront + "</label></div>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"eqimagelocation\">" + CardEquipment._i18n.imagelocation + "</label>"
                    + "<div><input id=\"eqimagelocation\" name=\"cardimagelocation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.imagelocationPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"\"/></div>"
                    + "<div><input id=\"eqimagelocation2\" name=\"cardimagelocation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.imagelocationPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"eqimagezoom\">" + CardEquipment._i18n.imagezoom + "</label>"
                    + "<input id=\"eqimagezoom\" name=\"cardimagezoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.imagezoomPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"eqimagerotation\">" + CardEquipment._i18n.imagerotation + "</label>"
                    + "<input id=\"eqimagerotation\" name=\"cardimagerotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n.imagerotationPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
            + "</div>"
            + "<div class=\"equipment-preview\">"
                + "<h1>" + CardEquipment._i18n.header2 + "</h1>"
                + "<div class=\"preview\"></div>"
            + "</div>"
            + "</div>"
            + "</div>",
            null,
            actions
        );

        card = card || {
            id: Math.random(),
            name: "",
            encumbrance: "",
            movement: "",
            text: "",
            textSize: "100",
            textInter: "70",
            textStartLeft: false,
            melee: { 0: "none", 1: "none", 2: "none", 3: "none" },
            ranged: { 0: "none", 1: "none", throwable: false },
            manipulation: { 0: "none", 1: "none", explosive: false, force: "false" },
            active: { 0: "none", 1: "none" },
            passive: { 0: "none", 1: "none" },
            skills: { 0: "none", 1: "none" },
            image: "",
            imagelocation: {x: "50", y: "50"},
            imagezoom: "100",
            imagerotation: "0"
        };

        $("#eqskills,#eqskills2").each (function (i) {
            var k = $(this);
            k.attr("data-value", "")
             .on("change", function() {
                $(this).attr("data-value", this.value);
             })
        });
        $("#eqmelee,#eqmelee2,#eqmelee3,#eqmelee4,#eqactive,#eqactive2,#eqpassive,#eqpassive2,#eqranged,#eqranged2,#eqranged3,#eqranged4,#eqmanipulation,#eqmanipulation2").each (function (i) {
            var k = $(this);
            k.attr("data-value", "")
                .selectmenu({ appendTo: k.parent(), width: k.is(".dice") ? 40 : 58, change: function(event, selection) {
                    $(this).attr("data-value", selection.item.value);
                    CardEquipment._preview();
                }});
        });
        CardEquipment._card2form(card);

        CardEquipment._preview();
        
        $("#eqname").focus();
    },

    _form2card: function()
    {
        return {
            id: $(".dialog input[name=cardpos]")[0].value,
            name: $(".dialog input[name=cardname]")[0].value,
            encumbrance: $(".dialog input[name=cardweight]")[0].value,
            text: $(".dialog textarea[name=cardtext]")[0].value,
            textSize: $(".dialog input[name=cardtextsize]")[0].value || "100",
            textInter: $(".dialog input[name=cardtextinter]")[0].value || "70",
            textStartLeft: $(".dialog input[name=cardtextalign]")[0].checked,
            movement: parseInt($(".dialog input[name=cardmovement]")[0].value),
            melee: { 0: $(".dialog select[name=cardmelee1]")[0].value, 1: $(".dialog select[name=cardmelee2]")[0].value, 2: $(".dialog select[name=cardmelee3]")[0].value, 3: $(".dialog select[name=cardmelee4]")[0].value },
            skills: { 0: $(".dialog select[name=cardskills1]")[0].value, 1: $(".dialog select[name=cardskills2]")[0].value },
            skillsatbottom: $(".dialog select[name=cardskillsposition]")[0].value,
            ranged: { 0: $(".dialog select[name=cardranged1]")[0].value, 1: $(".dialog select[name=cardranged2]")[0].value, 2: $(".dialog select[name=cardranged3]")[0].value, 3: $(".dialog select[name=cardranged4]")[0].value, throwable: $(".dialog input[name=cardthrowable]")[0].checked },
            manipulation: { 0: $(".dialog select[name=cardmanip1]")[0].value, 1: $(".dialog select[name=cardmanip2]")[0].value, explosive: $(".dialog input[name=cardexplosive]")[0].checked, force: $(".dialog input[name=cardmanipforce]")[0].checked ? $(".dialog select[name=cardmanipforcetext]")[0].value : "false" },
            active: { 0: $(".dialog select[name=cardactive1]")[0].value, 1: $(".dialog select[name=cardactive2]")[0].value },
            passive: { 0: $(".dialog select[name=cardpassive1]")[0].value, 1: $(".dialog select[name=cardpassive2]")[0].value },
            image: $(".dialog input[name=cardimage]")[0].value,
            imagelocation: {x: $(".dialog input[name=cardimagelocation]")[0].value || "50", y: $(".dialog input[name=cardimagelocation2]")[0].value || "50"},
            imagezoom: $(".dialog input[name=cardimagezoom]")[0].value || "100",
            imagerotation: $(".dialog input[name=cardimagerotation]")[0].value || "0",
            imageatfront: $(".dialog input[name=cardimageatfront]")[0].checked
        }
    },
    _card2form: function(card)
    {
        $(".dialog input[name=cardpos]")[0].value = card.id;
        $(".dialog input[name=cardname]")[0].value = card.name;
        $(".dialog input[name=cardweight]")[0].value = card.encumbrance;
        $(".dialog textarea[name=cardtext]")[0].value = card.text || "";
        $(".dialog input[name=cardtextsize]")[0].value = card.textSize;
        $(".dialog input[name=cardtextinter]")[0].value = card.textInter;
        $(".dialog input[name=cardtextalign]")[0].checked = card.textStartLeft;
        $(".dialog input[name=cardmovement]")[0].value = card.movement;
        $(".dialog select[name=cardmelee1]")[0].value = card.melee['0']; $(".dialog select[name=cardmelee1]").attr("data-value", card.melee['0']);
        $(".dialog select[name=cardmelee2]")[0].value = card.melee['1']; $(".dialog select[name=cardmelee2]").attr("data-value", card.melee['1']);
        $(".dialog select[name=cardmelee3]")[0].value = card.melee['2'] || "none"; $(".dialog select[name=cardmelee3]").attr("data-value", card.melee['2'] || "none");
        $(".dialog select[name=cardmelee4]")[0].value = card.melee['3'] || "none"; $(".dialog select[name=cardmelee4]").attr("data-value", card.melee['3'] || "none");
        $(".dialog select[name=cardranged1]")[0].value = card.ranged['0']; $(".dialog select[name=cardranged1]").attr("data-value", card.ranged['0']);
        $(".dialog select[name=cardranged2]")[0].value = card.ranged['1']; $(".dialog select[name=cardranged2]").attr("data-value", card.ranged['1']);
        $(".dialog select[name=cardranged3]")[0].value = card.ranged['2'] || "none"; $(".dialog select[name=cardranged3]").attr("data-value", card.ranged['2'] || "none");
        $(".dialog select[name=cardranged4]")[0].value = card.ranged['3'] || "none"; $(".dialog select[name=cardranged4]").attr("data-value", card.ranged['3'] || "none");
        $(".dialog input[name=cardthrowable]")[0].checked = card.ranged.throwable;
        $(".dialog input[name=cardmanipforce]")[0].checked = card.manipulation.force == "text" || card.manipulation.force == "notext";
        $(".dialog select[name=cardmanipforcetext]")[0].value = card.manipulation.force != "false" ? card.manipulation.force : "notext";
        $(".dialog select[name=cardmanip1]")[0].value = card.manipulation['0']; $(".dialog select[name=cardmanip1]").attr("data-value", card.manipulation['0']);
        $(".dialog select[name=cardmanip2]")[0].value = card.manipulation['1']; $(".dialog select[name=cardmanip2]").attr("data-value", card.manipulation['1']);
        $(".dialog input[name=cardexplosive]")[0].checked = card.manipulation.explosive;
        $(".dialog select[name=cardactive1]")[0].value = card.active['0']; $(".dialog select[name=cardactive1]").attr("data-value", card.active['0']);
        $(".dialog select[name=cardactive2]")[0].value = card.active['1']; $(".dialog select[name=cardactive2]").attr("data-value", card.active['1']);
        $(".dialog select[name=cardpassive1]")[0].value = card.passive['0']; $(".dialog select[name=cardpassive1]").attr("data-value", card.passive['0']);
        $(".dialog select[name=cardpassive2]")[0].value = card.passive['1']; $(".dialog select[name=cardpassive2]").attr("data-value", card.passive['1']);
        $(".dialog select[name=cardskills1]")[0].value = card.skills['0']; $(".dialog select[name=cardskills1]").attr("data-value", card.skills['0']);
        $(".dialog select[name=cardskills2]")[0].value = card.skills['1']; $(".dialog select[name=cardskills2]").attr("data-value", card.skills['1']);
        $(".dialog select[name=cardskillsposition]")[0].value = card.skillsatbottom || false; $(".dialog select[name=cardskillsposition]").attr("data-value", card.skillsatbottom || false);
        $(".dialog input[name=cardimage]")[0].value = card.image;
        $(".dialog input[name=cardimagelocation]")[0].value = card.imagelocation.x;
        $(".dialog input[name=cardimagelocation2]")[0].value = card.imagelocation.y;
        $(".dialog input[name=cardimagezoom]")[0].value = card.imagezoom;
        $(".dialog input[name=cardimagerotation]")[0].value = card.imagerotation;
        $(".dialog input[name=cardimageatfront]")[0].checked = card.imageatfront;
    },

    _checkForm: function(card)
    {
        var errors = 0;
        if (!card.name)
        {
            $(".dialog input[name=cardname]").parent().addClass("error");
            errors++;
        }
        return errors;
    }
});
