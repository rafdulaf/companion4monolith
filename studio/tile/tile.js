var Tile = {
    _i18n: {
        'fr': {
            'tab': "Tuile",
            'notile': "Vous n'avez aucune tuile pour le moment.",
            'notile2': " Cliquez sur le bouton + en haut pour en creer une.",
            'newtile': "Créer une tuile",
            'print': "Imprimer des tuiles",
            'edittile': "Modifier",
            'save': "Enregistrer",
            'remove': "Effacer",
            'removeConfirm': "Etes-vous sûr de vouloir effacer cette tuile ?",
            'name': "Nom",
            'namePh': "?",
            'movement': "Mouvement",
            'movementPh': "?",
            'defense': "Défense",
            'defensePh': "?",
            'attacktype': "Type d'attaque",
            'dices': "Attaque",
            'skills': "Compétences",
            'skillsPh': "?",
            'skillsNone': "Aucune",
            'image': "Image (fond transparent)",
            'imagePh': "Entrer l'adresse de l'image (http://)",
            'imagelocation': "Emplacement",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotation",
            'imagerotationPh': "0",
            'diceNone': "Aucun",
            'diceRed': "Rouge",
            'diceRedReroll': "Rouge \uf01e",
            'diceOrange': "Orange",
            'diceOrangeReroll': "Orange \uf01e",
            'diceYellow': "Jaune",
            'diceYellowReroll': "Jaune \uf01e",
            'header1': "Saisissez les données de la tuile",
            'header1bis': "Mettez une image",
            'header2': "Prévisualiser la tuile",
            'copyright': "Basé sur le fichier PSD proposé par <a href='https://the-overlord.com/index.php?/profile/9-genesteal28/'>@genesteal28</a> et converti au format GIMP par <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        },
        'en': {
            'tab': "Tile",
            'notile': "You have no tile for the moment.",
            'notile2': " Click on the + button in the header to create one.",
            'newtile': "Create a new tile",
            'print': "Print tiles",
            'edittile': "Edit a tile",
            'save': "Save",
            'remove': "Delete",
            'removeConfirm': "Are you sure that you want to delete this tile?",
            'name': "Name",
            'namePh': "?",
            'movement': "Move",
            'movementPh': "?",
            'defense': "Defense",
            'defensePh': "?",
            'attacktype': "Attack type",
            'dices': "Attack",
            'skills': "Skills",
            'skillsPh': "?",
            'skillsNone': "None",
            'image': "Image (transparent background)",
            'imagePh': "Enter the image address (http://...)",
            'imagelocation': "Location",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotation",
            'imagerotationPh': "0",
            'diceNone': "None",
            'diceRed': "Red",
            'diceRedReroll': "Red \uf01e",
            'diceOrange': "Orange",
            'diceOrangeReroll': "Orange \uf01e",
            'diceYellow': "Yellow",
            'diceYellowReroll': "Yellow \uf01e",
            'header1': "Fill the tile data",
            'header1bis': "Set a picture",
            'header2': "Preview the final result",
            'copyright': "Based on the PSD file proposed by <a href='https://the-overlord.com/index.php?/profile/9-genesteal28/'>@genesteal28</a> and converted at the GIMP format by <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        },
        'it': {
            'tab': "Tessera",
            'notile': "Non hai tessere al momento.",
            'notile2': " Clicca + sulla barra degli strumenti per crearne una.",
            'newtile': "TODO_TOTRANSLATE",
            'print': "TODO_TOTRANSLATE",
            'edittile': "TODO_TOTRANSLATE",
            'save': "TODO_TOTRANSLATE",
            'remove': "TODO_TOTRANSLATE",
            'removeConfirm': "TODO_TOTRANSLATE",
            'name': "Nome",
            'namePh': "?",
            'movement': "Movimento",
            'movementPh': "?",
            'defense': "TODO_TOTRANSLATE",
            'defensePh': "?",
            'attacktype': "TODO_TOTRANSLATE",
            'dices': "TODO_TOTRANSLATE",
            'skills': "Abilità",
            'skillsPh': "?",
            'skillsNone': "Nessuna",
            'image': "Immagine (sfondo trasparente)",
            'imagePh': "Inserisci l'URL dell'immagine (http://...)",
            'imagelocation': "Posizione",
            'imagelocationPh': "0",
            'imagezoom': "Zoom",
            'imagezoomPh': "0",
            'imagerotation': "Rotazione",
            'imagerotationPh': "0",
            'diceNone': "Nessuno",
            'diceRed': "Rosso",
            'diceRedReroll': "Rosso \uf01e",
            'diceOrange': "Arancione",
            'diceOrangeReroll': "Arancione \uf01e",
            'diceYellow': "Giallo",
            'diceYellowReroll': "Giallo \uf01e",
            'header1': "TODO_TOTRANSLATE",
            'header1bis': "Scegli un'immagine",
            'header2': "Anteprima risultato finale",
            'copyright': "Basato sui file PSD di <a href='https://the-overlord.com/index.php?/profile/9-genesteal28/'>@genesteal28</a> e convertiti nel formato GIMP da <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        }
    },

    preinit: function() {
        ConanStudio._slides.push({   label: Tile._i18n[Language].tab, id: "tile", onShow: Tile.onShow,  onHide: Tile.onHide });
    },

    init: function() {
        Nav.addAction("studio", Tile._i18n[Language].newtile, "tile-icon-add", "tile-add", Tile.add);
        Nav.addAction("studio", Tile._i18n[Language].print, "tile-icon-print", "tile-print", ConanStudio.printCards);
        Tile.onHide();
        Tile._displayTiles();
    },

    _displayTiles: function()
    {
        $("#tile").html(Tile._getDisplayTileCode(true));
    },

    _getDisplayTileCode: function(withEditLink)
    {
        var html = "";

        var tiles = JSON.parse(localStorage.getItem("StudioTiles")) || [];
        if (tiles.length > 0)
        {
            for (var i in tiles)
            {
                var prefix = "", suffix = "";
                if (withEditLink !== false)
                {
                    prefix = "<a href='javascript:void(0)' onclick='Tile.add(JSON.parse(localStorage.getItem(\"StudioTiles\"))[" + i + "])'>";
                    suffix = "</a>";
                }
                else
                {
                    prefix = "<input type='checkbox' id='tile-" + i + "' name='tile' data-index='" + i + "' onchange=\"$('#tile-back-" + i + "').toggleClass('invisible');\"/><label for='tile-" + i + "'>";
                    suffix = "</label>";
                }

                html += prefix + "<div class='printoverflow'>" + Tile._tileCode(tiles[i]) + "</div>" + suffix;
            }
        }
        else
        {
            html += "<div class=\"notiles\">" + Tile._i18n[Language].notile + (withEditLink !== false ? Tile._i18n[Language].notile2 : '') + "</div>";
        }

        if (!withEditLink)
        {
            for (var i in tiles)
            {
                html += "<div id=\"tile-back-" + i + "\"  class='printoverflow back invisible'>" +  + Tile._tileCode(tiles[i]) + "</div>"
            }
        }

        return html;
    },
    
    onShow: function() {
        Nav.showAction("studio", "tile-add");
        Nav.showAction("studio", "tile-print");
    },

    onHide: function() {
        Nav.hideAction("studio", "tile-add");
        Nav.hideAction("studio", "tile-print");
    },
    
    _tileCode: function(tile) {
        var code = "<div class=\"tile tiletile\">"
                + "<picture class=\"background\">"
                    + "<source media=\"print\" srcset=\"studio/tile/img/background_gray_hd.png?version=" + Version + "\"/>"
                    + "<img src=\"studio/tile/img/background_gray.png?version=" + Version + "\"/>"
                + "</picture>";

        // TODO
                
        code += "</div>";
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
    
    add: function(tile)
    {
        var actions = [{
                label: Tile._i18n[Language].save,
                icon: "tile-save",
                fn: "Tile._save();"
        }];
        if (tile != undefined)
        {
            actions.push({
                label: Tile._i18n[Language].remove,
                icon: "tile-remove",
                fn: "Tile._remove();"
            });
        }

        var dlabel = tile == undefined ? Tile._i18n[Language].newtile : Tile._i18n[Language].edittile;

        function _skills()
        {
            var s = "";

            for (var i in Encyclopedia.skills.types)
            {
                var type = Encyclopedia.skills.types[i];

                s += "<optgroup label=\"" + type.title[Language] + "\">";

                for (var j in Encyclopedia.skills.list)
                {
                    var skill = Encyclopedia.skills.list[j];
                    if (skill.type == type.id)
                    {
                        s += "<option value=\"" + type.id  + "/" + skill.id + "\">" + skill.title[Language] + "</option>";
                    }
                }
            }

            return s;
        }



        Nav.dialog(dlabel,
            "<div class=\"eqcol\">"
            + "<div class=\"tile\">"
                + "<h1>" + Tile._i18n[Language].header1 + "</h1>"
                + "<input type=\"hidden\" name=\"tilepos\"/>"
                + "<div class=\"field name\">"
                    + "<label for=\"tname\">" + Tile._i18n[Language].name + "</label>"
                    + "<input id=\"tname\" name=\"tilename\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].namePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field movement\">"
                    + "<label for=\"tmovement\">" + Tile._i18n[Language].movement + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"tmovement\" name=\"tilemovement\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].movementPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field defense\">"
                    + "<label for=\"tdefense\">" + Tile._i18n[Language].defense + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"tdefense\" name=\"tilemovement\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].defensePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field attacktype\">"
                    + "<label for=\"tattacktype\">" + Tile._i18n[Language].attacktype + "</label>"
                    + "<div class=\"attacktype\"><input type=\"checkbox\" id=\"tattacktype\" name=\"tileattacktype\" onchange=\"Tile._preview();\"/><label for=\"tattacktype\">" + Tile._i18n[Language].attacktype + "</label></div>"
                + "</div>"
                + "<div class=\"field dices\">"
                    + "<label for=\"tdices\">" + Tile._i18n[Language].dices + "</label>"
                    + "<select id=\"tdices\" class=\"dice\" name=\"tiledices1\"><option value=\"none\">" + Tile._i18n[Language].diceNone + "</option><option value=\"red\">" + Tile._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + Tile._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"tdices2\" class=\"dice\" name=\"tiledices2\"><option value=\"none\">" + Tile._i18n[Language].diceNone + "</option><option value=\"red\">" + Tile._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + Tile._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"tdices3\" class=\"dice\" name=\"tiledices3\"><option value=\"none\">" + Tile._i18n[Language].diceNone + "</option><option value=\"red\">" + Tile._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + Tile._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n[Language].diceYellowReroll + "</option></select>"
                    + "<select id=\"tdices4\" class=\"dice\" name=\"tiledices4\"><option value=\"none\">" + Tile._i18n[Language].diceNone + "</option><option value=\"red\">" + Tile._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + Tile._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n[Language].diceYellowReroll + "</option></select>"
                + "</div>"
                + "<div class=\"field skills\">"
                    + "<label for=\"tskills\">" + Tile._i18n[Language].skills + "</label>"
                    + "<select id=\"tskills\" class=\"skills\" name=\"tileskills1\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n[Language].skillsNone + "</option>" + _skills() + "</select>"
                    + "<select id=\"tskills2\" class=\"skills\" name=\"tileskills2\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n[Language].skillsNone + "</option>" + _skills() + "</select>"
                    + "<select id=\"tskills3\" class=\"skills\" name=\"tileskills3\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n[Language].skillsNone + "</option>" + _skills() + "</select>"
                    + "<select id=\"tskills4\" class=\"skills\" name=\"tileskills4\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n[Language].skillsNone + "</option>" + _skills() + "</select>"
                + "</div>"
            + "</div>"
            + "</div>"
            + "<div class=\"eqcol\">"
            + "<div class=\"tile\">"
                + "<h1>" + Tile._i18n[Language].header1bis + "</h1>"
                + "<div class=\"field\">"
                    + "<label for=\"timage\">" + Tile._i18n[Language].image + "</label>"
                    + "<input id=\"timage\" name=\"tileimage\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"timagelocation\">" + Tile._i18n[Language].imagelocation + "</label>"
                    + "<div><input id=\"timagelocation\" name=\"tileimagelocation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"\"/></div>"
                    + "<div><input id=\"timagelocation2\" name=\"tileimagelocation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"timagezoom\">" + Tile._i18n[Language].imagezoom + "</label>"
                    + "<input id=\"timagezoom\" name=\"tileimagezoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagezoomPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"timagerotation\">" + Tile._i18n[Language].imagerotation + "</label>"
                    + "<input id=\"timagerotation\" name=\"tileimagerotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagerotationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
            + "</div>"
            + "<div class=\"tile-preview\">"
                + "<h1>" + Tile._i18n[Language].header2 + "</h1>"
                + "<div class=\"preview\"></div>"
            + "</div>"
            + "</div>",
            null,
            actions
        );

        tile = tile || {
            id: Math.random(),
            name: "",
            movement: "",
            defense: "",
            attacktype: "contact",
            dices: { 0: "none", 1: "none", 2: "none", 3: "none" },
            skills: { 0: "none", 1: "none", 2: "none", 3: "none" },
            image: "",
            imagelocation: {x: "50", y: "50"},
            imagezoom: "100",
            imagerotation: "0"
        };

        $("#tdices,#tdices2,#tdices3,#tdices4").each (function (i) {
            var k = $(this);
            k.attr("data-value", "")
                .selectmenu({ appendTo: k.parent(), width: k.is(".dice") ? 40 : 58, change: function(event, selection) {
                    $(this).attr("data-value", selection.item.value);
                    Tile._preview();
                }});
        });
        Tile._tile2form(tile);

        Tile._preview();
    },    

    _preview: function()
    {
        var tile= Tile._form2tile();
        var code = Tile._tileCode(tile);
        $(".dialog .preview").html(code);
    },

    _form2tile: function()
    {
        return {
            id: $(".dialog input[name=tilepos]")[0].value,
            name: $(".dialog input[name=tilename]")[0].value
        }
    },
    _tile2form: function(tile)
    {
        $(".dialog input[name=tilepos]")[0].value = tile.id;
        $(".dialog input[name=tilename]")[0].value = tile.name;
    },
    
    _remove: function()
    {
        if (confirm(Tile._i18n[Language].removeConfirm))
        {
            var tile = Tile._form2tile();

            var tiles = JSON.parse(localStorage.getItem("StudioTiles")) || [];
            var newTiles = [];

            for (var c in tiles)
            {
                if (tiles[c].id == tile.id)
                {
                    // nothing here, to remove
                }
                else
                {
                    newTiles.push(tiles[c]);
                }
            }

            localStorage.setItem("StudioTiles", JSON.stringify(newTiles));
            Tile._displayTiles();
            Nav.closeDialog();
        }
    },

    _save: function()
    {
        var tile = Tile._form2tile();

        $(".dialog .field.error").removeClass("error");

        var errors = 0;
        if (!tile.name)
        {
            $(".dialog input[name=tilename]").parent().addClass("error");
            errors++;
        }
        if (errors > 0)
        {
            return;
        }

        var tiles = JSON.parse(localStorage.getItem("StudioTiles")) || [];
        var newTiles = [];

        var done = false;
        for (var c in tiles)
        {
            if (tiles[c].id == tile.id)
            {
                newTiles.push(tile);
                done = true;
            }
            else
            {
                newTiles.push(tiles[c]);
            }
        }
        if (!done)
        {
            newTiles.push(tile);
        }

        localStorage.setItem("StudioTiles", JSON.stringify(newTiles));
        Tile._displayTiles();
        Nav.closeDialog();
    },

    copyright: function()
    {
        return "<h3>" + Tile._i18n[Language].tab + "</h3>"
            + "<p>" + Tile._i18n[Language].copyright + "</p>"
    }    
}
