var StudioItem = {
    name: 'studio-item',
    cls: 'StudioItem',
    storage: '',
    _getDisplayItemsCode: function(withEditLink) { return ""; },
    _checkForm: function() { return 0; },
    copyright: function() { return ""; },
    _printCode: function () { return ""; },
    _itemWidth: 200,
    _itemHeight: 300,
    
    preinit: function() {
        Studio._slides.push({ label: this._i18n.tab, shortLabel: this._i18n.shorttab, id: this.name, onShow: this.onShow.bind(this),  onHide: this.onHide.bind(this) });
    },

    init: function() {
        Nav.addFloatingAction(this.name, this._i18n.newcard, "studio-icon-add", this.name + "-add", this.add.bind(this));
        this.onHide();
        $("#" + this.name).html("<div class='inside'><div id='" + this.name + "-inside'></div></div>");
        Nav.createFloatingBar(this.name);
        this._displayCards();
        AutoZoom.autozoom(this.name + "-inside", this._itemWidth, this._itemHeight);
    },

    _displayCards: function()
    {
        $("#" + this.name + "-inside").html(this._getDisplayItemsCode(true));
    },
        
    printCode: function ()
    {
          return this._printCode() + this._getDisplayItemsCode(false, true);
    },
    
    onShow: function() {
        // Nothing
    },

    onHide: function() {
        // Nothing
    },

    add: function(card)
    {
        var actions = [{
                label: Studio._i18n.save,
                icon: "studio-save",
                fn: this.cls + "._save();"
        }];
        if (card != undefined)
        {
            actions.push({
                label: Studio._i18n.remove,
                icon: "studio-remove",
                fn: this.cls + "._remove();"
            });
        }

        var dlabel = card == undefined ? this._i18n.newcard : this._i18n.editcard;
        this._add(card, dlabel, actions);
    },
    
    _preview: function()
    {
        var card = this._form2card();
        var code = this._cardCode(card);
        $(".dialog .preview").html(code);
    },

    _remove: function()
    {
        if (confirm(Studio._i18n.removeConfirm))
        {
            var card = this._form2card();

            var cards = JSON.parse(localStorage.getItem(this.storage)) || [];
            var newCards = [];

            for (var c in cards)
            {
                if (cards[c].id == card.id)
                {
                    // nothing here, to remove
                }
                else
                {
                    newCards.push(cards[c]);
                }
            }

            localStorage.setItem(this.storage, JSON.stringify(newCards));
            this._displayCards();
            Nav.closeDialog();
        }
    },

    _save: function()
    {
        var card = this._form2card();

        $(".dialog .field.error").removeClass("error");

        var errors = this._checkForm(card);
        if (errors > 0)
        {
            return;
        }

        var cards = JSON.parse(localStorage.getItem(this.storage)) || [];
        var newCards = [];

        var done = false;
        for (var c in cards)
        {
            if (cards[c].id == card.id)
            {
                newCards.push(card);
                done = true;
            }
            else
            {
                newCards.push(cards[c]);
            }
        }
        if (!done)
        {
            newCards.push(card);
        }

        localStorage.setItem(this.storage, JSON.stringify(newCards));
        this._displayCards();
        Nav.closeDialog();
    }
}
