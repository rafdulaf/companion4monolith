var Encyclopedia = {
    load: function()
    {
        function _load(url, cb)
        {
            return new Promise(function (resolve, reject) { 
                url += '?_=' + new Date().getTime();
                
                $.ajax({
                  dataType: "json",
                  url: url,
                  success: function(data) { cb(data); resolve(url); },
                  error: function() { reject(url); }
                });
            });
        }
        
        return Promise.all([
            _load(Version + "/data/skills.json", function(data) { Encyclopedia.skills = data; }),
            _load(Version + "/data/spells.json", function(data) { Encyclopedia.spells = data; }),
            _load(Version + "/data/expansions.json", function(data) { Encyclopedia.expansions = data; }),
            _load(Version + "/data/maps.json", function(data) { Encyclopedia.maps = data; })
        ]);
    },
    
    _i18n: {
        'fr': {
            'menu': "Encyclopédie",
            'copyright': "Données récupérées sur le site <a target='_blank' href='https://conan-companion.herokuapp.com/'>conan-companion.herokuapp.com</a> avec l'aimable autorisation de David Abel. Traductions françaises saisies par @cochon."
        },
        'en': {
            'menu': "Encyclopedia",
            'copyright': "Data collected on the site <a target='_blank' href='https://conan-companion.herokuapp.com/'>conan-companion.herokuapp.com</a> with the kind authorization of David Abel. French translations entered by @cochon."
        }
    },
    
    _slides: [],

    init: function() 
    {
        Nav.addIcon(Encyclopedia._i18n[Language].menu, "encyclopedia-icon", "encyclopedia");
        
        EncyclopediaSpells.preinit();
        
        Nav.createTabs('encyclopedia', Encyclopedia._slides, Encyclopedia.onChange);

        EncyclopediaSpells.init();
        
        Encyclopedia.onChange();

        ConanAbout.addCopyright(Encyclopedia._i18n[Language].menu, Encyclopedia.copyright());
    },
    
    onChange: function(event, slick) {
        var slide = slick && slick.currentSlide || 0;
        
        if (Encyclopedia._currentSlide != null)
            Encyclopedia._slides[Encyclopedia._currentSlide].onHide();
        
        Encyclopedia._currentSlide = slide;
        Encyclopedia._slides[Encyclopedia._currentSlide].onShow();
    },

    
    copyright: function() 
    {
        return "<h3>" + Encyclopedia._i18n[Language].menu + "</h3>"
            + "<p>" + Encyclopedia._i18n[Language].copyright + "</p>"
    }
};