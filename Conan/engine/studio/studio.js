var Studio = {
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

        Nav.addIcon(Studio._i18n.menu, "studio-icon", "studio");
        
        Studio._items.forEach(item => item.preinit());

        Nav.createTabs('studio', Studio._slides, Studio.onChange);
        Nav.addAction("studio", Studio._i18n.printcardsLabel, "studio-icon-printcards", this.name + "-print", Studio.printCards);

        Studio._items.forEach(item => item.init());

        Studio.onChange();

        let copyright = "";
        Studio._items.forEach(item => copyright += item.copyright());
        About.addCopyright(Studio._i18n.menu, copyright);
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
        Studio._items.forEach(item => studiosCode += "<h1>" + item._i18n.tab + "</h1>" + item.printCode());
        
        Nav.dialog(Studio._i18n.printcardsLabel,
            "<div class=\"printcards back cut\">"

            + "<p class='hint'>" + Studio._i18n.printcardsHint + "</p>"
            + "<p class='hint'><input type='checkbox' id='printback' checked='checked'  onchange='$(this.parentNode.parentNode).toggleClass(\"back\")'><label for='printback'>" + Studio._i18n.printfaces + "</label></p>"
            + "<p class='hint'><input type='checkbox' id='printcut' checked='checked' onchange='$(this.parentNode.parentNode).toggleClass(\"cut\")'><label for='printcut'>" + Studio._i18n.printmargin + "</label></p>"

            + studiosCode

            + "<div class=\"newpage\"></div>"

            + "</div>",
            null,
            [],
            [{
                icon: 'studio-icon-printcards',
                label: Studio._i18n.printcardsLabel,
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
            About.warnToast(Studio._i18n.printcardEmpty);
            return;
        }
        else
        {
            window.print();
        }
    }
};

Utils._toInitialize.push(Studio.init);