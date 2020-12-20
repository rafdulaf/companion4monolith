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
            'color': "Couleur",
            'colorGray': "Grise",
            'colorBlue': "Bleue",
            'colorRed': "Rouge",
            'colorGreen': "Verte",
            'colorOrange': "Orange",
            'colorPurple': "Violet",
            'movement': "Mouvement",
            'movementPh': "?",
            'defense': "Défense",
            'defensePh': "?",
            'attacktype': "Type d'attaque",
            'dices': "Attaque",
            'skills': "Compétences",
            'skillsPh': "?",
            'skillsNone': "Aucune",
            'reinforcement': "Renfort",
            'reinforcementPh': "?",
            'image': "Image (fond transparent)",
            'imagetoken': "Image si différente",
            'imagePh': "Entrer l'adresse de l'image (http://)",
            'imagetokenactive': "Activer un jeton",
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
            'header1ter': "Ajouter des jetons",
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
            'color': "Color",
            'colorGray': "Gray",
            'colorBlue': "Blue",
            'colorRed': "Red",
            'colorGreen': "Green",
            'colorOrange': "Orange",
            'colorPurple': "Purple",
            'movement': "Move",
            'movementPh': "?",
            'defense': "Defense",
            'defensePh': "?",
            'attacktype': "Attack type",
            'dices': "Attack",
            'skills': "Skills",
            'skillsPh': "?",
            'skillsNone': "None",
            'reinforcement': "Renfort",
            'reinforcementPh': "?",
            'image': "Image (transparent background)",
            'imagetoken': "Image if différent",
            'imagePh': "Enter the image address (http://...)",
            'imagetokenactive': "Activate a token",
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
            'header1ter': "Add tokens",
            'header2': "Preview the final result",
            'copyright': "Based on the PSD file proposed by <a href='https://the-overlord.com/index.php?/profile/9-genesteal28/'>@genesteal28</a> and converted at the GIMP format by <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        },
        'it': {
            'tab': "Tessera",
            'notile': "Non hai tessere al momento.",
            'notile2': " Clicca + sulla barra degli strumenti per crearne una.",
            'newtile': "Crea nuova tessera",
            'print': "Stampa la tessera",
            'edittile': "Modifica al tessera",
            'save': "Salva",
            'remove': "Elimina",
            'removeConfirm': "Sei sicuro di voler eliminare questa tessera?",
            'name': "Nome",
            'namePh': "?",
            'color': "Colore",
            'colorGray': "Grigia",
            'colorBlue': "Blu",
            'colorRed': "Rossa",
            'colorGreen': "Verde",
            'colorOrange': "Arancione",
            'colorPurple': "Viola",
            'movement': "Movimento",
            'movementPh': "?",
            'defense': "Difesa",
            'defensePh': "?",
            'attacktype': "Tipo di attacco",
            'dices': "Attacco",
            'skills': "Abilità",
            'skillsPh': "?",
            'skillsNone': "Nessuna",
            'reinforcement': "Rinforzo",
            'reinforcementPh': "?",
            'image': "Immagine (sfondo trasparente)",
            'imagetoken': "Immagine, se diversa",
            'imagePh': "Inserisci l'URL dell'immagine (http://...)",
            'imagetokenactive': "Attiva un segnalino",
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
            'header1': "Completa le informazioni sulla tessera",
            'header1bis': "Scegli un'immagine",
            'header1ter': "Aggiungi un segnalino",
            'header2': "Anteprima risultato finale",
            'copyright': "Basato sui file PSD di <a href='https://the-overlord.com/index.php?/profile/9-genesteal28/'>@genesteal28</a> e convertiti nel formato GIMP da <a href='https://the-overlord.com/index.php?/profile/31-jabbathehatt/'>@jabbathehatt</a>."
        }
    },

    preinit: function() {
        Studio._slides.push({   label: Tile._i18n[Language].tab, id: "tile", onShow: Tile.onShow,  onHide: Tile.onHide });
    },

    init: function() {
        Nav.addAction("studio", Tile._i18n[Language].newtile, "tile-icon-add", "tile-add", Tile.add);
        Nav.addAction("studio", Tile._i18n[Language].print, "tile-icon-print", "tile-print", Studio.printCards);
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
                    prefix = "<input type='checkbox' id='tile-" + i + "' name='tile' data-index='" + i + "' onchange=\"$('#tile-back-" + i + ", #tile-back2-" + i + "').toggleClass('invisible');\"/><label for='tile-" + i + "'>";
                    suffix = "</label>";
                }

                if (withEditLink)
                {
                    html += prefix + "<div class='printoverflow'>" + Tile._tileCode(tiles[i]) + "</div>" + suffix;
                }
                else
                {
                    html += prefix 
                            + "<div class='printoverflow'>" + Tile._tileCode(tiles[i], true, false) + "</div>" 
                            + "<div class='printoverflow'>" + Tile._tileCode(tiles[i], true, true) + "</div>" 
                            + suffix;
                }
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
                html += "<div id=\"tile-back-" + i + "\"  class='printoverflow back invisible'>"
                            + "<img class=\"blood\" src=\"studio/tile/img/blood.png?version=" + Version + "\"/>"
                            + Tile._tileCode(tiles[i], !withEditLink, false) 
                        + "</div>"
                html += "<div id=\"tile-back2-" + i + "\"  class='printoverflow back invisible'>"
                            + Tile._tileCode(tiles[i], !withEditLink, true) 
                        + "</div>"
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
    
    _tileCode: function(tile, tokenAside, tokenMode) {
        var code = "<div class=\"tile tiletile\">"
                + "<picture class=\"background\">"
                    + "<source media=\"print\" srcset=\"studio/tile/img/background_" + tile.color + "_hd.png?version=" + Version + "\"/>"
                    + "<img src=\"studio/tile/img/background_" + tile.color + ".png?version=" + Version + "\"/>"
                + "</picture>";

        if (tile.image)
        {
            code += "<div class=\"image\"><img loading=\"lazy\" src=\"" + tile.image + "\" style=\"left: " + tile.imagelocation.x + "%; top: " + tile.imagelocation.y + "%; width: " + tile.imagezoom + "%; transform: translate(-50%, -50%) rotate(" + tile.imagerotation + "deg)\"/></div>";
        }

        if (tile.name !== undefined && tile.name !== null)
        {
               code += "<div class=\"name\">" + tile.name + "</div>";
        }

        if (tile.reinforcement || tile.reinforcement === "0")
        {
            code += "<img class=\"background-reinforcement\" src=\"studio/tile/img/reinforcement.png?version=" + Version + "\"/>"
                + "<div class=\"reinforcement\">" + tile.reinforcement + "</div>";
        }

        var level = 0;
        if (tile.dices && tile.dices[0] != "none")
        {
            var nbDices = 1;
            
            var diceCode = ""
            diceCode += "<img class='dice dice-1' src=\"studio/tile/img/dice_" + tile.dices[0] + ".png?version=" + Version + "\"/>";
            if (tile.dices[1] != "none")
            {
                nbDices++;
                diceCode += "<img class='dice dice-2' src=\"studio/tile/img/dice_" + tile.dices[1] + ".png?version=" + Version + "\"/>";
                if (tile.dices[2] != "none")
                {
                    nbDices++;
                    diceCode += "<img class='dice dice-3' src=\"studio/tile/img/dice_" + tile.dices[2] + ".png?version=" + Version + "\"/>";
                    if (tile.dices[3] != "none")
                    {
                        nbDices++;
                        diceCode += "<img class='dice dice-4' src=\"studio/tile/img/dice_" + tile.dices[3] + ".png?version=" + Version + "\"/>";
                    }
                }
            }
            
            code += "<div class=\"attack level" + level + "\">";
            code += "<img class='dice-background' src=\"studio/tile/img/dice-background-" + nbDices + ".png?version=" + Version + "\"/>";
            code += "<img class=\"attacktype\" src=\"studio/tile/img/" + tile.attacktype + ".png?version=" + Version + "\"/>";
            code += diceCode;
            code += "</div>";
            level++;
        }
        
        if (tile.defense)
        {
               code += "<div class=\"defense level" + level + "\">"
                    + "<img class=\"background-defense\" src=\"studio/tile/img/defense.png?version=" + Version + "\"/>"
                    + "<div class=\"defense\">" + tile.defense + "</div>"
                    + "</div>";
               level++
        }

        if (tile.movement)
        {
               code += "<div class=\"movement level" + level + "\">"
                    + "<img class=\"background-movement\" src=\"studio/tile/img/movement.png?version=" + Version + "\"/>"
                    + "<div class=\"movement\">" + tile.movement + "</div>"
                    + "</div>";
               level++
        }

        if (tile.skills && tile.skills[0] != 'none')
        {
            code += "<div class=\"skills-separator level" + level + "\">"
                     + "<img class=\"background-separator\" src=\"studio/tile/img/separator.png?version=" + Version + "\"/>"
                   + "</div>";

            code += "<div class=\"skills level" + level + "\">"
                     + "<img class=\"background-skills\" src=\"" + Tile._getSkillImage(tile.skills[0]) + "?version=" + Version + "\"/>"
                   + "</div>";
            level++;

            if (tile.skills && tile.skills[1] != 'none')
            {
                code += "<div class=\"skills level" + level + "\">"
                     + "<img class=\"background-skills\" src=\"" + Tile._getSkillImage(tile.skills[1]) + "?version=" + Version + "\"/>"
                   + "</div>";
                level++;

                if (tile.skills && tile.skills[2] != 'none')
                {
                    code += "<div class=\"skills level" + level + "\">"
                         + "<img class=\"background-skills\" src=\"" + Tile._getSkillImage(tile.skills[2]) + "?version=" + Version + "\"/>"
                       + "</div>";
                    level++;

                    if (tile.skills && tile.skills[3] != 'none')
                    {
                        code += "<div class=\"skills level" + level + "\">"
                             + "<img class=\"background-skills\" src=\"" + Tile._getSkillImage(tile.skills[3]) + "?version=" + Version + "\"/>"
                           + "</div>";
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
            code += "<div class=\"token\"><img loading=\"lazy\" src=\"" + (tile.tokens[0].image || tile.image) + "\" onload=\"this.style.cssText += '; top: " + tile.tokens[0].imagelocation.y + "% !important'\" style=\"left: " + tile.tokens[0].imagelocation.x + "%; top: " + tile.tokens[0].imagelocation.y + "%; width: " + tile.tokens[0].imagezoom + "%; transform: translate(-50%, -50%) rotate(" + tile.tokens[0].imagerotation + "deg)\"/></div>";
            if (tile.tokens.length > 1 && tile.tokens[1].active)
            {
                code += "<div class=\"token\"><img loading=\"lazy\" src=\"" + (tile.tokens[1].image || tile.image) + "\" onload=\"this.style.cssText += '; top: " + tile.tokens[1].imagelocation.y + "% !important'\"style=\"left: " + tile.tokens[1].imagelocation.x + "%; top: " + tile.tokens[1].imagelocation.y + "%; width: " + tile.tokens[1].imagezoom + "%; transform: translate(-50%, -50%) rotate(" + tile.tokens[1].imagerotation + "deg)\"/></div>";
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
                + "<div class=\"field color\">"
                    + "<label for=\"tcolor\">" + Tile._i18n[Language].color + "</label>"
                    + "<select id='tcolor' name='tcolor'>"
                    +     "<option value='gray'>" + Tile._i18n[Language].colorGray + "</option>"
                    +     "<option value='blue'>" + Tile._i18n[Language].colorBlue + "</option>"
                    +     "<option value='red'>" + Tile._i18n[Language].colorRed + "</option>"
                    +     "<option value='green'>" + Tile._i18n[Language].colorGreen + "</option>"
                    +     "<option value='orange'>" + Tile._i18n[Language].colorOrange + "</option>"
                    +     "<option value='purple'>" + Tile._i18n[Language].colorPurple + "</option>"
                    + "</select>"
                + "</div>"
                + "<div class=\"field movement\">"
                    + "<label for=\"tmovement\">" + Tile._i18n[Language].movement + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"tmovement\" name=\"tilemovement\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].movementPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field defense\">"
                    + "<label for=\"tdefense\">" + Tile._i18n[Language].defense + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"tdefense\" name=\"tiledefense\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].defensePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field attackdices\">"
                    + "<label for=\"tdices\">" + Tile._i18n[Language].dices + "</label>"
                    + "<input type=\"checkbox\" id=\"tattacktype\" name=\"tileattacktype\" onchange=\"Tile._preview();\" title=\"" + Tile._i18n[Language].attacktype + "\"/>"
                    + "<div>"
                        + "<select id=\"tdices\" class=\"dice\" name=\"tiledices1\"><option value=\"none\">" + Tile._i18n[Language].diceNone + "</option><option value=\"red\">" + Tile._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + Tile._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n[Language].diceYellowReroll + "</option></select>"
                        + "<select id=\"tdices2\" class=\"dice\" name=\"tiledices2\"><option value=\"none\">" + Tile._i18n[Language].diceNone + "</option><option value=\"red\">" + Tile._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + Tile._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n[Language].diceYellowReroll + "</option></select>"
                        + "<select id=\"tdices3\" class=\"dice\" name=\"tiledices3\"><option value=\"none\">" + Tile._i18n[Language].diceNone + "</option><option value=\"red\">" + Tile._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + Tile._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n[Language].diceYellowReroll + "</option></select>"
                        + "<select id=\"tdices4\" class=\"dice\" name=\"tiledices4\"><option value=\"none\">" + Tile._i18n[Language].diceNone + "</option><option value=\"red\">" + Tile._i18n[Language].diceRed + "</option><option value=\"redreroll\">" + Tile._i18n[Language].diceRedReroll + "</option><option value=\"orange\">" + Tile._i18n[Language].diceOrange + "</option><option value=\"orangereroll\">" + Tile._i18n[Language].diceOrangeReroll + "</option><option value=\"yellow\">" + Tile._i18n[Language].diceYellow + "</option><option value=\"yellowreroll\">" + Tile._i18n[Language].diceYellowReroll + "</option></select>"
                    + "</div>"
                + "</div>"
                + "<div class=\"field skills\">"
                    + "<label for=\"tskills\">" + Tile._i18n[Language].skills + "</label>"
                    + "<select id=\"tskills\" class=\"skills\" name=\"tileskills1\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n[Language].skillsNone + "</option>" + _skills() + "</select>"
                    + "<select id=\"tskills2\" class=\"skills\" name=\"tileskills2\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n[Language].skillsNone + "</option>" + _skills() + "</select>"
                    + "<select id=\"tskills3\" class=\"skills\" name=\"tileskills3\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n[Language].skillsNone + "</option>" + _skills() + "</select>"
                    + "<select id=\"tskills4\" class=\"skills\" name=\"tileskills4\" onchange=\"Tile._preview();\"><option value=\"none\">" + Tile._i18n[Language].skillsNone + "</option>" + _skills() + "</select>"
                + "</div>"
                + "<div class=\"field reinforcement\">"
                    + "<label for=\"treinforcement\">" + Tile._i18n[Language].reinforcement + "</label>"
                    + "<input type=\"number\" min=\"0\" max=\"9\" step=\"1\" maxlength=\"1\" id=\"treinforcement\" name=\"tilereinforcement\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].reinforcementPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
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
            + "<div class=\"tile\">"
                + "<h1>" + Tile._i18n[Language].header1ter + "</h1>"
                + "<input class=\"imagetoken\" type=\"checkbox\" id=\"timagetokenactive\" name=\"timagetokenactive\" onchange=\"Tile._preview();\"/><label for=\"timagetokenactive\">" + Tile._i18n[Language].imagetokenactive + "</label>"
                + "<div class=\"field\">"
                    + "<label for=\"timagetoken\">" + Tile._i18n[Language].imagetoken + "</label>"
                    + "<input id=\"timagetoken\" name=\"tileimagetoken\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"timagetokenlocation\">" + Tile._i18n[Language].imagelocation + "</label>"
                    + "<div><input id=\"timagetokenlocation\" name=\"tileimagetokenlocation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"\"/></div>"
                    + "<div><input id=\"timagetokenlocation2\" name=\"tileimagetokenlocation2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"timagetokenzoom\">" + Tile._i18n[Language].imagezoom + "</label>"
                    + "<input id=\"timagetokenzoom\" name=\"tileimagetokenzoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagezoomPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"timagetokenrotation\">" + Tile._i18n[Language].imagerotation + "</label>"
                    + "<input id=\"timagetokenrotation\" name=\"tileimagetokenrotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagerotationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<input class=\"imagetoken\" type=\"checkbox\" id=\"timagetoken2active\" name=\"timagetoken2active\" onchange=\"Tile._preview();\"/><label for=\"timagetoken2active\">" + Tile._i18n[Language].imagetokenactive + "</label>"
                + "<div class=\"field\">"
                    + "<label for=\"timagetoken2\">" + Tile._i18n[Language].imagetoken + "</label>"
                    + "<input id=\"timagetoken2\" name=\"tileimagetoken2\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagePh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagelocation\">"
                    + "<label for=\"timagetoken2location\">" + Tile._i18n[Language].imagelocation + "</label>"
                    + "<div><input id=\"timagetoken2location\" name=\"tileimagetoken2location\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"\"/></div>"
                    + "<div><input id=\"timagetoken2location2\" name=\"tileimagetoken2location2\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagelocationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/></div>"
                + "</div>"
                + "<div class=\"field imagezoom\">"
                    + "<label for=\"timagetoken2zoom\">" + Tile._i18n[Language].imagezoom + "</label>"
                    + "<input id=\"timagetoken2zoom\" name=\"tileimagetoken2zoom\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagezoomPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
                + "</div>"
                + "<div class=\"field imagerotation\">"
                    + "<label for=\"timagetoken2rotation\">" + Tile._i18n[Language].imagerotation + "</label>"
                    + "<input id=\"timagetoken2rotation\" name=\"tileimagetoken2rotation\" type=\"number\" autocomplete=\"off\" placeholder=\"" + Tile._i18n[Language].imagerotationPh + "\" onkeyup=\"Tile._preview();\" onchange=\"Tile._preview();\"/>"
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
        Tile._tile2form(tile);

        Tile._preview();
    },    

    _preview: function()
    {
        var tile= Tile._form2tile();
        var code = Tile._tileCode(tile, true);
        $(".dialog .preview").html(code);
    },

    _form2tile: function()
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
                    imagerotation: $(".dialog input[name=tileimagetokenrotation]")[0].value,
                },
                { 
                    active: $(".dialog input[name=timagetoken2active]")[0].checked,
                    image: $(".dialog input[name=tileimagetoken2]")[0].value,
                    imagelocation: {x: $(".dialog input[name=tileimagetoken2location]")[0].value, y: $(".dialog input[name=tileimagetoken2location2]")[0].value}, 
                    imagezoom: $(".dialog input[name=tileimagetoken2zoom]")[0].value,
                    imagerotation: $(".dialog input[name=tileimagetoken2rotation]")[0].value,
                }
            ]
        }
    },
    _tile2form: function(tile)
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
