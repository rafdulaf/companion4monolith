var About = {
    _copyright: "",
    _customPrefs: [],
    
    _languages: {
        'fr': "Français",
        'en': "English",
        'it': "Italiano"
    },

    isInStandaloneMode: window.matchMedia('(display-mode: standalone)').matches || (window.navigator.standalone) || document.referrer.includes('android-app://'),
    
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
        $(document.head).append("<title>" + About._i18n.title + "</title>");

        if (!About.isInStandaloneMode) {
            Menu.addMenu(About._i18n.fullscreen, "about-fullscreen", "About._toggleFullscreen()");
        }

        Menu.addMenu(About._i18n.custom, "about-custom", "About._custom()", !About.isInStandaloneMode);
        Menu.addMenu(About._i18n.preferences, "about-preferences", "About._preferences()");

        Menu.addMenu(About._i18n.other, "about-other", "About._other()", true);
        Menu.addMenu(About._i18n.about, "about-about", "About._about()", false);
        
    },
    
    _other: function() {
        if (About.isInStandaloneMode)
        {
            window.open("..")
        }
        else
        {
            document.location.href = "..";
        }
    },

    _about: function()
    {
        $("nav.menu input")[0].checked = false;
        
        Nav.dialog(About._i18n.about,
            "<div id='about' class='about'>"
                    + "<div class='about-zone-about'>"
                            + "<h1 style='text-align: center '>" + About._i18n.title + " v" + Version + "</h1>"
                            + "<img src='about/logo-" + Theme + ".webp?version=" + Version + "'/>"
                            + "<img src='about/companion4monolith.webp?version=" + Version + "' style='margin-right: 0'/>"
                            + "<a class='fullscreen' onclick='About._toggleFullscreen(); return false' href='javascript:void(0);' title=\"" + About._i18n.fullscreen + "\"></a>"
                            + "<span>" + About._i18n.text + "</span>"
                    + "</div>"
                    + "<div>"
                       + "<ul>"
                       + "<li>" + About._i18n.licence + "</li>"
                       + "<li>" + About._i18n.contribute_hof + "</li>"
                       + "<li>" + About._i18n.contribute + "</li>"
                       + "<li>" + About._i18n.copyright + "</li>"
                       + "</ul>"
                    + "</div>"
                    + "<div>"
                        + "<h1>" + About._i18n.licence + "</h1>"
                        + "<div><a href='https://github.com/rafdulaf/companion4conan/blob/master/LICENSE'>" + About._i18n['licence_text'] + "</a> " + About._i18n['licence_text2'] + "</div>"
                    + "</div>"
                    + "<div>"
                        + "<h1>" + About._i18n.contribute_hof + "</h1>"
                        + "<h2>" + About._i18n.contribute_hof_coders + "</h2>"
                        + About._haf().coders
                        + "<h2>" + About._i18n.contribute_hof_relooking + "</h2>"
                        + About._haf().relooking
                        + "<h2>" + About._i18n.contribute_hof_data + "</h2>"
                        + About._haf().data
                        + "<h2>" + About._i18n.contribute_hof_test + "</h2>"
                        + About._haf().tests
                    + "</div>"
                    + "<div class=\"contribute\">"
                        + "<h1>" + About._i18n.contribute + "</h1>"
                        + "<div>" + About._i18n.contribute_text + "</div>"
                        + "<a target=\"_blank\" href=\"https://github.com/rafdulaf/companion4monolith\" class=\"github\">Github</a>"
                        + "<a target=\"_blank\" href=\"" + About._i18n.tolink + "\" class=\"to\">The Overlord</a>"
                        + "<div>" + About._i18n.contribute_version + Version + ".</div>"
                    + "</div>"
                    + "<div class='about-copyright'><div>"
                        + "<div class='about-copyright-text'><h1>" + About._i18n.copyright + "</h1>" + About._i18n['copyright-text'] + About._copyright + "</div>"
                    + "</div></div>"
                + "</div>"
        );
    },

    addCopyright: function(title, text)
    {
        About._copyright += "<h2>" + title + "</h2>" + text;
    },
    
    addPreference: function(id, category, title, type, defaultValue)
    {
    	About._customPrefs.push({
    		id: id,
    		category: category,
    		title: title,
    		type: type,
    		defaultValue: defaultValue,
    	});
    },
    
    getPreference: function(id)
    {
    	var value = null;
    	
    	About._customPrefs.forEach(function (p){
    		if (p.id == id)
			{
    			value = localStorage.getItem(Application + "_UserPref_" + p.id);
    			value = (value !== null ? value : p.defaultValue);
			}
    	});
    	
    	return value;
    },

    _preferences: function()
    {
        $("nav.menu input")[0].checked = false;

        var s =             "<div class=\"custom\">"
            +       "<div>" + About._i18n.preferences_text + "</div>"

            +       "<div class=\"custom-wrap\">"
            +       "<fieldset><legend>" + About._i18n.preferences_general + "</legend>"
            +           "<label for=\"custom-lang\">" + About._i18n.custom_langlabel + "</label>"
            +           "<select id=\"custom-lang\" name=\"custom-lang\">"
            +               "<option value=\"\">" + About._i18n.custom_automatic_lang + "</option>";
        
        					Languages.forEach(code => s += "<option value=\"" + code + "\">" + About._languages[code] + "</option>");
            
        s   +=          "</select>"
            +           "<label for=\"custom-theme\">" + About._i18n.custom_themelabel + "</label>"
            +           "<select id=\"custom-theme\" name=\"custom-theme\">"
            +               "<option value=\"\">" + About._i18n.custom_automatic_theme + "</option>"
            +               "<option value=\"light\">" + About._i18n.custom_theme_light + "</option>"
            +               "<option value=\"dark\">" + About._i18n.custom_theme_dark + "</option>"
            +           "</select>"
            +       "</fieldset>"
            +       "</div>";
 
        var subS = {};
        About._customPrefs.forEach(function (p) {
        	subS[p.category] = subS[p.category] || "";
        	
        	if (p.type == 'boolean')
    		{
        		subS[p.category] += "<input type='checkbox' id='userpref-" + p.id + "' name='userpref-" + p.id + "'/>"
        							+ "<label for='userpref-" + p.id + "'>" + p.title + "</label>"
    		}
        	else
    		{
        		throw new Error("Unsupported type for preferences: " + p.type);
    		}
        });
        
        for (let c in subS)
    	{
        	s += "<fieldset><legend>" + c + "</legend>"
        		 + subS[c]
        		 + "</fieldset>";
    	}
        
        s += "</div>";
        
        Nav.dialog(About._i18n.preferences,
            s,

            function()
            {
                var oldLanguage = localStorage.getItem(Application + "_Language") || "";
                var oldTheme = localStorage.getItem(Application + "_Theme") || "";

                var hasChanged = false;
                
                // Save
                var autodetectLanguage = Utils.autodetectLanguage();
                var selectedLanguage = $(".custom *[name=custom-lang]")[0].value;
                Language = selectedLanguage || autodetectLanguage;
                localStorage.setItem(Application + "_Language", selectedLanguage);
                hasChanged = hasChanged || (oldLanguage || autodetectLanguage) != (selectedLanguage || autodetectLanguage);
                
                var autodetectTheme = Utils.autodetectTheme();
                var selectedTheme = $(".custom *[name=custom-theme]")[0].value;
                Theme = selectedTheme || autodetectTheme;
                localStorage.setItem(Application + "_Theme", selectedTheme);
                hasChanged = hasChanged || (oldTheme || autodetectTheme) != (selectedTheme || autodetectTheme);

                About._customPrefs.forEach(function (p) {
                	var oldValue = About.getPreference(p.id);
                	
                	if (p.type == 'boolean')
            		{
                		var newValue = $(".custom *[name=userpref-" + p.id + "]")[0].checked + "";
            		}
                	else
            		{
                		throw new Error("Unsupported type for preferences: " + p.type);
            		}
                	
                	localStorage.setItem(Application + "_UserPref_" + p.id, newValue);
                	hasChanged = hasChanged || newValue != oldValue;
                });

                if (hasChanged)
                {
                    window.location.reload(true);
                }
            }
        );

        $(".custom *[name=custom-lang]")[0].value = localStorage.getItem(Application + "_Language") || "";
        $(".custom *[name=custom-theme]")[0].value = localStorage.getItem(Application + "_Theme") || "";
        
        About._customPrefs.forEach(function (p) {
        	if (p.type == 'boolean')
    		{
        		$(".custom *[name=userpref-" + p.id + "]")[0].checked = About.getPreference(p.id) === "true";
    		}
        	else
    		{
        		throw new Error("Unsupported type for preferences: " + p.type);
    		}
        });

        var display = false;
        $(".custom input, .custom select").on('change', function() {
            if (!display)
            {
                About.warnToast(About._i18n.custom_reload);
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

        var leftS = "";
        var rightS = "";
        for (var i in Encyclopedia.expansions.types)
        {
            var expansionType = Encyclopedia.expansions.types[i];

            var localS = "<fieldset><legend>" + expansionType.text + "</legend>";
            var nbChoice = 0;

            var list = Encyclopedia.expansions.list;
            if (expansionType.sort)
            {
                list = Encyclopedia.expansions.list.slice().sort(function (a, b) {
                    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
                });
            }
            
            for (var j in list)
            {
                var expansion = list[j];
                if (expansion.type == expansionType.id)
                {
                    localS += "<div>"
                       +    "<input type=\"checkbox\" name=\"" + expansion.id + "\"\ id=\"" + expansion.id + "\"" + (expansion.mandatory ? " checked='checked' disabled='disabled'": "") + ">"
                       +    "<label for=\"" + expansion.id + "\">"
                       +        expansion.title
                       +    "</label>"
                       + "</div>";
                }
            }

            localS += "</fieldset>";
            
            if (expansionType.column !== "right")
            {
                leftS += localS;
            }
            else
            {
                rightS += localS
            }
        }

        Nav.dialog(About._i18n.custom,
            "<div class=\"custom\">"
            +       "<div>" + About._i18n.custom_text + "</div>"
            +       "<div class=\"custom-wrap\">"
            +            "<div class=\"col col-left\">"
            +                leftS
            +            "</div>"
            +            "<div class=\"col col-right\">"
            +                rightS
            +            "</div>"
            +       "</div>"
            + "</div>",

            function() {
                var oldExtensions = Extensions;

                // Save
                Extensions = {};
                $(".custom input").each(function (i) {
                    var $this = $(this);
                    Extensions[this.name] = this.checked ? true : false;
                });

                localStorage.setItem(Application + "_Extensions", JSON.stringify(Extensions));

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
            },
            
            [{
                label: About._i18n.custom_allin,
                icon: "about-allin",
                fn: "About._allin();"
            }]
        );

        for (var i in Extensions)
        {
            $(".custom *[name=" + i + "]").each(function (i) {
                var $this = $(this);
                this.checked = Extensions[this.name];
            });
        }

        var display = false;
        $(".custom input").on('change', function() {
            if (!display)
            {
                About.warnToast(About._i18n.custom_reload);
            }
            display = true;
        })
    },
    
    _allin: function()
    {
    	if ($(".custom input:not(:checked)").length > 0)
    		$(".custom input:not(:checked)").click()
    	else
    		$(".custom input").click()
    },

    _hasExpansion: function(origins, allOfThem)
    {
        allOfThem = allOfThem === true;

        for (var i in Encyclopedia.expansions.types)
        {
            for (var j in origins)
            {
                var origin = origins[j];
                if (Extensions[origin] && !allOfThem)
                {
                    // I have one at least and we do not want all of them
                    return true;
                }
                else if (!Extensions[origin] && allOfThem)
                {
                    // One is missing at least but we wanted all of them
                    return false;
                }
            }
        }
        // We do not wanted all of them, and we found no match
        // Or we wanted all of them and had no unmatch
        return allOfThem;
    },
    
    _replace: function(text, cls)
    {
        text = text.replace(/\{(.*?)\}/g, "<img src=\"resources/img/$1.webp?version=" + Version + "\"" + (cls ? " class='" + cls + "'" : "") + "/>");
        return text;
    }
}

Utils._toInitialize.push(About.init);
