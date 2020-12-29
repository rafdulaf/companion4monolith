var Studio = {
      _i18n: {
        'fr': {
            'menu': "Studio",
            'printcardsLabel': "Imprimer",
            'printcardsHint': "Sélectionnez les éléments à imprimer puis cliquez sur le bouton imprimer.",
            'printfaces': "Imprimer les dos sur des pages séparées",
            'printmargin': "Imprimer avec les marges pour la découpe",
            'printcardEmpty': "Vous n'avez sélectionné aucun élément à imprimer"
        },
        'en': {
            'menu': "Studio",
            'printcardsLabel': "Print",
            'printcardsHint': "Select the items to print and then click on the print button.",
            'printfaces': "Print the backs on separated pages",
            'printmargin': "Print with cut margins",
            'printcardEmpty': "You did not select any element to print"
        },
        'it': {
            'menu': "Studio",
            'printcardsLabel': "Stampa",
            'printcardsHint': "Seleziona gli oggetti da stampare e clicca su Stampa.",
            'printfaces': "Stampa i retri su pagine separate",
            'printmargin': "Stampa gli indicatori di taglio",
            'printcardEmpty': "Non hai selezionato nessun elemento da stampare"
            }
    },

    _currentSlide: null,
    _slides: [],

    init: function() {
        Nav.addIcon(Studio._i18n[Language].menu, "studio-icon", "studio");

        CardEquipment.preinit();
        CardSpell.preinit();
        HeroSheet.preinit();
        Tile.preinit();

        Nav.createTabs('studio', Studio._slides, Studio.onChange);

        CardEquipment.init();
        CardSpell.init();
        HeroSheet.init();
        Tile.init();

        Studio.onChange();

        About.addCopyright(Studio._i18n[Language].menu,
            CardEquipment.copyright()
            + CardSpell.copyright()
            + HeroSheet.copyright()
            + Tile.copyright()
        );
    },

    onChange: function(event, slick) {
        var slide = slick && slick.currentSlide || 0;

        if (Studio._currentSlide != null)
            Studio._slides[Studio._currentSlide].onHide();

        Studio._currentSlide = slide;
        Studio._slides[Studio._currentSlide].onShow();
    },

    printCards: function()
    {
        Nav.dialog(Studio._i18n[Language].printcardsLabel,
            "<div class=\"printcards back cut\">"

            + "<p class='hint'>" + Studio._i18n[Language].printcardsHint + "</p>"
            + "<p class='hint'><input type='checkbox' id='printback' checked='checked'  onchange='$(this.parentNode.parentNode).toggleClass(\"back\")'><label for='printback'>" + Studio._i18n[Language].printfaces + "</label></p>"
            + "<p class='hint'><input type='checkbox' id='printcut' checked='checked' onchange='$(this.parentNode.parentNode).toggleClass(\"cut\")'><label for='printcut'>" + Studio._i18n[Language].printmargin + "</label></p>"

            + "<div class=\"print\"><button onclick=\"Studio._printCards();\">" + Studio._i18n[Language].printcardsLabel + "</button></div>"

            + "<h1>" + CardEquipment._i18n[Language].tab + "</h1>"
            + CardEquipment._getDisplayCardsCode(false)

            + "<h1>" + CardSpell._i18n[Language].tab + "</h1>"
            + CardSpell._getDisplayCardsCode(false)

            + "<h1>" + HeroSheet._i18n[Language].tab + "</h1>"
            + "<p class='subhint'>" + HeroSheet._i18n[Language].printHint + "</p>"
            + HeroSheet._getDisplayCardsCode(false)

            + "<h1>" + Tile._i18n[Language].tab + "</h1>"
            + Tile._getDisplayTileCode(false)

            + "<div class=\"print\"><button onclick=\"Studio._printCards();\">" + Studio._i18n[Language].printcardsLabel + "</button></div>"

            + "<div class=\"newpage\"></div>"

            + "</div>",
            null,
            []
        );
        // share back of spell and equipment
        $(".newpage").append($(".printcards .back"));
    },

    _printCards: function()
    {
        if ($(".printcards > ~input:checked").length == 0)
        {
            About.warnToast(Studio._i18n[Language].printcardEmpty);
            return;
        }
        else
        {
            window.print();
        }
    }
};

Utils._toInitialize.push(Studio.init);