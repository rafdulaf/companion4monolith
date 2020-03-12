var HeroSheet = {
    _i18n: {
        'fr': {
            'tab': "Héros",
            'nocard': "Vous n'avez aucune fiche pour le moment. Cliquez sur le bouton + en haut pour en creer une.",
            'printnocard': "Vous n'avez aucune fiche pour le moment"
        },
        'en': {
            'tab': "Hero",
            'nocard': "You have no sheet for the moment. Click on the + button in the header to create one.",
            'printnocard': "You have no sheet for the moment"
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
        
        code += "<img class=\"background-l1\" src=\"studio/hero_sheet/img/background_layer_1.png?version=" + Version + "\"/>";
        
        if (sheet.image)
        {
            code += "<div class=\"image\"><img src=\"" + sheet.image + "\" style=\"left: " + sheet.imagelocation.x + "%; top: " + sheet.imagelocation.y + "%; width: " + sheet.imagezoom + "%; transform: translate(-50%, -50%) rotate(" + sheet.imagerotation + "deg)\"/></div>";
        }
        
        code += "<img class=\"background-l3\" src=\"studio/hero_sheet/img/background_layer_3.png?version=" + Version + "\"/>";
                
        code += "</div>";
        return code;
    }    
}