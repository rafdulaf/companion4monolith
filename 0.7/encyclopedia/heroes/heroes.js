var EncyclopediaHeroes = {
    _i18n: {
        'fr': {
            'tab': "Héros"
        },
        'en': {
            'tab': "Heroes"
        }
    },
    
    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaHeroes._i18n[Language].tab, id: "encyclopedia-heroes", onShow: EncyclopediaHeroes.onShow,  onHide: EncyclopediaHeroes.onHide });
    },
    
    init: function() 
    {
        $("#encyclopedia-heroes").append("In construction");
    },
    
    onShow: function() {
    },
    
    onHide: function() {
    }
};
