var HeroSheet = {
    _i18n: {
        'fr': {
            'tab': "Héros",
            'nocard': "Vous n'avez aucune fiche pour le moment. Cliquez sur le bouton + en haut pour en creer une.",
            'printnocard': "Vous n'avez aucune fiche pour le moment",
            'copyright': "Basé sur le fichier PSD proposé par <a href='https://the-overlord.com/index.php?/profile/13-roolz/'>@Roolz</a>/<a href='https://the-overlord.com/index.php?/profile/4-doucefeuille/'>@Doucefeuille</a> et converti au format GIMP par <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        },
        'en': {
            'tab': "Hero",
            'nocard': "You have no sheet for the moment. Click on the + button in the header to create one.",
            'printnocard': "You have no sheet for the moment",
            'copyright': "Based on the PSD file proposed by <a href='https://the-overlord.com/index.php?/profile/13-roolz/'>@Roolz</a>/<a href='https://the-overlord.com/index.php?/profile/4-doucefeuille/'>@Doucefeuille</a> and converted at the GIMP format by <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        }
    },
    
    preinit: function() {
        ConanStudio._slides.push({   label: HeroSheet._i18n[Language].tab, id: "hero", onShow: HeroSheet.onShow,  onHide: HeroSheet.onHide });
    },
    
    init: function() {
        $("#hero").html("In construction");
    },
    
    onShow: function() {
    },
    
    onHide: function() {
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
    
    copyright: function() 
    {
        return "<h3>" + HeroSheet._i18n[Language].tab + "</h3>"
            + "<p>" + HeroSheet._i18n[Language].copyright + "</p>"
    }
}