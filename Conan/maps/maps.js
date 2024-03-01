Maps = mergeObject(Maps, {
    _legendImage: function(map) {
        return Maps._legendAreas(map) 
                + Maps._legendNumbers(map);
    },
    
    _rulesComposition: function(composition) 
    {
        var allRules = [];
        for (var r in composition.description.rules)
        {
            allRules.push(composition.description.rules[r]);
        }
        
        for (var zoneId in composition.zones)
        {
            var zoneMap = Maps._findMapById(zoneId);
            
            for (var r in zoneMap.description.rules)
            {
                let newRule = JSON.parse(JSON.stringify(zoneMap.description.rules[r]));
                if (newRule.coordinates)
                {                
                    newRule.coordinates = Maps._composeCoordinates(newRule.coordinates, composition.zones[zoneId], true);
                    if (!newRule.coordinates || zoneMap.description.rules[r].coordinates.length > 0 && newRule.coordinates.length == 0)
                    {
                        // discard rule
                        continue;
                    }
                }
                allRules.push(newRule);
            }
        }
        
        return allRules;
    },
    
    _legendAreas: function(map)
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
        
        if (code)
        {
            code = "<svg  viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">" + code + "</svg>";
        }
        
        return code;
    },
    _legendNumbers: function(map) 
    {
        var aide = "";
        
        var rules = map.description.rules;
        if (rules)
        {
            for (var i=0; i < rules.length; i++) 
            {
                // Draw numbers on the map
                if (rules[i].coordinates)
                {
                    for (var j=0; j < rules[i].coordinates.length; j++)
                    {
                        var coo = rules[i].coordinates[j];
                        aide += "<span onclick='Maps._scrollIntoView(" + (i + 1) + ")' class='map-help-legend' data-num='" + (i+1) + "' style='left: " + coo[0] + "%; top: " + coo[1] + "%;'>" + (i+1) + "</span>";
                    }
                }

            }            
        }
        
        return aide;
    },
    _scrollIntoView: function(number) {
        $("*.map-help-rule-title[data-num='" + number + "']").parent()[0].scrollIntoView({ behavior: "smooth" });
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
                    areaAide += "<span class='map-help-rule-areas'><span class='map-help-rule-areas-square' style='background-color: " + rules[i].areasColor + "'></span>" + rules[i].areasText + "</span>"
                }
    
                aide += "<li>"
                + "<span class='map-help-rule-title' data-num='" + (i + 1) + "'>" + rules[i].title + "</span>"
                + "<span class='map-help-rule-description'>" + About._replace(rules[i].description) + "</span>"
                + areaAide
                + "</li>";
            }
            aide += "</ul>"
        }

        return aide;
    }
});
