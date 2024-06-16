var HeroSheet = mergeObject(StudioItem, {
    name: 'hero',
    cls: 'HeroSheet',
    storage: Application + "_StudioHeroSheets",
    
    _itemWidth: 604,
    _itemHeight: 346.9,
    
    _maxSkills: 6,
    
    subinit: function() {
        About.addPreference("studio-heroes-showboard", Studio._i18n.menu, HeroSheet._i18n.prefShowBoard, 'boolean', 'true');
    },
    
    _printCode: function ()
    {
          return "<p class='subhint'>" + HeroSheet._i18n.printHint + "</p>";
    },
    
    _getDisplayItemsCode: function(withEditLink, printPurpose)
    {
        var html = "";

        var cards = JSON.parse(localStorage.getItem(this.storage)) || [];
        if (cards.length > 0)
        {
            for (var i in cards)
            {
                var prefix = "", suffix = "";
                if (withEditLink !== false)
                {
                    prefix = "<a href='javascript:void(0)' onclick='HeroSheet.add(JSON.parse(localStorage.getItem(\"" + this.storage + "\"))[" + i + "])'>";
                    suffix = "</a>";
                }
                else
                {
                    prefix = "<input type='checkbox' id='herosheet-" + i + "' name='herosheet' data-index='" + i + "' onchange=\"$('#herosheet-back-" + i + "').toggleClass('invisible');\"/><label for='herosheet-" + i + "'>";
                    suffix = "</label>";
                }

                html += prefix + "<div class='printoverflow'>" + HeroSheet._cardCode(cards[i], printPurpose, false) + "</div>" + suffix;
            }
        }
        else
        {
            html += "<div class=\"nocards\">" + HeroSheet._i18n.nocard + (withEditLink !== false ? HeroSheet._i18n.nocard2 : '') + "</div>";
        }

        if (!withEditLink)
        {
            for (var i in cards)
            {
                html += "<div class='printoverflow back invisible' id='herosheet-back-" + i + "'>" + HeroSheet._cardCode(cards[i], printPurpose, false) + "</div>";
            }
        }

        return html;
    },

    _cardCode: function(sheet, printPurpose, andBack) {
        var code = "<div class='herosheet sheet " + sheet.type + (About.getPreference("studio-heroes-showboard") === "true" ? " withboard" : "") + "'><div>";

        code += "<div class='background'><img src='studio/hero_sheet/img/sheet_" + sheet.type + ".webp?version=" + Version + "'/></div>"

        if (sheet.name)
        {
            code += "<div class='name" + (sheet.subname ? ' subname' : '') + "'>" + sheet.name + (sheet.subname ? "<span>" + sheet.subname + "</span>" : " ") + "</div>";
        }
        if (sheet.gem)
        {
            code += "<div class='gem'>" + sheet.gem + "</div>";
        }
        
        code += "<div class='gems'>";
        code +=     "<span class='total'>" + sheet.gems.total + "</span>";
        code +=     "<span class='active'>" + sheet.gems.active + "</span>";
        code +=     "<span class='rest'>" + sheet.gems.rest + "</span>";
        code += "</div>";

        code += "<div class='move'>";
        code +=     "<span class='free'>" + sheet.move.free + "</span>";
        if (sheet.move.weight.length > 1)
        {
            code +=     "<img class='bg' src='studio/hero_sheet/img/walk" + sheet.move.weight.length + "_" + sheet.type + ".webp?version=" + Version + "'/>";
        }
        if (sheet.move.weight.length > 0 && sheet.move.free > 0) code +=     "<span class='weight weight1'>" + sheet.move.weight[0] + "</span>" + "<span class='value value1'>" + (sheet.move.free - 1) + "</span>";
        if (sheet.move.weight.length > 1 && sheet.move.free > 1) code +=     "<span class='weight weight2'>" + sheet.move.weight[1] + "</span>" + "<span class='value value2'>" + (sheet.move.free - 2) + "</span>";
        if (sheet.move.weight.length > 2 && sheet.move.free > 2) code +=     "<span class='weight weight3'>" + sheet.move.weight[2] + "</span>" + "<span class='value value3'>" + (sheet.move.free - 3) + "</span>";
        code += "</div>";
        
        code += "<div class='carac melee'>";
        code +=     "<img class='dice' src='resources/img/dice_" + sheet.caracs.melee.dice + ".webp?version=" + Version + "'/>";
        code +=     "<span class='exertion'>" + sheet.caracs.melee.exertion + "</span>";
        code += "</div>";
        code += "<div class='carac ranged'>";
        code +=     "<img class='dice' src='resources/img/dice_" + sheet.caracs.ranged.dice + ".webp?version=" + Version + "'/>";
        code +=     "<span class='exertion'>" + sheet.caracs.ranged.exertion + "</span>";
        code += "</div>";
        code += "<div class='carac manipulation'>";
        code +=     "<img class='dice' src='resources/img/dice_" + sheet.caracs.manipulation.dice + ".webp?version=" + Version + "'/>";
        code +=     "<span class='exertion'>" + sheet.caracs.manipulation.exertion + "</span>";
        code += "</div>";
        code += "<div class='carac thought'>";
        code +=     "<img class='dice' src='resources/img/dice_" + sheet.caracs.thought.dice + ".webp?version=" + Version + "'/>";
        code +=     "<span class='exertion'>" + sheet.caracs.thought.exertion + "</span>";
        code += "</div>";
        code += "<div class='carac right defense'>";
        code +=     "<img class='dice' src='resources/img/dice_" + sheet.caracs.defense.dice + ".webp?version=" + Version + "'/>";
        code +=     "<span class='exertion'>" + sheet.caracs.defense.exertion + "</span>";
        code += "</div>";
        code += "<div class='carac right reroll'>";
        code +=     "<span class='exertion'>" + sheet.caracs.reroll.exertion + "</span>";
        code += "</div>";
        code += "<div class='carac right move'>";
        code +=     "<span class='exertion'>" + sheet.move.exertion + "</span>";
        code +=     "<span class='gemfactor'>" + sheet.move.gemfactor + "</span>";
        code += "</div>";

        if (sheet.caracs.defense.passive)
        {
            code += "<div class='passivedefense'>";
            code +=     "<img class='bg' src='studio/hero_sheet/img/armor_" + sheet.type + ".webp?version=" + Version + "'/>";
            code +=     "<img class='dice' src='resources/img/dice_" + sheet.caracs.defense.passive + ".webp?version=" + Version + "'/>";
            code += "</div>";
        }
        
        code += "<div class='topright'>";
        code +=     "<span class='menace'>" + sheet.menace + "</span>";
        code +=     "<span class='size'>" + sheet.size + "</span>";
        if (sheet.belt)
        {
            code +=     "<img class='bg' src='studio/hero_sheet/img/belt_" + sheet.type + ".webp?version=" + Version + "'/>";
            code +=     "<span class='belt'>" + sheet.belt + "</span>";
        }
        code += "</div>";
        
        if (sheet.image)
        {
            code += "<div class=\"image\"><img" + (!printPurpose ? LazyImage : "") + " src=\"" + sheet.image + "\" onload=\"this.style.minWidth = 0; this.style.opacity = 1;\" style=\"left: " + sheet.imagelocation.x + "%; top: " + sheet.imagelocation.y + "%; height: " + sheet.imagezoom + "%; transform: translate(-50%, -50%) rotate(" + sheet.imagerotation + "deg)\"/></div>";
        }


        
        code += "</div></div>";
        
        if (andBack !== false)
        {
            code += "<div class='herosheet sheet back " + sheet.type + "'><div>";
                code += "<div class='background'>"
                         + "<img src='studio/hero_sheet/img/sheet_back_l1_" + sheet.type + ".webp?version=" + Version + "'/>";

            if (sheet.image || sheet.image2)
            {
                code += "<div class=\"image\"><img" + (!printPurpose ? LazyImage : "") + " src=\"" + (sheet.image2 || sheet.image) + "\" onload=\"this.style.minWidth = 0; this.style.opacity = 1;\" style=\"left: " + sheet.imagelocation2.x + "%; top: " + sheet.imagelocation2.y + "%; height: " + sheet.imagezoom2 + "%; transform: translate(0, -50%) rotate(" + sheet.imagerotation2 + "deg)\"/></div>";
            }


                code += "<img src='studio/hero_sheet/img/sheet_back_l2_" + sheet.type + ".webp?version=" + Version + "'/>"
                     + "</div>"
            if (sheet.name)
            {
                code += "<div class='name" + (sheet.subname ? ' subname' : '') + "'>" + sheet.name + (sheet.subname ? "<span>" + sheet.subname + "</span>" : " ") + "</div>";
            }
            if (sheet.identity)
            {
                code += "<div class='identity'>" + sheet.identity + "</div>";
            }
            if (sheet.measurement)
            {
                if (sheet.measurement.size)
                {
                    var sizeInFt = sheet.measurement.size * 3.28084;
                    var sizeInIn = Math.round( (sizeInFt - Math.floor(sizeInFt)) * 12 ); 
                    code += "<div class='measurementsize'>" + Math.floor(sizeInFt) + "ft " + sizeInIn + "in / " + sheet.measurement.size + " m</div>";
                }
                if (sheet.measurement.weight)
                {
                    code += "<div class='measurementweight'>" + Math.round(sheet.measurement.weight * 2.20462) + " lbs / " + sheet.measurement.weight + " Kg</div>";
                }
            }
            if (sheet.description)
            {
                if (sheet.description.en)
                {
                    code += "<div class='description en'>" + sheet.description.en + "</div>";
                }
                if (sheet.description.fr)
                {
                    code += "<div class='description fr'>" + sheet.description.fr + "</div>";
                }
            }
            code += "</div></div>";
        }
        
        return code;
    },

    _add: function(sheet, dlabel, actions)
    {
        Nav.dialog(dlabel,
            "<div class=\"studiodialog\">"
            + "<div class=\"hscol\">"
            + "<div class=\"sheet\">"
                + "<h1>" + HeroSheet._i18n.header1 + "</h1>"
                + "<input type=\"hidden\" name=\"sheetpos\"/>"
                
                + "<div class=\"field name\">"
                    + "<label for=\"hsname\">" + HeroSheet._i18n.name + "</label>"
                    + "<input id=\"hsname\" spellcheck='false' name=\"sheetname\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.namePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<input id=\"hssubname\" spellcheck='false' name=\"sheetsubname\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.subnamePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"

                + "<div class=\"field type\">"
                    + "<label for=\"hstype\">" + HeroSheet._i18n.type + "</label>"
                    + "<select id='hstype' name='sheettype' onchange='HeroSheet._preview();'>"
                        + "<option value='hero'>" + HeroSheet._i18n.typeHero + "</option>" 
                        + "<option value='villain'>" + HeroSheet._i18n.typeVillain + "</option>" 
                    + "</select>"
                + "</div>"

                + "<div class=\"field gems\">"
                    + "<label for=\"hsgems\">" + HeroSheet._i18n.gems + "</label>"
                    + "<label for=\"hsgems\">" + HeroSheet._i18n.gems1 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsgems\" name=\"sheetgems\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.gemsPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsgems2\">" + HeroSheet._i18n.gems2 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsgems2\" name=\"sheetgems2\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.gems2Ph + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsgems3\">" + HeroSheet._i18n.gems3 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsgems3\" name=\"sheetgems3\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.gems3Ph + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                
                + "<div class=\"field move\">"
                    + "<label for=\"hsmove\">" + HeroSheet._i18n.move + "</label>"
                    + "<label for=\"hsmove\">" + HeroSheet._i18n.move1 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmove\" name=\"sheetmove\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsmove\">" + HeroSheet._i18n.move5 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmoveexertion\" name=\"sheetmoveexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsmove\">" + HeroSheet._i18n.move6 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmovegemfactor\" name=\"sheetmovegemfactor\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsmove\">" + HeroSheet._i18n.move2 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmove2encumbrance\" name=\"sheetmove2encumbrance\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsmove\">" + HeroSheet._i18n.move3 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmove3encumbrance\" name=\"sheetmove3encumbrance\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsmove\">" + HeroSheet._i18n.move4 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmove4encumbrance\" name=\"sheetmove4encumbrance\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"

                + "</div>"

                + "<div class=\"field index\">"
                    + "<label for=\"hsbelt\">" + HeroSheet._i18n.misc + "</label>"
                    + "<label for=\"hsbelt\">" + HeroSheet._i18n.belt + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsbelt\" name=\"sheetbelt\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.beltPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hssize\">" + HeroSheet._i18n.size + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hssize\" name=\"sheetsize\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.sizePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsmenace\">" + HeroSheet._i18n.menace + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmenace\" name=\"sheetmenace\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.menacePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsmeasurementsize\">" + HeroSheet._i18n.measurementsize + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"0.1\" id=\"hsmeasurementsize\" name=\"sheetmeasurementsize\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.measurementsizePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsmeasurementweight\">" + HeroSheet._i18n.measurementweight + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"999\" step=\"1\" maxlength=\"2\" id=\"hsmeasurementweight\" name=\"sheetmeasurementweight\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.measurementweightPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"

                + "<div class=\"field caracs\">"
                    + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n.caracs + "</label>"
                    + "<div class='carac'>"
                        + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n.melee + "</label>"
                        + dices("melee")
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmeleeexertion\" name=\"sheetmeleeexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n.ranged + "</label>"
                        + dices("ranged")
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracrangedexertion\" name=\"sheetrangedexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "</div>"
                    + "<div class='carac'>"
                        + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n.manipulation + "</label>"
                        + dices("manipulation")
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmanipulationexertion\" name=\"sheetmanipulationexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n.thought + "</label>"
                        + dices("thought")
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracthoughtexertion\" name=\"sheetthoughtexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "</div>"
                    + "<div class='carac defense'>"
                        + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n.defense + "</label>"
                        + dices("defense")
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracdefenseexertion\" name=\"sheetdefenseexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n.defensepassive + "</label>"
                        + dices("defensepassive", true)
                    + "</div>"
                    + "<div class='carac reroll'>"
                        + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n.reroll + "</label>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracrerollexertion\" name=\"sheetrerollexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "</div>"
                + "</div>"

                + "<div class=\"field skills\">"
                    + "<label for=\"hsskills1\">" + HeroSheet._i18n.skills + "</label>"
                    + skills()
                + "</div>"
                
                + "<div class=\"field id\">"
                    + "<label for=\"hsid\">" + HeroSheet._i18n.id + "</label>"
                    + "<input id=\"hsid\" spellcheck='false' name=\"sheetid\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.idPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                
                + "<div class=\"field description\">"
                    + "<label for=\"hsdescriptionen\">" + HeroSheet._i18n.description + "</label>"
                    + "<label for=\"hsdescriptionen\">" + HeroSheet._i18n.descriptionEn + "</label>"
                    + "<textarea id=\"hsdescriptionen\" spellcheck='false' name=\"sheetdescriptionen\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.descriptionEnPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"></textarea>"
                    + "<label for=\"hsdescriptionfr\">" + HeroSheet._i18n.descriptionFr + "</label>"
                    + "<textarea id=\"hsdescriptionfr\" spellcheck='false' name=\"sheetdescriptionfr\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.descriptionFrPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"></textarea>"
                + "</div>"
                
            + "</div>"
            + "</div>"
            + "<div class=\"hscol\">"
            + "<div class=\"sheet\">"
                + "<h1>" + HeroSheet._i18n.header1bis + "</h1>"
                + "<div class=\"field\">"
                    + "<label for=\"hsimage\">" + HeroSheet._i18n.image + "</label>"
                    + "<input id=\"hsimage\" name=\"sheetimage\" spellcheck='false' autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.imagePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"hsimagelocation\">" + HeroSheet._i18n.imagelocation + "</label>"
                    + "<div><input id=\"hsimagelocation\" name=\"sheetimagelocation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.imagelocationPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"\"/></div>"
                    + "<div><input id=\"hsimagelocation2\" name=\"sheetimagelocation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.imagelocationPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"hsimagezoom\">" + HeroSheet._i18n.imagezoom + "</label>"
                    + "<input id=\"hsimagezoom\" name=\"sheetimagezoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.imagezoomPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"hsimagerotation\">" + HeroSheet._i18n.imagerotation + "</label>"
                    + "<input id=\"hsimagerotation\" name=\"sheetimagerotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.imagerotationPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
            + "</div>"
            + "<div class=\"sheet\">"
                + "<h1>" + HeroSheet._i18n.header1ter + "</h1>"
                + "<div class=\"field\">"
                    + "<label for=\"hsimage2\">" + HeroSheet._i18n.image + "</label>"
                    + "<input id=\"hsimage2\" name=\"sheetimage2\" spellcheck='false' autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.imagePh2 + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"hsimagelocation3\">" + HeroSheet._i18n.imagelocation + "</label>"
                    + "<div><input id=\"hsimagelocation3\" name=\"sheetimagelocation3\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.imagelocationPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"\"/></div>"
                    + "<div><input id=\"hsimagelocation4\" name=\"sheetimagelocation4\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.imagelocationPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"hsimagezoom2\">" + HeroSheet._i18n.imagezoom + "</label>"
                    + "<input id=\"hsimagezoom2\" name=\"sheetimagezoom2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.imagezoomPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"hsimagerotation2\">" + HeroSheet._i18n.imagerotation + "</label>"
                    + "<input id=\"hsimagerotation2\" name=\"sheetimagerotation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.imagerotationPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
            + "</div>"
            + "<div class=\"sheet-preview\">"
                + "<h1>" + HeroSheet._i18n.header2 + "</h1>"
                + "<div class=\"preview\"></div>"
            + "</div>"
            + "</div>"
            + "</div>",
            null,
            actions
        );

        function dices(id, empty)
        {
            return "<select id=\"hscarac" + id + "dice\" class=\"dice\" name=\"sheet" + id + "dice\">"
                   + "<option value=\"black\">" + HeroSheet._i18n.diceBlack + "</option><option value=\"blackreroll\">" + HeroSheet._i18n.diceBlackReroll + "</option><option value=\"red\">" + HeroSheet._i18n.diceRed + "</option><option value=\"redreroll\">" + HeroSheet._i18n.diceRedReroll + "</option><option value=\"orange\">" + HeroSheet._i18n.diceOrange + "</option><option value=\"orangereroll\">" + HeroSheet._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + HeroSheet._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + HeroSheet._i18n.diceYellowReroll + "</option><option value=\"white\">" + HeroSheet._i18n.diceWhite + "</option><option value=\"whitereroll\">" + HeroSheet._i18n.diceWhiteReroll + "</option>"
                   + (empty ? "<option value=''>-</option>" : "")
                   + "</select>";
        }

        function skills(number)
        {
            if (number == undefined)
            {
                let as = '';
                for (var i = 1; i <= HeroSheet._maxSkills; i++)
                {
                    as += skills(i);
                }
                return as;
            }
            
            let s = "<div class='skill skill" + number + "'>" 
                    + "<select id=\"hsskills" + number + "\" class=\"skills\" name=\"sheetskills" + number + "\" onchange=\"HeroSheet._preview();\"><option value=\"none\">" + HeroSheet._i18n.skillsNone + "</option>";
            
            for (var i in Encyclopedia.skills.types)
            {
                var type = Encyclopedia.skills.types[i];

                s += "<optgroup label=\"" + type.title + "\" data-exertion='" + (type.exertion === false ? "false" : "true") + "' data-level='" + (type.level === false ? "false" : "true") + "' data-position='" + (!type.location ? "true" : "false") + "'>";

                for (var j in Encyclopedia.skills.list)
                {
                    var skill = Encyclopedia.skills.list[j];
                    if (skill.type == type.id)
                    {
                        s += "<option value=\"" + skill.id + "\">" + skill.title + "</option>";
                    }
                }
                
                s += "</optgroup>"
            }
            
            s += "</select>"
                 + "<input data-type='exertion' type=\"number\" min=\"0\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsskillexertion" + number + "\" name=\"sheetskillsexertion" + number + "\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.skillsPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                 + "<input data-type='level' type=\"number\" min=\"0\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsskilllevel" + number + "\" name=\"sheetskillslevel" + number + "\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.skillsPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                 + "<select data-type='position' class='skillposition' id='hsskillsposition" + number + "' name='sheetskillsposition" + number + "'>"
                 +     "<option value='0' selected>Haut gauche</option>"
                 +     "<option value='1'>Gauche</option>"
                 +     "<option value='2'>Bas gauche</option>"
                 +     "<option value='3'>Haut droite</option>"
                 +     "<option value='4'>Droite</option>"
                 +     "<option value='4'>Bas droite</option>"
                 + "</select>"
                 + "</div>";
            return s;
        }


        sheet = sheet || {
            id: Math.random(),
            name: "",
            subname: "",
            type: "hero",
            
            image: "",
            imagelocation: {x: "50", y: "50"},
            imagezoom: "100",
            imagerotation: "0",

            image2: "",
            imagelocation2: {x: "0", y: "50"},
            imagezoom2: "100",
            imagerotation2: "0",
            
            identity: "",
            measurement: {
                size: 0,
                weight: 0
            },
            description: {
                en: "",
                fr: ""
            },
            
            gems: {
            	total: 10,
            	active: 2,
            	rest: 5
            },
            move: {
            	free: 2,
            	exertion: 4,
            	gemfactor: 1,
            	weight: [4 ,6] 
            },
            belt: 0,
            size: 1,
            menace: 1,
            
            caracs: {
            	melee: {
            		exertion: 4,
            		dice: 'orange'
            	},
	        	ranged: {
	        		exertion: 4,
	        		dice: 'orange'
	        	},
	        	manipulation: {
	        		exertion: 4,
	        		dice: 'orange'
	        	},
	        	thought: {
	        		exertion: 4,
	        		dice: 'orange'
	        	},
	        	defense: {
	        		exertion: 4,
	        		dice: 'orange',
		        	passive: ''
	        	},
	        	reroll: {
	        		exertion: 4
	        	}
            }
        };

        $(".studiodialog .field.skills select.skills").each (function (i) {
            var k = $(this);
            k.parent().attr("data-value", "none");
            k.parent().attr("data-exertion", "false");
            k.parent().attr("data-level", "false");
            k.parent().attr("data-position", "false");
            k.on("change", function() {
                $(this).parent().attr("data-value", this.value);
                $(this).parent().attr("data-exertion", $(this).find("option[value=" + this.value + "]").parent().attr("data-exertion"));
                $(this).parent().attr("data-level", $(this).find("option[value=" + this.value + "]").parent().attr("data-level"));
                $(this).parent().attr("data-position", $(this).find("option[value=" + this.value + "]").parent().attr("data-position"));
             })
        });

        $(".studiodialog .field.caracs select.dice").each (function (i) {
            var k = $(this);
            k.attr("data-value", "black")
                .selectmenu({ appendTo: k.parent(), width: k.is(".dice") ? 40 : 58, change: function(event, selection) {
                    $(this).attr("data-value", selection.item.value);
                    HeroSheet._preview();
                }});
        });

        HeroSheet._card2form(sheet);

        HeroSheet._preview();
        
        $("#hsname").focus();
    },

    _form2card: function()
    {
        /*var skills = [];
        for (var i = 0; i < 5; i++)
        {
            var id = $(".dialog select[name=sheetskills" + (i+1) + "]")[0].value;
            var exertion = parseInt($(".dialog input[name=sheetskillsexertion" + (i+1) + "]")[0].value || 0);

            if (id != 'none')
            {
                var skill = {id: id};
                if (exertion != 0)
                {
                    skill.exertion = exertion;
                }

                skills.push(skill);
            }
        }*/
    	
    	function arrayFromNonNull(...values)
    	{
    		let array = [];
    		values.forEach(function(v) { if (v) array.push(v) });
    		return array;
    	}

        return {
            id: $(".dialog input[name=sheetpos]")[0].value,
            name: $(".dialog input[name=sheetname]")[0].value,
            subname: $(".dialog input[name=sheetsubname]")[0].value,
            type: $(".dialog select[name=sheettype]")[0].value,
            image: $(".dialog input[name=sheetimage]")[0].value,
            imagelocation: {x: $(".dialog input[name=sheetimagelocation]")[0].value || "0", y: $(".dialog input[name=sheetimagelocation2]")[0].value || "50"},
            imagezoom: $(".dialog input[name=sheetimagezoom]")[0].value || "100",
            imagerotation: $(".dialog input[name=sheetimagerotation]")[0].value || "0",
            image2: $(".dialog input[name=sheetimage2]")[0].value,
            imagelocation2: {x: $(".dialog input[name=sheetimagelocation3]")[0].value || "0", y: $(".dialog input[name=sheetimagelocation4]")[0].value || "50"},
            imagezoom2: $(".dialog input[name=sheetimagezoom2]")[0].value || "100",
            imagerotation2: $(".dialog input[name=sheetimagerotation2]")[0].value || "0",
            
            identity: $(".dialog input[name=sheetid]")[0].value,
            measurement: {
                size: parseFloat($(".dialog input[name=sheetmeasurementsize]")[0].value || 0),
                weight: parseFloat($(".dialog input[name=sheetmeasurementweight]")[0].value || 0)
            },
            description: {
                en: $(".dialog textarea[name=sheetdescriptionen]").val(),
                fr: $(".dialog textarea[name=sheetdescriptionfr]").val()
            },
                        
            gems: {
            	total: parseInt($(".dialog input[name=sheetgems]")[0].value || 0),
            	active: parseInt($(".dialog input[name=sheetgems2]")[0].value || 0),
            	rest: parseInt($(".dialog input[name=sheetgems3]")[0].value || 0)
            },
            move: {
            	free: parseInt($(".dialog input[name=sheetmove]")[0].value || 0),
            	exertion: parseInt($(".dialog input[name=sheetmoveexertion]")[0].value || 0),
            	gemfactor: parseInt($(".dialog input[name=sheetmovegemfactor]")[0].value || 0),
            	weight: arrayFromNonNull(parseInt($(".dialog input[name=sheetmove2encumbrance]")[0].value), parseInt($(".dialog input[name=sheetmove3encumbrance]")[0].value), parseInt($(".dialog input[name=sheetmove4encumbrance]")[0].value))
            },
            belt: parseInt($(".dialog input[name=sheetbelt]")[0].value || 0),
            size: parseInt($(".dialog input[name=sheetsize]")[0].value || 0),
            menace: parseInt($(".dialog input[name=sheetmenace]")[0].value || 0),
            caracs: {
            	melee: {
            		exertion: parseInt($(".dialog input[name=sheetmeleeexertion]")[0].value || 0),
            		dice: $(".dialog select[name=sheetmeleedice]")[0].value
            	},
	        	ranged: {
            		exertion: parseInt($(".dialog input[name=sheetrangedexertion]")[0].value || 0),
            		dice: $(".dialog select[name=sheetrangeddice]")[0].value
	        	},
	        	manipulation: {
            		exertion: parseInt($(".dialog input[name=sheetmanipulationexertion]")[0].value || 0),
            		dice: $(".dialog select[name=sheetmanipulationdice]")[0].value
	        	},
	        	thought: {
            		exertion: parseInt($(".dialog input[name=sheetthoughtexertion]")[0].value || 0),
            		dice: $(".dialog select[name=sheetthoughtdice]")[0].value
	        	},
	        	defense: {
            		exertion: parseInt($(".dialog input[name=sheetdefenseexertion]")[0].value || 0),
            		dice: $(".dialog select[name=sheetdefensedice]")[0].value,
		        	passive: $(".dialog select[name=sheetdefensepassivedice]")[0].value
	        	},
	        	reroll: {
	        		exertion: parseInt($(".dialog input[name=sheetrerollexertion]")[0].value || 0)
	        	}
            }
        }
    },
    
    _card2form: function(sheet)
    {
        $(".dialog input[name=sheetpos]")[0].value = sheet.id;
        $(".dialog input[name=sheetname]")[0].value = sheet.name;
        $(".dialog input[name=sheetsubname]")[0].value = sheet.subname;
        $(".dialog select[name=sheettype]")[0].value = sheet.type;
        $(".dialog input[name=sheetimage]")[0].value = sheet.image;
        $(".dialog input[name=sheetimagelocation]")[0].value = sheet.imagelocation.x;
        $(".dialog input[name=sheetimagelocation2]")[0].value = sheet.imagelocation.y;
        $(".dialog input[name=sheetimagezoom]")[0].value = sheet.imagezoom;
        $(".dialog input[name=sheetimagerotation]")[0].value = sheet.imagerotation;
        $(".dialog input[name=sheetimage2]")[0].value = sheet.image2;
        $(".dialog input[name=sheetimagelocation3]")[0].value = sheet.imagelocation2.x;
        $(".dialog input[name=sheetimagelocation4]")[0].value = sheet.imagelocation2.y;
        $(".dialog input[name=sheetimagezoom2]")[0].value = sheet.imagezoom2;
        $(".dialog input[name=sheetimagerotation2]")[0].value = sheet.imagerotation2;
        $(".dialog input[name=sheetid]")[0].value = sheet.identity || "";
        $(".dialog input[name=sheetmeasurementsize]")[0].value = sheet.measurement.size;
        $(".dialog input[name=sheetmeasurementweight]")[0].value = sheet.measurement.weight;
        $(".dialog textarea[name=sheetdescriptionen]").val(sheet.description.en);
        $(".dialog textarea[name=sheetdescriptionfr]").val(sheet.description.fr);
        $(".dialog input[name=sheetgems]")[0].value = sheet.gems.total;
        $(".dialog input[name=sheetgems2]")[0].value = sheet.gems.active;
        $(".dialog input[name=sheetgems3]")[0].value = sheet.gems.rest;
        $(".dialog input[name=sheetmove]")[0].value = sheet.move.free;
        $(".dialog input[name=sheetmoveexertion]")[0].value = sheet.move.exertion;
        $(".dialog input[name=sheetmovegemfactor]")[0].value = sheet.move.gemfactor;
        $(".dialog input[name=sheetmove2encumbrance]")[0].value = sheet.move.weight[0] || "";
        $(".dialog input[name=sheetmove3encumbrance]")[0].value = sheet.move.weight[1] || "";
        $(".dialog input[name=sheetmove4encumbrance]")[0].value = sheet.move.weight[2] || "";
        $(".dialog input[name=sheetbelt]")[0].value = sheet.belt;
        $(".dialog input[name=sheetsize]")[0].value = sheet.menace;
        $(".dialog input[name=sheetmenace]")[0].value = sheet.size;
        $(".dialog input[name=sheetmeleeexertion]")[0].value = sheet.caracs.melee.exertion;
        $(".dialog select[name=sheetmeleedice]")[0].value = sheet.caracs.melee.dice; $(".dialog select[name=sheetmeleedice]").attr("data-value",sheet.caracs.melee.dice);
        $(".dialog input[name=sheetrangedexertion]")[0].value = sheet.caracs.ranged.exertion;
        $(".dialog select[name=sheetrangeddice]")[0].value = sheet.caracs.ranged.dice; $(".dialog select[name=sheetrangeddice]").attr("data-value",sheet.caracs.ranged.dice);
        $(".dialog input[name=sheetmanipulationexertion]")[0].value = sheet.caracs.manipulation.exertion;
        $(".dialog select[name=sheetmanipulationdice]")[0].value = sheet.caracs.manipulation.dice; $(".dialog select[name=sheetmanipulationdice]").attr("data-value",sheet.caracs.manipulation.dice);
        $(".dialog input[name=sheetthoughtexertion]")[0].value = sheet.caracs.thought.exertion;
        $(".dialog select[name=sheetthoughtdice]")[0].value = sheet.caracs.thought.dice; $(".dialog select[name=sheetthoughtdice]").attr("data-value",sheet.caracs.thought.dice);
        $(".dialog input[name=sheetdefenseexertion]")[0].value = sheet.caracs.defense.exertion;
        $(".dialog select[name=sheetdefensedice]")[0].value = sheet.caracs.defense.dice; $(".dialog select[name=sheetdefensedice]").attr("data-value",sheet.caracs.defense.dice);
        $(".dialog select[name=sheetdefensepassivedice]")[0].value = sheet.caracs.defense.passive; $(".dialog select[name=sheetdefensepassivedice]").attr("data-value",sheet.caracs.defense.passive);
        $(".dialog input[name=sheetrerollexertion]")[0].value = sheet.caracs.reroll.exertion;
    },

    _checkForm: function(sheet)
    {
        var errors = 0;
        if (!sheet.name)
        {
            $(".dialog input[name=sheetname]").parent().addClass("error");
            errors++;
        }
        if (!sheet.gems.total || !sheet.gems.active || !sheet.gems.rest)
        {
            $(".dialog input[name=sheetgems]").parent().addClass("error");
            errors++;
        }
        return errors;
    },

    copyright: function()
    {
        return "<h3>" + HeroSheet._i18n.tab + "</h3>"
            + "<p>" + HeroSheet._i18n.copyright + "</p>"
    }
});
