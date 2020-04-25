var HeroSheet = {
    _i18n: {
        'fr': {
            'tab': "Héros",
            'nocard': "Vous n'avez aucune fiche pour le moment.",
            'nocard2': " Cliquez sur le bouton + en haut pour en creer une.",
            'printnocard': "Vous n'avez aucune fiche pour le moment",
            'newcard': "Créer une fiche",
            'print': "Imprimer des fiches",
            'printHint': "Une fiche de héros mesure 21cm. Si vous souhaitez imprimer avec les marges de découpe, vous devrez imprimer en mode paysage 1 seule fiche à la fois. Si vous imprimez sans les magres de découpe, vous pouvez imprimer 2 fiches à la fois en mode portrait.",
            'copyright': "Basé sur le fichier PSD proposé par <a href='https://the-overlord.com/index.php?/profile/13-roolz/'>@Roolz</a>/<a href='https://the-overlord.com/index.php?/profile/4-doucefeuille/'>@Doucefeuille</a> et converti au format GIMP par <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        },
        'en': {
            'tab': "Hero",
            'nocard': "You have no sheet for the moment.",
            'nocard2': " Click on the + button in the header to create one.",
            'printnocard': "You have no sheet for the moment",
            'newcard': "Create a new sheet",
            'print': "Print sheets",
            'printHint': "A hero sheet is 21cm wide. If you wan to print with cut margins, you have to print in landscape mode and only 1 sheet at a time. If you want to print without cut margins, you can print up to 2 sheets at a time in portrait mode.",
            'copyright': "Based on the PSD file proposed by <a href='https://the-overlord.com/index.php?/profile/13-roolz/'>@Roolz</a>/<a href='https://the-overlord.com/index.php?/profile/4-doucefeuille/'>@Doucefeuille</a> and converted at the GIMP format by <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        }
    },
    
    preinit: function() {
        ConanStudio._slides.push({   label: HeroSheet._i18n[Language].tab, id: "hero", onShow: HeroSheet.onShow,  onHide: HeroSheet.onHide });
    },
    
    init: function() {
        Nav.addAction("studio", HeroSheet._i18n[Language].newcard, "hero-icon-add", "hero-add", HeroSheet.add);
        Nav.addAction("studio", HeroSheet._i18n[Language].print, "hero-icon-print", "hero-print", ConanStudio.printCards);
        HeroSheet.onHide();
        HeroSheet._displayCards();
    },
    
    _displayCards: function()
    {
        $("#hero").html(HeroSheet._getDisplayCardsCode(true));
    },
    
    _getDisplayCardsCode: function(withEditLink)
    {
        var html = "";
        
        var cards = JSON.parse(localStorage.getItem("StudioHeroSheets")) || [];
        if (cards.length > 0)
        {
            for (var i in cards)
            {
                var prefix = "", suffix = "";
                if (withEditLink !== false)
                {
                    prefix = "<a href='javascript:void(0)' onclick='HeroSheet.add(JSON.parse(localStorage.getItem(\"StudioHeroSheets\"))[" + i + "])'>";
                    suffix = "</a>";
                }
                else 
                {
                    prefix = "<input type='checkbox' id='herosheet-" + i + "' name='herosheet' data-index='" + i + "' onchange=\"$('#herosheet-back-" + i + "').toggleClass('invisible');\"/><label for='herosheet-" + i + "'>";
                    suffix = "</label>";
                }
                
                html += prefix + "<div class='printoverflow'>" + HeroSheet._sheetCode(cards[i]) + "</div>" + suffix;
            }
        }
        else
        {
            html += "<div class=\"nocards\">" + HeroSheet._i18n[Language].nocard + (withEditLink !== false ? HeroSheet._i18n[Language].nocard2 : '') + "</div>";
        }
        
        if (!withEditLink)
        {
            for (var i in cards)
            {
                html += "<div class='printoverflow back invisible' id='herosheet-back-" + i + "'>" + HeroSheet._sheetCode(cards[i]) + "</div>";
            }
        }
        
        return html;
    },
    
    onShow: function() {
        Nav.showAction("studio", "hero-add");
        Nav.showAction("studio", "hero-print");
    },
    
    onHide: function() {
        Nav.hideAction("studio", "hero-add");
        Nav.hideAction("studio", "hero-print");
    },
    
    _sheetCode: function(sheet) {
        var code = "<div class=\"herosheet sheet\">";

        code += "<picture class=\"background-l1\">"
                    + "<source media=\"print\" srcset=\"studio/hero_sheet/img/background_layer_1hd.png?version=" + Version + "\"/>"
                    + "<img src=\"studio/hero_sheet/img/background_layer_1.png?version=" + Version + "\"/>"
                + "</picture>";
        
        if (sheet.image)
        {
            code += "<div class=\"image\"><img loading=\"lazy\" src=\"" + sheet.image + "\" style=\"left: " + sheet.imagelocation.x + "%; top: " + sheet.imagelocation.y + "%; height: " + sheet.imagezoom + "%; transform: translate(0%, -50%) rotate(" + sheet.imagerotation + "deg)\"/></div>";
        }
        
        code += "<picture class=\"background-l3\">"
                    + "<source media=\"print\" srcset=\"studio/hero_sheet/img/background_layer_3hd.png?version=" + Version + "\"/>"
                    + "<img src=\"studio/hero_sheet/img/background_layer_3.png?version=" + Version + "\"/>"
                + "</picture>";

        if (sheet.name)
        {
            code += "<div class=\"name\">" + sheet.name + (sheet.subname ? "<span>" + sheet.subname + "</span>" : " ") + "</div>";
        }
        if (sheet.gem)
        {
            code += "<div class=\"gem\">" + sheet.gem + "</div>";
        }

        code += "<div class=\"skillline\">";
        if (sheet.encumbrance)
        {
            code += "<img class=\"background-encumbrance\" src=\"studio/hero_sheet/img/weight.png?version=" + Version + "\"/>";
            code += "<div class=\"encumbrance\">" + sheet.encumbrance + "</div>";

            for (var s=0; s < sheet.skills.length; s++)
            {
                var skill = sheet.skills[s];
                var encyclopediaSkill = ConanRules._findSkillById(skill.id);
                
                code += "<div class=\"skill\">";
                    code += "<img class=\"skill\" src=\"" + encyclopediaSkill.image + "?version=" + Version + "\"/>";
                    if (skill.exertion)
                    {
                        code += "<img class=\"exertion\" src=\"studio/hero_sheet/img/skill_weight.png?version=" + Version + "\"/>";
                        code += "<div class=\"exertion\">" + skill.exertion + "</div>";
                    }
                code += "</div>";
            }
            
            code += "<div class=\"encumbrance_movement-1\">" + sheet.encumbrance_movement[0] + "</div>";
            code += "<div class=\"encumbrance_movement-2\">" + sheet.encumbrance_movement[1] + "</div>";
        }
        code += "</div>";
        
        code += "<div class=\"base melee\">";
        code +=     "<div class=\"exertion\">" + sheet.melee.exertion + "</div>";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.melee.dice + ".png?version=" + Version + "\"/></div>";
        code += "</div>";
        code += "<div class=\"base ranged\">";
        code +=     "<div class=\"exertion\">" + sheet.ranged.exertion + "</div>";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.ranged.dice + ".png?version=" + Version + "\"/></div>";
        code += "</div>";
        code += "<div class=\"base defense\">";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.defense.dice + ".png?version=" + Version + "\"/></div>";
        code += "</div>";
        code += "<div class=\"base movement\">";
        code +=     "<div class=\"exertion\">" + sheet.movement.exertion + "</div>";
        code +=     "<div class=\"dice\">" + sheet.movement.base + "</div>";
        code += "</div>";
        code += "<div class=\"base manipulation\">";
        code +=     "<div class=\"exertion\">" + sheet.manipulation.exertion + "</div>";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.manipulation.dice + ".png?version=" + Version + "\"/></div>";
        code += "</div>";
        
        code += "</div>";
        return code;
    },
    
    later: function(sheet)
    {
        sheet = card || {
            id: Math.random(),
            image: "",
            imagelocation: {x: "0", y: "50"},
            imagezoom: "100",
            imagerotation: "0"
        };
    },
    
    copyright: function() 
    {
        return "<h3>" + HeroSheet._i18n[Language].tab + "</h3>"
            + "<p>" + HeroSheet._i18n[Language].copyright + "</p>"
    }
}