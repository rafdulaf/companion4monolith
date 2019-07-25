var CardEquipment = {
    _i18n: {
        'fr': {
            'tab': "Equipement",
            'nocard': "Vous n'avez aucune carte pour le moment. Cliquez sur le bouton plus en haut pour en creer une.",
            'newcard': "Creer une nouvelle carte",
            'save': "Enregistrer",
            'name': "Nom",
            'namePh': "Saisir le nom de la carte",
            'weight': "Encombrement",
            'weightPh': "Saisir la valeur d'encombrement",
            'meleeAttack': "Bonus au corps à corps",
            'manipulation': "Manipulation",
            'manipulationExplosive': "Explosif",
            'rangedAttack': "Bonus à distance",
            'rangedAttackThrowable': "Lançable",
            'activeDefense': "Défense active",
            'passiveDefense': "Défense passive",
            'image': "Image",
            'imagePh': "Entrer l'adresse de l'image (fond transparent)",
            'diceNone': "Aucun",
            'diceRed': "Rouge",
            'diceRedReroll': "Rouge \uf01e",
            'diceOrange': "Orange",
            'diceOrangeReroll': "Orange \uf01e",
            'diceYellow': "Jaune",
            'diceYellowReroll': "Jaune \uf01e"
        },
        'en': {
            'tab': "Equipment",
            'nocard': "You have no card for the moment. Click on the plus button in the header to create one.",
            'newcard': "Create a new card",
            'save': "Save",
            'name': "Name",
            'namePh': "Fill the name of the card",
            'weight': "Encumbrance",
            'weightPh': "Fill the encumbrance value",
            'meleeAttack': "Bonus in melee attack",
            'manipulation': "Manipulation",
            'manipulationExplosive': "Explosive",
            'rangedAttack': "Bonus in ranged attack",
            'rangedAttackThrowable': "Throwable",
            'activeDefense': "Active defense",
            'passiveDefense': "Passive defense",
            'image': "Image",
            'imagePh': "Enter the image address (transparent background)",
            'diceNone': "None",
            'diceRed': "Red",
            'diceRedReroll': "Red \uf01e",
            'diceOrange': "Orange",
            'diceOrangeReroll': "Orange \uf01e",
            'diceYellow': "Yellow",
            'diceYellowReroll': "Yellow \uf01e"
        }
    },
    
    preinit: function() {
        ConanStudio._slides.push({   label: CardEquipment._i18n[Language].tab, id: "equipment", onShow: CardEquipment.onShow,  onHide: CardEquipment.onHide });
    },
    
    init: function() {
        Nav.addAction("studio", CardEquipment._i18n[Language].newcard, "equipment-icon-add", "equipment-add", CardEquipment.add);
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
                $("#equipment").append(CardEquipment._cardCode(cards[i]))    
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
        var code = "<div class=\"card\">"
                + "<img class=\"background\" src=\"studio/card_equipment/resources/img/background.png\"/>"
                
                + "<img class=\"background-name\" src=\"studio/card_equipment/resources/img/name-background.png\"/>"
                + "<div class=\"name\">" + card.name + "</div>";
                
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
                   + "</div>"
            level++;
        }
        if (card.image)
        {
            code += "<div class=\"image\"><img src=\"" + card.image + "\"/></div>";
        }

        code += "</div>";
        return code;
    },
    
    add: function()
    {
        Nav.dialog(CardEquipment._i18n[Language].newcard, 
            "<div class=\"equipment\">"
                + "<input type=\"hidden\" name=\"cardpos\" value=\"" + Math.random() + "\"/>"
                + "<div class=\"field\">"
                    + "<label for=\"eqname\">" + CardEquipment._i18n[Language].name + "</label>"
                    + "<input id=\"eqname\" name=\"cardname\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].namePh + "\"/>"
                + "</div>"
                + "<div class=\"field\">"
                    + "<label for=\"eqweight\">" + CardEquipment._i18n[Language].weight + "</label>"
                    + "<input maxlength=\"1\" id=\"eqweight\" name=\"cardweight\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].weightPh + "\"/>"
                + "</div>"
                + "<div class=\"field\">"
                    + "<label for=\"eqmelee\">" + CardEquipment._i18n[Language].meleeAttack + "</label>"
                    + "<select id=\"eqmelee\" class=\"dice\" name=\"cardmelee1\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"eqmelee\" class=\"dice\" name=\"cardmelee2\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                + "</div>"
                + "<div class=\"field\">"
                    + "<label for=\"eqranged\">" + CardEquipment._i18n[Language].rangedAttack + "</label>"
                    + "<select id=\"eqranged\" class=\"dice\" name=\"cardranged1\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"eqranged\" class=\"dice\" name=\"cardranged2\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<div class=\"rangedthrow\"><input type=\"checkbox\" id=\"eqthrowable\" name=\"cardthrowable\"/><label for=\"eqthrowable\">" + CardEquipment._i18n[Language].rangedAttackThrowable + "</label></div>"
                + "</div>"
                + "<div class=\"field\">"
                    + "<label for=\"eqmanipulation\">" + CardEquipment._i18n[Language].manipulation + "</label>"
                    + "<select id=\"eqmanipulation\" class=\"dice\" name=\"cardmanip1\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"eqmanipulation\" class=\"dice\" name=\"cardmanip2\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<div class=\"manipexplosive\"><input type=\"checkbox\" id=\"eqexplosive\" name=\"cardexplosive\"/><label for=\"eqexplosive\">" + CardEquipment._i18n[Language].manipulationExplosive + "</label></div>"
                + "</div>"
                + "<div class=\"field\">"
                    + "<label for=\"eqactive\">" + CardEquipment._i18n[Language].activeDefense + "</label>"
                    + "<select id=\"eqactive\" class=\"dice\" name=\"cardactive1\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"eqactive\" class=\"dice\" name=\"cardactive2\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                + "</div>"
                + "<div class=\"field\">"
                    + "<label for=\"eqpassive\">" + CardEquipment._i18n[Language].passiveDefense + "</label>"
                    + "<select id=\"eqpassive\" class=\"dice\" name=\"cardpassive1\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"eqpassive\" class=\"dice\" name=\"cardpassive2\"><option value=\"none\">" + CardEquipment._i18n[Language].diceNone + "</option><option value=\"red\">" + CardEquipment._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + CardEquipment._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + CardEquipment._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + CardEquipment._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + CardEquipment._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + CardEquipment._i18n[Language].diceYellowReroll + "</option></select>"
                + "</div>"
                + "<div class=\"field\">"
                    + "<label for=\"eqimage\">" + CardEquipment._i18n[Language].image + "</label>"
                    + "<input id=\"eqimage\" name=\"cardimage\" autocomplete=\"off\" placeholder=\"" + CardEquipment._i18n[Language].imagePh + "\"/>"
                + "</div>"
            + "</div>",
            null,
            [{
                label: CardEquipment._i18n[Language].save,
                icon: "equipment-save",
                fn: "CardEquipment._save();"
            }]
        );
        $("#eqname").focus();
    },
    
    _save: function()
    {
        var card = {
            id: $(".dialog input[name=cardpos]")[0].value,
            name: $(".dialog input[name=cardname]")[0].value,
            encumbrance: parseInt($(".dialog input[name=cardweight]")[0].value),
            melee: { 0: $(".dialog select[name=cardmelee1]")[0].value, 1: $(".dialog select[name=cardmelee2]")[0].value },
            ranged: { 0: $(".dialog select[name=cardranged1]")[0].value, 1: $(".dialog select[name=cardranged2]")[0].value, throwable: $(".dialog input[name=cardthrowable]")[0].checked },
            manipulation: { 0: $(".dialog select[name=cardmanip1]")[0].value, 1: $(".dialog select[name=cardmanip2]")[0].value, explosive: $(".dialog input[name=cardexplosive]")[0].checked },
            active: { 0: $(".dialog select[name=cardactive1]")[0].value, 1: $(".dialog select[name=cardactive2]")[0].value },
            passive: { 0: $(".dialog select[name=cardpassive1]")[0].value, 1: $(".dialog select[name=cardpassive2]")[0].value },
            image: $(".dialog input[name=cardimage]")[0].value
        }
        
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