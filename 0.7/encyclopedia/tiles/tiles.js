var EncyclopediaTiles = {
    _i18n: {
        'fr': {
            'tab': "Tuiles"
        },
        'en': {
            'tab': "Tiles"
        }
    },
    
    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaTiles._i18n[Language].tab, id: "encyclopedia-tiles", onShow: EncyclopediaTiles.onShow,  onHide: EncyclopediaTiles.onHide });
    },
    
    init: function() 
    {
        $("#encyclopedia-tiles").append("In construction");
    },
    
    onShow: function() {
    },
    
    onHide: function() {
    }
};
