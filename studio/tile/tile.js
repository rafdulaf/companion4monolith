var Tile = {
    _i18n: {
        'fr': {
            'tab': "Tuile",
            'nocard': "Vous n'avez aucune tuile pour le moment. Cliquez sur le bouton + en haut pour en creer une.",
            'printnocard': "Vous n'avez aucune tuile pour le moment"
        },
        'en': {
            'tab': "Tile",
            'nocard': "You have no tile for the moment. Click on the + button in the header to create one.",
            'printnocard': "You have no tile for the moment"
        },
        'it': {
            'tab': "Tessera",
            'nocard': "Non hai tessere al momento. Clicca + sulla barra degli strumenti per crearne una.",
            'printnocard': "Al momento non hai tessere da stampare"
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
