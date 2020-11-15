var EncyclopediaTokens = {
    _i18n: {
        'fr': {
            'tab': "Autre",
            'from': "Disponible dans :",
            'fromAnd': "et",
            'token': "exemplaire",
            'tokens': "exemplaires"
        },
        'en': {
            'tab': "Other",
            'from': "Available in:",
            'fromAnd': "and",
            'token': "copy",
            'tokens': "copies"
        },
        'it': {
            'tab': "TODO_TRANSLATE",
            'from': "Disponibile in :",
            'fromAnd': "e",
            'token': "copia",
            'tokens': "copie"
        }
    },
    
    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaTokens._i18n[Language].tab, id: "encyclopedia-token", onShow: EncyclopediaTokens.onShow,  onHide: EncyclopediaTokens.onHide });
        
        EncyclopediaTokens._facets = [
            {
                id: 'keyword',
                label: {
                    'fr': "Mot-clé",
                    'en': "Keyword",
                    'it': "Parola chiave"
                },
                filter: function(item, value)
                {
                    return item.name[Language] && ConanRules._deemphasize(item.name[Language]).indexOf(ConanRules._deemphasize(value)) != -1;
                }
            },
            
            {
                id: 'expansions',
                label: {
                    'fr': "Status",
                    'en': "Status",
                    'it': "Stato"
                },
                values: [
                    {
                        id: "yes",
                        label: {
                            'fr': "Possédées",
                            'en': "Owned",
                            'it': "Nella collezione"
                        }
                    },
                    {
                        id: "no",
                        label: {
                            'fr': "Manquantes",
                            'en': "Missing",
                            'it': "Mancante"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    if (selectedValues.length != 1)
                    {
                        return true;
                    }
                    else 
                    {
                        var hasExpansion = ConanAbout._hasExpansion(item.origins); 
                        return hasExpansion && selectedValues[0] == 'yes'
                                || !hasExpansion && selectedValues[0] == 'no'
                    }
                }
            },
            
            {
                id: 'origins',
                label: {
                    'fr': "Origine",
                    'en': "Origin",
                    'it': "Origine"
                },
                sort: true,
                values: (function() {
                    var values = [];
                    for (var i in Encyclopedia.expansions.types)
                    {
                        var type = Encyclopedia.expansions.types[i];
                        
                        for (var j in Encyclopedia.expansions.list)
                        {
                            var expansion = Encyclopedia.expansions.list[j];
                            if (expansion.type == type.id)
                            {
                                values.push({
                                    id: expansion.id,
                                    label: expansion.short
                                });
                            }
                        }
                    }
                    return values;
                })(),
                filter: function(item, selectedValues) {
                    var origins = item.origins.slice(0);
                    for (var i in Encyclopedia.expansions.types)
                    {
                        var startRemove = false;

                        var type = Encyclopedia.expansions.types[i];
                        
                        for (var j in Encyclopedia.expansions.list)
                        {
                            var expansion = Encyclopedia.expansions.list[j];
                            if (expansion.type == type.id)
                            {
                                if (startRemove)
                                {
                                    origins = origins.filter(o => o != expansion.id);
                                }
                                else if (origins.indexOf(expansion.id) != -1)
                                {
                                    startRemove = true;
                                }
                            }
                        }
                    }

                    return origins.filter(v => selectedValues.indexOf(v) != -1).length > 0;
                }
            }         
        ]        
    },    
    
    init: function()
    {
        $("#encyclopedia-token").append(Encyclopedia.displaySearchEngine(EncyclopediaTokens._facets, "EncyclopediaTokens.updateDisplayTokens()", "etk"));
        $("#encyclopedia-token").append("<div id='encyclopedia-token-wrapper'></div>");
        EncyclopediaTokens.displayTokens();
    },

    displayTokens: function()
    {
        var tokens = "";
        
        Encyclopedia.tokens.list.sort(function(s1, s2) {
            var c = s1.name[Language].toLowerCase().localeCompare(s2.name[Language].toLowerCase())
            if (c != 0)
            {
                return c;
            }
            
            c = s1.id.toLowerCase().localeCompare(s2.id.toLowerCase());
            if (c != 0)
            {
                return c;
            }
            
            return s1.subid < s2.subid ? -1 : 1;
        });

        var tokenList = Encyclopedia.tokens.list;
        var ignoredPrevious = 0;
        for (var i in tokenList)
        {
            i = parseInt(i);
            var token = tokenList[i];
            
            if (i < tokenList.length - 1
                && tokenList[i+1].id == token.id)
            {
                ignoredPrevious++;
                continue;
            }
            
            token = tokenList[i - ignoredPrevious];
            
            tokens += "<a id='token-" + token.id + "' href='javascript:void(0)' data-count='" + (ignoredPrevious+1) + "' onclick='EncyclopediaTokens.openToken(\"" + token.id + "\")'>";
            tokens += EncyclopediaTokens._tokenCode(token);
            tokens += "</a>";
            
            ignoredPrevious = 0;
        }
        
        $("#encyclopedia-token-wrapper").html(tokens);
        EncyclopediaTokens.updateDisplayTokens()
    },
    
    updateDisplayTokens: function()
    {
        Encyclopedia.updateFacets(EncyclopediaTokens._facets, Encyclopedia.tokens.list, "etk");
        
        $("#encyclopedia-token-wrapper a").hide();
        
        var tokenList = Encyclopedia.tokens.list.filter(Encyclopedia.filter(EncyclopediaTokens._facets, "etk"));
        var ignoredPrevious = 0;
        for (var i in tokenList)
        {
            i = parseInt(i);
            var token = tokenList[i];
            
            if (i < tokenList.length - 1
                && tokenList[i+1].id == token.id)
            {
                ignoredPrevious++;
                continue;
            }
            
            token = tokenList[i - ignoredPrevious];
            
            $("#token-" + token.id).attr('data-count', ignoredPrevious+1).show();
            
            ignoredPrevious = 0;
        }
    },
    
    onShow: function() {
    },

    onHide: function() {
    },
    
    _findTokensById: function(id)
    {
        var tokens = [];
        
        for (var i in Encyclopedia.tokens.list)
        {
            var token = Encyclopedia.tokens.list[i];
            if (token.id == id)
            {
                tokens.push(token);
            }
        }
        
        return tokens;
    },
    
    openToken: function(id) {
        var tokens = EncyclopediaTokens._findTokensById(id);
        var displayTokens = [];

        var subids = {};
        var originsCount = {};
        for (var e in tokens)
        {
            var token = tokens[e];
            
            var origins = Encyclopedia._removeExtraExpansion(token.origins.slice());
            for (var i in origins)
            {
                var origin = origins[i];
                originsCount[origin] = originsCount[origin] ? originsCount[origin]+1 : 1;
            }
            
            if (!subids[token.subid])
            {
                subids[token.subid] = 1;
                displayTokens.push(token);
            }       
            else
            {
                subids[token.subid] += 1;
            }
        }

        
        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaTokens._i18n[Language].fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaTokens._i18n[Language].token : EncyclopediaTokens._i18n[Language].tokens) + ")";
        }
        
        var c = "<div class='token-wraperindetails'>";
        for (var e in displayTokens)
        {
            var token = displayTokens[e]; 
            c += "<div class='token-wrapindetails' data-count='" + subids[token.subid] + "'>" + EncyclopediaTokens._tokenCode(token, true) + "</div>";
        }
        c += "</div>";

        
        Nav.dialog(token.name[Language] || "",
            "<div class='tokendetails'>" 
                + "<div class='minwidth'></div>"
                + "<div class='from'>" + EncyclopediaTokens._i18n[Language].from + " "
                    + originString
                + "</div>"
                + c
            + "</div>",
            null,
            []
        );
    },
    
    _tokenCode: function(token, details) {
        var code = "";

        var ratio = 7.0/25.0;        
        var style = token.size.shape == "circle" || token.size.width >= token.size.height ? "width: " + (token.size.width*ratio) +  "rem;" : "height: " + (token.size.height*ratio) +  "rem;"
        code += "<div class='othertoken " + token.size.shape + "'>" 
                    + "<div class='img'>"
                        + "<img src='" + (token.faceB ? token.faceB.image : token.faceA.image) + "\?version=" + Version + "' style='" + style + "'/>"
                        + (details ? "<img class='return' src='" + (token.faceB ? token.faceB.image : token.faceA.image) + "\?version=" + Version + "' style='" + style + "'/>" : "")
                        + (details ? "<div class='middle' style='height:" + (token.size.height ? token.size.height*ratio : token.size.width*ratio) + "rem'></div>" : "")
                        + (details ? "<img class='back' src='" + token.faceA.image + "\?version=" + Version + "' style='" + style + "'/>" : "")
                        + (details ? "<img class='back return' src='" + token.faceA.image + "\?version=" + Version + "' style='" + style + "'/>" : "")
                    + "</div>"
                    + "<span class='name'>" + token.name[Language] + "</span>"
              + "</div>"
        
        return code;
    }
}
