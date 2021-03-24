var HeroSheet = mergeObject(StudioItem, {
    name: 'hero',
    cls: 'HeroSheet',
    storage: Application + "_StudioHeroSheets",
    _itemWidth: 604,
    _itemHeight: 346.9,

    _maxSkills: 6,
    
    _i18n: {
        'fr': {
            'tab': "Héros",
            'nocard': "Vous n'avez aucune fiche de héros pour le moment",
            'nocard2': "<br/><br/>Cliquez sur le bouton + pour en créer une",
            'newcard': "Créer un héros",
            'printHint': "Une fiche de héros mesure 21cm. Si vous souhaitez imprimer avec les marges de découpe, vous devrez imprimer en mode paysage 1 seule fiche à la fois. Si vous imprimez sans les magres de découpe, vous pouvez imprimer 2 fiches à la fois en mode portrait.",
            'editcard': "Modifier",

            'name': "Nom",
            'namePh': "?",
            'subname': "Qualificatif",
            'subnamePh': "?",
            'gems': "Gemmes",
            'gemsPh': "?",
            'encumbrance': "Encombrement",
            'encumbrancePh': "?",
            'encumbrancemov1Ph': "?",
            'encumbrancemov2Ph': "?",
            'caracs': "Caractéristiques",
            'caracPh': "?",
            'skills': "Compétences",
            'skillsPh': "-",
            'skillsNone' : "Aucune",
            'diceRed': "Rouge",
            'diceRedReroll': "Rouge \uf01e",
            'diceOrange': "Orange",
            'diceOrangeReroll': "Orange \uf01e",
            'diceYellow': "Jaune",
            'diceYellowReroll': "Jaune \uf01e",
            'image': "Image (fond transparent)",
            'imagePh': "Entrer l'adresse de l'image (http://)",
            'imagelocation': "Emplacement",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotation",
            'imagerotationPh': "0",

            'header1': "Saisissez les données de la fiche",
            'header1bis': "Mettez une image",
            'header2': "Prévisualiser la fiche",
            
            'copyright': "Basé sur le fichier PSD proposé par <a href='https://the-overlord.com/index.php?/profile/13-roolz/'>@Roolz</a>/<a href='https://the-overlord.com/index.php?/profile/4-doucefeuille/'>@Doucefeuille</a> et converti au format GIMP par <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        },
        'en': {
            'tab': "Heroes",
            'nocard': "You have no hero sheet for the moment",
            'nocard2': "<br/><br/>Click on the + button to create one",
            'newcard': "Create a new hero",
            'printHint': "A hero sheet is 21cm (8.3\") wide. If you want to print with cut margins, you have to print in landscape mode and only 1 sheet at a time. If you want to print without cut margins, you can print up to 2 sheets at a time in portrait mode.",
            'editcard': "Edit a card",

            'name': "Name",
            'namePh': "?",
            'subname': "Qualifier",
            'subnamePh': "?",
            'gems': "Gems",
            'gemsPh': "?",
            'encumbrance': "Encumbrance",
            'encumbrancePh': "?",
            'encumbrancemov1Ph': "?",
            'encumbrancemov2Ph': "?",
            'caracs': "Characteristics",
            'caracPh': "?",
            'skills': "Skills",
            'skillsPh': "-",
            'skillsNone' : "None",
            'diceRed': "Red",
            'diceRedReroll': "Red \uf01e",
            'diceOrange': "Orange",
            'diceOrangeReroll': "Orange \uf01e",
            'diceYellow': "Yellow",
            'diceYellowReroll': "Yellow \uf01e",
            'image': "Image (transparent background)",
            'imagePh': "Enter the image address (http://...)",
            'imagelocation': "Location",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotation",
            'imagerotationPh': "0",

            'header1': "Fill the sheet data",
            'header1bis': "Set a picture",
            'header2': "Preview the final result",
            
            'copyright': "Based on the PSD file proposed by <a href='https://the-overlord.com/index.php?/profile/13-roolz/'>@Roolz</a>/<a href='https://the-overlord.com/index.php?/profile/4-doucefeuille/'>@Doucefeuille</a> and converted at the GIMP format by <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        },
        'it': {
            'tab': "Eroi",
            'nocard': "Al momento non hai schede-Eroe",
            'nocard2': "<br/><br/>TODO_TRANSLATE",
            'newcard': "TODO_TRANSLATE",
            'printHint': "Una scheda eroe misura 21cm (8.3\") in larghezza. Se vuoi stampare con gli indicatori di taglio, devi stampare in orizzontale e solo una scheda alla volta. Se vuoi stampare senza gli indicatori di taglio, puoi stampare fino a 2 schede alla volta con l'orientamento del foglio in verticale.",
            'editcard': "Modifica una carta",

            'name': "Nome",
            'namePh': "?",
            'subname': "Definizione",
            'subnamePh': "?",
            'gems': "Gemme",
            'gemsPh': "?",
            'encumbrance': "Ingombro",
            'encumbrancePh': "?",
            'encumbrancemov1Ph': "?",
            'encumbrancemov2Ph': "?",
            'caracs': "Caratteristiche",
            'caracPh': "?",
            'skills': "Abilità",
            'skillsPh': "-",
            'skillsNone' : "Nessuna",
            'diceRed': "Rosso",
            'diceRedReroll': "Rosso \uf01e",
            'diceOrange': "Arancione",
            'diceOrangeReroll': "Arancione \uf01e",
            'diceYellow': "Giallo",
            'diceYellowReroll': "Giallo \uf01e",
            'image': "Immagine (sfondo trasparente)",
            'imagePh': "Inserisci l'URL dell'immagine (http://...)",
            'imagelocation': "Posizione",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotazione",
            'imagerotationPh': "0",

            'header1': "Completa le informazioni della scheda",
            'header1bis': "Scegli un'immagine",
            'header2': "Anteprima del risultato finale",
            
            'copyright': "Basati sui file PSD di <a href='https://the-overlord.com/index.php?/profile/13-roolz/'>@Roolz</a>/<a href='https://the-overlord.com/index.php?/profile/4-doucefeuille/'>@Doucefeuille</a> e convertiti nel formato GIMP da <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        }
    },
    
    _printCode: function ()
    {
          return "<p class='subhint'>" + HeroSheet._i18n[Language].printHint + "</p>";
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

                html += prefix + "<div class='printoverflow'>" + HeroSheet._cardCode(cards[i], printPurpose) + "</div>" + suffix;
            }
        }
        else
        {
            html += "<div class=\"nocards\">" + HeroSheet._i18n[Language].nocard + (withEditLink !== false ? HeroSheet._i18n[Language].nocard2 : '') + "</div>";
        }

        if (!withEditLink)
        {
            for (var i in cards)
            {
                html += "<div class='printoverflow back invisible' id='herosheet-back-" + i + "'>" + HeroSheet._cardCode(cards[i], printPurpose) + "</div>";
            }
        }

        return html;
    },

    _cardCode: function(sheet, printPurpose) {
        var code = "<div class=\"herosheet sheet\">";

        code += "<picture class=\"background-l1\">"
                    + "<source media=\"print\" srcset=\"studio/hero_sheet/img/background_layer_1hd.png?version=" + Version + "\"/>"
                    + "<img src=\"studio/hero_sheet/img/background_layer_1.png?version=" + Version + "\"/>"
                + "</picture>";

        if (sheet.image)
        {
            code += "<div class=\"image\"><img" + (!printPurpose ? LazyImage : "") + " src=\"" + sheet.image + "\" onload=\"this.style.minWidth = 0; this.style.opacity = 1;\" style=\"left: " + sheet.imagelocation.x + "%; top: " + sheet.imagelocation.y + "%; height: " + sheet.imagezoom + "%; transform: translate(0%, -50%) rotate(" + sheet.imagerotation + "deg)\"/></div>";
        }

        code += "<picture class=\"background-l3\">"
                    + "<source media=\"print\" srcset=\"studio/hero_sheet/img/background_layer_3hd.png?version=" + Version + "\"/>"
                    + "<img src=\"studio/hero_sheet/img/background_layer_3.png?version=" + Version + "\"/>"
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
            code += "<img class=\"background-encumbrance\" src=\"studio/hero_sheet/img/weight.png?version=" + Version + "\"/>";
            code += "<div class=\"encumbrance\">" + sheet.encumbrance + "</div>";

            for (var s=0; s < sheet.skills.length; s++)
            {
                var skill = sheet.skills[s];
                var encyclopediaSkill = Rules._findSkillById(skill.id);

                code += "<div class=\"skill\">";
                    code += "<img class=\"skill\" src=\"" + encyclopediaSkill.image + "?version=" + Version + "\"/>";
                    if (skill.exertion)
                    {
                        code += "<img class=\"exertion\" src=\"studio/hero_sheet/img/skill_weight.png?version=" + Version + "\"/>";
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
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.melee.dice + ".png?version=" + Version + "\"/></div>";
        code += "</div>";
        code += "<div class=\"base ranged\">";
        code +=     "<div class=\"exertion\">" + sheet.ranged.exertion + "</div>";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.ranged.dice + ".png?version=" + Version + "\"/></div>";
        code += "</div>";
        code += "<div class=\"base defense\">";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.defense.dice + ".png?version=" + Version + "\"/></div>";
        code += "</div>";
        code += "<div class=\"base movement\">";
        code +=     "<div class=\"exertion\">" + sheet.movement.exertion + "</div>";
        code +=     "<div class=\"dice\">" + sheet.movement.base + "</div>";
        code += "</div>";
        code += "<div class=\"base manipulation\">";
        code +=     "<div class=\"exertion\">" + sheet.manipulation.exertion + "</div>";
        code +=     "<div class=\"dice\"><img src=\"studio/hero_sheet/img/dice_" + sheet.manipulation.dice + ".png?version=" + Version + "\"/></div>";
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
                + "<h1>" + HeroSheet._i18n[Language].header1 + "</h1>"
                + "<input type=\"hidden\" name=\"sheetpos\"/>"
                + "<div class=\"field name\">"
                    + "<label for=\"hsname\">" + HeroSheet._i18n[Language].name + "</label>"
                    + "<input id=\"hsname\" spellcheck='false' name=\"sheetname\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].namePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<input id=\"hssubname\" spellcheck='false' name=\"sheetsubname\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].subnamePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                + "<div class=\"field gems\">"
                    + "<label for=\"hsgems\">" + HeroSheet._i18n[Language].gems + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsgems\" name=\"sheetgems\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].gemsPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                + "<div class=\"field encumbrance\">"
                    + "<label for=\"hsencumbrance\">" + HeroSheet._i18n[Language].encumbrance + "</label>"
                    + "<div class='encumbrance'>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsencumbrance\" name=\"sheetencumbrance\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].encumbrancePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "</div>"
                    + "<div class='encumbrancemov'>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsencumbrancemov1\" name=\"sheetencumbrancemov1\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].encumbrancemov1Ph + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsencumbrancemov2\" name=\"sheetencumbrancemov2\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].encumbrancemov2Ph + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "</div>"
                + "</div>"
                + "<div class=\"field caracs\">"
                    + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n[Language].caracs + "</label>"
                    + "<div class='carac melee'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmeleeexertion\" name=\"sheetmeleeexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<select id=\"hscaracmeleedice\" class=\"dice\" name=\"sheetmeleedice\"><option value=\"red\">" + HeroSheet._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + HeroSheet._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + HeroSheet._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + HeroSheet._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + HeroSheet._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + HeroSheet._i18n[Language].diceYellowReroll + "</option></select>"
                    + "</div>"
                    + "<div class='carac ranged'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracrangedexertion\" name=\"sheetrangedexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<select id=\"hscaracrangeddice\" class=\"dice\" name=\"sheetrangeddice\"><option value=\"red\">" + HeroSheet._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + HeroSheet._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + HeroSheet._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + HeroSheet._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + HeroSheet._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + HeroSheet._i18n[Language].diceYellowReroll + "</option></select>"
                    + "</div>"
                    + "<div class='carac defense'>"
                        + "<select id=\"hscaracdefensedice\" class=\"dice\" name=\"sheetdefensedice\"><option value=\"red\">" + HeroSheet._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + HeroSheet._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + HeroSheet._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + HeroSheet._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + HeroSheet._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + HeroSheet._i18n[Language].diceYellowReroll + "</option></select>"
                    + "</div>"
                    + "<div class='carac movement'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmovementexertion\" name=\"sheetmovementexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmovement\" name=\"sheetmovement\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "</div>"
                    + "<div class='carac manipulation'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmanipulationexertion\" name=\"sheetmanipulationexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + "<select id=\"hscaracmanipulationdice\" class=\"dice\" name=\"sheetmanipulationdice\"><option value=\"red\">" + HeroSheet._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + HeroSheet._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + HeroSheet._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + HeroSheet._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + HeroSheet._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + HeroSheet._i18n[Language].diceYellowReroll + "</option></select>"
                    + "</div>"
                + "</div>"
                + "<div class=\"field skills\">"
                    + "<label for=\"hsskills1\">" + HeroSheet._i18n[Language].skills + "</label>"
                    + skills()
                + "</div>"
            + "</div>"
            + "</div>"
            + "<div class=\"hscol\">"
            + "<div class=\"sheet\">"
                + "<h1>" + HeroSheet._i18n[Language].header1bis + "</h1>"
                + "<div class=\"field\">"
                    + "<label for=\"hsimage\">" + HeroSheet._i18n[Language].image + "</label>"
                    + "<input id=\"hsimage\" name=\"sheetimage\" spellcheck='false' autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].imagePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"hsimagelocation\">" + HeroSheet._i18n[Language].imagelocation + "</label>"
                    + "<div><input id=\"hsimagelocation\" name=\"sheetimagelocation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].imagelocationPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"\"/></div>"
                    + "<div><input id=\"hsimagelocation2\" name=\"sheetimagelocation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].imagelocationPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"hsimagezoom\">" + HeroSheet._i18n[Language].imagezoom + "</label>"
                    + "<input id=\"hsimagezoom\" name=\"sheetimagezoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].imagezoomPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"hsimagerotation\">" + HeroSheet._i18n[Language].imagerotation + "</label>"
                    + "<input id=\"hsimagerotation\" name=\"sheetimagerotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].imagerotationPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
            + "</div>"
            + "<div class=\"sheet-preview\">"
                + "<h1>" + HeroSheet._i18n[Language].header2 + "</h1>"
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
                        + "<select id=\"hsskills" + number + "\" class=\"skills\" name=\"sheetskills" + number + "\" onchange=\"HeroSheet._preview();\"><option value=\"none\">" + HeroSheet._i18n[Language].skillsNone + "</option>"; 

            for (var i in Encyclopedia.skills.types)
            {
                var type = Encyclopedia.skills.types[i];

                s += "<optgroup label=\"" + type.title[Language] + "\">";

                for (var j in Encyclopedia.skills.list)
                {
                    var skill = Encyclopedia.skills.list[j];
                    if (skill.type == type.id)
                    {
                        s += "<option value=\"" + skill.id + "\">" + skill.title[Language] + "</option>";
                    }
                }
                
                s += "</optgroup>"
            }

            s += "</select>"
                + "<input type=\"number\" min=\"0\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsskillexertion" + number + "\" name=\"sheetskillsexertion" + number + "\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].skillsPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>";

            return s;
        }


        sheet = sheet || {
            id: Math.random(),
            name: "",
            subname: "",

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
        return "<h3>" + HeroSheet._i18n[Language].tab + "</h3>"
            + "<p>" + HeroSheet._i18n[Language].copyright + "</p>"
    }
});
