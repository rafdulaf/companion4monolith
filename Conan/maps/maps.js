Maps = mergeObject(Maps, {
    _legendAreas: function(map, helpImageSize)
    {
        var code = "";
        
        var rules = map.description.rules;
        if (rules)
        {
            for (var i=0; i < rules.length; i++) 
            {
                // Draw legends on the map
                if (rules[i].areas)
                {
                    for (var j=0; j < rules[i].areas.length; j++)
                    {
                        var areaName = rules[i].areas[j];
                        var zone = map.zones[areaName];

                        var line = "";
                        for (var k=0; k < zone.area.length; k++)
                        {
                            line += (k == 0 ? "M" : "L") + zone.area[k][0] + "," + zone.area[k][1] + "";
                        }

                        code += "<path style=\"fill: " + rules[i].areasColor + "\"" +
                                        "d='" + line + "' " +
                                        "class='map-map-area-zone-mini'>" +
                        "</path>";
                    }
                }
            }
        }
        
        return code;
    },
    _legendNumbers: function(map, helpImageSize) 
    {
        var aide = "";
        
        var rules = map.description.rules;
        if (rules)
        {
            var bbSize = 10 / helpImageSize * 100; // 1 legend is 20px. so center is 10px at left/top

            for (var i=0; i < rules.length; i++) 
            {
                // Draw numbers on the map
                if (rules[i].coordinates)
                {
                    for (var j=0; j < rules[i].coordinates.length; j++)
                    {
                        var coo = rules[i].coordinates[j];
                        aide += "<span class='map-help-legend' data-num='" + (i+1) + "' style='left: " + (coo[0]-bbSize) + "%; top: " + (coo[1]-bbSize) + "%; transform: rotate(" + (90*Maps._rotation) + "deg)'>" + (i+1) + "</span>";
                    }
                }

            }            
        }
        
        return aide;
    },
    _legendText: function(map)
    {
        var aide = "";
        
        var rules = map.description.rules;
        if (rules)
        {
            aide = "<ul>";
            for (var i=0; i < rules.length; i++)
            {
                var areaAide = "";
                if (rules[i].areas)
                {
                    areaAide += "<span class='map-help-rule-areas'><span class='map-help-rule-areas-square' style='background-color: " + rules[i].areasColor + "'></span>" + rules[i].areasText[Language] + "</span>"
                }
    
                aide += "<li>"
                + "<span class='map-help-rule-title' data-num='" + (i + 1) + "'>" + rules[i].title[Language] + "</span>"
                + "<span class='map-help-rule-description'>" + About._replace(rules[i].description[Language]) + "</span>"
                + areaAide
                + "</li>";
            }
            aide += "</ul>"
        }

        return aide;
    }
});
