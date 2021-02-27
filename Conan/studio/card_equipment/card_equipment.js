var CardEquipment = mergeObject(StudioItem, {
    name: 'equipment',
    cls: 'CardEquipment',
    storage: Application + "_StudioEquipmentCards", 
    
    _i18n: {
        'fr': {
            'tab': "Équipe<wbr/>ments",
            'nocard': "Vous n'avez aucune carte d'équipement pour le moment",
            'nocard2': "<br/><br/>Cliquez sur le bouton + pour en creer une",
            'newcard': "Créer un équipement",
            'editcard': "Modifier",
            
            'name': "Nom",
            'namePh': "?",
            'weight': "Encombrement",
            'weightPh': "?",
            'movement': "Mouvement",
            'movementPh': "?",
            'skills': "Compétences",
            'skillsPh': "?",
            'skillsNone': "Aucune",
            'meleeAttack': "Corps à corps",
            'manipulation': "Manipulation",
            'manipulationExplosive': "Explosif",
            'rangedAttack': "Distance",
            'rangedAttackThrowable': "Lançable",
            'activeDefense': "Défense",
            'passiveDefense': "Armure",
            'image': "Image (fond transparent)",
            'imagePh': "Entrer l'adresse de l'image (http://)",
            'imagelocation': "Emplacement",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotation",
            'imagerotationPh': "0",
            'imageatfront': "Mettre l'image devant les symboles",
            'diceNone': "Aucun",
            'diceRed': "Rouge",
            'diceRedReroll': "Rouge \uf01e",
            'diceOrange': "Orange",
            'diceOrangeReroll': "Orange \uf01e",
            'diceYellow': "Jaune",
            'diceYellowReroll': "Jaune \uf01e",
            'header1': "Saisissez les données de la carte",
            'header1bis': "Mettez une image",
            'header2': "Prévisualiser la carte",
            
            'copyright': "Basé sur le fichier PSD proposé par <a href='https://the-overlord.com/index.php?/profile/9-genesteal28/'>@genesteal28</a> et converti au format GIMP par <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a> et <a href='https://the-overlord.com/index.php?/profile/1-sentma/'>SentMa</a> pour le dos de carte."
        },
        'en': {
            'tab': "Equip<wbr/>ments",
            'nocard': "You have no card for the moment",
            'nocard2': "<br/><br/>Click on the + button to create one",
            'newcard': "Create an equipment",
            'editcard': "Edit a card",
            
            'name': "Name",
            'namePh': "?",
            'weight': "Encumbrance",
            'weightPh': "?",
            'movement': "Move",
            'movementPh': "?",
            'skills': "Skills",
            'skillsPh': "?",
            'skillsNone': "None",
            'meleeAttack': "Melee attack",
            'manipulation': "Manipulation",
            'manipulationExplosive': "Explosive",
            'rangedAttack': "Ranged attack",
            'rangedAttackThrowable': "Throwable",
            'activeDefense': "Guard",
            'passiveDefense': "Armor",
            'image': "Image (transparent background)",
            'imagePh': "Enter the image address (http://...)",
            'imagelocation': "Location",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotation",
            'imagerotationPh': "0",
            'imageatfront': "Image in front of symbols",
            'diceNone': "None",
            'diceRed': "Red",
            'diceRedReroll': "Red \uf01e",
            'diceOrange': "Orange",
            'diceOrangeReroll': "Orange \uf01e",
            'diceYellow': "Yellow",
            'diceYellowReroll': "Yellow \uf01e",
            'header1': "Fill the card data",
            'header1bis': "Set a picture",
            'header2': "Preview the final result",
            
            'copyright': "Based on the PSD file proposed by <a href='https://the-overlord.com/index.php?/profile/9-genesteal28/'>@genesteal28</a> and converted at the GIMP format by <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a> and <a href='https://the-overlord.com/index.php?/profile/1-sentma/'>SentMa</a> for the back of the card."
        },
        'it': {
            'tab': "Equip<wbr/>aggiamento",
            'nocard': "Al momento non hai carte",
            'nocard2': "<br/><br/>TODO_TRANSLATE",
            'newcard': "TODO_TRANSLATE",
            'editcard': "Modifica una carta",
            
            'name': "Nome",
            'namePh': "?",
            'weight': "Ingombro",
            'weightPh': "?",
            'movement': "Movimento",
            'movementPh': "?",
            'skills': "Abilità",
            'skillsPh': "?",
            'skillsNone': "Nessuna",
            'meleeAttack': "Attacco in mischia",
            'manipulation': "Manipolazione",
            'manipulationExplosive': "Esplosiva",
            'rangedAttack': "Attacco a distanza",
            'rangedAttackThrowable': "Lanciabile",
            'activeDefense': "Difesa",
            'passiveDefense': "Armatura",
            'image': "Immagine (sfondo trasparente)",
            'imagePh': "Inserisci l'URL dell'immagine (http://...)",
            'imagelocation': "Posizione",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotazione",
            'imagerotationPh': "0",
            'imageatfront': "Immagine davanti alle icone",
            'diceNone': "Nessuno",
            'diceRed': "Rosso",
            'diceRedReroll': "Rosso \uf01e",
            'diceOrange': "Arancione",
            'diceOrangeReroll': "Arancione \uf01e",
            'diceYellow': "Giallo",
            'diceYellowReroll': "Giallo \uf01e",
            'header1': "Completa le informazioni sulla carta",
            'header1bis': "Scegli un'immagine",
            'header2': "Anteprima risultato finale",
            
            'copyright': "Basato sui file PSD di <a href='https://the-overlord.com/index.php?/profile/9-genesteal28/'>@genesteal28</a> e convertiti nel formato GIMP da <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a> e <a href='https://the-overlord.com/index.php?/profile/1-sentma/'>SentMa</a> per il retro delle carte."
        }
    },
    
    _getDisplayItemsCode: function(withEditLink)
    {
        var html = "";

        var cards = JSON.parse(localStorage.getItem(this.storage)) || [];
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
                    prefix = "<input type='checkbox' id='equipment-" + i + "' name='equipment' data-index='" + i + "' onchange=\"$('#equipment-back-" + i + "').toggleClass('invisible');\"/><label for='equipment-" + i + "'>";
                    suffix = "</label>";
                }

                html += prefix + "<div class='printoverflow'>" + CardEquipment._cardCode(cards[i]) + "</div>" + suffix;
            }
        }
        else
        {
            html += "<div class=\"nocards\">" + CardEquipment._i18n[Language].nocard + (withEditLink !== false ? CardEquipment._i18n[Language].nocard2 : '') + "</div>";
        }

        if (!withEditLink)
        {
            for (var i in cards)
            {
                html += "<div id=\"equipment-back-" + i + "\"  class='printoverflow back invisible'><img src=\"studio/card_equipment/img/back.png?version=" + Version + "\"/></div>"
            }
        }

        return html;
    },

    _cardCode: function(card) {
        var code = "<div class=\"equipement card\">"
                + "<picture class=\"background\">"
                    + "<source media=\"print\" srcset=\"studio/card_equipment/img/background_hd.png?version=" + Version + "\"/>"
                    + "<img src=\"studio/card_equipment/img/background.png?version=" + Version + "\"/>"
                + "</picture>";

        var imageCode = "<div class=\"image\"><img " + LazyImage + " src=\"" + card.image + "\" style=\"left: " + card.imagelocation.x + "%; top: " + card.imagelocation.y + "%; width: " + card.imagezoom + "%; transform: translate(-50%, -50%) rotate(" + card.imagerotation + "deg)\"/></div>";

        if (card.image && !card.imageatfront)
        {
            code += imageCode;
        }

        if (card.name !== undefined && card.name !== null)
        {
               code += "<img class=\"background-name\" src=\"studio/card_equipment/img/name-background.png?version=" + Version + "\"/>"
                    + "<div class=\"name\">" + card.name + "</div>";
        }

        if (card.encumbrance || card.encumbrance === "0")
        {
            code += "<img class=\"background-encumbrance\" src=\"studio/card_equipment/img/weight.png?version=" + Version + "\"/>"
                + "<div class=\"encumbrance\">" + card.encumbrance + "</div>";
        }

        var level = 0;
        if (card.passive && card.passive[0] != 'none')
        {
            code += "<div class=\"passive level" + level + "\">"
                   + (card.passive[1] == 'none' ?
                        "<img class=\"background-passive\" src=\"studio/card_equipment/img/armor-1.png?version=" + Version + "\"/>" :
                        "<img class=\"background-passive duo\" src=\"studio/card_equipment/img/armor-2.png?version=" + Version + "\"/>")
                     + "<img src=\"studio/card_equipment/img/dice_" + card.passive[0] + ".png?version=" + Version + "\"/>"
                     + (card.passive[1] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.passive[1] + ".png?version=" + Version + "\"/>")
                   + "</div>"
            level++;
        }
        if (card.manipulation && card.manipulation[0] != 'none')
        {
            code += "<div class=\"manipulation" + (card.manipulation.explosive ? " explosive": "") + " level" + level + "\">"
                   + (card.manipulation[1] == 'none' ?
                        "<img class=\"background-manipulation\" src=\"studio/card_equipment/img/" + (!card.manipulation.explosive ? "manip" : "launch") + "-1.png?version=" + Version + "\"/>" :
                        "<img class=\"background-manipulation duo\" src=\"studio/card_equipment/img/" + (!card.manipulation.explosive ? "manip" : "launch") + "-2.png?version=" + Version + "\"/>")
                     + "<img src=\"studio/card_equipment/img/dice_" + card.manipulation[0] + ".png?version=" + Version + "\"/>"
                     + (card.manipulation[1] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.manipulation[1] + ".png?version=" + Version + "\"/>")
                   + "</div>"
            level++;
        }
        if (card.ranged && card.ranged[0] != 'none')
        {
            code += "<div class=\"ranged" + (card.ranged.throwable ? " throw": "") + " level" + level + "\">"
                   + (card.ranged[1] == 'none' ?
                        "<img class=\"background-ranged\" src=\"studio/card_equipment/img/" + (!card.ranged.throwable ? "remote" : "throw") + "-1.png?version=" + Version + "\"/>" :
                        "<img class=\"background-ranged duo\" src=\"studio/card_equipment/img/" + (!card.ranged.throwable ? "remote" : "throw") + "-2.png?version=" + Version + "\"/>")
                     + "<img src=\"studio/card_equipment/img/dice_" + card.ranged[0] + ".png?version=" + Version + "\"/>"
                     + (card.ranged[1] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.ranged[1] + ".png?version=" + Version + "\"/>")
                   + "</div>"
            level++;
        }
        if (card.active && card.active[0] != 'none')
        {
            code += "<div class=\"active level" + level + "\">"
                   + (card.active[1] == 'none' ?
                        "<img class=\"background-active\" src=\"studio/card_equipment/img/defense-1.png?version=" + Version + "\"/>" :
                        "<img class=\"background-active duo\" src=\"studio/card_equipment/img/defense-2.png?version=" + Version + "\"/>")
                     + "<img src=\"studio/card_equipment/img/dice_" + card.active[0] + ".png?version=" + Version + "\"/>"
                     + (card.active[1] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.active[1] + ".png?version=" + Version + "\"/>")
                   + "</div>"
            level++;
        }
        if (card.melee && card.melee[0] != 'none')
        {
            code += "<div class=\"melee level" + level + "\">"
                   + (card.melee[1] == 'none' ?
                        "<img class=\"background-melee\" src=\"studio/card_equipment/img/contact-1.png?version=" + Version + "\"/>" :
                        "<img class=\"background-melee duo\" src=\"studio/card_equipment/img/contact-2.png?version=" + Version + "\"/>")
                     + "<img src=\"studio/card_equipment/img/dice_" + card.melee[0] + ".png?version=" + Version + "\"/>"
                     + (card.melee[1] == 'none' ? "" : "<img src=\"studio/card_equipment/img/dice_" + card.melee[1] + ".png?version=" + Version + "\"/>")
                   + "</div>";
            level++;
        }

        if (card.movement)
        {
            code += "<div class=\"movement level" + level + "\">"
                        + "<img class=\"background-movement\" src=\"studio/card_equipment/img/movement.png?version=" + Version + "\"/>"
                        + "<div>" + card.movement + "</div>"
                   + "</div>";
            level++;
        }

        if (card.skills && card.skills[0] != 'none')
        {
            code += "<div class=\"skills-separator level" + level + "\">"
                     + "<img class=\"background-separator\" src=\"studio/card_equipment/img/separator.png?version=" + Version + "\"/>"
                   + "</div>";

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

                s += "<optgroup label=\"" + type.title[Language] + "\">";

                for (var j in Encyclopedia.skills.list)
                {
                    var skill = Encyclopedia.skills.list[j];
                    if (skill.type == type.id)
                    {
                        s += "<option value=\"" + type.id  + "/" + skill.id + "\">" + skill.title[Language] + "</option>";
                    }
                }
            }

            return s;
        }



        Nav.dialog(dlabel,
            "<div class=\"eqcol\">"
            + "<div class=\"equipment\">"
                + "<h1>" + CardEquipment._i18n[Language].header1 + "</h1>"
                + "<input type=\"hidden\" name=\"cardpos\"/>"
                + "<div class=\"field name\">"
                    + "<label for=\"eqname\">" + CardEquipment._i18n[Language].name + "</label>"
                    + "<input id=\"eqname\" name=\"cardname\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].namePh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
                + "<div class=\"field melee\">"
                    + "<label for=\"eqmelee\">" + CardEquipment._i18n[Language].meleeAttack + "</label>"
                    + "<select id=\"eqmelee\" class=\"dice\" name=\"cardmelee1\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"eqmelee2\" class=\"dice\" name=\"cardmelee2\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option data-class=\"yellowreroll\" value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                + "</div>"
                + "<div class=\"field ranged\">"
                    + "<label for=\"eqranged\">" + CardEquipment._i18n[Language].rangedAttack + "</label>"
                    + "<select id=\"eqranged\" class=\"dice\" name=\"cardranged1\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"eqranged2\" class=\"dice\" name=\"cardranged2\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<div class=\"rangedthrow\"><input type=\"checkbox\" id=\"eqthrowable\" name=\"cardthrowable\" onchange=\"CardEquipment._preview();\"/><label for=\"eqthrowable\">" + CardEquipment._i18n[Language].rangedAttackThrowable + "</label></div>"
                + "</div>"
                + "<div class=\"field active\">"
                    + "<label for=\"eqactive\">" + CardEquipment._i18n[Language].activeDefense + "</label>"
                    + "<select id=\"eqactive\" class=\"dice\" name=\"cardactive1\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"eqactive2\" class=\"dice\" name=\"cardactive2\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                + "</div>"
                + "<div class=\"field passive\">"
                    + "<label for=\"eqpassive\">" + CardEquipment._i18n[Language].passiveDefense + "</label>"
                    + "<select id=\"eqpassive\" class=\"dice\" name=\"cardpassive1\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"eqpassive2\" class=\"dice\" name=\"cardpassive2\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                + "</div>"
                + "<div class=\"field manipulation\">"
                    + "<label for=\"eqmanipulation\">" + CardEquipment._i18n[Language].manipulation + "</label>"
                    + "<select id=\"eqmanipulation\" class=\"dice\" name=\"cardmanip1\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"eqmanipulation2\" class=\"dice\" name=\"cardmanip2\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<div class=\"manipexplosive\"><input type=\"checkbox\" id=\"eqexplosive\" name=\"cardexplosive\" onchange=\"CardEquipment._preview();\"/><label for=\"eqexplosive\">" + CardEquipment._i18n[Language].manipulationExplosive + "</label></div>"
                + "</div>"
                + "<div class=\"field movement\">"
                    + "<label for=\"eqmovement\">" + CardEquipment._i18n[Language].movement + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"eqmovement\" name=\"cardmovement\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].movementPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
                + "<div class=\"field skills\">"
                    + "<label for=\"eqskills\">" + CardEquipment._i18n[Language].skills + "</label>"
                    + "<select id=\"eqskills\" class=\"skills\" name=\"cardskills1\" onchange=\"CardEquipment._preview();\"><option value=\"none\">" + CardEquipment._i18n[Language].skillsNone + "</option>" + _skills() + "</select>"
                    + "<select id=\"eqskills2\" class=\"skills\" name=\"cardskills2\" onchange=\"CardEquipment._preview();\"><option value=\"none\">" + CardEquipment._i18n[Language].skillsNone + "</option>" + _skills() + "</select>"
                + "</div>"
                + "<div class=\"field weight\">"
                    + "<label for=\"eqweight\">" + CardEquipment._i18n[Language].weight + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"eqweight\" name=\"cardweight\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].weightPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
            + "</div>"
            + "</div>"
            + "<div class=\"eqcol\">"
            + "<div class=\"equipment\">"
                + "<h1>" + CardEquipment._i18n[Language].header1bis + "</h1>"
                + "<div class=\"field\">"
                    + "<label for=\"eqimage\">" + CardEquipment._i18n[Language].image + "</label>"
                    + "<input id=\"eqimage\" name=\"cardimage\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].imagePh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                    + "<div class=\"imageatfront\"><input type=\"checkbox\" id=\"eqimageatfront\" name=\"cardimageatfront\" onchange=\"CardEquipment._preview();\"/><label for=\"eqimageatfront\">" + CardEquipment._i18n[Language].imageatfront + "</label></div>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"eqimagelocation\">" + CardEquipment._i18n[Language].imagelocation + "</label>"
                    + "<div><input id=\"eqimagelocation\" name=\"cardimagelocation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].imagelocationPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"\"/></div>"
                    + "<div><input id=\"eqimagelocation2\" name=\"cardimagelocation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].imagelocationPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"eqimagezoom\">" + CardEquipment._i18n[Language].imagezoom + "</label>"
                    + "<input id=\"eqimagezoom\" name=\"cardimagezoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].imagezoomPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"eqimagerotation\">" + CardEquipment._i18n[Language].imagerotation + "</label>"
                    + "<input id=\"eqimagerotation\" name=\"cardimagerotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].imagerotationPh + "\" onkeyup=\"CardEquipment._preview();\" onchange=\"CardEquipment._preview();\"/>"
                + "</div>"
            + "</div>"
            + "<div class=\"equipment-preview\">"
                + "<h1>" + CardEquipment._i18n[Language].header2 + "</h1>"
                + "<div class=\"preview\"></div>"
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
            melee: { 0: "none", 1: "none" },
            ranged: { 0: "none", 1: "none", throwable: false },
            manipulation: { 0: "none", 1: "none", explosive: false },
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
        $("#eqmelee,#eqmelee2,#eqactive,#eqactive2,#eqpassive,#eqpassive2,#eqranged,#eqranged2,#eqmanipulation,#eqmanipulation2").each (function (i) {
            var k = $(this);
            k.attr("data-value", "")
                .selectmenu({ appendTo: k.parent(), width: k.is(".dice") ? 40 : 58, change: function(event, selection) {
                    $(this).attr("data-value", selection.item.value);
                    CardEquipment._preview();
                }});
        });
        CardEquipment._card2form(card);

        CardEquipment._preview();
    },

    _form2card: function()
    {
        return {
            id: $(".dialog input[name=cardpos]")[0].value,
            name: $(".dialog input[name=cardname]")[0].value,
            encumbrance: $(".dialog input[name=cardweight]")[0].value,
            movement: parseInt($(".dialog input[name=cardmovement]")[0].value),
            melee: { 0: $(".dialog select[name=cardmelee1]")[0].value, 1: $(".dialog select[name=cardmelee2]")[0].value },
            skills: { 0: $(".dialog select[name=cardskills1]")[0].value, 1: $(".dialog select[name=cardskills2]")[0].value },
            ranged: { 0: $(".dialog select[name=cardranged1]")[0].value, 1: $(".dialog select[name=cardranged2]")[0].value, throwable: $(".dialog input[name=cardthrowable]")[0].checked },
            manipulation: { 0: $(".dialog select[name=cardmanip1]")[0].value, 1: $(".dialog select[name=cardmanip2]")[0].value, explosive: $(".dialog input[name=cardexplosive]")[0].checked },
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
        $(".dialog input[name=cardmovement]")[0].value = card.movement;
        $(".dialog select[name=cardmelee1]")[0].value = card.melee['0']; $(".dialog select[name=cardmelee1]").attr("data-value", card.melee['0']);
        $(".dialog select[name=cardmelee2]")[0].value = card.melee['1']; $(".dialog select[name=cardmelee2]").attr("data-value", card.melee['1']);
        $(".dialog select[name=cardranged1]")[0].value = card.ranged['0']; $(".dialog select[name=cardranged1]").attr("data-value", card.ranged['0']);
        $(".dialog select[name=cardranged2]")[0].value = card.ranged['1']; $(".dialog select[name=cardranged2]").attr("data-value", card.ranged['1']);
        $(".dialog input[name=cardthrowable]")[0].checked = card.ranged.throwable;
        $(".dialog select[name=cardmanip1]")[0].value = card.manipulation['0']; $(".dialog select[name=cardmanip1]").attr("data-value", card.manipulation['0']);
        $(".dialog select[name=cardmanip2]")[0].value = card.manipulation['1']; $(".dialog select[name=cardmanip2]").attr("data-value", card.manipulation['1']);
        $(".dialog input[name=cardexplosive]")[0].checked = card.manipulation.explosive;
        $(".dialog select[name=cardactive1]")[0].value = card.active['0']; $(".dialog select[name=cardactive1]").attr("data-value", card.active['0']);
        $(".dialog select[name=cardactive2]")[0].value = card.active['1']; $(".dialog select[name=cardactive2]").attr("data-value", card.active['1']);
        $(".dialog select[name=cardpassive1]")[0].value = card.passive['0']; $(".dialog select[name=cardpassive1]").attr("data-value", card.passive['0']);
        $(".dialog select[name=cardpassive2]")[0].value = card.passive['1']; $(".dialog select[name=cardpassive2]").attr("data-value", card.passive['1']);
        $(".dialog select[name=cardskills1]")[0].value = card.skills['0']; $(".dialog select[name=cardskills1]").attr("data-value", card.skills['0']);
        $(".dialog select[name=cardskills2]")[0].value = card.skills['1']; $(".dialog select[name=cardskills2]").attr("data-value", card.skills['1']);
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
    },

    copyright: function()
    {
        return "<h3>" + CardEquipment._i18n[Language].tab + "</h3>"
            + "<p>" + CardEquipment._i18n[Language].copyright + "</p>"
    }
});
