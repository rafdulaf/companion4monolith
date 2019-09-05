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
    }
}