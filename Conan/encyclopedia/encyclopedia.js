var Encyclopedia = {
    load: function()
    {
        function _handleCount(object)
        {
            var newItemsForArray = [];
            
            for (var j in object.list)
            {
                var item = object.list[j];
                if (item.count)
                {
                    for (var k = 1; k < item.count ; k++)
                    {
                        newItemsForArray.push({...item});
                    }
                    
                    item.count = undefined;
                }
            }
            
            object.list = object.list.concat(newItemsForArray);
            
            return object;
        }

        function _handleColors(object)
        {
            var newItemsForArray = [];
            
            for (var j in object.list)
            {
                var item = object.list[j];
                if (item.colors)
                {
                    for (var k = 1; k < item.colors.length ; k++)
                    {
                        newItemsForArray.push({...item, color: item.colors[k]});
                    }
                    
                    item.color = item.colors[0];
                }
            }
            
            object.list = object.list.concat(newItemsForArray);
            
            return object;
        }

        return Promise.all([
            Utils.loadJSON("data/skills.json")      .then(function(data) { Encyclopedia.skills = data; }),
            Utils.loadJSON("data/spells.json")      .then(function(data) { Encyclopedia.spells = data; }),
            Utils.loadJSON("data/equipments.json")  .then(function(data) { Encyclopedia.equipments = _handleCount(data); }),
            Utils.loadJSON("data/expansions.json")  .then(function(data) { Encyclopedia.expansions = data; }),
            Utils.loadJSON("data/maps.json")        .then(function(data) { Encyclopedia.maps = data; }),
            Utils.loadJSON("data/models.json")      .then(function(data) { Encyclopedia.models = _handleCount(data); }),
            Utils.loadJSON("data/tiles.json")       .then(function(data) { Encyclopedia.tiles = _handleColors(_handleCount(data)); }),
            Utils.loadJSON("data/tokens.json")      .then(function(data) { Encyclopedia.tokens = _handleCount(data); }),
            Utils.loadJSON("data/heroes.json")      .then(function(data) { Encyclopedia.heroes = data; }),
            Utils.loadJSON("data/rules.json")       .then(function(data) { Encyclopedia.rules = data; })
        ]);
    },
    
    _i18n: {
        'fr': {
            'menu': "Encyclopédie",
            'copyright': "Données anglaises récupérées sur le site <a target='_blank' href='https://conan-companion.herokuapp.com/'>conan-companion.herokuapp.com</a> avec l'aimable autorisation de David Abel.<br/>Traductions françaises saisies par <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a>.<br/>Traductions italiennes réalisées par <a href=\"https://the-overlord.net/index.php?/profile/6029-pensareadaltro/\">@pensareadaltro</a>.<br/>Les photos des figurines et les textes associés ont été repris du site <a href='http://conan.paintings.free.fr/'>Conan paintings</a>.",
            'operatorAnd': "et",
            'operatorOr': "ou"
        },
        'en': {
            'menu': "Encyclopedia",
            'copyright': "English data collected on the site <a target='_blank' href='https://conan-companion.herokuapp.com/'>conan-companion.herokuapp.com</a> with the kind authorization of David Abel.<br/>French translations entered by <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a>.<br/>Italian translations done by <a href=\"https://the-overlord.net/index.php?/profile/6029-pensareadaltro/\">@pensareadaltro</a>.<br/>Models photos and associated texts where gather on the <a href='http://conan.paintings.free.fr/'>Conan paintings</a> site.",
            'operatorAnd': "and",
            'operatorOr': "or"
        },
        'it': {
            'menu': "Enciclopedia",
            'copyright': "Le informazioni in inglese sono ottenute dal sito: <a target='_blank' href='https://conan-companion.herokuapp.com/'>conan-companion.herokuapp.com</a> con la cortese autorizzazione di David Abel.<br/>Traduzione in francese inserite da <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a>.<br/>Traduzione in italiano di <a href=\"https://the-overlord.net/index.php?/profile/6029-pensareadaltro/\">@pensareadaltro</a>.<br/>Miniature, foto e testi associati sono stati recuperati dal sito: <a href='http://conan.paintings.free.fr/'>Conan paintings</a>.",
            'operatorAnd': "e",
            'operatorOr': "o"
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
        EncyclopediaModels.preinit();
        EncyclopediaTokens.preinit();
        
        Nav.createTabs('encyclopedia', Encyclopedia._slides, Encyclopedia.onChange);

        EncyclopediaEquipments.init();
        EncyclopediaSpells.init();
        EncyclopediaHeroes.init();
        EncyclopediaTiles.init();
        EncyclopediaModels.init();
        EncyclopediaTokens.init();
        
        Encyclopedia.onChange();

        About.addCopyright(Encyclopedia._i18n[Language].menu, Encyclopedia.copyright());
        
        // Watch search engine
        $(window).on('resize', Encyclopedia.onResize);
        Encyclopedia.onResize();
    },
    
    onChange: function(event, slick) {
        var slide = slick && slick.currentSlide || 0;
        
        if (Encyclopedia._currentSlide != null)
            Encyclopedia._slides[Encyclopedia._currentSlide].onHide();
        
        Encyclopedia._currentSlide = slide;
        Encyclopedia._slides[Encyclopedia._currentSlide].onShow();
        Encyclopedia.onResize();
    },

    
    copyright: function() 
    {
        return "<p>" + Encyclopedia._i18n[Language].copyright + "</p>"
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
    
    onResize: function()
    {
        $(".search-engine:visible").each(function(index, s) {
            var searchEngine = $(s);
            
            searchEngine.removeClass("collapsible");
            
            var last = $(".facet", searchEngine).last();
            if (last.position().top + last.outerHeight(true) > searchEngine.innerHeight())
            {
                searchEngine.addClass("collapsible");
            }
        });
    },
    
    switchOperator: function(element)
    {
        var $e = $(element);
        var $c = $e.children("span");
        if ($e.attr('data-operator') == 'and')
        {
            $e.attr('data-operator', 'or');
            $c.html(Encyclopedia._i18n[Language].operatorOr);
        }
        else
        {
            $e.attr('data-operator', 'and');
            $c.html(Encyclopedia._i18n[Language].operatorAnd);
        }
    },
    
    displaySearchEngine: function(facets, displayFunc, prefix)
    {
        var se = "<div class='search-engine'>";
        
        for (var f in facets)
        {
            var facet = facets[f];
            
            se += "<div data-mode='hide' class='facet' id='" + prefix + "-" + facet.id + "'>";
            se += "<span id='" + prefix + "-" + facet.id + "-span'"; 
            if (facet.operator == "or/and")
            {
                se += " data-operator='and' onclick=\"Encyclopedia.switchOperator(this); " + displayFunc + "\""
            }
            se += ">"; 
            se += facet.label[Language];
            if (facet.operator == "or/and")
            {
                se += "<span >" + Encyclopedia._i18n[Language].operatorAnd + "</span>";
            }
            se += "</span>";
            
            if (facet.values)
            {
                for (var v in facet.values)
                {
                    var value = facet.values[v];
                    
                    var a = value.defaults ? " checked='checked'" : ""; 
                    
                    se += "<label>" 
                        + "<input type='checkbox' id='" + prefix + "-" + facet.id + "-" + value.id + "' onchange='" + displayFunc + "'" + a + "/>"
                        + "<span>" 
                        + value.label[Language]
                        + "</span>"
                        + "</label>";
                }
                se += "<a href='javascript:void(0)' onclick='var x = $(this).parent(); x.attr(\"data-mode\", x.attr(\"data-mode\") == \"hide\" ? \"show\" : \"hide\")'></a>"
            }
            else
            {
                se += "<input type='text' id='" + prefix + "-" + facet.id + "-input' onkeyup='" + displayFunc + "' onchange='" + displayFunc + "'/>";
            }
            se += "</div>"
        }
        
        se += "</div>"
        
        return se;
    },
    updateFacets: function(facets, items, prefix)
    {
        $(".search-engine .facet label:not(.checked) input:checked").parent().addClass("checked");
        $(".search-engine .facet label.checked input:not(:checked)").parent().removeClass("checked");

        $(".search-engine .facet").removeClass("checked");
        $(".search-engine .facet:not(.checked) label.checked").parent().addClass("checked");
        
        for (var i in facets)
        {
            var facet = facets[i];
            if (facet.values)
            {
                var max = items.filter(Encyclopedia.filter(facets, prefix, facet, null)).length;
                    
                var nonEmptyFacets = 0;
                for (var v in facet.values)
                {
                    var value = facet.values[v];
                    
                    var count = items.filter(Encyclopedia.filter(facets, prefix, facet, value)).length;
                    document.getElementById(prefix + "-" + facet.id+ "-" + value.id).parentElement.setAttribute('data-count', count);
                    if (count != 0 && count != max) nonEmptyFacets++;
                }  
                document.getElementById(prefix + "-" + facet.id).setAttribute("data-count", nonEmptyFacets);
                
                if (facet.sort)
                {
                    $("#" + prefix + "-" + facet.id + " label").sort(function (a,b) {
                        var $a = $(a);
                        var $b = $(b);
                        
                        var aCount = parseInt($a.attr("data-count"));
                        var bCount = parseInt($b.attr("data-count"));
                        
                        if (aCount != bCount) return bCount - aCount;
                        else return $a.text().localeCompare($b.text()); 
                    }).appendTo("#" + prefix + "-" + facet.id);
                    $("#" + prefix + "-" + facet.id + " a").appendTo("#" + prefix + "-" + facet.id);
                }
            }
        }
        Encyclopedia.onResize();
    },
    filter: function(facets, prefix, forcedFacet, forcedValue)
    {
        return function(e) {
            for (var i in facets)
            {
                var facet = facets[i];
                var operator = facet.operator || 'or';
                
                if (operator == 'or/and')
                {
                    operator = document.getElementById(prefix + "-" + facet.id + "-span").getAttribute("data-operator");
                }
                
                var selectedValues = [];
                if (forcedFacet && facet.id == forcedFacet.id)
                {
                    if (forcedValue)
                    {
                        selectedValues.push(forcedValue.id);
                    }
                }

                if (!(forcedFacet && facet.id == forcedFacet.id)
                    || operator == 'and')
                {
                    if (facet.values)
                    {
                        for (var v in facet.values)
                        {
                            var value = facet.values[v];
                            
                            if (document.getElementById(prefix + "-" + facet.id + "-" + value.id).checked)
                            {
                                selectedValues.push(value.id);
                            }
                        }
                    }
                    else
                    {
                        selectedValues.push(document.getElementById(prefix + "-" + facet.id + "-input").value);
                    }
                }
                
                if (facet.values)
                {
                    if (selectedValues.length > 0)
                    {
                        var match = operator == 'and';
                        for (var l = 0; l < selectedValues.length; l++)
                        {
                            var selectedValue = selectedValues[l];
                            var m = facet.filter(e, [selectedValue])
                            
                            if (operator == 'or')
                            {
                                match = match || m;
                            }
                            else
                            {
                                match = match && m;
                            }
                        }
                        if (!match)
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    // Text facet
                    if (selectedValues[0] && !facet.filter(e, selectedValues[0]))
                    {
                        return false;
                    }
                }
            }
            
            return true;
        }
    }    
};

Utils._toInitialize.push(Encyclopedia.init);