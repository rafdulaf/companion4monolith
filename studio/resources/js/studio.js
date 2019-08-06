var ConanStudio = {
      _i18n: {
        'fr': {
            'menu': "Studio"
        },
        'en': {
            'menu': "Studio"
        }
    },
    
    _currentSlide: null,
    _slides: [],
    
    init: function() {
        Nav.addIcon(ConanStudio._i18n[Language].menu, "studio-icon", "studio");

        CardEquipment.preinit();
        CardSpell.preinit();
        HeroSheet.preinit();
        Tile.preinit();

        Nav.createTabs('studio', ConanStudio._slides, ConanStudio.onChange);
        
        CardEquipment.init();
        CardSpell.init();
        HeroSheet.init();
        Tile.init();
        
        ConanStudio.onChange();
    },
    
    onChange: function(event, slick) {
        var slide = slick && slick.currentSlide || 0;
        
        if (ConanStudio._currentSlide != null)
            ConanStudio._slides[ConanStudio._currentSlide].onHide();
        
        ConanStudio._currentSlide = slide;
        ConanStudio._slides[ConanStudio._currentSlide].onShow();
    }
};