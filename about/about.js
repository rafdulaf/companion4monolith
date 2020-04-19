var ConanAbout = {
    _i18n: {
        'fr': {
            'name': "Compagnon<br/>de Conan",
            'title': "Le compagnon de Conan",
            'text': "<h1>Important</h1>Cette application n'a aucun lien avec l'édteur du jeu Conan : Monolith.<br/>Elle a été réalisée par @cochon en s'appuyant sur les cartes statiques de lignes de vue créées par @Roolz et en reprenant l'idée du travail de @Pamplerousse pour les lignes de vues dynamiques.",
            'find': "Consultez le forum 'The Overlord'",
            'fullscreen': "Plein écran",
            'about': "A propos",
            'licence': "Licence",
            'licence_text': "Ce logiciel est développé sous licence LGPL-3.0",
            'licence_text2': "mais toutes les ressources (images, textes, caractéristiques...) restent la propriété de leurs auteurs respectifs selon les droits applicables.",
            'about': "A propos",
            'copyright': "Copyright",
            'copyright-text': "<h1>But</h1><br/>'Compagnion de Conan' est une application indépendante pour accompagner les joueurs dans le jeu 'Conan'.<br/>"
                    + "Cette application a été écrite par <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a>.<br/>"
                    + "<h1>Propriété</h1>"
                    + "'Conan' est un jeu de plateau de figurines édité par <a href='http://monolithedition.com' target='_blank'>Monolith</a>.<br/>"
                    + "Le logo Conan et les polices de caractères utilisées sont la propriété de Monolith.<br/>"
                    + "L'image du 'Compagnion de Conan' a été créée à partir du logo Conan.<br/>",
            'preferences': 'Mes préferences',
            'preferences_text': "Sélectionnez vos préférences qui seront enregistrées sur votre appareil.",
            'preferences_general': "Généralités",
            'custom': "Mes extensions",
            'custom_text': "Sélectionnez vos extensions qui seront enregistrés sur votre appareil.",
            'custom_lang': "Français",
            'custom_langlabel': "Langue de l'interface",
            'custom_automatic_lang': "Auto-détection",
            'custom_reload': "La modification de votre configuration entrainera un redémarage automatique de l'application",
            'contribute': "Contribuer !",
            'contribute_text': "Vous pouvez contribuer à cette application de nombreuses façons :"
                    + "<ul>"
                        + "<li>Vous avez repéré un bug ?</li>"
                        + "<li>Vous avez une idée d'amélioration ?</li>"
                        + "<li>Vous souhaitez proposer un patch ?</li>"
                    + "</ul>"
                    + "Le projet est hébergé sur Github : vous pouvez donc y déposer vos idées voire proposer vos modifications, mais vous pouvez aussi participer via le forum The Overlord.",
            'contribute_version': "Version actuelle : ",
            'contribute_hof': "Temple de la renommée",
            'contribute_hof_coders': "Codage de l'application",
            'contribute_hof_data': "Saisie des données",
            'contribute_hof_test': "Tests et relectures"
        },
        'en': {
            'name': "Companion<br/>to Conan",
            'title': "The companion to Conan",
            'text': "<h1>Disclamer</h1>This application has no link with the producer of the game Conan: Monolith.<br/>It was realized by @cochon based on the static maps of line of sights created by @Roolz and by taking up again the idea of the work of @Pamplerousse of the dynamic line of sights.",
            'find': "Consult the forum 'The Overlord'",
            'fullscreen': "Fullscreen",
            'about': "About",
            'licence': "Licence",
            'licence_text': "This software is developped under the LGPL-3.0 licence",
            'licence_text2': "but all resources (images, texts, caracteristics...) stay the property of their respective authors following the applyable rights.",
            'copyright': "Copyright",
            'copyright-text': "<h1>Purpose</h1>'Companion to Conan' is an indepedant applciation to help the players in the game 'Conan'.<br/>"
                    + "This application was written by <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a>.<br/>"
                    + "<h1>Property</h1>"
                    + "'Conan' is a board game published by <a href='http://monolithedition.com' target='_blank'>Monolith</a>.<br/>"
                    + "The Conan logo and the fonts used are the property of Monolith.<br/>"
                    + "The image of 'Companion to Conan' was created by adapting the Conan logo.<br/>",
            'preferences': 'My settings',
            'preferences_text': "Select your settings that will be stored on your device.",
            'preferences_general': "Generality",
            'custom': "My expansions",
            'custom_text': "Select your expansions that will be stored on your device.",
            'custom_lang': "English",
            'custom_langlabel': "UI Language",
            'custom_automatic_lang': "Autodetection",
            'custom_reload': "The modification of your configuration will require an automatic application reload",
            'contribute': "Contribute!",
            'contribute_text': "You can contribute to this application in several ways:"
                    + "<ul>"
                        + "<li>Did you spot a bug?</li>"
                        + "<li>Do you have an idea to enhance this application?</li>"
                        + "<li>Do you want to propose a patch?</li>"
                    + "</ul>"
                    + "The project is hosted on Github: you can thus send your ideas there or event propose your modifications, but you can also participate through The Overlord forum.",
            'contribute_version': "Current version: ",
            'contribute_hof': "Hall of fame",
            'contribute_hof_coders': "Application coding",
            'contribute_hof_data': "Data inputs",
            'contribute_hof_test': "Tests and rereadings"
        }
    },
    
    _copyright: "",
    
    _toggleFullscreen: function() {
        $("nav.menu input")[0].checked = false;

        var elem = document.documentElement;
          if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen(); 
            }
          }
    },

    init: function()
    {
        const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator.standalone) || document.referrer.includes('android-app://');
alert("isInStandaloneMode: " + isInStandaloneMode)
        if (!isInStandaloneMode) {
            Menu.addMenu(ConanAbout._i18n[Language].fullscreen, "about-fullscreen", "ConanAbout._toggleFullscreen()");
        }
        
        Menu.addMenu(ConanAbout._i18n[Language].custom, "about-custom", "ConanAbout._custom()", !isInStandaloneMode);
        Menu.addMenu(ConanAbout._i18n[Language].preferences, "about-preferences", "ConanAbout._preferences()");
        
        Menu.addMenu(ConanAbout._i18n[Language].contribute, "about-contribute", "ConanAbout._contribute()", true);
        Menu.addMenu(ConanAbout._i18n[Language].about, "about-about", "ConanAbout._about()");
    },
    
    _about: function()
    {
        $("nav.menu input")[0].checked = false;
        
        Nav.dialog(ConanAbout._i18n[Language].about,
            "<div id='about' class='about'>"
                    + "<div class='about-zone-about'>"
                            + "<h1 style='text-align: center '>" + ConanAbout._i18n[Language].title + " v" + Version + "</h1>"
                            + "<img src='about/logo.jpg?version=" + Version + "'/>" +
                            "<a class='fullscreen' onclick='ConanAbout._toggleFullscreen(); return false' href='javascript:void(0);' title=\"" + ConanAbout._i18n[Language].fullscreen + "\"></a>" + 
                            "<span>" + ConanAbout._i18n[Language].text + 
                                "<div><a target='_blank' href='https://the-overlord.com/'>" + ConanAbout._i18n[Language].find + "</a></div>" +
                            "</span>"
                    + "</div>"
                    + "<div class='about-copyright'><div>"
                        + "<div class='about-copyright-text'>" + ConanAbout._i18n[Language]['copyright-text'] + ConanAbout._copyright + "</div>"
                    + "</div></div>"
                    + "<div>"
                        + "<h1>" + ConanAbout._i18n[Language]['licence'] + "</h1>"
                        + "<div><a href='https://github.com/rafdulaf/companion4conan/blob/master/LICENSE'>" + ConanAbout._i18n[Language]['licence_text'] + "</a> " + ConanAbout._i18n[Language]['licence_text2'] + "</div>"
                    + "</div>"        
                + "</div>"        
        );        
    },
    
    addCopyright: function(title, text)
    {
        ConanAbout._copyright += "<h2>" + title + "</h2>" + text;
    },
    
    _preferences: function()
    {
        $("nav.menu input")[0].checked = false;
        
        Nav.dialog(ConanAbout._i18n[Language].preferences,
            "<div class=\"custom\">"
            +       "<div>" + ConanAbout._i18n[Language].preferences_text + "</div>"
            
            +       "<div class=\"custom-wrap\">"
            +       "<fieldset><legend>" + ConanAbout._i18n[Language].preferences_general + "</legend>"
            +           "<label for=\"custom-lang\">" + ConanAbout._i18n['fr'].custom_langlabel + "</label>"
            +           "<select id=\"custom-lang\" name=\"custom-lang\">"
            +               "<option value=\"\">" + ConanAbout._i18n[Language].custom_automatic_lang + "</option>"
            +               "<option value=\"fr\">" + ConanAbout._i18n['fr'].custom_lang + "</option>"
            +               "<option value=\"en\">" + ConanAbout._i18n['en'].custom_lang + "</option>"
            +           "</select>"
            +           "</fieldset>"
            +       "</div>"

            + "</div>",

            function() 
            {
                var oldLanguage = localStorage.getItem("Language");
                
                // Save
                var selectedLanguage = $(".custom *[name=custom-lang]")[0].value; 
                Language = selectedLanguage || autodetectLanguage();
                localStorage.setItem("Language", selectedLanguage);
                
                if (oldLanguage != selectedLanguage)
                {
                    window.location.reload(true);
                }
            }
        );

        $(".custom *[name=custom-lang]")[0].value = localStorage.getItem("Language") || "";
        
        var display = false;
        $(".custom input, .custom select").on('change', function() {
            if (!display)
            {
                ConanAbout.warnToast(ConanAbout._i18n[Language].custom_reload);
            }
            display = true;
        })
    },
    
    warnToast: function(text) {
        $(document.body).append("<div class=\"toast-warning\" style=\"bottom: -100px; opacity: 0;\">" + text + "</div>");
        window.setTimeout(function() { $(".toast-warning").css("bottom", "30px").css("opacity", "1"); }, 1);
        window.setTimeout(function() { $(".toast-warning").css("bottom", "-100px").css("opacity", "0"); }, 3000);
        window.setTimeout(function() { $(".toast-warning").remove(); }, 3500);
    },
    
    hideActionToast: function() {
        $(".toast-action").css("opacity", "0");
        window.setTimeout(function() { $(".toast-action").remove(); }, 1000);
    },
    actionToast: function (icon, text, actions) {
        var actionHTML = "<div class=\"toast-action-act\">";
        for (var a in actions) {
            var action = actions[a];
            actionHTML += "<a href='javascript:void(0)' onclick='" + action.act + "'>" + action.text + "</a>";
        }
        actionHTML += "</div>"
        
        var iconHTML = "";
        if (icon) {
            iconHTML += "<div class=\"toast-action-icon " + icon + "\"></div>"
        }
        
        $(document.body).append("<div class=\"toast-action\" style=\"opacity: 0;\">" + iconHTML + "<div class=\"toast-action-text\">" + text + "</div>" + actionHTML + "</div>");
        window.setTimeout(function() { $(".toast-action").css("opacity", "0.98"); }, 1);
    },
    
    _custom: function()
    {
        $("nav.menu input")[0].checked = false;
        
        var s = "";
        for (var i in Encyclopedia.expansions.types)
        {
            var expansionType = Encyclopedia.expansions.types[i];
            
            s += "<fieldset><legend>" + expansionType.text[Language] + "</legend>";

            if (expansionType.single)
            {
                s += "<select id=\"" + expansionType.id + "\" name=\"" + expansionType.id + "\">";
            }

            for (var j in Encyclopedia.expansions.list)
            {
                var expansion = Encyclopedia.expansions.list[j];
                if (expansion.type == expansionType.id)
                {
                    if (expansionType.single)
                    {
                        s += "<option value=\"" + expansion.id + "\">" + expansion.title[Language] + "</option>"
                    }
                    else
                    {
                        s += "<div>" 
                           +    "<input type=\"checkbox\" name=\"" + expansion.id + "\"\ id=\"" + expansion.id + "\">" 
                           +    "<label for=\"" + expansion.id + "\">" 
                           +        expansion.title[Language] 
                           +    "</label>" 
                           + "</div>";
                    }
                }
            }
            
            if (expansionType.single)
            {
                s += "</select>";
            }
            
            s += "</fieldset>";
        }
        
        Nav.dialog(ConanAbout._i18n[Language].custom,
            "<div class=\"custom\">"
            +       "<div>" + ConanAbout._i18n[Language].custom_text + "</div>"
            +       "<div class=\"custom-wrap\">"
            +           s
            +       "</div>"
            + "</div>",
            
            function() {
                var oldExtensions = Extensions;
                
                // Save
                Extensions = {};
                $(".custom *").each(function (i) {
                    var $this = $(this);
                    if ($this.is('select'))
                    {
                        Extensions[this.name] = this.value;
                    }
                    else if ($this.is('input'))
                    {
                        Extensions[this.name] = this.checked ? true : false;
                    }
                });

                localStorage.setItem("Extensions", JSON.stringify(Extensions));
                
                function _notEquals(a, b)
                {
                    for (var i in a)
                    {
                        if (a[i] != (b[i] || false))
                        {
                            return true;
                        }
                    }
                    for (var i in b)
                    {
                        if (b[i] != (a[i] || false))
                        {
                            return true;
                        }
                    }
                    return false;
                }
                
                if (_notEquals(oldExtensions, Extensions))
                {
                    window.location.reload(true);
                }
            }
        );
        
        for (var i in Extensions)
        {
            $(".custom *[name=" + i + "]").each(function (i) {
                var $this = $(this);
                if ($this.is('select'))
                {
                    this.value = Extensions[this.name];                    
                }
                else if ($this.is('input'))
                {
                    this.checked = Extensions[this.name];
                }
            });
        }
        
        var display = false;
        $(".custom input, .custom select").on('change', function() {
            if (!display)
            {
                ConanAbout.warnToast(ConanAbout._i18n[Language].custom_reload);
            }
            display = true;
        })
    },
    
    _contribute: function() {
        $("nav.menu input")[0].checked = false;
        
        Nav.dialog(ConanAbout._i18n[Language].contribute,
            "<div class=\"contribute\">"
                + "<div>" + ConanAbout._i18n[Language].contribute_text + "</div>"
                + "<a target=\"_blank\" href=\"https://github.com/rafdulaf/companion4conan\" class=\"github\">Github</a>"
                + "<a target=\"_blank\" href=\"https://the-overlord.com/index.php?/topic/3095-application-de-compagnon-de-jeu/\" class=\"to\">The Overlord</a>"
                + "<div>" + ConanAbout._i18n[Language].contribute_version + Version + ".</div>"
                + "<h1>" + ConanAbout._i18n[Language].contribute_hof + "</h1>"
                + "<h2>" + ConanAbout._i18n[Language].contribute_hof_coders + "</h2>"
                + "<div><a href=\"https://the-overlord.com/index.php?/profile/5240-cochon/\">@cochon</a></div>"
                + "<h2>" + ConanAbout._i18n[Language].contribute_hof_data + "</h2>"
                + "<div><a href=\"https://the-overlord.com/index.php?/profile/5240-cochon/\">@cochon</a></div>"
                + "<h2>" + ConanAbout._i18n[Language].contribute_hof_test + "</h2>"
                + "<div><a href=\"https://the-overlord.com/index.php?/profile/5567-madcollector/\">@madcollector</a></div>"
                + "<div><a href=\"https://the-overlord.com/index.php?/profile/13-roolz/\">@Roolz</a></div>"
                + "<div><a href=\"https://the-overlord.com/index.php?/profile/5236-renand/\">@Renand</a></div>"
            + "</div>",
            
            function() {
            }
        );        
    },
    
    _hasExpansion: function(origins)
    {
        for (var i in Encyclopedia.expansions.types)
        {
            var type = Encyclopedia.expansions.types[i];
            if (type.single)
            {
                if (origins.indexOf(Extensions[type.id]) != -1)
                {
                    return true;
                }
            }
            else
            {
                for (var j in origins)
                {
                    var origin = origins[j];
                    if (Extensions[origin])
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

$(document.head).append("<title>" + ConanAbout._i18n[Language].title + "</title>");

