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
            'type': "Type",
            'typeHero': "Héros",
            'typeVillain': "Vilain",
            'gems': "Gemmes",
            'gemsPh': "?",
            'gems2': "Repos",
            'gems2Ph': "?",
            'gems3': "Actif",
            'gems3Ph': "?",
            'move': "Déplacement",
            'movePh': "?",
            'belt': "Bat-ceinture",
            'beltPh': "?",
            'size': "Envergure",
            'sizePh': "?",
            'menace': "Menace",
            'menacePh': "?",
            'caracs': "Caractéristiques",
            'caracPh': "?",
            'skills': "Compétences",
            'skillsPh': "-",
            'skillsNone' : "Aucune",

            'diceBlack': "Noir",
            'diceBlackReroll': "Noir \uf01e",
            'diceRed': "Rouge",
            'diceRedReroll': "Rouge \uf01e",
            'diceOrange': "Orange",
            'diceOrangeReroll': "Orange \uf01e",
            'diceYellow': "Jaune",
            'diceYellowReroll': "Jaune \uf01e",
            'diceWhite': "Blanc",
            'diceWhiteReroll': "Blanc \uf01e",

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
            'type': "Type",
            'typeHero': "Hero",
            'typeVillain': "Villain",
            'gems': "Gems",
            'gemsPh': "?",
            'gems2': "Rest",
            'gems2Ph': "?",
            'gems3': "Active",
            'gems3Ph': "?",
            'move': "Move",
            'movePh': "?",
            'belt': "Belt",
            'beltPh': "?",
            'size': "Size",
            'sizePh': "?",
            'menace': "Menace",
            'menacePh': "?",
            'caracs': "Characteristics",
            'caracPh': "?",
            'skills': "Skills",
            'skillsPh': "-",
            'skillsNone' : "None",

            'diceBlack': "Black",
            'diceBlackReroll': "Black \uf01e",
            'diceRed': "Red",
            'diceRedReroll': "Red \uf01e",
            'diceOrange': "Orange",
            'diceOrangeReroll': "Orange \uf01e",
            'diceYellow': "Yellow",
            'diceYellowReroll': "Yellow \uf01e",
            'diceWhite': "White",
            'diceWhiteReroll': "White \uf01e",
            
            'header1': "Fill the sheet data",
            'header1bis': "Set a picture",
            'header2': "Preview the final result",
            
            'copyright': "Based on the PSD file proposed by <a href='https://the-overlord.com/index.php?/profile/13-roolz/'>@Roolz</a>/<a href='https://the-overlord.com/index.php?/profile/4-doucefeuille/'>@Doucefeuille</a> and converted at the GIMP format by <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
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
        var code = "<div class='herosheet sheet " + sheet.type + "'>";

        code += "<div class='background'><img src='studio/hero_sheet/img/sheet_" + sheet.type + ".png?version=" + Version + "'/></div>"

        if (sheet.name)
        {
            code += "<div class='name" + (sheet.subname ? ' subname' : '') + "'>" + sheet.name + (sheet.subname ? "<span>" + sheet.subname + "</span>" : " ") + "</div>";
        }
        if (sheet.gem)
        {
            code += "<div class='gem'>" + sheet.gem + "</div>";
        }
        
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
                
                + "<div class=\"field type\">"
                    + "<label for=\"hstype\">" + HeroSheet._i18n[Language].type + "</label>"
                    + "<select id='hstype' name='sheettype' onchange='HeroSheet._preview();'>"
                        + "<option value='hero'>" + HeroSheet._i18n[Language].typeHero + "</option>" 
                        + "<option value='villain'>" + HeroSheet._i18n[Language].typeVillain + "</option>" 
                    + "</select>"
                + "</div>"
                
                + "<div class=\"field gems\">"
                    + "<label for=\"hsgems\">" + HeroSheet._i18n[Language].gems + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsgems\" name=\"sheetgems\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].gemsPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsgems2\">" + HeroSheet._i18n[Language].gems2 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsgems2\" name=\"sheetgems2\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].gems2Ph + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsgems3\">" + HeroSheet._i18n[Language].gems3 + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsgems3\" name=\"sheetgems3\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].gems3Ph + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"
                
                + "<div class=\"field move\">"
                    + "<label for=\"hsmove\">" + HeroSheet._i18n[Language].move + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmove\" name=\"sheetmove\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"

                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmove2encumbrance\" name=\"sheetmove2encumbrance\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"

                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmove3encumbrance\" name=\"sheetmove3encumbrance\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"

                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmove4encumbrance\" name=\"sheetmove4encumbrance\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"

                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmoveexertion\" name=\"sheetmoveexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmovegemfactor\" name=\"sheetmovegemfactor\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].movePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"

                + "</div>"

                + "<div class=\"field index\">"
                    + "<label for=\"hsbelt\">" + HeroSheet._i18n[Language].belt + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsbelt\" name=\"sheetbelt\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].beltPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hssize\">" + HeroSheet._i18n[Language].size + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hssize\" name=\"sheetsize\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].sizePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                    + "<label for=\"hsmenace\">" + HeroSheet._i18n[Language].menace + "</label>"
                    + "<input type=\"number\" min=\"1\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsmenace\" name=\"sheetmenace\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].menacePh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                + "</div>"

                + "<div class=\"field caracs\">"
                    + "<label for=\"hscaracmeleeexertion\">" + HeroSheet._i18n[Language].caracs + "</label>"
                    + "<div class='carac melee'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmeleeexertion\" name=\"sheetmeleeexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + dices("melee")
                    + "</div>"
                    + "<div class='carac ranged'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracrangedexertion\" name=\"sheetrangedexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + dices("ranged")
                    + "</div>"
                    + "<div class='carac manipulation'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracmanipulationexertion\" name=\"sheetmanipulationexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + dices("manipulation")
                    + "</div>"
                    + "<div class='carac thought'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracthoughtexertion\" name=\"sheetthoughtexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + dices("thought")
                    + "</div>"
                    + "<div class='carac defense'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracdefenseexertion\" name=\"sheetdefenseexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                        + dices("defense")
                        + dices("defensepassive")
                    + "</div>"
                    + "<div class='carac reroll'>"
                        + "<input type=\"number\" min=\"1\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"hscaracrerollexertion\" name=\"sheetrerollexertion\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].caracPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
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

        function dices(id)
        {
            return "<select id=\"hscarac" + id + "dice\" class=\"dice\" name=\"sheet" + id + "dice\">"
                   + "<option value=\"black\">" + HeroSheet._i18n[Language].diceBlack + "</option><option value=\"blackreroll\">" + HeroSheet._i18n[Language].diceBlackReroll + "</option><option value=\"red\">" + HeroSheet._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + HeroSheet._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + HeroSheet._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + HeroSheet._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + HeroSheet._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + HeroSheet._i18n[Language].diceYellowReroll + "</option><option value=\"white\">" + HeroSheet._i18n[Language].diceWhite + "</option><option value=\"whitereroll\">" + HeroSheet._i18n[Language].diceWhiteReroll + "</option>"
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
                    + "<select id=\"hsskills" + number + "\" class=\"skills\" name=\"sheetskills" + number + "\" onchange=\"HeroSheet._preview();\"><option value=\"none\">" + HeroSheet._i18n[Language].skillsNone + "</option>";
            
            for (var i in Encyclopedia.skills.types)
            {
                var type = Encyclopedia.skills.types[i];

                s += "<optgroup label=\"" + type.title[Language] + "\" data-exertion='" + (type.exertion === false ? "false" : "true") + "' data-level='" + (type.level === false ? "false" : "true") + "' data-position='" + (!type.location ? "true" : "false") + "'>";

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
                 + "<input data-type='exertion' type=\"number\" min=\"0\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsskillexertion" + number + "\" name=\"sheetskillsexertion" + number + "\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].skillsPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
                 + "<input data-type='level' type=\"number\" min=\"0\" max=\"99\" step=\"1\" maxlength=\"2\" id=\"hsskilllevel" + number + "\" name=\"sheetskillslevel" + number + "\" autocomplete=\"off\" placeholder=\"" + HeroSheet._i18n[Language].skillsPh + "\" onkeyup=\"HeroSheet._preview();\" onchange=\"HeroSheet._preview();\"/>"
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
        return errors;
    },

    copyright: function()
    {
        return "<h3>" + HeroSheet._i18n[Language].tab + "</h3>"
            + "<p>" + HeroSheet._i18n[Language].copyright + "</p>"
    }
});
