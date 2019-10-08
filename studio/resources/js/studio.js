var ConanStudio = {
      _i18n: {
        'fr': {
            'menu': "Studio",
            'printcardsLabel': "Imprimer",
            'printcardsHint': "Sélectionnez les éléments à imprimer puis cliquez sur le bouton imprimer.",
            'printfaces': "Imprimer les dos sur des pages séparées",
            'printcardEmpty': "Vous n'avez sélectionné aucun élément à imprimer"
        },
        'en': {
            'menu': "Studio",
            'printcardsLabel': "Print",
            'printcardsHint': "Select the items to print and then click on the print button.",
            'printfaces': "Print the backs on separated pages",
            'printcardEmpty': "You did not select any element to print"
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
        
        ConanAbout.addCopyright(ConanStudio._i18n[Language].menu, CardEquipment.copyright());
    },
    
    onChange: function(event, slick) {
        var slide = slick && slick.currentSlide || 0;
        
        if (ConanStudio._currentSlide != null)
            ConanStudio._slides[ConanStudio._currentSlide].onHide();
        
        ConanStudio._currentSlide = slide;
        ConanStudio._slides[ConanStudio._currentSlide].onShow();
    },
    
    printCards: function()
    {
        Nav.dialog(ConanStudio._i18n[Language].printcardsLabel, 
            "<div class=\"printcards\">"
            + "<p class='hint'>" + ConanStudio._i18n[Language].printcardsHint + "</p>"
            + "<p class='hint'><input type='checkbox' id='printback' onchange='$(this.parentNode.parentNode).toggleClass(\"back\")'><label for='printback'>" + ConanStudio._i18n[Language].printfaces + "</label></p>"

            + "<div class=\"print\"><button onclick=\"ConanStudio._printCards();\">" + ConanStudio._i18n[Language].printcardsLabel + "</button></div>"

            + "<h1>" + CardEquipment._i18n[Language].tab + "</h1>"
            + CardEquipment._getDisplayCardsCode(false)
            
            + "<h1>" + CardSpell._i18n[Language].tab + "</h1>"
            + "<div class=\"nocards\">" + CardSpell._i18n[Language].printnocard + "</div>"
            
            + "<h1>" + HeroSheet._i18n[Language].tab + "</h1>"
            + "<div class=\"nocards\">" + HeroSheet._i18n[Language].printnocard + "</div>"
            
            + "<h1>" + Tile._i18n[Language].tab + "</h1>"
            + "<div class=\"nocards\">" + Tile._i18n[Language].printnocard + "</div>"
            
            + "<div class=\"print\"><button onclick=\"ConanStudio._printCards();\">" + ConanStudio._i18n[Language].printcardsLabel + "</button></div>"
            
            + "</div>",
            null,
            []
        );
    },
    
    _printCards: function() 
    {
        if ($(".printcards input:checked").length == 0)
        {
            ConanAbout.warnToast(ConanStudio._i18n[Language].printcardEmpty);
            return;
        }
        else
        {
            window.print();
        }
    }
};