var HeroSheet = mergeObject(StudioItem, {
    name: 'hero',
    cls: 'HeroSheet',
    storage: Application + "_StudioHeroSheets",
    _itemWidth: 604,
    _itemHeight: 346.9,

    _maxSkills: 7,
    
    _printCode: function ()
    {
          return "<p class='subhint'>" + HeroSheet._i18n.printHint + "</p>";
    },
    
    _getDisplayItemsCode: function(withEditLink, printPurpose, data)
    {
        var html = "";

        var cards = data || JSON.parse(localStorage.getItem(this.storage)) || [];
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
                    prefix = "<input type='checkbox'" + (cards[i].prechecked ? " checked='checked'" : "") + " id='hero-" + i + "' name='hero' data-index='" + i + "' onchange=\"$('#hero-back-" + i + "').toggleClass('invisible');\"/><label for='hero-" + i + "'>";
                    suffix = "</label>";
                }

                html += prefix + "<div class='printoverflow'>" + HeroSheet._cardCode(cards[i], printPurpose) + "</div>" + suffix;
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
                html += "<div class='printoverflow back invisible' id='hero-back-" + i + "'>" + HeroSheet._cardCode(cards[i], printPurpose) + "</div>";
            }
        }

        return html;
    },

    _cardCode: function(sheet, printPurpose) {
        var code = "<div class=\"herosheet sheet\">";

        sheet.back = sheet.back || "gray";

        code += "<picture class=\"background-l1\">"
                    + "<source media=\"print\" srcset=\"studio/hero_sheet/img/background_layer_1-" + sheet.back + "-" + "hd.webp?version=" + Version + "\"/>"
                    + "<img src=\"studio/hero_sheet/img/background_layer_1-" + sheet.back + ".webp?version=" + Version + "\"/>"
                + "</picture>";

        if (sheet.image)
        {
            code += "<div class=\"image\"><img" + (!printPurpose ? LazyImage : "") + " src=\"" + sheet.image + "\" onload=\"this.style.minWidth = 0; this.style.opacity = 1;\" style=\"left: " + sheet.imagelocation.x + "%; top: " + sheet.imagelocation.y + "%; height: " + sheet.imagezoom + "%; transform: translate(0%, -50%) rotate(" + sheet.imagerotation + "deg)\"/></div>";
        }

        code += "<picture class=\"background-l3\">"
                    + "<source media=\"print\" srcset=\"studio/hero_sheet/img/background_layer_3hd.webp?version=" + Version + "\"/>"
                    + "<img src=\"studio/hero_sheet/img/background_layer_3.webp?version=" + Version + "\"/>"
                + "</picture>";

        if (sheet.name)
        {
            code += "<div class=\"name\">" + sheet.name + (sheet.subname ? "<span>" + sheet.subname + "</span>" : " ") + "</div>";
        }
        if (sheet.gem)
        {
            code += "<div class=\"gem\">" + sheet.gem + "</div>";
        }

        code += "<div class=\"skillline\">";
        if (sheet.encumbrance)
        {
            code += "<img class=\"background-encumbrance\" src=\"studio/hero_sheet/img/weight.webp?version=" + Version + "\"/>";
            code += "<div class=\"encumbrance\">" + sheet.encumbrance + "</div>";

            for (var s=0; s < sheet.skills.length; s++)
            {
                var skill = sheet.skills[s];
                var encyclopediaSkill = Rules._findSkillById(skill.id);

                code += "<div class=\"skill\">";
                    code += "<img class=\"skill\" src=\"" + encyclopediaSkill.image + "?version=" + Version + "\"/>";
                    if (skill.exertion)
                    {
                        code += "<img class=\"exertion\" src=\"studio/hero_sheet/img/skill_weight.webp?version=" + Version + "\"/>";
                        code += "<div class=\"exertion\">" + skill.exertion + "</div>";
                    }
                code += "</div>";
            }

            code += "<div class=\"encumbrance_movement-1\">" + sheet.encumbrance_movement[0] + "</div>";
            code += "<div class=\"encumbrance_movement-2\">" + sheet.encumbrance_movement[1] + "</div>";
        }
        code += "</div>";

        code += "<div class=\"base melee\">";
        code +=     "<div class=\"exertion\">" + sheet.melee.exertion + "</div>";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.melee.dice + ".webp?version=" + Version + "\"/></div>";
        code += "</div>";
        code += "<div class=\"base ranged\">";
        code +=     "<div class=\"exertion\">" + sheet.ranged.exertion + "</div>";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.ranged.dice + ".webp?version=" + Version + "\"/></div>";
        code += "</div>";
        code += "<div class=\"base defense\">";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.defense.dice + ".webp?version=" + Version + "\"/></div>";
        code += "</div>";
        code += "<div class=\"base movement\">";
        code +=     "<div class=\"exertion\">" + sheet.movement.exertion + "</div>";
        code +=     "<div class=\"dice\">" + sheet.movement.base + "</div>";
        code += "</div>";
        code += "<div class=\"base manipulation\">";
        code +=     "<div class=\"exertion\">" + sheet.manipulation.exertion + "</div>";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.manipulation.dice + ".webp?version=" + Version + "\"/></div>";
        code += "</div>";

        code += "</div>";
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
                + "<div class=\"field color\">"
                    + "<label for=\"hsback\">" + HeroSheet._i18n.color + "</label>"
                    + "<select id='hsback' name='sheetback' class='color'>"
                    +     "<option value='gray'>" + HeroSheet._i18n.colorGray + "</option>"
                    +     "<option value='blue'>" + HeroSheet._i18n.colorBlue + "</option>"
                    +     "<option value='none'>" + HeroSheet._i18n.colorNone + "</option>"
                    + "</select>"
                + "</div>"
                + "<div class=\"field gems\">"
                    + "<label for=\"hsgems\">" + HeroSheet._i18n.gems + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsgems\" name=\"sheetgems\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.gemsPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                + "<div class=\"field encumbrance\">"
                    + "<label for=\"hsencumbrance\">" + HeroSheet._i18n.encumbrance + "</label>"
                    + "<div class='encumbrance'>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsencumbrance\" name=\"sheetencumbrance\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.encumbrancePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "</div>"
                    + "<div class='encumbrancemov'>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsencumbrancemov1\" name=\"sheetencumbrancemov1\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.encumbrancemov1Ph + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsencumbrancemov2\" name=\"sheetencumbrancemov2\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.encumbrancemov2Ph + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "</div>"
                + "</div>"
                + "<div class=\"field caracs\">"
                    + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n.caracs + "</label>"
                    + "<div class='carac melee'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmeleeexertion\" name=\"sheetmeleeexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<select id=\"hscaracmeleedice\" class=\"dice\" name=\"sheetmeleedice\"><option value=\"red\">" + HeroSheet._i18n.diceRed + "</option><option value=\"redreroll\">" + HeroSheet._i18n.diceRedReroll + "</option><option value=\"orange\">" + HeroSheet._i18n.diceOrange + "</option><option value=\"orangereroll\">" + HeroSheet._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + HeroSheet._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + HeroSheet._i18n.diceYellowReroll + "</option></select>"
                    + "</div>"
                    + "<div class='carac ranged'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracrangedexertion\" name=\"sheetrangedexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<select id=\"hscaracrangeddice\" class=\"dice\" name=\"sheetrangeddice\"><option value=\"red\">" + HeroSheet._i18n.diceRed + "</option><option value=\"redreroll\">" + HeroSheet._i18n.diceRedReroll + "</option><option value=\"orange\">" + HeroSheet._i18n.diceOrange + "</option><option value=\"orangereroll\">" + HeroSheet._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + HeroSheet._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + HeroSheet._i18n.diceYellowReroll + "</option></select>"
                    + "</div>"
                    + "<div class='carac defense'>"
                        + "<select id=\"hscaracdefensedice\" class=\"dice\" name=\"sheetdefensedice\"><option value=\"red\">" + HeroSheet._i18n.diceRed + "</option><option value=\"redreroll\">" + HeroSheet._i18n.diceRedReroll + "</option><option value=\"orange\">" + HeroSheet._i18n.diceOrange + "</option><option value=\"orangereroll\">" + HeroSheet._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + HeroSheet._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + HeroSheet._i18n.diceYellowReroll + "</option></select>"
                    + "</div>"
                    + "<div class='carac movement'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmovementexertion\" name=\"sheetmovementexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmovement\" name=\"sheetmovement\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "</div>"
                    + "<div class='carac manipulation'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmanipulationexertion\" name=\"sheetmanipulationexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<select id=\"hscaracmanipulationdice\" class=\"dice\" name=\"sheetmanipulationdice\"><option value=\"red\">" + HeroSheet._i18n.diceRed + "</option><option value=\"redreroll\">" + HeroSheet._i18n.diceRedReroll + "</option><option value=\"orange\">" + HeroSheet._i18n.diceOrange + "</option><option value=\"orangereroll\">" + HeroSheet._i18n.diceOrangeReroll + "</option><option value=\"yellow\">" + HeroSheet._i18n.diceYellow + "</option><option value=\"yellowreroll\">" + HeroSheet._i18n.diceYellowReroll + "</option></select>"
                    + "</div>"
                + "</div>"
                + "<div class=\"field skills\">"
                    + "<label for=\"hsskills1\">" + HeroSheet._i18n.skills + "</label>"
                    + skills()
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
            + "<div class=\"sheet-preview\">"
                + "<h1>" + HeroSheet._i18n.header2 + "</h1>"
                + "<div class=\"preview\"></div>"
            + "</div>"
            + "</div>"
            + "</div>",
            null,
            actions
        );

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
            
            var s = "<div class='skill skill" + number + "'>"
                        + "<select id=\"hsskills" + number + "\" class=\"skills\" name=\"sheetskills" + number + "\" onchange=\"HeroSheet._preview();\"><option value=\"none\">" + HeroSheet._i18n.skillsNone + "</option>"; 

            for (var i in Encyclopedia.skills.types)
            {
                var type = Encyclopedia.skills.types[i];

                s += "<optgroup label=\"" + type.title + "\">";

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
                + "<input type=\"number\" min=\"0\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsskillexertion" + number + "\" name=\"sheetskillsexertion" + number + "\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n.skillsPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>";

            return s;
        }


        sheet = sheet || {
            id: Math.random(),
            name: "",
            subname: "",
            back: "gray",

            image: "",
            imagelocation: {x: "0", y: "50"},
            imagezoom: "100",
            imagerotation: "0",

            gem: 10,
            encumbrance: 10,
            encumbrance_movement: [8, 10],

            melee: { "dice": "yellow", "exertion": 3 },
            ranged: { "dice": "yellow", "exertion": 3 },
            defense: { "dice": "yellow" },
            movement: { "base": 2, "exertion": 4 },
            manipulation: { "dice": "yellow", "exertion": 3 },

            skills: []
        };

        $(".studiodialog .field.skills select.skills").each (function (i) {
            var k = $(this);
            k.parent().attr("data-value", "none");
            k.on("change", function() {
                $(this).parent().attr("data-value", this.value);
             })
        });

        $("#hscaracmeleedice, #hscaracrangeddice, #hscaracdefensedice, #hscaracmanipulationdice").each (function (i) {
            var k = $(this);
            k.attr("data-value", "")
                .selectmenu({ appendTo: k.parent(), width: k.is(".dice") ? 40 : 58, change: function(event, selection) {
                    $(this).attr("data-value", selection.item.value);
                    HeroSheet._preview();
                }});
        });
        $("#hsback").each (function (i) {
            var k = $(this);
            k.attr("data-value", "")
                .selectmenu({ appendTo: k.parent(), change: function(event, selection) {
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
        var skills = [];
        for (var i = 0; i < HeroSheet._maxSkills; i++)
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
        }

        return {
            id: $(".dialog input[name=sheetpos]")[0].value,
            name: $(".dialog input[name=sheetname]")[0].value,
            subname: $(".dialog input[name=sheetsubname]")[0].value,
            back: $(".dialog select[name=sheetback]")[0].value,
            image: $(".dialog input[name=sheetimage]")[0].value,
            imagelocation: {x: $(".dialog input[name=sheetimagelocation]")[0].value || "0", y: $(".dialog input[name=sheetimagelocation2]")[0].value || "50"},
            imagezoom: $(".dialog input[name=sheetimagezoom]")[0].value || "100",
            imagerotation: $(".dialog input[name=sheetimagerotation]")[0].value || "0",
            gem: parseInt($(".dialog input[name=sheetgems]")[0].value || 0),
            encumbrance: parseInt($(".dialog input[name=sheetencumbrance]")[0].value),
            encumbrance_movement: [parseInt($(".dialog input[name=sheetencumbrancemov1]")[0].value),parseInt($(".dialog input[name=sheetencumbrancemov2]")[0].value)],
            melee: { "dice": $(".dialog select[name=sheetmeleedice]")[0].value, "exertion": parseInt($(".dialog input[name=sheetmeleeexertion]")[0].value || 0) },
            ranged: { "dice": $(".dialog select[name=sheetrangeddice]")[0].value, "exertion": parseInt($(".dialog input[name=sheetrangedexertion]")[0].value || 0) },
            defense: { "dice": $(".dialog select[name=sheetdefensedice]")[0].value },
            movement: { "base": parseInt($(".dialog input[name=sheetmovement]")[0].value || 0), "exertion": parseInt($(".dialog input[name=sheetmovementexertion]")[0].value || 0) },
            manipulation: { "dice": $(".dialog select[name=sheetmanipulationdice]")[0].value, "exertion": parseInt($(".dialog input[name=sheetmanipulationexertion]")[0].value || 0) },
            skills: skills
        }
    },
    
    _card2form: function(sheet)
    {
        $(".dialog input[name=sheetpos]")[0].value = sheet.id;
        $(".dialog input[name=sheetname]")[0].value = sheet.name;
        $(".dialog input[name=sheetsubname]")[0].value = sheet.subname;
        $(".dialog select[name=sheetback]")[0].value = sheet.back; $(".dialog select[name=sheetback]").attr("data-value", sheet.back);
        $(".dialog input[name=sheetimage]")[0].value = sheet.image;
        $(".dialog input[name=sheetimagelocation]")[0].value = sheet.imagelocation.x;
        $(".dialog input[name=sheetimagelocation2]")[0].value = sheet.imagelocation.y;
        $(".dialog input[name=sheetimagezoom]")[0].value = sheet.imagezoom;
        $(".dialog input[name=sheetimagerotation]")[0].value = sheet.imagerotation;
        $(".dialog input[name=sheetgems]")[0].value = sheet.gem;
        $(".dialog input[name=sheetencumbrance]")[0].value = sheet.encumbrance;
        $(".dialog input[name=sheetencumbrancemov1]")[0].value = sheet.encumbrance_movement[0];
        $(".dialog input[name=sheetencumbrancemov2]")[0].value = sheet.encumbrance_movement[1];
        $(".dialog select[name=sheetmeleedice]")[0].value = sheet.melee.dice; $(".dialog select[name=sheetmeleedice]").attr("data-value",sheet.melee.dice);
        $(".dialog input[name=sheetmeleeexertion]")[0].value = sheet.melee.exertion;
        $(".dialog select[name=sheetrangeddice]")[0].value = sheet.ranged.dice; $(".dialog select[name=sheetrangeddice]").attr("data-value",sheet.ranged.dice);
        $(".dialog input[name=sheetrangedexertion]")[0].value = sheet.ranged.exertion;
        $(".dialog select[name=sheetdefensedice]")[0].value = sheet.defense.dice; $(".dialog select[name=sheetdefensedice]").attr("data-value",sheet.defense.dice);
        $(".dialog input[name=sheetmovement]")[0].value = sheet.movement.base;
        $(".dialog input[name=sheetmovementexertion]")[0].value = sheet.movement.exertion;
        $(".dialog select[name=sheetmanipulationdice]")[0].value = sheet.manipulation.dice; $(".dialog select[name=sheetmanipulationdice]").attr("data-value",sheet.manipulation.dice);
        $(".dialog input[name=sheetmanipulationexertion]")[0].value = sheet.manipulation.exertion;
        for (var i = 0; i < sheet.skills.length && i < HeroSheet._maxSkills; i++)
        {
            $(".dialog select[name=sheetskills" + (i+1) + "]")[0].value = sheet.skills[i].id;
            $(".dialog select[name=sheetskills" + (i+1) + "]").parent().attr("data-value", sheet.skills[i].id);
            $(".dialog input[name=sheetskillsexertion" + (i+1) + "]")[0].value = sheet.skills[i].exertion;
        }
    },

    _checkForm: function(sheet)
    {
        var errors = 0;
        if (!sheet.name)
        {
            $(".dialog input[name=sheetname]").parent().addClass("error");
            errors++;
        }
        if (!sheet.gem)
        {
            $(".dialog input[name=sheetgems]").parent().addClass("error");
            errors++;
        }
        if (!sheet.encumbrance || !sheet.encumbrance_movement[0] || !sheet.encumbrance_movement[1])
        {
            $(".dialog input[name=sheetencumbrance]").parent().parent().addClass("error");
            errors++;
        }
        if (!sheet.melee.exertion || !sheet.ranged.exertion || !sheet.movement.base || !sheet.movement.exertion || !sheet.manipulation.exertion)
        {
            $(".dialog .field.caracs").addClass("error");
            errors++;
        }
        return errors;
    },

    copyright: function()
    {
        return "<h3>" + HeroSheet._i18n.tab + "</h3>"
            + "<p>" + HeroSheet._i18n.copyright + "</p>"
    },
    
    importLabel: function(item) {
        return item.name + (item.subname ? " " + item.subname : "");
    }
});
