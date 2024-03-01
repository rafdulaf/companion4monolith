var CardSpell = mergeObject(StudioItem, {
    name: 'spell',
    cls: 'CardSpell',
    storage: Application + "_StudioSpellCards",
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
                    prefix = "<a href='javascript:void(0)' onclick='CardSpell.add(JSON.parse(localStorage.getItem(\"" + this.storage + "\"))[" + i + "])'>";
                    suffix = "</a>";
                }
                else
                {
                    prefix = "<input type='checkbox'" + (cards[i].prechecked ? " checked='checked'" : "") + " id='spell-" + i + "' name='spell' data-index='" + i + "' onchange=\"$('#spell-back-" + i + "').toggleClass('invisible');\"/><label for='spell-" + i + "'>";
                    suffix = "</label>";
                }

                html += prefix + "<div class='printoverflow'>" + CardSpell._cardCode(cards[i]) + "</div>" + suffix;
            }
        }
        else
        {
            html += "<div class=\"nocards\">" + CardSpell._i18n.nocard + (withEditLink !== false ? CardSpell._i18n.nocard2 : '') + "</div>";
        }

        if (!withEditLink)
        {
            for (var i in cards)
            {
                html += "<div id=\"spell-back-" + i + "\"  class='printoverflow back invisible'><img src=\"studio/card_spell/img/back.webp?version=" + Version + "\"/></div>"
            }
        }

        return html;
    },

    _cardCode: function(card) {
        var code = "<div class=\"spell card" + (card.imageEffect !== false ? " effect" : "") + "\">"
                + "<picture class=\"background\">"
                    + "<source media=\"print\" srcset=\"studio/card_spell/img/background_hd.webp?version=" + Version + "\"/>"
                    + "<img src=\"studio/card_spell/img/background.webp?version=" + Version + "\"/>"
                + "</picture>";

        code += "<div class=\"name" + (card.longName === true ? " long" : "") + "\">" + card.name + "</div>";
        code += "<div class=\"text\" style=\"font-size: " + card.textSize + "%; line-height: " + card.textInter + "%; \">" + About._replace(card.text).replace(/\n/g, '<br/>') + "</div>";

        var hasCost = parseInt(card.cost) > 0;
        var hasSaturation = parseInt(card.saturation) > 0;
        code += "<div class=\"cost" + (hasSaturation ? "" : " noSaturation") + (hasCost ? "" : " noCost") + "\">" + (hasCost ? card.cost : "X") + "</div>";
        if (hasSaturation)
        {
            code += "<div class='cost-and-saturation'><img src=\"studio/card_spell/img/slash2.webp?version=" + Version + "\"/></div>";
            code += "<div class=\"saturation\">" + card.saturation + "</div>";
        }

        if (card.explosion)
        {
            code += "<div class='explosion" + (card.reaction ? " and-other" : "") + "'><img src=\"studio/card_spell/img/explosion.webp?version=" + Version + "\"/></div>";
        }
        if (card.reaction)
        {
            code += "<div class='reaction" + (card.explosion ? " and-other" : "") + "'><img src=\"studio/card_spell/img/reaction.webp?version=" + Version + "\"/></div>";
        }

        code += "<div class='imagebg'><img src=\"studio/card_spell/img/image-bg.webp?version=" + Version + "\"/></div>"
        if (card.image)
        {
            code += "<div class='image'><img " + LazyImage + " src='" + card.image + "' style=\"left: " + card.imagelocation.x + "%; top: " + card.imagelocation.y + "%; width: " + card.imagezoom + "%; transform: translate(-50%, -50%) rotate(" + card.imagerotation + "deg)\"/></div>"
        }

        code += "</div>";
        return code;
    },

    _add: function(card, dlabel, actions)
    {
        Nav.dialog(dlabel,
            "<div class=\"studiodialog\">"
            + "<div class=\"eqcolspell\">"
            + "<div class=\"spell\">"
                + "<h1>" + CardSpell._i18n.header1 + "</h1>"
                + "<input type=\"hidden\" name=\"cardpos\"/>"
                + "<div class=\"field name\">"
                    + "<label for=\"eqname\">" + CardSpell._i18n.name + "</label>"
                    + "<input id=\"eqname\" spellcheck='false' name=\"cardname\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.namePh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
                + "<div class=\"field cost\">"
                    + "<label for=\"eqcost\">" + CardSpell._i18n.cost + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"eqcost\" name=\"cardcost\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.costPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
                + "<div class=\"field saturation\">"
                    + "<label for=\"eqsaturation\">" + CardSpell._i18n.saturation + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"eqsaturation\" name=\"cardsaturation\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.saturationPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
                + "<div class=\"field text\">"
                    + "<label for=\"eqtext\"><span data-help=\"" + CardSpell._i18n.textHelp + "\"></span>" + CardSpell._i18n.text + "</label>"
                    + "<textarea id=\"eqtext\" name=\"cardtext\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.textPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"></textarea>"
                + "</div>"
                + "<div class=\"field textsize\">"
                    + "<label for=\"eqtextsize\">" + CardSpell._i18n.textSize + "</label>"
                    + "<input id=\"eqtextsize\" name=\"cardtextsize\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.textSizePh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"\"/>"
                + "</div>"
                + "<div class=\"field textinter\">"
                    + "<label for=\"eqtextinter\">" + CardSpell._i18n.textInter + "</label>"
                    + "<input id=\"eqtextinter\" name=\"cardtextinter\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.textInterPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"

                + "<div class=\"field checkbox\">"
                    + "<div class=\"explosion\"><input type=\"checkbox\" id=\"eqexplosion\" name=\"cardexplosion\" onchange=\"CardSpell._preview();\"/><label for=\"eqexplosion\">" + CardSpell._i18n.explosion + "</label></div>"
                    + "<div class=\"reaction\"><input type=\"checkbox\" id=\"eqreaction\" name=\"cardreaction\" onchange=\"CardSpell._preview();\"/><label for=\"eqreaction\">" + CardSpell._i18n.reaction + "</label></div>"
                + "</div>"

            + "</div>"
            + "<div class=\"spell\">"
                + "<h1>" + CardSpell._i18n.header1bis + "</h1>"
                + "<div class=\"field\">"
                    + "<label for=\"eqimage\">" + CardSpell._i18n.image + "</label>"
                    + "<input id=\"eqimage\" spellcheck='false' name=\"cardimage\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.imagePh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                    + "<div class=\"imageeffect\"><input type=\"checkbox\" id=\"eqspellimageeffect\" name=\"cardimageeffect\" onchange=\"CardSpell._preview();\"/><label for=\"eqspellimageeffect\">" + CardSpell._i18n.imageeffect + "</label></div>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"eqimagelocation\">" + CardSpell._i18n.imagelocation + "</label>"
                    + "<div><input id=\"eqimagelocation\" name=\"cardimagelocation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.imagelocationPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"\"/></div>"
                    + "<div><input id=\"eqimagelocation2\" name=\"cardimagelocation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.imagelocationPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"eqimagezoom\">" + CardSpell._i18n.imagezoom + "</label>"
                    + "<input id=\"eqimagezoom\" name=\"cardimagezoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.imagezoomPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"eqimagerotation\">" + CardSpell._i18n.imagerotation + "</label>"
                    + "<input id=\"eqimagerotation\" name=\"cardimagerotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + CardSpell._i18n.imagerotationPh + "\" onkeyup=\"CardSpell._preview();\" onchange=\"CardSpell._preview();\"/>"
                + "</div>"
            + "</div>"
            + "</div>"
            + "<div class=\"eqcolspell\">"
            + "<div class=\"spell-preview\">"
                + "<h1>" + CardSpell._i18n.header2 + "</h1>"
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
            text: "",
            textSize: "150",
            textInter: "66",
            cost: "0",
            saturation: "0",
            image: "",
            imageEffect: false,
            imagelocation: {x: "50", y: "50"},
            imagezoom: "100",
            imagerotation: "0",
            explosion: false,
            reaction: false
        };

        CardSpell._card2form(card);

        CardSpell._preview();
        
        $("#eqname").focus();
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
            imageEffect: $(".dialog input[name=cardimageeffect]")[0].checked,
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
        $(".dialog input[name=cardimageeffect]")[0].checked = card.imageEffect !== false;
        $(".dialog input[name=cardimagelocation]")[0].value = card.imagelocation.x;
        $(".dialog input[name=cardimagelocation2]")[0].value = card.imagelocation.y;
        $(".dialog input[name=cardimagezoom]")[0].value = card.imagezoom;
        $(".dialog input[name=cardimagerotation]")[0].value = card.imagerotation;
        $(".dialog input[name=cardexplosion]")[0].checked = card.explosion;
        $(".dialog input[name=cardreaction]")[0].checked = card.reaction;
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
        return "<h3>" + CardSpell._i18n.tab + "</h3>"
            + "<p>" + CardSpell._i18n.copyright + "</p>"
    }
});
