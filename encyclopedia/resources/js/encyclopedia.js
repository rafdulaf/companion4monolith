var Encyclopedia = {
    load: function()
    {
        function _load(url, cb)
        {
            return new Promise(function (resolve, reject) { 
                url += '?_=' + new Date().getTime();
                
                $.ajax({
                  dataType: "json",
                  url: url,
                  success: function(data) { cb(data); resolve(url); },
                  error: function() { reject(url); }
                });
            });
        }
        
        return Promise.all([
            _load("data/skills.json", function(data) { Encyclopedia.skills = data; }),
            _load("data/spells.json", function(data) { Encyclopedia.spells = data; }),
            _load("data/expansions.json", function(data) { Encyclopedia.expansions = data; })
        ]);
    }
};