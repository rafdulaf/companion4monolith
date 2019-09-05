var CardSpell = {
    _i18n: {
        'fr': {
            'tab': "Sort",
            'nocard': "Vous n'avez aucune carte pour le moment. Cliquez sur le bouton + en haut pour en creer une.",
            'printnocard': "Vous n'avez aucune carte pour le moment"
        },
        'en': {
            'tab': "Spell",
            'nocard': "You have no card for the moment. Click on the + button in the header to create one.",
            'printnocard': "You have no card for the moment"
        }
    },
    
    preinit: function() {
        ConanStudio._slides.push({   label: CardSpell._i18n[Language].tab, id: "spell", onShow: CardSpell.onShow,  onHide: CardSpell.onHide });
    },
    
    init: function() {
        $("#spell").html("In construction");
    },
    
    onShow: function() {
    },
    
    onHide: function() {
    }
}