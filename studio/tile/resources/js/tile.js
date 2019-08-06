var Tile = {
    _i18n: {
        'fr': {
            'tab': "Tuile"
        },
        'en': {
            'tab': "Tile"
        }
    },
    
    preinit: function() {
        ConanStudio._slides.push({   label: Tile._i18n[Language].tab, id: "tile", onShow: Tile.onShow,  onHide: Tile.onHide });
    },
    
    init: function() {
        $("#tile").html("In construction");
    },
    
    onShow: function() {
    },
    
    onHide: function() {
    }
}