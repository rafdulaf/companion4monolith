var CardEquipment = {
    _i18n: {
        'fr': {
            'tab': "équipement",
            'nocard': "Vous n'avez aucune carte pour le moment. Cliquez sur le bouton + en haut pour en creer une.",
            'printnocard': "Vous n'avez aucune carte pour le moment",
            'newcard': "Créer une carte",
            'print': "Imprimer des cartes",
            'editcard': "Modifier",
            'save': "Enregistrer",
            'remove': "Effacer",
            'removeConfirm': "Etes-vous sûr de vouloir effacer cette carte ?",
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
            'header2': "Prévisualiser la carte"
        },
        'en': {
            'tab': "Equipment",
            'nocard': "You have no card for the moment. Click on the + button in the header to create one.",
            'printnocard': "You have no card for the moment",
            'newcard': "Create a new card",
            'print': "Print cards",
            'editcard': "Edit a card",
            'save': "Save",
            'remove': "Delete",
            'removeConfirm': "Are you sure that you want to delete this card?",
            'name': "Name",
            'namePh': "Name of the card",
            'weight': "Encumbrance",
            'weightPh': "?",
            'movement': "Movement",
            'movementPh': "?",
            'skills': "Skills",
            'skillsPh': "?",
            'skillsNone': "None",
            'meleeAttack': "Melee attack",
            'manipulation': "Manipulation",
            'manipulationExplosive': "Explosive",
            'rangedAttack': "Ranged attack",
            'rangedAttackThrowable': "Throwable",
            'activeDefense': "Active defense",
            'passiveDefense': "Passive defense",
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
            'header2': "Preview the final result"
        }
    },
    
    preinit: function() {
        ConanStudio._slides.push({   label: CardEquipment._i18n[Language].tab, id: "equipment", onShow: CardEquipment.onShow,  onHide: CardEquipment.onHide });
    },
    
    init: function() {
//        $("#equipment").html("In construction");return;
        Nav.addAction("studio", CardEquipment._i18n[Language].newcard, "equipment-icon-add", "equipment-add", CardEquipment.add);
        Nav.addAction("studio", CardEquipment._i18n[Language].print, "equipment-icon-print", "equipment-print", ConanStudio.printCards);
        CardEquipment.onHide();
        CardEquipment._displayCards();
    },
    
    _displayCards: function()
    {
        $("#equipment").html("");
        
        var cards = JSON.parse(localStorage.getItem("StudioEquipmentCards")) || [];
        if (cards.length > 0)
        {
            for (var i in cards)
            {
                $("#equipment").append("<a href='javascript:void(0)' onclick='CardEquipment.add(JSON.parse(localStorage.getItem(\"StudioEquipmentCards\"))[" + i + "])'>" + CardEquipment._cardCode(cards[i]) + "</a>")    
            }
        }
        else
        {
            $("#equipment").append("<div class=\"nocards\">" + CardEquipment._i18n[Language].nocard + "</div>");
        }
    },
    
    onShow: function() {
        Nav.showAction("studio", "add");
    },
    
    onHide: function() {
        Nav.hideAction("studio", "add");
    },
    
    _cardCode: function(card) {
        var code = "<div class=\"equipement card\">"
                + "<img class=\"background\" src=\"studio/card_equipment/resources/img/background.png\"/>"
                
                + "<img class=\"background-name\" src=\"studio/card_equipment/resources/img/name-background.png\"/>"
                + "<div class=\"name\">" + card.name + "</div>";
                
        var imageCode = "<div class=\"image\"><img src=\"" + card.image + "\" style=\"left: " + card.imagelocation.x + "%; top: " + card.imagelocation.y + "%; width: " + card.imagezoom + "%; transform: translate(-50%, -50%) rotate(" + card.imagerotation + "deg)\"/></div>"; 
                
        if (card.image && !card.imageatfront)
        {
            code += imageCode;
        }

        if (card.encumbrance)
        {
            code += "<img class=\"background-encumbrance\" src=\"studio/card_equipment/resources/img/weight.png\"/>"
                + "<div class=\"encumbrance\">" + card.encumbrance + "</div>";
        }

        var level = 0;
        if (card.passive && card.passive[0] != 'none')
        {
            code += "<div class=\"passive level" + level + "\">"
                   + (card.passive[1] == 'none' ?
                        "<img class=\"background-passive\" src=\"studio/card_equipment/resources/img/armor-1.png\"/>" :
                        "<img class=\"background-passive duo\" src=\"studio/card_equipment/resources/img/armor-2.png\"/>")
                     + "<img src=\"studio/card_equipment/resources/img/dice_" + card.passive[0] + ".png\"/>"
                     + (card.passive[1] == 'none' ? "" : "<img src=\"studio/card_equipment/resources/img/dice_" + card.passive[1] + ".png\"/>")
                   + "</div>"
            level++;
        }
        if (card.active && card.active[0] != 'none')
        {
            code += "<div class=\"active level" + level + "\">"
                   + (card.active[1] == 'none' ?
                        "<img class=\"background-active\" src=\"studio/card_equipment/resources/img/defense-1.png\"/>" :
                        "<img class=\"background-active duo\" src=\"studio/card_equipment/resources/img/defense-2.png\"/>")
                     + "<img src=\"studio/card_equipment/resources/img/dice_" + card.active[0] + ".png\"/>"
                     + (card.active[1] == 'none' ? "" : "<img src=\"studio/card_equipment/resources/img/dice_" + card.active[1] + ".png\"/>")
                   + "</div>"
            level++;
        }
        if (card.manipulation && card.manipulation[0] != 'none')
        {
            code += "<div class=\"manipulation" + (card.manipulation.explosive ? " explosive": "") + " level" + level + "\">"
                   + (card.manipulation[1] == 'none' ?
                        "<img class=\"background-manipulation\" src=\"studio/card_equipment/resources/img/" + (!card.manipulation.explosive ? "manip" : "launch") + "-1.png\"/>" :
                        "<img class=\"background-manipulation duo\" src=\"studio/card_equipment/resources/img/" + (!card.manipulation.explosive ? "manip" : "launch") + "-2.png\"/>")
                     + "<img src=\"studio/card_equipment/resources/img/dice_" + card.manipulation[0] + ".png\"/>"
                     + (card.manipulation[1] == 'none' ? "" : "<img src=\"studio/card_equipment/resources/img/dice_" + card.manipulation[1] + ".png\"/>")
                   + "</div>"
            level++;
        }
        if (card.ranged && card.ranged[0] != 'none')
        {
            code += "<div class=\"ranged" + (card.ranged.throwable ? " throw": "") + " level" + level + "\">"
                   + (card.ranged[1] == 'none' ?
                        "<img class=\"background-ranged\" src=\"studio/card_equipment/resources/img/" + (!card.ranged.throwable ? "remote" : "throw") + "-1.png\"/>" :
                        "<img class=\"background-ranged duo\" src=\"studio/card_equipment/resources/img/" + (!card.ranged.throwable ? "remote" : "throw") + "-2.png\"/>")
                     + "<img src=\"studio/card_equipment/resources/img/dice_" + card.ranged[0] + ".png\"/>"
                     + (card.ranged[1] == 'none' ? "" : "<img src=\"studio/card_equipment/resources/img/dice_" + card.ranged[1] + ".png\"/>")
                   + "</div>"
            level++;
        }
        if (card.melee && card.melee[0] != 'none')
        {
            code += "<div class=\"melee level" + level + "\">"
                   + (card.melee[1] == 'none' ?
                        "<img class=\"background-melee\" src=\"studio/card_equipment/resources/img/contact-1.png\"/>" :
                        "<img class=\"background-melee duo\" src=\"studio/card_equipment/resources/img/contact-2.png\"/>")
                     + "<img src=\"studio/card_equipment/resources/img/dice_" + card.melee[0] + ".png\"/>"
                     + (card.melee[1] == 'none' ? "" : "<img src=\"studio/card_equipment/resources/img/dice_" + card.melee[1] + ".png\"/>")
                   + "</div>";
            level++;
        }
        
        if (card.movement)
        {
            code += "<div class=\"movement level" + level + "\">"
                        + "<img class=\"background-movement\" src=\"studio/card_equipment/resources/img/movement.png\"/>"
                        + "<div>" + card.movement + "</div>"
                   + "</div>";
            level++;
        }
        
        if (card.skills && card.skills[0] != 'none')
        {
            code += "<div class=\"skills-separator level" + level + "\">"
                     + "<img class=\"background-separator\" src=\"studio/card_equipment/resources/img/separator.png\"/>"
                   + "</div>";
    
            code += "<div class=\"skills level" + level + "\">"
                     + "<img class=\"background-skills\" src=\"/resources/img/skills/" + card.skills[0] + ".png\"/>"
                   + "</div>";
            level++;
            
            if (card.skills && card.skills[1] != 'none')
            {
                code += "<div class=\"skills level" + level + "\">"
                     + "<img class=\"background-skills\" src=\"/resources/img/skills/" + card.skills[1] + ".png\"/>"
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
    
    add: function(card)
    {
        var actions = [{
                label: CardEquipment._i18n[Language].save,
                icon: "equipment-save",
                fn: "CardEquipment._save();"
        }];
        if (card != undefined)
        {
            actions.push({
                label: CardEquipment._i18n[Language].remove,
                icon: "equipment-remove",
                fn: "CardEquipment._remove();"
            });
        }
        
        var dlabel = card == undefined ? CardEquipment._i18n[Language].newcard : CardEquipment._i18n[Language].editcard;

        function _skills()
        {
            var s = "";
            for (var i in ConanRules._allSkills)
            {
                var skills = ConanRules._allSkills[i];
                s += "<optgroup label=\"" + ConanRules._i18n[Language]['skills_' + i] + "\">";
                
                for (var j = 0; j < skills.length; j++)
                {
                    var skill = skills[j];
                    s += "<option value=\"" + i  + "/" + skill + "\">" + ConanRules._i18n[Language]['skills_' + i + '_' + skill + '_title'] + "</option>";
                }
                
                s += "</optgroup>";
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
            imagerotation: "0",
            imageatfront: false
        };
        
        $("#eqmelee,#eqmelee2,#eqactive,#eqactive2,#eqpassive,#eqpassive2,#eqranged,#eqranged2,#eqmanipulation,#eqmanipulation2").each (function (i) { // ,#eqskills,#eqskills2
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
    
    _preview: function()
    {
        var card = CardEquipment._form2card();
        var code = CardEquipment._cardCode(card);
        $(".dialog .preview").html(code);
    },
    
    _form2card: function()
    {
        return {
            id: $(".dialog input[name=cardpos]")[0].value,
            name: $(".dialog input[name=cardname]")[0].value,
            encumbrance: parseInt($(".dialog input[name=cardweight]")[0].value),
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

    _remove: function()
    {
        if (confirm(CardEquipment._i18n[Language].removeConfirm))
        {
            var card = CardEquipment._form2card();
            
            var cards = JSON.parse(localStorage.getItem("StudioEquipmentCards")) || [];
            var newCards = [];
    
            for (var c in cards)
            {
                if (cards[c].id == card.id)
                {
                    // nothing here, to remove
                }
                else
                {
                    newCards.push(cards[c]);
                }
            }
            
            localStorage.setItem("StudioEquipmentCards", JSON.stringify(newCards));
            CardEquipment._displayCards();
            Nav.closeDialog();
        }
    },
    
    _save: function()
    {
        var card = CardEquipment._form2card();
        
        $(".dialog .field.error").removeClass("error");
        
        var errors = 0;
        if (!card.name)
        {
            $(".dialog input[name=cardname]").parent().addClass("error");
            errors++;
        }
        if (errors > 0)
        {
            return;    
        }
        
        var cards = JSON.parse(localStorage.getItem("StudioEquipmentCards")) || [];
        var newCards = [];
        
        var done = false;
        for (var c in cards)
        {
            if (cards[c].id == card.id)
            {
                newCards.push(card);
                done = true;
            }
            else
            {
                newCards.push(cards[c]);
            }
        }
        if (!done)
        {
            newCards.push(card);
        }
        
        localStorage.setItem("StudioEquipmentCards", JSON.stringify(newCards));
        CardEquipment._displayCards();
        Nav.closeDialog();
    }
}