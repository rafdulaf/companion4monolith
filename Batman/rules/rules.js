Rules = mergeObject(Rules, {
    _i18n: {
        'fr': {
            'skills': "Compétences",
            'spell_clarification': "(Clarification du sort) ",

            'equipments': "Utilisée dans les cartes d'équipement :",
            'spells': "Utilisée dans les cartes de sort :",
            'heroesOwned': "Possédée par les héros :",
            'tilesOwned': "Possédée par les tuiles :",
            'tokensUsed': "En rapport avec le jeton :"
        },
        'en': {
            'skills': "Skills",
            'spell_clarification': "(Spell clarification) ",

            'equipments': "Used in the equipments cards:",
            'spells': "Used in the spells card:",
            'heroesOwned': "Owned by the heroes:",
            'tilesOwned': "Owned by the tiles:",
            'tokensUsed': "Related to the token:"
        },
        'it': {
            'skills': "Abilità",
            'spell_clarification': "(Chiarimento incantesimi)",

            'equipments': "Usata nelle carte equipaggiamento :",
            'spells': "Usata nelle carte incantesimo :",
            'heroesOwned': "Possedute dagli Eroi :",
            'tilesOwned': "Usata nelle tessere :",
            'tokensUsed': "Relativo al segnalino :"
        }
    },

    _beforeRuleList: function() {
        Rules._rules = [{
            label: Rules._i18n[Language].skills, 
            id: "skills", 
            download: Encyclopedia.skills.link[Language]
        }, ...Rules._rules];
    },

    _afterRuleList: function() {
        Rules._initSkills();
    },

    _initSkills: function()
    {
        $("#skills").html("<div></div>");

        for (var i in Encyclopedia.skills.types)
        {
            var type = Encyclopedia.skills.types[i];

            $('#skills > div').append("<div id='skills_" + type.id + "' class='skill-tab'><h2>" + type.title[Language] + "</h2></div>");

            for (var j in Encyclopedia.skills.list)
            {
                var skill = Encyclopedia.skills.list[j];
                if (skill.type == type.id)
                {
                    Rules._addSkill(skill.id,
                                         skill.type,
                                         skill.image,
                                         skill.title[Language],
                                         skill.text[Language]);
                }
            }
        }

        var handled = [];
        for (var i in Encyclopedia.spells.list)
        {
            var spell = Encyclopedia.spells.list[i];
            if (spell.clarification && spell.clarification[Language] && About._hasExpansion(spell.origins) && handled.indexOf(spell.id) == -1)
            {
                handled.push(spell.id)
                Rules._addSkill(null,
                                    'magic',
                                     spell.image,
                                     spell.title[Language],
                                     Rules._i18n[Language].spell_clarification + spell.clarification[Language]);
            }
        }
    },

    _addSkill: function(id, type, image, title, text)
    {
        $('#skills_' + type).append((id ? "<a href='javascript:void(0)' onclick='Rules.openSkill(\"" + id + "\")'>" : "")
            + Rules._skill2HTML(id, type, image, title, text)
            + (id ? "</a>" : ""));
    },

    _skill2HTML: function(id, type, image, title, text)
    {
        return "<div class='skills-skill'>"
            +   "<img loading=\"lazy\" src='" + image + "?version=" + Version + "'/>"
            +   "<div class='skills-title'>" + title + "</div>"
            +   "<div class='skills-text'>" + Rules._replace(text) + "</div>"
            +   "<div class='clear'></div>"
            + "</div>";
    },

    _replace: function(text)
    {
        text = text.replace(/\{(.*?)\}/g, "<img src='resources/img/$1.png?version=" + Version + "' class='rules-character'/>");
        return text;
    },

    _linkToSkill: function(id, big)
    {
        big = big || false;

        var index = id.indexOf('/');
        if (index > 0)
        {
            id = id.substring(index + 1);
        }

        var skill = Rules._findSkillById(id);

        var s = "<a href='javascript:void(0)' class='openskill' onclick='Rules.openSkill(\"" + id + "\")'>";
        if (!big)
        {
            s += skill.title[Language];
        }
        else
        {
            s += Rules._skill2HTML(skill.id, skill.type, skill.image, skill.title[Language], skill.text[Language]);
        }
        s += "</a>";

        return s;
    },

    _findSkillById: function(id)
    {
        var index = id.indexOf('/');
        if (index > 0)
        {
            id = id.substring(index + 1);
        }

        for (var i in Encyclopedia.skills.list)
        {
            var skill = Encyclopedia.skills.list[i];
            if (skill.id == id)
            {
                return skill;
            }
        }

        throw new Error("Cannot find skill " + id);
    },

    _findSkillByToken: function(tokenId)
    {
        for (var i in Encyclopedia.skills.list)
        {
            var skill = Encyclopedia.skills.list[i];
            if (skill.token && skill.token.indexOf(tokenId) >= 0)
            {
                return skill;
            }
        }

        return null;
    },

    openSkill: function(id) {
        var skill = Rules._findSkillById(id);

        var eqS = EncyclopediaEquipments._findEquipmentsBySkill(id).map(eq => EncyclopediaEquipments._linkToEquipment(eq.id)).join(", ");
        var spS = EncyclopediaSpells._findSpellsBySkill(id).map(spell => EncyclopediaSpells._linkToSpell(spell.id)).join(", ");
        var heS = EncyclopediaHeroes._findHeroesBySkill(id).map(hero => EncyclopediaHeroes._linkToHero(hero.id)).join(", ");
        var tiS = EncyclopediaTiles._findTilesBySkill(id).map(tile => EncyclopediaTiles._linkToTile(tile.id)).join(", ");
        var tokens = skill.token ? EncyclopediaTokens._linkToToken(skill.token, true) : "";

        Nav.dialog(skill.title[Language],
            "<div class='skillsdetails'>"
                + Rules._skill2HTML(skill.id, skill.type, skill.image, skill.title[Language], skill.text[Language])
                + (eqS ? ("<div class='equipments'>" + Rules._i18n[Language].equipments + " " + eqS + "</div>") : "")
                + (spS ? ("<div class='spells'>" + Rules._i18n[Language].spells + " " + spS + "</div>") : "")
                + (heS ? ("<div class='heroes'>" + Rules._i18n[Language].heroesOwned + " " + heS + "</div>") : "")
                + (tiS ? ("<div class='tiles'>" + Rules._i18n[Language].tilesOwned + " " + tiS + "</div>") : "")
                + (tokens ? ("<div class='tokens'>" + Rules._i18n[Language].tokensUsed + " " + tokens + "</div>") : "")
            + "</div>",
            null,
            []
        );
    }
});
