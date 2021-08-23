Rules = mergeObject(Rules, {
    _initSkillsSpecific: function()
    {
        var handled = [];
        for (var i in Encyclopedia.spells.list)
        {
            var spell = Encyclopedia.spells.list[i];
            if (spell.clarification && spell.clarification && About._hasExpansion(spell.origins) && handled.indexOf(spell.id) == -1)
            {
                handled.push(spell.id)
                Rules._addSkill(null,
                                    'magic',
                                     spell.image,
                                     spell.title,
                                     Rules._i18n.spell_clarification + spell.clarification.replace(/\n/g, "<br/>"));
            }
        }
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

    _openSkillSpecific: function(skill) {
        var eqS = EncyclopediaEquipments._findEquipmentsBySkill(skill.id).map(eq => EncyclopediaEquipments._linkToEquipment(eq.id)).join(", ");
        var spS = EncyclopediaSpells._findSpellsBySkill(skill.id).map(spell => EncyclopediaSpells._linkToSpell(spell.id)).join(", ");
        var heS = EncyclopediaHeroes._findHeroesBySkill(skill.id).map(hero => EncyclopediaHeroes._linkToHero(hero.id)).join(", ");
        var tiS = EncyclopediaTiles._findTilesBySkill(skill.id).map(tile => EncyclopediaTiles._linkToTile(tile.id)).join(", ");
        var tokens = skill.token ? EncyclopediaTokens._linkToToken(skill.token, true) : "";

        return    (eqS ? ("<div class='equipments'>" + Rules._i18n.equipments + " " + eqS + "</div>") : "")
                + (spS ? ("<div class='spells'>" + Rules._i18n.spells + " " + spS + "</div>") : "")
                + (heS ? ("<div class='heroes'>" + Rules._i18n.heroesOwned + " " + heS + "</div>") : "")
                + (tiS ? ("<div class='tiles'>" + Rules._i18n.tilesOwned + " " + tiS + "</div>") : "")
                + (tokens ? ("<div class='tokens'>" + Rules._i18n.tokensUsed + " " + tokens + "</div>") : "")
        ;
    }
});
