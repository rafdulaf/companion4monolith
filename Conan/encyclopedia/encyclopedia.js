Encyclopedia = mergeObject(Encyclopedia, {
    _loadItems: function() {
        Encyclopedia._items = [EncyclopediaHeroes, EncyclopediaTiles, EncyclopediaEquipments, EncyclopediaSpells, EncyclopediaModels, EncyclopediaTokens];
    },
        
    load: function()
    {
        return Promise.all([
            Utils.loadJSON("data/skills.json")      .then(function(data) { Encyclopedia.skills = data; }),
            Utils.loadJSON("data/spells.json")      .then(function(data) { Encyclopedia.spells = data; }),
            Utils.loadJSON("data/equipments.json")  .then(function(data) { Encyclopedia.equipments = Encyclopedia._loadHandleCount(data); }),
            Utils.loadJSON("data/expansions.json")  .then(function(data) { Encyclopedia.expansions = data; }),
            Utils.loadJSON("data/maps.json")        .then(function(data) { Encyclopedia.maps = data; }),
            Utils.loadJSON("data/models.json")      .then(function(data) { Encyclopedia.models = Encyclopedia._loadHandleCount(data); }),
            Utils.loadJSON("data/tiles.json")       .then(function(data) { Encyclopedia.tiles = Encyclopedia._loadHandleColors(Encyclopedia._loadHandleCount(data)); }),
            Utils.loadJSON("data/tokens.json")      .then(function(data) { Encyclopedia.tokens = Encyclopedia._loadHandleCount(data); }),
            Utils.loadJSON("data/heroes.json")      .then(function(data) { Encyclopedia.heroes = data; }),
            Utils.loadJSON("data/rules.json")       .then(function(data) { Encyclopedia.rules = data; })
        ]);
    }
});
