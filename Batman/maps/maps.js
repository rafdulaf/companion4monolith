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
            if (rules.legend)
            {
                if (rules.legend.elevation)
                {
                    aide += "<div class='map-map-legend map-map-legend-elevation'>"
                            + "<h1><div>" + Maps._i18n.legend_elevation_title + "</div></h1>";
                    
                    for (var i=0; i< rules.legend.elevation.length; i++)
                    {
                        var elevation =  rules.legend.elevation[i];
                        
                        aide += "<div>"
                              + "<span style=\"background-color: " + elevation.color + "\"></span>" 
                              + "<span>" + Maps._i18n.legend_elevation_text + " " + elevation.level + "</span>"
                              + "</div>"
                    }
                    
                    aide += "</div>";
                }
                
                if (rules.legend.boundaries)
                {
                    aide += "<div class='map-map-legend map-map-legend-boundaries'>"
                            + "<h1><div>" + Maps._i18n.legend_boundaries_title + "</div></h1>";

                        
                    ["orange", "white", "special", "wall", "wall_level"].forEach(function(item) {
                        if (!(rules.legend.boundaries[item] === false))
                        {
                            aide += "<div>"
                                  + "<span style=\"background-image: url('maps/img/boundaries_" + item + ".png?version=" + Version + "')\"></span>" 
                                  + "<span>" + Maps._i18n['legend_boundaries_' + item] + "</span>"
                                  + "</div>"
                        }
                    });
                    
                    aide += "</div>";
                }
                
                if (rules.legend.special_moves)
                {
                    aide += "<div class='map-map-legend map-map-legend-specialmoves'>"
                            + "<h1><div>" + Maps._i18n.legend_specialmoves_title + "</div></h1>";

                    ["jump", "climb", "fall", "climb_fall"].forEach(function(item) {
                        if (!(rules.legend.special_moves[item] === false))
                        {
                            aide += "<div>"
                                  + "<span style=\"background-image: url('maps/img/specialmoves_" + item + ".png?version=" + Version + "')\"></span>" 
                                  + "<span>" + Maps._i18n['legend_specialmoves_' + item].replace(/\n\n/g, '<hr/>').replace(/\n/g, '<br/>') + "</span>"
                                  + "</div>";
                        }
                    });

                    aide += "</div>";
                }

                if (rules.legend.areas)
                {
                    aide += "<div class='map-map-legend map-map-legend-areas'>"
                            + "<h1><div>" + Maps._i18n.legend_areas_title + "</div></h1>";

                    rules.legend.areas.forEach(function (area) {
                        aide += "<div class=\"map-map-legend-areas-" + area + "\">"
                                  + "<span style=\"background-image: url('maps/img/areas_" + area + ".png?version=" + Version + "')\"></span>" 
                                  + "<span>" + Maps._i18n['legend_areas_' + area] + "</span>"
                            + "</div>"
                    });
                            
                    aide += "</div>";
                }
            }
        }
        
        if (aide)
        {
            aide = "<div class='map-map-legends'>" + aide + "</div>";
        }
        
        return aide;
    }
});
