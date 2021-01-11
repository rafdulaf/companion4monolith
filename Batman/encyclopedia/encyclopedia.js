var Encyclopedia = {
    load: function()
    {
        return Promise.all([
            Utils.loadJSON("data/expansions.json")  .then(function(data) { Encyclopedia.expansions = data; }),
            Utils.loadJSON("data/maps.json")        .then(function(data) { Encyclopedia.maps = data; }),
            Utils.loadJSON("data/rules.json")       .then(function(data) { Encyclopedia.rules = data; }),
            Utils.loadJSON("data/skills.json")       .then(function(data) { Encyclopedia.skills = data; })
    }
};
