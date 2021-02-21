var Studio = {
      _i18n: {
        'fr': {
            'menu': "Studio",
            'save': "Enregistrer",
            'remove': "Effacer",
            'removeConfirm': "Etes-vous sûr de vouloir effacer cette carte ?",
            'printcardsLabel': "Imprimer",
            'printcardsHint': "Sélectionnez les éléments à imprimer puis cliquez sur le bouton imprimer.",
            'printfaces': "Imprimer les dos sur des pages séparées",
            'printmargin': "Imprimer avec les marges pour la découpe",
            'printcardEmpty': "Vous n'avez sélectionné aucun élément à imprimer"
        },
        'en': {
            'menu': "Studio",
            'save': "Save",
            'remove': "Delete",
            'removeConfirm': "Are you sure that you want to delete this card?",
            'printcardsLabel': "Print",
            'printcardsHint': "Select the items to print and then click on the print button.",
            'printfaces': "Print the backs on separated pages",
            'printmargin': "Print with cut margins",
            'printcardEmpty': "You did not select any element to print"
        },
        'it': {
            'menu': "Studio",
            'save': "Salva",
            'remove': "Cancella",
            'removeConfirm': "Sei sicuro di voler cancellare questa carta?",
            'printcardsLabel': "Stampa",
            'printcardsHint': "Seleziona gli oggetti da stampare e clicca su Stampa.",
            'printfaces': "Stampa i retri su pagine separate",
            'printmargin': "Stampa gli indicatori di taglio",
            'printcardEmpty': "Non hai selezionato nessun elemento da stampare"
            }
    },

    _currentSlide: null,
    _slides: [],
    
    _loadItems: function() {
        Studio._items = [];
    },

    init: function() {
        Studio._loadItems();
        if (Studio._items.length == 0)
        {
            return;
        }

        Nav.addIcon(Studio._i18n[Language].menu, "studio-icon", "studio");
        
        Studio._items.forEach(item => item.preinit());

        Nav.createTabs('studio', Studio._slides, Studio.onChange);
        Nav.addAction("studio", Studio._i18n[Language].printcardsLabel, "studio-icon-printcards", this.name + "-print", Studio.printCards);

        Studio._items.forEach(item => item.init());

        Studio.onChange();

        let copyright = "";
        Studio._items.forEach(item => copyright += item.copyright());
        About.addCopyright(Studio._i18n[Language].menu, copyright);
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
        let studiosCode = "";
        Studio._items.forEach(item => studiosCode += "<h1>" + item._i18n[Language].tab + "</h1>" + item.printCode());
        
        Nav.dialog(Studio._i18n[Language].printcardsLabel,
            "<div class=\"printcards back cut\">"

            + "<p class='hint'>" + Studio._i18n[Language].printcardsHint + "</p>"
            + "<p class='hint'><input type='checkbox' id='printback' checked='checked'  onchange='$(this.parentNode.parentNode).toggleClass(\"back\")'><label for='printback'>" + Studio._i18n[Language].printfaces + "</label></p>"
            + "<p class='hint'><input type='checkbox' id='printcut' checked='checked' onchange='$(this.parentNode.parentNode).toggleClass(\"cut\")'><label for='printcut'>" + Studio._i18n[Language].printmargin + "</label></p>"

            + studiosCode

            + "<div class=\"newpage\"></div>"

            + "</div>",
            null,
            [],
            [{
                icon: 'studio-icon-printcards',
                label: Studio._i18n[Language].printcardsLabel,
                fn: "Studio._printCards()"
            }]
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