var EncyclopediaTokens = {
    preinit: function()
    {
        Encyclopedia._slides.push({ label: EncyclopediaTokens._i18n.tab, shortLabel: EncyclopediaTokens._i18n.shorttab, id: "encyclopedia-token", onShow: EncyclopediaTokens.onShow,  onHide: EncyclopediaTokens.onHide });

        EncyclopediaTokens._facets = Utils.mergeObject([
            {
                id: 'keyword',
                filter: function(item, value)
                {
                    return item.name && item.name_deemphasized.indexOf(Rules._deemphasize(value)) != -1;
                }
            },

            {
                id: 'expansions',
                values: [ { id: "yes" }, { id: "no" } ],
                filter: function(item, selectedValues) {
                    if (selectedValues.length != 1)
                    {
                        return true;
                    }
                    else
                    {
                        var hasExpansion = About._hasExpansion(item.origins);
                        return hasExpansion && selectedValues[0] == 'yes'
                                || !hasExpansion && selectedValues[0] == 'no'
                    }
                }
            },

            {
                id: 'origins',
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
            },

            {
                id: 'usage',
                sort: true,
                values: [ { id: "model", }, { id: "skill" }, { id: "spell" } ],
                filter: function(item, selectedValues) {
                    for (var i = 0; i < selectedValues.length; i++)
                    {
                        switch (selectedValues[i])
                        {
                            case 'model':
                                if (item.model)
                                {
                                    return true;
                                }
                                break;
                            case 'skill':
                                if (Rules._findSkillByToken(item.id))
                                {
                                    return true;
                                }
                                break;
                            case 'spell':
                                if (EncyclopediaSpells._findSpellsByToken(item.id).length > 0)
                                {
                                    return true;
                                }
                        }
                    }
                    return false;
                }
            }
        ], EncyclopediaTokens._facets);
    },

    init: function()
    {
        EncyclopediaTokens.debouncedUpdateDisplayTokens = $.debounce(250, EncyclopediaTokens.updateDisplayTokens);
        Encyclopedia.displaySearchEngine("encyclopedia-token", EncyclopediaTokens._facets, "EncyclopediaTokens.updateDisplayTokens()", "EncyclopediaTokens.debouncedUpdateDisplayTokens()", "etk");
        $("#encyclopedia-token .search-wrapper").append("<div id='encyclopedia-token-wrapper'></div>");
        AutoZoom.autozoom("encyclopedia-token-wrapper", 164, 164);
        EncyclopediaTokens.displayTokens();
    },

    displayTokens: function()
    {
        var tokens = "";

        Encyclopedia.tokens.list.sort(function(s1, s2) {
            var c = s1.name.toLowerCase().localeCompare(s2.name.toLowerCase())
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
        var totalCount = 0;
        for (var e in tokens)
        {
            var token = tokens[e];
            totalCount += token.count || 1;

            var origins = token.origins.slice();
            for (var i in origins)
            {
                var origin = origins[i];
                originsCount[origin] = originsCount[origin] ? originsCount[origin]+1 : 1;
            }

            if (!subids[token.subid])
            {
                subids[token.subid] = origins.length;
                displayTokens.push(token);
            }
            else
            {
                subids[token.subid] += origins.length;
            }
        }


        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaTokens._i18n.fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaTokens._i18n.token : EncyclopediaTokens._i18n.tokens) + ")";
        }

        var c = "<div class='token-wraperindetails' data-totalcount='" + totalCount + "'>";
        for (var e in displayTokens)
        {
            var token = displayTokens[e];
            c += "<div class='token-wrapindetails' data-count='" + subids[token.subid] + "'>" + EncyclopediaTokens._tokenCode(token, true, totalCount) + "</div>";
        }
        c += "</div>";

        var model = "";
        if (token.model)
        {
            var m = EncyclopediaModels._findModelsById(token.model)[0];
            model = "<div class='models'>"
                    + EncyclopediaModels._linkToModel(token.model, true)
                    + "</div>";
        }

        var skills = Rules._findSkillByToken(token.id) || "";
        if (skills)
        {
            skills = "<div class='skills'>" + EncyclopediaTokens._i18n.skills + " " + Rules._linkToSkill(skills.id, false) + "</div>";
        }

        var spells = EncyclopediaSpells._findSpellsByToken(token.id).map(s => EncyclopediaSpells._linkToSpell(s.id, false)).join(", ");

        Nav.dialog(token.name || "",
            "<div class='tokendetails'>"
                + "<div class='minwidth'></div>"
                + "<div class='from'>" + EncyclopediaTokens._i18n.from + " "
                    + originString
                + "</div>"
                + skills
                + (spells ? "<div class='spells'>" + EncyclopediaTokens._i18n.spells + " " + spells + "</div>" : "")
                + model
                + c
            + "</div>",
            null,
            []
        );
    },

    _tokenCode: function(token, details, count) {
        var code = "";
        
        var ratio = 7.2/25.0;
        var style = token.size.shape == "circle" || token.size.width >= token.size.height ? "width: " + (token.size.width*ratio) +  "rem;" : "height: " + (token.size.height*ratio) +  "rem;"
        
        var separateBack = count == 1 && details && token.size.shape == "square" && token.faceB && token.faceB.image != token.faceA.image;
        var backImage = (details && token.faceB ? "<img " + (separateBack ? "" : "class='back'") + LazyImage + " src='" + token.faceA.image + "\?version=" + Version + "' style='" + style + "'/>" : "");
        
        code += "<div class='othertoken " + token.size.shape + "'>"
                    + "<div class='img'>"
                        + (separateBack ? "" : backImage)
                        + "<img " + LazyImage + " src='" + (!details && token.preview ? token.preview.image : (token.faceB ? token.faceB.image : token.faceA.image)) + "\?version=" + Version + "' style='" + style + "'/>"
                    + "</div>"
                    + "<span class='name'>" + (separateBack ? token.name.split(" / ")[0] : token.name ) + "</span>"
              + "</div>";
              
        if (separateBack)
        {
            code += "<div class='othertoken " + token.size.shape + "'>"
                        + "<div class='img'>"
                            + backImage
                        + "</div>"
                        + "<span class='name'>" + (separateBack ? token.name.split(" / ")[1] : token.name ) + "</span>"
                  + "</div>";
        }

        return code;
    },


    _linkToToken: function(id, image) {
        var token = EncyclopediaTokens._findTokensById(id)[0];
        var name = token.name;

        var s = "";
        if (token)
        {
            s += "<a href='javascript:void(0)' onclick='EncyclopediaTokens.openToken(\"" + id + "\")'>";
            if (image)
            {
                s += EncyclopediaTokens._tokenCode(token);
            }
            else
            {
                s += name;
            }
            s += "</a>";
        }
        return s;
    }

}
