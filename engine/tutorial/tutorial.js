Tutorial = {
    _i18n: {
        'fr': {
            'extensions_message': "En indiquant les éléments du jeu que vous possédez vous disposerez d'une application personnalisée",
            'extensions_act': "Personnaliser",
            'extensions_continue': "Par défaut",

            'audience_message': "Des statistiques anonymes et sans cookies sont faites par cette application",
            'audience_ok': "J'ai compris"
        },
        'en': {
            'extensions_message': "By specifying the game elements you own you will obtain a customized application",
            'extensions_act': "Customize",
            'extensions_continue': "Default",

            'audience_message': "Anonymous and cookie-free statistics are processed by this application",
            'audience_ok': "I understand"
        },
        'it': {
            'extensions_message': "Indicando gli elementi del gioco in tuo possesso, otterrai un'applicazione personalizzata",
            'extensions_act': "Personalizza",
            'extensions_continue': "Standard",

            'audience_message': "Statistiche anonime e senza cookie sono utilizzate su questa applicazione.",
            'audience_ok': "Accetto"
            }
    },

    init: function() {
        if (!localStorage.getItem(Application + "_Extensions"))
        {
            window.setTimeout(function() {
                About.actionToast("tutorial-extensions", Tutorial._i18n[Language].extensions_message, [{ text: Tutorial._i18n[Language].extensions_continue, act: "Tutorial._ignoreCustom()" }, { text: Tutorial._i18n[Language].extensions_act, act: "Tutorial._custom()" }]);
            }, 1000);
        }
        else if (!localStorage.getItem(Application + "_Audience"))
        {
            window.setTimeout(function() {
                About.actionToast("tutorial-audience", Tutorial._i18n[Language].audience_message, [{ text: Tutorial._i18n[Language].audience_ok, act: "Tutorial._audience()" }]);
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
