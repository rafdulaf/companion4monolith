Encyclopedia = mergeObject(Encyclopedia, {
    _loadItems: function() {
        Encyclopedia._items = [EncyclopediaHeroes, EncyclopediaTiles, EncyclopediaEquipments, EncyclopediaSpells, EncyclopediaModels, EncyclopediaTokens];
    },
        
    load: function()
    {
        return Promise.all([
            Utils.loadJSON("data/skills.json", true)    .then(function(data) { Encyclopedia.skills = data; }),
            Utils.loadJSON("data/spells.json", true)    .then(function(data) { Encyclopedia.spells = Encyclopedia._loadDeemphasize(data, ['title', 'text']); }),
            Utils.loadJSON("data/equipments.json", true).then(function(data) { Encyclopedia.equipments = Encyclopedia._loadDeemphasize(Encyclopedia._loadHandleCount(data), ['title']); }),
            Utils.loadJSON("data/expansions.json",true) .then(function(data) { Encyclopedia.expansions = data; }),
            Utils.loadJSON("data/maps.json", true)      .then(function(data) { Encyclopedia.maps = data; }),
            Utils.loadJSON("data/models.json", true)    .then(function(data) { Encyclopedia.models = Encyclopedia._loadHandleCount(data); }),
            Utils.loadJSON("data/tiles.json", true)     .then(function(data) { Encyclopedia.tiles = Encyclopedia._loadDeemphasize(Encyclopedia._loadHandleColors(Encyclopedia._loadHandleCount(data)), ['name']); }),
            Utils.loadJSON("data/tokens.json", true)    .then(function(data) { Encyclopedia.tokens = Encyclopedia._loadDeemphasize(Encyclopedia._loadHandleCount(data), ['name']); }),
            Utils.loadJSON("data/heroes.json", true)    .then(function(data) { Encyclopedia.heroes = Encyclopedia._loadDeemphasize(data, ['name', 'subname']); }),
            Utils.loadJSON("data/rules.json", true)     .then(function(data) { Encyclopedia.rules = data; })
        ]);
    },
    
    copyright: function() 
    {
        return "<p>" + Encyclopedia._i18n.copyright + "</p>"
    }
});
