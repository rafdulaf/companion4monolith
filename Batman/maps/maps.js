Maps = mergeObject(Maps, {
    _i18n: {
        'fr': {
            'legend_elevation_title': "Niveaux d'élévation",
            'legend_elevation_text': "Niveau<br/>d'élévation",
            
            'legend_boundaries_title': "Limites de zone",
            'legend_boundaries_orange': "Limite de zone<br/>orange",
            'legend_boundaries_white': "Limite de zone<br/>blanche",
            'legend_boundaries_special': "Limite de zone<br/>spéciale",
            'legend_boundaries_wall':"Paroi",
            'legend_boundaries_wall_level': "Paroi de niveau X",
            
            'legend_specialmoves_title': "Déplacements spéciaux",
            'legend_specialmoves_jump': "Un <strong>saut de niveau X</strong> est possible entre ces deux zones, dans un sens comme dans l'autre.",
            'legend_specialmoves_climb': "Une <strong>escalade de niveau X</strong> est possible entre ces deux zones, dans un sens comme dans l'autre.",
            'legend_specialmoves_fall': "Une <strong>chute de niveau X</strong> est possible entre ces deux zones, dans un sens comme dans l'autre.",
            'legend_specialmoves_climb_fall': "Une <strong>escalade</strong> et une <strong>chute de niveau X</strong>\nsont possibles entre ces deux zones.\n\nL'<strong>escalade</strong> peut être effectuée dans\nles deux sens.\n\nLa <strong>chute</strong> peut être effectuée dans le sens indiqué par la flèche blanche.",
            
            'legend_areas_title': "Zones",
            'legend_areas_elevators_entrance': "Zone d'entrée d'ascenseur",
            'legend_areas_elevator_shaft': "Cage d'ascenseur",
            'legend_areas_promontory': "Promontoire",
            'legend_areas_elevator_orientation': "Indique l'orientation de la tuile ascenseur"
        },
        'en': {
            'legend_elevation_title': "Elevation levels",
            'legend_elevation_text': "Elevation<br/>level",
            
            'legend_boundaries_title': "Area Boundaries",
            'legend_boundaries_orange': "Orange area<br/>boundaries",
            'legend_boundaries_white': "White area<br/>boundaries",
            'legend_boundaries_special': "Special area<br/>boundaries",
            'legend_boundaries_wall': "Wall",
            'legend_boundaries_wall_level': "Level X wall",
            
            'legend_specialmoves_title': "Special Moves",
            'legend_specialmoves_jump': "A <strong>level X jump</strong> can be performed between those two areas following the arrow's direction.",
            'legend_specialmoves_climb': "A <strong>level X climb</strong> can be performed between those two areas following the arrow's direction.",
            'legend_specialmoves_fall': "A <strong>level X fall</strong> can be performed between those two areas following the arrow's direction.",
            'legend_specialmoves_climb_fall': "A <strong>level X climbs</strong> ans <strong>falls</strong> can be performed between those two areas.\n\nThe <strong>climb</strong> can be performed in both ways.\n\nThe <strong>fall</strong> can be performed following the white arrow's direction.",
            
            'legend_areas_title': "Areas",
            'legend_areas_elevators_entrance': "<strong>Elevator's entrance area.</strong>",
            'legend_areas_elevator_shaft': "<strong>Elevator shaft</strong>",
            'legend_areas_promontory': "<strong>Promontory</strong>",
            'legend_areas_elevator_orientation': "Indicates the elevator tile's orientation."
        }
    },
            
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
                            + "<h1><div>" + Maps._i18n[Language].legend_elevation_title + "</div></h1>";
                    
                    for (var i=0; i< rules.legend.elevation.length; i++)
                    {
                        var elevation =  rules.legend.elevation[i];
                        
                        aide += "<div>"
                              + "<span style=\"background-color: " + elevation.color + "\"></span>" 
                              + "<span>" + Maps._i18n[Language].legend_elevation_text + " " + elevation.level + "</span>"
                              + "</div>"
                    }
                    
                    aide += "</div>";
                }
                
                if (rules.legend.boundaries)
                {
                    aide += "<div class='map-map-legend map-map-legend-boundaries'>"
                            + "<h1><div>" + Maps._i18n[Language].legend_boundaries_title + "</div></h1>";

                        
                    ["orange", "white", "special", "wall", "wall_level"].forEach(function(item) {
                        if (!(rules.legend.boundaries[item] === false))
                        {
                            aide += "<div>"
                                  + "<span style=\"background-image: url('maps/img/boundaries_" + item + ".png?version=" + Version + "')\"></span>" 
                                  + "<span>" + Maps._i18n[Language]['legend_boundaries_' + item] + "</span>"
                                  + "</div>"
                        }
                    });
                    
                    aide += "</div>";
                }
                
                if (rules.legend.special_moves)
                {
                    aide += "<div class='map-map-legend map-map-legend-specialmoves'>"
                            + "<h1><div>" + Maps._i18n[Language].legend_specialmoves_title + "</div></h1>";

                    ["jump", "climb", "fall", "climb_fall"].forEach(function(item) {
                        if (!(rules.legend.special_moves[item] === false))
                        {
                            aide += "<div>"
                                  + "<span style=\"background-image: url('maps/img/specialmoves_" + item + ".png?version=" + Version + "')\"></span>" 
                                  + "<span>" + Maps._i18n[Language]['legend_specialmoves_' + item].replace(/\n\n/g, '<hr/>').replace(/\n/g, '<br/>') + "</span>"
                                  + "</div>";
                        }
                    });

                    aide += "</div>";
                }

                if (rules.legend.areas)
                {
                    aide += "<div class='map-map-legend map-map-legend-areas'>"
                            + "<h1><div>" + Maps._i18n[Language].legend_areas_title + "</div></h1>";

                    rules.legend.areas.forEach(function (area) {
                        aide += "<div class=\"map-map-legend-areas-" + area + "\">"
                                  + "<span style=\"background-image: url('maps/img/areas_" + area + ".png?version=" + Version + "')\"></span>" 
                                  + "<span>" + Maps._i18n[Language]['legend_areas_' + area] + "</span>"
                            + "</div>"
                    });
                            
                    aide += "</div>";
                }
            }
        }
        
        return aide;
    }
});
