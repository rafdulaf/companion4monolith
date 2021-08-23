Tutorial = {
    init: function() {
        if (!localStorage.getItem(Application + "_Extensions"))
        {
            window.setTimeout(function() {
                About.actionToast("tutorial-extensions", Tutorial._i18n.extensions_message, [{ text: Tutorial._i18n.extensions_continue, act: "Tutorial._ignoreCustom()" }, { text: Tutorial._i18n.extensions_act, act: "Tutorial._custom()" }]);
            }, 1000);
        }
        else if (!localStorage.getItem(Application + "_Audience"))
        {
            window.setTimeout(function() {
                About.actionToast("tutorial-audience", Tutorial._i18n.audience_message, [{ text: Tutorial._i18n.audience_ok, act: "Tutorial._audience()" }]);
            }, 1000);
        }
    },
    _custom: function() {
        localStorage.setItem(Application + "_Extensions", JSON.stringify(Extensions));
        About.hideActionToast();
        About._custom();
        Tutorial.init();
    },
    _ignoreCustom: function() {
        localStorage.setItem(Application + "_Extensions", JSON.stringify(Extensions));
        About.hideActionToast();
        $(document.body).append("<div class=\"blinkmenu\"></div>");
        Tutorial.init();
    },
    _swithLanguage: function() {
        localStorage.setItem(Application + "_Language", Language == 'en' ? 'fr' : 'en');
        $(document.body).append("<div class=\"blinkmenu\"></div>");
        window.setTimeout("window.location.reload(true);", 1000);
    },
    _keepLanguage: function() {
        localStorage.setItem(Application + "_Language", Language);
        About.hideActionToast();
        $(document.body).append("<div class=\"blinkmenu\"></div>");
        Tutorial.init();
    },
    _audience: function() {
        localStorage.setItem(Application + "_Audience", new Date());
        About.hideActionToast();
        Tutorial.init();
    }
}

$().ready(function() {
    if ($("div.loading").is(":visible"))
    {
        // No tutorial on unsupported browsers
        Tutorial.init();
    }
});
