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
            _load(Version + "/data/equipments.json", function(data) { Encyclopedia.equipments = data; }),
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
        
        EncyclopediaEquipments.preinit();
        EncyclopediaSpells.preinit();
        EncyclopediaHeroes.preinit();
        EncyclopediaTiles.preinit();
        
        Nav.createTabs('encyclopedia', Encyclopedia._slides, Encyclopedia.onChange);

        EncyclopediaEquipments.init();
        EncyclopediaSpells.init();
        EncyclopediaHeroes.init();
        EncyclopediaTiles.init();
        
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
    },
    
    _removeExtraExpansion: function(origins)
    {
        for (var i in Encyclopedia.expansions.types)
        {
            var type = Encyclopedia.expansions.types[i];
            if (type.single)
            {
                var values = [];
                for (var j in Encyclopedia.expansions.list)
                {
                    var expansion = Encyclopedia.expansions.list[j];
                    if (expansion.type == type.id)
                    {
                        values.push(expansion.id);
                    }
                }

                var neworigins = [];
                for (var l=0; l < origins.length; l++)
                {
                    var origin = origins[l];
                    for (var k in values)
                    {
                        var value = values[k];
                        if (origin == value)
                        {
                            l += values.length - 1 - k;
                            break;
                        }
                    }
                    neworigins.push(origin);
                }
                origins = neworigins;
            }
        }
        return origins;
    },
    
    _getOrigin: function(origin)
    {
        for (var j in Encyclopedia.expansions.list)
        {
            var expansion = Encyclopedia.expansions.list[j];
            if (origin == expansion.id)
            {
                return expansion.title[Language];  
            }
        }
        return null;
    },
    
    displaySearchEngine: function(facets, displayFunc, prefix)
    {
        var se = "<div class='search-engine'>";
        
        for (var f in facets)
        {
            var facet = facets[f];
            
            se += "<div class='facet' id='" + prefix + "-" + facet.id + "'>"
            se += "<span>" + facet.label[Language] + "</span>"
            if (facet.values)
            {
                for (var v in facet.values)
                {
                    var value = facet.values[v];
                    
                    var a = value.defaults ? " checked='checked'" : ""; 
                    
                    se += "<label>" 
                        + "<input type='checkbox' id='" + prefix + "-" + facet.id + "-" + value.id + "' onclick='" + displayFunc + "' onchange='" + displayFunc + "'" + a + "/>"
                        + "<span>" 
                        + value.label[Language]
                        + "</span>"
                        + "</label>";
                }
            }
            else
            {
                se += "<input type='text' id='" + prefix + "-" + facet.id + "-input' onkeyup='" + displayFunc + "' onchange='" + displayFunc + "'/>";
            }
            se += "</div>"
        }
        
        se += "</div>"
        
        return se;
    }    
};