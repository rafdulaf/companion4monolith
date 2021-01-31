Maps = mergeObject(Maps, {
    _helpImage: function(map) {
        var rules = map.description.rules;
        if (rules && rules.image)
        {
            return rules.image;
        }
        else
        {
            return map.description.board;
        }
    },
    
    _legendText: function(map)
    {
        var aide = "";
        
        var rules = map.description.rules;
        if (rules)
        {
            aide += "<div class='map-map-legend'>test</div>";
        }
        
        return aide;
    }
});
