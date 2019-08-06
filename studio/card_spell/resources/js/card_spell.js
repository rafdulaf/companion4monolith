var CardSpell = {
    _i18n: {
        'fr': {
            'tab': "Sort"
        },
        'en': {
            'tab': "Spell"
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