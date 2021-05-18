var Encyclopedia = {
    _loadHandleCount: function(object)
    {
        var newItemsForArray = [];
        
        for (var j in object.list)
        {
            var item = object.list[j];
            if (item.count)
            {
                for (var k = 1; k < item.count ; k++)
                {
                    newItemsForArray.push(mergeObject(item, {}));
                }
                
                item.count = undefined;
            }
        }
        
        object.list = object.list.concat(newItemsForArray);
        
        return object;
    },

    _loadDeemphasize: function(object, properties)
    {
        for (var property of properties)
        {
            for (var j in object.list)
            {
                var item = object.list[j];
                if (item[property])
                {
                    Languages.forEach(lang => item[property][lang + "_deemphasized"] = Rules._deemphasize(item[property][lang]));
                }
            }
        }
        return object;
    },
    
    _loadHandleColors(object)
    {
        var newItemsForArray = [];
        
        for (var j in object.list)
        {
            var item = object.list[j];
            if (item.colors)
            {
                for (var k = 1; k < item.colors.length ; k++)
                {
                    newItemsForArray.push(mergeObject(item, { color: item.colors[k] }));
                }
                
                item.color = item.colors[0];
            }
        }
        
        object.list = object.list.concat(newItemsForArray);
        
        return object;
    },
    
    load: function () 
    {
        
    },
    
    _i18n: {
        'fr': {
            'menu': "Encyclopédie",
            'operatorAnd': "et",
            'operatorOr': "ou",
            'search': "Chercher"
        },
        'en': {
            'menu': "Encyclopedia",
            'operatorAnd': "and",
            'operatorOr': "or",
            'search': "Search"
        },
        'it': {
            'menu': "Enciclopedia",
            'operatorAnd': "e",
            'operatorOr': "o",
            'search': "Ricerca"
        }
    },
    
    _slides: [],
    
    _loadItems: function() {
        Encyclopedia._items = [];
    },

    init: function() 
    {
        Encyclopedia._loadItems();
        if (Encyclopedia._items.length == 0)
        {
            return;
        }
        
        Nav.addIcon(Encyclopedia._i18n[Language].menu, "encyclopedia-icon", "encyclopedia");
        
        Encyclopedia._items.forEach(item => item.preinit());
        
        Nav.createTabs('encyclopedia', Encyclopedia._slides, Encyclopedia.onChange);

        Encyclopedia._items.forEach(item => item.init());
        
        Encyclopedia.onChange();

        About.addCopyright(Encyclopedia._i18n[Language].menu, Encyclopedia.copyright());
        
        // Watch search engine
        $(window).on('resize', Encyclopedia.onResize);
        $(window).on('orientationchange', Encyclopedia.onResize);
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
    
    displaySearchEngine: function(parentId, facets, displayFunc, debouncedDisplayFunc, prefix)
    {
        var se = "<div class='search-wrapper'><div class='search-engine-mobileoverlay'></div><div class='search-engine'>";
        
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
                se += "<input type='text' id='" + prefix + "-" + facet.id + "-input' onkeyup='" + debouncedDisplayFunc + "' onchange='" + debouncedDisplayFunc + "'/>";
            }
            se += "</div>"
        }
        
        se += "</div></div>"
        
        $("#" + parentId).append(se);
        $("#" + parentId + " .search-engine-mobileoverlay").on("click", this._openSearch.bind(this, parentId));
        Nav.addFloatingAction(parentId, this._i18n[Language].search, "encycloppedia-search-icon", "encyclopedia-" + prefix + "-search", this._openSearch.bind(this, parentId));
        Nav.createFloatingBar(parentId, 'mobile-only');
    },
    _openSearch: function(parentId) {
        $("#" + parentId).toggleClass("displaySearch");
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
                    $("#" + prefix + "-" + facet.id + " label").sort(Encyclopedia._sort).appendTo("#" + prefix + "-" + facet.id);
                    $("#" + prefix + "-" + facet.id + " a").appendTo("#" + prefix + "-" + facet.id);
                }
            }
        }
        Encyclopedia.onResize();
    },
    _sort: function(a,b) {
        var $a = $(a);
        var $b = $(b);
        
        var aCount = parseInt($a.attr("data-count"));
        var bCount = parseInt($b.attr("data-count"));
        
        if (aCount != bCount) return bCount - aCount;
        else return $a.text().localeCompare($b.text()); 
    },
    filter: function(facets, prefix, forcedFacet, forcedValue)
    {
        return function _filter(e) {
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