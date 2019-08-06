var HeroSheet = {
    _i18n: {
        'fr': {
            'tab': "Heros"
        },
        'en': {
            'tab': "Hero"
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