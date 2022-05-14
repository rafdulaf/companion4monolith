var Tile = mergeObject(StudioItem, {
    name: 'tile',
    cls: 'Tile',
    storage: Application + "_StudioTiles",
    _itemWidth: 204,
    _itemHeight: 309,
    
    _getDisplayItemsCode: function(withEditLink, printPurpose)
    {
        var html = "";

        var tiles = JSON.parse(localStorage.getItem(this.storage)) || [];
        if (tiles.length > 0)
        {
            for (var i in tiles)
            {
                var prefix = "", suffix = "";
                if (withEditLink !== false)
                {
                    prefix = "<a href='javascript:void(0)' onclick='Tile.add(JSON.parse(localStorage.getItem(\"" + this.storage + "\"))[" + i + "])'>";
                    suffix = "</a>";
                }
                else
                {
                    prefix = "<input type='checkbox' id='tile-" + i + "' name='tile' data-index='" + i + "' onchange=\"$('#tile-back-" + i + ", #tile-back2-" + i + "').toggleClass('invisible');\"/><label for='tile-" + i + "'>";
                    suffix = "</label>";
                }

                if (withEditLink)
                {
                    html += prefix + "<div class='printoverflow'>" + Tile._cardCode(tiles[i], null, null, printPurpose) + "</div>" + suffix;
                }
                else
                {
                    html += prefix 
                            + "<div class='printoverflow'>" + Tile._cardCode(tiles[i], true, false, printPurpose) + "</div>" 
                            + "<div class='printoverflow'>" + Tile._cardCode(tiles[i], true, true, printPurpose) + "</div>" 
                            + suffix;
                }
            }
        }
        else
        {
            html += "<div class=\"nocards\">" + Tile._i18n.nocard + (withEditLink !== false ? Tile._i18n.nocard2 : '') + "</div>";
        }

        if (!withEditLink)
        {
            for (var i in tiles)
            {
                html += "<div id=\"tile-back-" + i + "\"  class='printoverflow back invisible'>"
                            + "<img class=\"blood\" src=\"studio/tile/img/blood.webp?version=" + Version + "\"/>"
                            + Tile._cardCode(tiles[i], !withEditLink, false, printPurpose) 
                        + "</div>"
                html += "<div id=\"tile-back2-" + i + "\"  class='printoverflow back invisible'>"
                            + Tile._cardCode(tiles[i], !withEditLink, true, printPurpose) 
                        + "</div>"
            }
        }

        return html;
    },
    
    _cardCode: function(tile, tokenAside, tokenMode, printPurpose) {
        var code = "<div class=\"tile tiletile\">";
        
        if (tile.color != 'none')
        {
            code += "<picture class=\"background\">"
                        + "<source media=\"print\" srcset=\"studio/tile/img/background_" + tile.color + "_hd.webp?version=" + Version + "\"/>"
                        + "<img src=\"studio/tile/img/background_" + tile.color + ".webp?version=" + Version + "\"/>"
                    + "</picture>";
        }

        if (tile.image)
        {
            code += "<div class=\"image\"><img " + (!printPurpose ? LazyImage : "") + " src=\"" + tile.image + "\" onload=\"this.style.minHeight = 0; this.style.opacity = 1\" style=\"left: " + tile.imagelocation.x + "%; top: " + tile.imagelocation.y + "%; width: " + tile.imagezoom + "%; transform: translate(-50%, -50%) rotate(" + tile.imagerotation + "deg)\"/></div>";
        }

        if (tile.name !== undefined && tile.name !== null)
        {
               code += "<div class=\"name\">" + tile.name + "</div>";
        }

        if (tile.reinforcement || tile.reinforcement === "0")
        {
            code += "<img class=\"background-reinforcement\" src=\"studio/tile/img/reinforcement.webp?version=" + Version + "\"/>"
                + "<div class=\"reinforcement\">" + tile.reinforcement + "</div>";
        }

        var level = 0;
        if (tile.dices && tile.dices[0] != "none")
        {
            var nbDices = 1;
            
            var diceCode = ""
            diceCode += "<img class='dice dice-1' src=\"studio/tile/img/dice_" + tile.dices[0] + ".webp?version=" + Version + "\"/>";
            if (tile.dices[1] != "none")
            {
                nbDices++;
                diceCode += "<img class='dice dice-2' src=\"studio/tile/img/dice_" + tile.dices[1] + ".webp?version=" + Version + "\"/>";
                if (tile.dices[2] != "none")
                {
                    nbDices++;
                    diceCode += "<img class='dice dice-3' src=\"studio/tile/img/dice_" + tile.dices[2] + ".webp?version=" + Version + "\"/>";
                    if (tile.dices[3] != "none")
                    {
                        nbDices++;
                        diceCode += "<img class='dice dice-4' src=\"studio/tile/img/dice_" + tile.dices[3] + ".webp?version=" + Version + "\"/>";
                    }
                }
            }
            
            code += "<div class=\"attack level" + level + "\">";
            code += "<img class='dice-background' src=\"studio/tile/img/dice-background-" + nbDices + ".webp?version=" + Version + "\"/>";
            code += "<img class=\"attacktype\" src=\"studio/tile/img/" + tile.attacktype + ".webp?version=" + Version + "\"/>";
            code += diceCode;
            code += "</div>";
            level++;
        }
        
        if (tile.defense)
        {
               code += "<div class=\"defense level" + level + "\">"
                    + "<img class=\"background-defense\" src=\"studio/tile/img/defense.webp?version=" + Version + "\"/>"
                    + "<div class=\"defense\">" + tile.defense + "</div>"
                    + "</div>";
               level++
        }

        if (tile.movement)
        {
               code += "<div class=\"movement level" + level + "\">"
                    + "<img class=\"background-movement\" src=\"studio/tile/img/movement.webp?version=" + Version + "\"/>"
                    + "<div class=\"movement\">" + tile.movement + "</div>"
                    + "</div>";
               level++
        }

        if (tile.skills && tile.skills[0] != 'none')
        {
            if (level != 0)
            {
                code += "<div class=\"skills-separator level" + level + "\">"
                         + "<img class=\"background-separator\" src=\"studio/tile/img/separator.webp?version=" + Version + "\"/>"
                       + "</div>";
            }

            if (tile.skills[0] != 'space')
            {
                code += "<div class=\"skills level" + level + "\">"
                         + "<img class=\"background-skills\" src=\"" + Tile._getSkillImage(tile.skills[0]) + "?version=" + Version + "\"/>"
                       + "</div>";
            }
            level++;

            if (tile.skills && tile.skills[1] != 'none')
            {
                if (tile.skills[1] != 'space')
                {
                    code += "<div class=\"skills level" + level + "\">"
                         + "<img class=\"background-skills\" src=\"" + Tile._getSkillImage(tile.skills[1]) + "?version=" + Version + "\"/>"
                       + "</div>";
                }
                level++;

                if (tile.skills && tile.skills[2] != 'none')
                {
                    if (tile.skills[2] != 'space')
                    {
                        code += "<div class=\"skills level" + level + "\">"
                             + "<img class=\"background-skills\" src=\"" + Tile._getSkillImage(tile.skills[2]) + "?version=" + Version + "\"/>"
                           + "</div>";
                    }
                    level++;

                    if (tile.skills && tile.skills[3] != 'none')
                    {
                        if (tile.skills[3] != 'space')
                        {
                            code += "<div class=\"skills level" + level + "\">"
                                 + "<img class=\"background-skills\" src=\"" + Tile._getSkillImage(tile.skills[3]) + "?version=" + Version + "\"/>"
                               + "</div>";
                        }
                        level++;
                    }
                }
            }
        }
        
        code += "</div>";
        
        if (tokenMode == true) code = "";
        if ((tokenMode == null || tokenMode == true) && tile.tokens && tile.tokens.length > 0 && tile.tokens[0].active)
        {
            code += "<div class=\"tile tokens" + (tokenAside ? " tokensAside" : " tokensOver") + "\">";
            code += "<div class=\"token\"><img " + (!printPurpose ? LazyImage : "") + " src=\"" + (tile.tokens[0].image || tile.image) + "\" onload=\"this.style.cssText += '; top: " + tile.tokens[0].imagelocation.y + "% !important'\" style=\"left: " + tile.tokens[0].imagelocation.x + "%; top: " + tile.tokens[0].imagelocation.y + "%; width: " + tile.tokens[0].imagezoom + "%; transform: translate(-50%, -50%) rotate(" + tile.tokens[0].imagerotation + "deg)\"/></div>";
            if (tile.tokens.length > 1 && tile.tokens[1].active)
            {
                code += "<div class=\"token\"><img " + (!printPurpose ? LazyImage : "") + " src=\"" + (tile.tokens[1].image || tile.image) + "\" onload=\"this.style.cssText += '; top: " + tile.tokens[1].imagelocation.y + "% !important'\"style=\"left: " + tile.tokens[1].imagelocation.x + "%; top: " + tile.tokens[1].imagelocation.y + "%; width: " + tile.tokens[1].imagezoom + "%; transform: translate(-50%, -50%) rotate(" + tile.tokens[1].imagerotation + "deg)\"/></div>";
            }
            code += "</div>";
        }

        return code;
    },
    
    
    _getSkillImage: function(id)
    {
        for (var i in Encyclopedia.skills.list)
        {
            var skill = Encyclopedia.skills.list[i];
            if (skill.type + '/' + skill.id == id)
            {
                return skill.image;
            }
        }
        console.warn("The skill " + id + " is not referenced");
        return undefined;
    },
    
    _add: function(tile, dlabel, actions)
    {
        function _skills()
        {
            var s = "";

            for (var i in Encyclopedia.skills.types)
            {
                var type = Encyclopedia.skills.types[i];

                s += "<optgroup label=\"" + type.title + "\">";

                for (var j in Encyclopedia.skills.list)
                {
                    var skill = Encyclopedia.skills.list[j];
                    if (skill.type == type.id)
                    {
                        s += "<option value=\"" + type.id  + "/" + skill.id + "\">" + skill.title + "</option>";
                    }
                }
            }

            return s;
        }

        Nav.dialog(dlabel,
            "<div class=\"studiodialog\">"
            + "<div class=\"ticol\">"
            + "<div class=\"tile\">"
                + "<h1>" + Tile._i18n.header1 + "</h1>"
                + "<input type=\"hidden\" name=\"tilepos\"/>"
                + "<div class=\"field name\">"
                    + "<label for=\"tname\">" + Tile._i18n.name + "</label>"
                    + "<input id=\"tname\" spellcheck='false' name=\"tilename\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.namePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field color\">"
                    + "<label for=\"tcolor\">" + Tile._i18n.color + "</label>"
                    + "<select id='tcolor' name='tcolor'>"
                    +     "<option value='gray'>" + Tile._i18n.colorGray + "</option>"
                    +     "<option value='blue'>" + Tile._i18n.colorBlue + "</option>"
                    +     "<option value='red'>" + Tile._i18n.colorRed + "</option>"
                    +     "<option value='green'>" + Tile._i18n.colorGreen + "</option>"
                    +     "<option value='orange'>" + Tile._i18n.colorOrange + "</option>"
                    +     "<option value='purple'>" + Tile._i18n.colorPurple + "</option>"
                    +     "<option value='black'>" + Tile._i18n.colorBlack + "</option>"
                    +     "<option value='none'>" + Tile._i18n.colorNone + "</option>"
                    + "</select>"
                + "</div>"
                + "<div class=\"field movement\">"
                    + "<label for=\"tmovement\">" + Tile._i18n.movement + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"tmovement\" name=\"tilemovement\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.movementPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field defense\">"
                    + "<label for=\"tdefense\">" + Tile._i18n.defense + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"tdefense\" name=\"tiledefense\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.defensePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field attackdices\">"
                    + "<label for=\"tdices\">" + Tile._i18n.dices + "</label>"
                    + "<input type=\"checkbox\" id=\"tattacktype\" name=\"tileattacktype\" onchange=\"Tile._preview();\" title=\"" + Tile._i18n.attacktype + "\"/>"
                    + "<div>"
                        + "<select id=\"tdices\" class=\"dice\" name=\"tiledices1\"><option value=\"none\">" + Tile._i18n.diceNone + "</option><option value=\"red\">" + Tile._i18n.diceRed + "</option><option value=\"redreroll\">" + Tile._i18n.diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n.diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n.diceYellowReroll + "</option></select>"
                        + "<select id=\"tdices2\" class=\"dice\" name=\"tiledices2\"><option value=\"none\">" + Tile._i18n.diceNone + "</option><option value=\"red\">" + Tile._i18n.diceRed + "</option><option value=\"redreroll\">" + Tile._i18n.diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n.diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n.diceYellowReroll + "</option></select>"
                        + "<select id=\"tdices3\" class=\"dice\" name=\"tiledices3\"><option value=\"none\">" + Tile._i18n.diceNone + "</option><option value=\"red\">" + Tile._i18n.diceRed + "</option><option value=\"redreroll\">" + Tile._i18n.diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n.diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n.diceYellowReroll + "</option></select>"
                        + "<select id=\"tdices4\" class=\"dice\" name=\"tiledices4\"><option value=\"none\">" + Tile._i18n.diceNone + "</option><option value=\"red\">" + Tile._i18n.diceRed + "</option><option value=\"redreroll\">" + Tile._i18n.diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n.diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n.diceYellowReroll + "</option></select>"
                    + "</div>"
                + "</div>"
                + "<div class=\"field skills\">"
                    + "<label for=\"tskills\">" + Tile._i18n.skills + "</label>"
                    + "<select id=\"tskills\" class=\"skills\" name=\"tileskills1\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n.skillsNone + "</option><option value=\"space\">" + Tile._i18n.skillsSpace + "</option>" + _skills() + "</select>"
                    + "<select id=\"tskills2\" class=\"skills\" name=\"tileskills2\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n.skillsNone + "</option><option value=\"space\">" + Tile._i18n.skillsSpace + "</option>" + _skills() + "</select>"
                    + "<select id=\"tskills3\" class=\"skills\" name=\"tileskills3\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n.skillsNone + "</option><option value=\"space\">" + Tile._i18n.skillsSpace + "</option>" + _skills() + "</select>"
                    + "<select id=\"tskills4\" class=\"skills\" name=\"tileskills4\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n.skillsNone + "</option><option value=\"space\">" + Tile._i18n.skillsSpace + "</option>" + _skills() + "</select>"
                + "</div>"
                + "<div class=\"field reinforcement\">"
                    + "<label for=\"treinforcement\">" + Tile._i18n.reinforcement + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"treinforcement\" name=\"tilereinforcement\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.reinforcementPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
            + "</div>"
            + "</div>"
            + "<div class=\"ticol\">"
            + "<div class=\"tile\">"
                + "<h1>" + Tile._i18n.header1bis + "</h1>"
                + "<div class=\"field\">"
                    + "<label for=\"timage\">" + Tile._i18n.image + "</label>"
                    + "<input id=\"timage\" spellcheck='false' name=\"tileimage\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"timagelocation\">" + Tile._i18n.imagelocation + "</label>"
                    + "<div><input id=\"timagelocation\" name=\"tileimagelocation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"\"/></div>"
                    + "<div><input id=\"timagelocation2\" name=\"tileimagelocation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"timagezoom\">" + Tile._i18n.imagezoom + "</label>"
                    + "<input id=\"timagezoom\" name=\"tileimagezoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagezoomPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"timagerotation\">" + Tile._i18n.imagerotation + "</label>"
                    + "<input id=\"timagerotation\" name=\"tileimagerotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagerotationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
            + "</div>"
            + "<div class=\"tile\">"
                + "<h1>" + Tile._i18n.header1ter + "</h1>"
                + "<input class=\"imagetoken\" type=\"checkbox\" id=\"timagetokenactive\" name=\"timagetokenactive\" onchange=\"Tile._preview();\"/><label for=\"timagetokenactive\">" + Tile._i18n.imagetokenactive + "</label>"
                + "<div class=\"field\">"
                    + "<label for=\"timagetoken\">" + Tile._i18n.imagetoken + "</label>"
                    + "<input id=\"timagetoken\" spellcheck='false' name=\"tileimagetoken\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"timagetokenlocation\">" + Tile._i18n.imagelocation + "</label>"
                    + "<div><input id=\"timagetokenlocation\" name=\"tileimagetokenlocation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"\"/></div>"
                    + "<div><input id=\"timagetokenlocation2\" name=\"tileimagetokenlocation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"timagetokenzoom\">" + Tile._i18n.imagezoom + "</label>"
                    + "<input id=\"timagetokenzoom\" name=\"tileimagetokenzoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagezoomPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"timagetokenrotation\">" + Tile._i18n.imagerotation + "</label>"
                    + "<input id=\"timagetokenrotation\" name=\"tileimagetokenrotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagerotationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<input class=\"imagetoken\" type=\"checkbox\" id=\"timagetoken2active\" name=\"timagetoken2active\" onchange=\"Tile._preview();\"/><label for=\"timagetoken2active\">" + Tile._i18n.imagetokenactive + "</label>"
                + "<div class=\"field\">"
                    + "<label for=\"timagetoken2\">" + Tile._i18n.imagetoken + "</label>"
                    + "<input id=\"timagetoken2\" spellcheck='false' name=\"tileimagetoken2\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"timagetoken2location\">" + Tile._i18n.imagelocation + "</label>"
                    + "<div><input id=\"timagetoken2location\" name=\"tileimagetoken2location\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"\"/></div>"
                    + "<div><input id=\"timagetoken2location2\" name=\"tileimagetoken2location2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"timagetoken2zoom\">" + Tile._i18n.imagezoom + "</label>"
                    + "<input id=\"timagetoken2zoom\" name=\"tileimagetoken2zoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagezoomPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"timagetoken2rotation\">" + Tile._i18n.imagerotation + "</label>"
                    + "<input id=\"timagetoken2rotation\" name=\"tileimagetoken2rotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n.imagerotationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
            + "</div>"
            + "<div class=\"tile-preview\">"
                + "<h1>" + Tile._i18n.header2 + "</h1>"
                + "<div class=\"preview\"></div>"
            + "</div>"
            + "</div>"
            + "</div>",
            null,
            actions
        );

        tile = tile || {
            id: Math.random(),
            name: "",
            color: "gray",
            movement: "",
            defense: "",
            attacktype: "contact",
            dices: { 0: "none", 1: "none", 2: "none", 3: "none" },
            skills: { 0: "none", 1: "none", 2: "none", 3: "none" },
            reinforcement: "",
            image: "",
            imagelocation: {x: "50", y: "50"},
            imagezoom: "100",
            imagerotation: "0",
            tokens: [                 
                { 
                    active: false,
                    image: "",
                    imagelocation: {x: "50", y: "50"}, 
                    imagezoom: "100",
                    imagerotation: "0" 
                },
                { 
                    active: false,
                    image: "",
                    imagelocation: {x: "50", y: "50"}, 
                    imagezoom: "100",
                    imagerotation: "0" 
                }
            ]
        };

        $("#tskills,#tskills2,#tskills3,#tskills4").each (function (i) {
            var k = $(this);
            k.attr("data-value", "")
             .on("change", function() {
                $(this).attr("data-value", this.value);
             })
        });
        $("#tdices,#tdices2,#tdices3,#tdices4,#tcolor").each (function (i) {
            var k = $(this);
            k.attr("data-value", "")
                .selectmenu({ appendTo: k.parent(), width: k.is(".dice") ? 40 : 58, change: function(event, selection) {
                    $(this).attr("data-value", selection.item.value);
                    Tile._preview();
                }});
        });
        Tile._card2form(tile);

        Tile._preview();
        
        $("#tname").focus();
    },    

    _form2card: function()
    {
        return {
            id: $(".dialog input[name=tilepos]")[0].value,
            name: $(".dialog input[name=tilename]")[0].value,
            color: $(".dialog select[name=tcolor]")[0].value,
            movement: $(".dialog input[name=tilemovement]")[0].value,
            defense: $(".dialog input[name=tiledefense]")[0].value,
            attacktype: $(".dialog input[name=tileattacktype]")[0].checked ? "ranged" : "contact",
            dices: { 0: $(".dialog select[name=tiledices1]")[0].value, 1: $(".dialog select[name=tiledices2]")[0].value, 2: $(".dialog select[name=tiledices3]")[0].value, 3: $(".dialog select[name=tiledices4]")[0].value },
            skills: { 0: $(".dialog select[name=tileskills1]")[0].value, 1: $(".dialog select[name=tileskills2]")[0].value, 2: $(".dialog select[name=tileskills3]")[0].value, 3: $(".dialog select[name=tileskills4]")[0].value },
            reinforcement: $(".dialog input[name=tilereinforcement]")[0].value,
            image: $(".dialog input[name=tileimage]")[0].value,
            imagelocation: {x: $(".dialog input[name=tileimagelocation]")[0].value, y: $(".dialog input[name=tileimagelocation2]")[0].value},
            imagezoom: $(".dialog input[name=tileimagezoom]")[0].value,
            imagerotation: $(".dialog input[name=tileimagerotation]")[0].value,
            tokens: [
                { 
                    active: $(".dialog input[name=timagetokenactive]")[0].checked,
                    image: $(".dialog input[name=tileimagetoken]")[0].value,
                    imagelocation: {x: $(".dialog input[name=tileimagetokenlocation]")[0].value, y: $(".dialog input[name=tileimagetokenlocation2]")[0].value}, 
                    imagezoom: $(".dialog input[name=tileimagetokenzoom]")[0].value,
                    imagerotation: $(".dialog input[name=tileimagetokenrotation]")[0].value
                },
                { 
                    active: $(".dialog input[name=timagetoken2active]")[0].checked,
                    image: $(".dialog input[name=tileimagetoken2]")[0].value,
                    imagelocation: {x: $(".dialog input[name=tileimagetoken2location]")[0].value, y: $(".dialog input[name=tileimagetoken2location2]")[0].value}, 
                    imagezoom: $(".dialog input[name=tileimagetoken2zoom]")[0].value,
                    imagerotation: $(".dialog input[name=tileimagetoken2rotation]")[0].value
                }
            ]
        }
    },
    _card2form: function(tile)
    {
        $(".dialog input[name=tilepos]")[0].value = tile.id;
        $(".dialog input[name=tilename]")[0].value = tile.name;
        $(".dialog select[name=tcolor]")[0].value = tile.color; $(".dialog select[name=tcolor]").attr("data-value", tile.color);
        $(".dialog input[name=tilemovement]")[0].value = tile.movement;
        $(".dialog input[name=tiledefense]")[0].value = tile.defense;
        $(".dialog input[name=tileattacktype]")[0].checked = tile.attacktype != 'contact';
        $(".dialog select[name=tiledices1]")[0].value = tile.dices['0']; $(".dialog select[name=tiledices1]").attr("data-value", tile.dices['0']);
        $(".dialog select[name=tiledices2]")[0].value = tile.dices['1']; $(".dialog select[name=tiledices2]").attr("data-value", tile.dices['1']);
        $(".dialog select[name=tiledices3]")[0].value = tile.dices['2']; $(".dialog select[name=tiledices3]").attr("data-value", tile.dices['2']);
        $(".dialog select[name=tiledices4]")[0].value = tile.dices['3']; $(".dialog select[name=tiledices4]").attr("data-value", tile.dices['3']);
        $(".dialog select[name=tileskills1]")[0].value = tile.skills['0']; $(".dialog select[name=tileskills1]").attr("data-value", tile.skills['0']);
        $(".dialog select[name=tileskills2]")[0].value = tile.skills['1']; $(".dialog select[name=tileskills2]").attr("data-value", tile.skills['1']);
        $(".dialog select[name=tileskills3]")[0].value = tile.skills['2']; $(".dialog select[name=tileskills3]").attr("data-value", tile.skills['2']);
        $(".dialog select[name=tileskills4]")[0].value = tile.skills['3']; $(".dialog select[name=tileskills4]").attr("data-value", tile.skills['3']);
        $(".dialog input[name=tilereinforcement]")[0].value = tile.reinforcement;
        $(".dialog input[name=tileimage]")[0].value = tile.image;
        $(".dialog input[name=tileimagelocation]")[0].value = tile.imagelocation.x;
        $(".dialog input[name=tileimagelocation2]")[0].value = tile.imagelocation.y;
        $(".dialog input[name=tileimagezoom]")[0].value = tile.imagezoom;
        $(".dialog input[name=tileimagerotation]")[0].value = tile.imagerotation;
        $(".dialog input[name=timagetokenactive]")[0].checked = tile.tokens && tile.tokens.length > 0 ? tile.tokens[0].active : false;
        $(".dialog input[name=tileimagetoken]")[0].value  = tile.tokens && tile.tokens.length > 0 ? tile.tokens[0].image || "" : "";
        $(".dialog input[name=tileimagetokenlocation]")[0].value = tile.tokens && tile.tokens.length > 0 ? tile.tokens[0].imagelocation.x : "50"; $(".dialog input[name=tileimagetokenlocation2]")[0].value = tile.tokens && tile.tokens.length > 0 ? tile.tokens[0].imagelocation.y : "50"; 
        $(".dialog input[name=tileimagetokenzoom]")[0].value = tile.tokens && tile.tokens.length > 0 ? tile.tokens[0].imagezoom : "100";
        $(".dialog input[name=tileimagetokenrotation]")[0].value = tile.tokens && tile.tokens.length > 0 ? tile.tokens[0].imagerotation : "0";
        $(".dialog input[name=timagetoken2active]")[0].checked = tile.tokens && tile.tokens.length > 1 ? tile.tokens[1].active : false;
        $(".dialog input[name=tileimagetoken2]")[0].value  = tile.tokens && tile.tokens.length > 1 ? tile.tokens[1].image || "" : "";
        $(".dialog input[name=tileimagetoken2location]")[0].value = tile.tokens && tile.tokens.length > 1 ? tile.tokens[1].imagelocation.x : "50"; $(".dialog input[name=tileimagetoken2location2]")[0].value = tile.tokens && tile.tokens.length > 1 ? tile.tokens[1].imagelocation.y : "50"; 
        $(".dialog input[name=tileimagetoken2zoom]")[0].value = tile.tokens && tile.tokens.length > 1 ? tile.tokens[1].imagezoom : "100";
        $(".dialog input[name=tileimagetoken2rotation]")[0].value = tile.tokens && tile.tokens.length > 1 ? tile.tokens[1].imagerotation : "0";
    },
    
    _checkForm: function(tile)
    {
        var errors = 0;
        if (!tile.name)
        {
            $(".dialog input[name=tilename]").parent().addClass("error");
            errors++;
        }
        return errors;
    },
    
    copyright: function()
    {
        return "<h3>" + Tile._i18n.tab + "</h3>"
            + "<p>" + Tile._i18n.copyright + "</p>"
    }    
});
