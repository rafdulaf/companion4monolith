var CardSpell = {
    _i18n: {
        'fr': {
            'tab': "Sort",
            'nocard': "Vous n'avez aucune carte pour le moment.",
            'nocard2': " Cliquez sur le bouton + en haut pour en creer une.",
            'printnocard': "Vous n'avez aucune carte pour le moment",
            'newcard': "Créer une carte",
            'print': "Imprimer des cartes",
            'editcard': "Modifier",
            'save': "Enregistrer",
            'remove': "Effacer",
            'removeConfirm': "Etes-vous sûr de vouloir effacer cette carte ?",
            'name': "Nom",
            'namePh': "?",
            'text': "Effet",
            'textPh': "?",
            'textHelp': "Pour insérer des images, utilisez: {dice_yellow}, {dice_orange}, {dice_red}, {dice_yellow_reroll}, {dice_orange_reroll} ou {dice_red_reroll}.",
            'textSize': "Taille",
            'textSizePh': "0",
            'textInter': "Interligne",
            'textInterPh': "0",
            'cost': "Coût en energie",
            'costPh': "?",
            'saturation': "Indice de saturation",
            'saturationPh': "?",
            'reaction': "Lançable en réaction",
            'explosion': "Sort de zone",
            'image': "Image (fond transparent)",
            'imagePh': "Entrer l'adresse de l'image (http://)",
            'imagelocation': "Emplacement",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotation",
            'imagerotationPh': "0",
            'header1': "Saisissez les données de la carte",
            'header1bis': "Mettez une image",
            'header2': "Prévisualiser la carte",
            'copyright': "Basé sur le fichier PSD proposé par <a href='https://the-overlord.com/index.php?/profile/9-genesteal28/'>@genesteal28</a> et converti au format GIMP par <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a> et <a href='https://the-overlord.com/index.php?/profile/1-sentma/'>SentMa</a> pour le dos de carte."
        },
        'en': {
            'tab': "Spell",
            'nocard': "You have no card for the moment.",
            'nocard2': " Click on the + button in the header to create one.",
            'printnocard': "You have no card for the moment",
            'newcard': "Create a new card",
            'print': "Print cards",
            'editcard': "Edit a card",
            'save': "Save",
            'remove': "Delete",
            'removeConfirm': "Are you sure that you want to delete this card?",
            'name': "Name",
            'namePh': "?",
            'text': "Effect",
            'textPh': "?",
            'textHelp': "To insert images, use: {dice_yellow}, {dice_orange}, {dice_red}, {dice_yellow_reroll}, {dice_orange_reroll} or {dice_red_reroll}.",
            'textSize': "Size",
            'textSizePh': "0",
            'textInter': "Line height",
            'textInterPh': "0",
            'cost': "Energy cost",
            'costPh': "?",
            'saturation': "Exertion Limit",
            'saturationPh': "?",
            'reaction': "Reaction spell",
            'explosion': "Area attack spell",
            'image': "Image (transparent background)",
            'imagePh': "Enter the image address (http://...)",
            'imagelocation': "Location",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotation",
            'imagerotationPh': "0",
            'header1': "Fill the card data",
            'header1bis': "Set a picture",
            'header2': "Preview the final result",
            'copyright': "Based on the PSD file proposed by <a href='https://the-overlord.com/index.php?/profile/9-genesteal28/'>@genesteal28</a> and converted at the GIMP format by <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a> and <a href='https://the-overlord.com/index.php?/profile/1-sentma/'>SentMa</a> for the back of the card."
        }
    },
    
    preinit: function() {
        ConanStudio._slides.push({   label: CardSpell._i18n[Language].tab, id: "spell", onShow: CardSpell.onShow,  onHide: CardSpell.onHide });
    },
    
    init: function() {
        Nav.addAction("studio", CardSpell._i18n[Language].newcard, "spell-icon-add", "spell-add", CardSpell.add);
        Nav.addAction("studio", CardSpell._i18n[Language].print, "spell-icon-print", "spell-print", ConanStudio.printCards);
        CardSpell.onHide();
        CardSpell._displayCards();
    },
    
    _displayCards: function()
    {
        $("#spell").html(CardSpell._getDisplayCardsCode(true));
    },
    
    _getDisplayCardsCode: function(withEditLink)
    {
        var html = "";
        
        var cards = JSON.parse(localStorage.getItem("StudioSpellCards")) || [];
        if (cards.length > 0)
        {
            for (var i in cards)
            {
                var prefix = "", suffix = "";
                if (withEditLink !== false)
                {
                    prefix = "<a href='javascript:void(0)' onclick='CardSpell.add(JSON.parse(localStorage.getItem(\"StudioSpellCards\"))[" + i + "])'>";
                    suffix = "</a>";
                }
                else 
                {
                    prefix = "<input type='checkbox' id='spell-" + i + "' name='spell' data-index='" + i + "' onchange=\"$('#spell-back-" + i + "').toggle();\"/><label for='spell-" + i + "'>";
                    suffix = "</label>";
                }
                
                html += prefix + CardSpell._cardCode(cards[i]) + suffix;
            }
        }
        else
        {
            html += "<div class=\"nocards\">" + CardSpell._i18n[Language].nocard + (withEditLink !== false ? CardSpell._i18n[Language].nocard2 : '') + "</div>";
        }
        
        if (!withEditLink)
        {
            html += "<div class='newpage'>"; 
            for (var i in cards)
            {
                html += "<img id=\"spell-back-" + i + "\" style=\"display: none\" class=\"back\" src=\"" + Version + "/studio/card_spell/img/back.png\"/>"
            }
            html += "</div>";
        }
        
        return html;
    },
    
    onShow: function() {
        Nav.showAction("studio", "spell-add");
        Nav.showAction("studio", "spell-print");
    },
    
    onHide: function() {
        Nav.hideAction("studio", "spell-add");
        Nav.hideAction("studio", "spell-print");
    },
    
    _cardCode: function(card) {
        var code = "<div class=\"spell card\">"
                + "<img class=\"background\" src=\"" + Version + "/studio/card_spell/img/background.png\"/>";
        
        code += "<div class=\"name\">" + card.name + "</div>";
        code += "<div class=\"text\" style=\"font-size: " + card.textSize + "%; line-height: " + card.textInter + "%; \">" + CardSpell._replace(card.text) + "</div>";

        var hasCost = parseInt(card.cost) > 0;
        var hasSaturation = parseInt(card.saturation) > 0; 
        code += "<div class=\"cost" + (hasSaturation ? "" : " noSaturation") + (hasCost ? "" : " noCost") + "\">" + (hasCost ? card.cost : "X") + "</div>";
        if (hasSaturation)
        {
            code += "<div class='cost-and-saturation'><img src=\"" + Version + "/studio/card_spell/img/slash2.png\"/></div>";
            code += "<div class=\"saturation\">" + card.saturation + "</div>";
        }

        if (card.explosion)
        {
            code += "<div class='explosion" + (card.reaction ? " and-other" : "") + "'><img src=\"" + Version + "/studio/card_spell/img/explosion.png\"/></div>";
        }
        if (card.reaction)
        {
            code += "<div class='reaction" + (card.explosion ? " and-other" : "") + "'><img src=\"" + Version + "/studio/card_spell/img/reaction.png\"/></div>";
        }

        code += "<div class='imagebg'><img src=\"" + Version + "/studio/card_spell/img/image-bg.png\"/></div>"
        if (card.image)
        {
            code += "<div class='image'><img src='" + card.image + "' style=\"left: " + card.imagelocation.x + "%; top: " + card.imagelocation.y + "%; width: " + card.imagezoom + "%; transform: translate(-50%, -50%) rotate(" + card.imagerotation + "deg)\"/></div>"
        }
                
        code += "</div>";
        return code;
    },
    
    _replace: function(text)
    {
        text = text.replace(/\n/g, '<br/>').replace(/\{(.*?)\}/g, "<img src=\"" + Version + "/resources/img/$1.png\"/>");
        return text;
    },

    
    add: function(card) {
        var actions = [{
                label: CardSpell._i18n[Language].save,
                icon: "spell-save",
                fn: "CardSpell._save();"
        }];
        if (card != undefined)
        {
            actions.push({
                label: CardSpell._i18n[Language].remove,
                icon: "spell-remove",
                fn: "CardSpell._remove();"
            });
        }
        
        var dlabel = card == undefined ? CardSpell._i18n[Language].newcard : CardSpell._i18n[Language].editcard;

        Nav.dialog(dlabel, 
            "<div class=\"eqcolspell\">"
            + "<div class=\"spell\">"
                + "<h1>" + CardSpell._i18n[Language].header1 + "</h1>"
                + "<input type=\"hidden\" name=\"cardpos\"/>"
                + "<div class=\"field name\">"
                    + "<label for=\"eqname\">" + CardSpell._i18n[Language].name + "</label>"
                    + "<input id=\"eqname\" name=\"cardname\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].namePh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
                + "<div class=\"field cost\">"
                    + "<label for=\"eqcost\">" + CardSpell._i18n[Language].cost + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"eqcost\" name=\"cardcost\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].costPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
                + "<div class=\"field saturation\">"
                    + "<label for=\"eqsaturation\">" + CardSpell._i18n[Language].saturation + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"eqsaturation\" name=\"cardsaturation\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].saturationPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
                + "<div class=\"field text\">"
                    + "<label for=\"eqtext\"><span data-help=\"" + CardSpell._i18n[Language].textHelp + "\"></span>" + CardSpell._i18n[Language].text + "</label>"
                    + "<textarea id=\"eqtext\" name=\"cardtext\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].textPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"></textarea>"
                + "</div>"
                + "<div class=\"field textsize\">"
                    + "<label for=\"eqtextsize\">" + CardSpell._i18n[Language].textSize + "</label>"
                    + "<input id=\"eqtextsize\" name=\"cardtextsize\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].textSizePh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"\"/>"
                + "</div>"
                + "<div class=\"field textinter\">"
                    + "<label for=\"eqtextinter\">" + CardSpell._i18n[Language].textInter + "</label>"
                    + "<input id=\"eqtextinter\" name=\"cardtextinter\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].textInterPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
                
                + "<div class=\"field checkbox\">"
                    + "<div class=\"explosion\"><input type=\"checkbox\" id=\"eqexplosion\" name=\"cardexplosion\" onchange=\"CardSpell._preview();\"/><label for=\"eqexplosion\">" + CardSpell._i18n[Language].explosion + "</label></div>"
                    + "<div class=\"reaction\"><input type=\"checkbox\" id=\"eqreaction\" name=\"cardreaction\" onchange=\"CardSpell._preview();\"/><label for=\"eqreaction\">" + CardSpell._i18n[Language].reaction + "</label></div>"
                + "</div>"

            + "</div>"
            + "<div class=\"spell\">"
                + "<h1>" + CardSpell._i18n[Language].header1bis + "</h1>"
                + "<div class=\"field\">"
                    + "<label for=\"eqimage\">" + CardSpell._i18n[Language].image + "</label>"
                    + "<input id=\"eqimage\" name=\"cardimage\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].imagePh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"eqimagelocation\">" + CardSpell._i18n[Language].imagelocation + "</label>"
                    + "<div><input id=\"eqimagelocation\" name=\"cardimagelocation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].imagelocationPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"\"/></div>"
                    + "<div><input id=\"eqimagelocation2\" name=\"cardimagelocation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].imagelocationPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"eqimagezoom\">" + CardSpell._i18n[Language].imagezoom + "</label>"
                    + "<input id=\"eqimagezoom\" name=\"cardimagezoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].imagezoomPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"eqimagerotation\">" + CardSpell._i18n[Language].imagerotation + "</label>"
                    + "<input id=\"eqimagerotation\" name=\"cardimagerotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n[Language].imagerotationPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
            + "</div>"
            + "</div>"
            + "<div class=\"eqcolspell\">"
            + "<div class=\"spell-preview\">"
                + "<h1>" + CardSpell._i18n[Language].header2 + "</h1>"
                + "<div class=\"preview\"></div>"
            + "</div>"
            + "</div>",
            null,
            actions
        );

        card = card || {
            id: Math.random(),
            name: "",
            text: "",
            textSize: "150",
            textInter: "66",
            cost: "0",
            saturation: "0",
            image: "",
            imagelocation: {x: "50", y: "50"},
            imagezoom: "100",
            imagerotation: "0",
            explosion: $(".dialog input[name=cardexplosion]")[0].checked,
            reaction: $(".dialog input[name=cardreaction]")[0].checked
        };
        
        CardSpell._card2form(card);
        
        CardSpell._preview();
    },
    
    _preview: function()
    {
        var card = CardSpell._form2card();
        var code = CardSpell._cardCode(card);
        $(".dialog .preview").html(code);
    },
    
    _form2card: function()
    {
        return {
            id: $(".dialog input[name=cardpos]")[0].value,
            name: $(".dialog input[name=cardname]")[0].value,
            text: $(".dialog textarea[name=cardtext]")[0].value,
            textSize: $(".dialog input[name=cardtextsize]")[0].value || "150",
            textInter: $(".dialog input[name=cardtextinter]")[0].value || "66",
            cost: $(".dialog input[name=cardcost]")[0].value || "0",
            saturation: $(".dialog input[name=cardsaturation]")[0].value || "0",
            image: $(".dialog input[name=cardimage]")[0].value,
            imagelocation: {x: $(".dialog input[name=cardimagelocation]")[0].value || "50", y: $(".dialog input[name=cardimagelocation2]")[0].value || "50"},
            imagezoom: $(".dialog input[name=cardimagezoom]")[0].value || "100",
            imagerotation: $(".dialog input[name=cardimagerotation]")[0].value || "0",
            explosion: $(".dialog input[name=cardexplosion]")[0].checked,
            reaction: $(".dialog input[name=cardreaction]")[0].checked
        }
    },
    _card2form: function(card)
    {
        $(".dialog input[name=cardpos]")[0].value = card.id;
        $(".dialog input[name=cardname]")[0].value = card.name;
        $(".dialog textarea[name=cardtext]")[0].value = card.text;
        $(".dialog input[name=cardtextsize]")[0].value = card.textSize;
        $(".dialog input[name=cardtextinter]")[0].value = card.textInter;
        $(".dialog input[name=cardcost]")[0].value = card.cost;
        $(".dialog input[name=cardsaturation]")[0].value = card.saturation;
        $(".dialog input[name=cardimage]")[0].value = card.image;
        $(".dialog input[name=cardimagelocation]")[0].value = card.imagelocation.x;
        $(".dialog input[name=cardimagelocation2]")[0].value = card.imagelocation.y;
        $(".dialog input[name=cardimagezoom]")[0].value = card.imagezoom;
        $(".dialog input[name=cardimagerotation]")[0].value = card.imagerotation;
        $(".dialog input[name=cardexplosion]")[0].checked = card.explosion;
        $(".dialog input[name=cardreaction]")[0].checked = card.reaction;
    },
    
    _remove: function()
    {
        if (confirm(CardSpell._i18n[Language].removeConfirm))
        {
            var card = CardSpell._form2card();
            
            var cards = JSON.parse(localStorage.getItem("StudioSpellCards")) || [];
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
            
            localStorage.setItem("StudioSpellCards", JSON.stringify(newCards));
            CardSpell._displayCards();
            Nav.closeDialog();
        }
    },
    
    _save: function()
    {
        var card = CardSpell._form2card();
        
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
        
        var cards = JSON.parse(localStorage.getItem("StudioSpellCards")) || [];
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
        
        localStorage.setItem("StudioSpellCards", JSON.stringify(newCards));
        CardSpell._displayCards();
        Nav.closeDialog();
    },
    
    copyright: function() 
    {
        return "<h3>" + CardSpell._i18n[Language].tab + "</h3>"
            + "<p>" + CardSpell._i18n[Language].copyright + "</p>"
    }
}