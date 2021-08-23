Encyclopedia = mergeObject(Encyclopedia, {
    load: function()
    {
        return Promise.all([
            Utils.loadJSON("data/expansions.json", true)    .then(function(data) { Encyclopedia.expansions = data; }),
            Utils.loadJSON("data/maps.json", true)          .then(function(data) { Encyclopedia.maps = data; }),
            Utils.loadJSON("data/rules.json", true)         .then(function(data) { Encyclopedia.rules = data; }),
            Utils.loadJSON("data/skills.json", true)        .then(function(data) { Encyclopedia.skills = data; })
        ]);
    }
});
