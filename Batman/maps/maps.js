Maps = mergeObject(Maps, {
    _i18n: {
        'fr': {
            'legend_elevation_title': "TODO_TRANSLATE",
            'legend_elevation_text': "TODO_TRANSLATE",
            
            'legend_boundaries_title': "TODO_TRANSLATE",
            'legend_boundaries_orange': "TODO_TRANSLATE",
            'legend_boundaries_white': "TODO_TRANSLATE",
            'legend_boundaries_special': "TODO_TRANSLATE",
            'legend_boundaries_wall':"TODO_TRANSLATE",
            'legend_boundaries_wall_level': "TODO_TRANSLATE",
            
            'legend_specialmoves_title': "TODO_TRANSLATE",
            'legend_specialmoves_jump': "TODO_TRANSLATE",
            'legend_specialmoves_climb': "TODO_TRANSLATE",
            'legend_specialmoves_fall': "TODO_TRANSLATE",
            'legend_specialmoves_climb_fall': "TODO_TRANSLATE",
            
            'legend_areas_title': "TODO_TRANSLATE",
            'legend_areas_elevators_entrance': "TODO_TRANSLATE",
            'legend_areas_elevators_shaft': "TODO_TRANSLATE",
            'legend_areas_promontory': "TODO_TRANSLATE",
            'legend_areas_elevator_orientation': "TODO_TRANSLATE"
        },
        'en': {
            'legend_elevation_title': "Elevation levels",
            'legend_elevation_text': "Elevation level",
            
            'legend_boundaries_title': "Area Boundaries",
            'legend_boundaries_orange': "Orange area boundaries",
            'legend_boundaries_white': "White area boundaries",
            'legend_boundaries_special': "Special area boundaries",
            'legend_boundaries_wall': "Wall",
            'legend_boundaries_wall_level': "Level X wall",
            
            'legend_specialmoves_title': "Special Moves",
            'legend_specialmoves_jump': "A <strong>level X jump</strong> can be performed between those two areas following the arrow's direction.",
            'legend_specialmoves_climb': "A <strong>level X climb</strong> can be performed between those two areas following the arrow's direction.",
            'legend_specialmoves_fall': "A <strong>level X fall</strong> can be performed between those two areas following the arrow's direction.",
            'legend_specialmoves_climb_fall': "A <strong>level X climbs</strong> ans <strong>falls</strong> can be performed between those two areas.\nThe <strong>climb</strong> can be performed in both ways.\nThe <strong>fall</strong> can be performed following the white arrow's direction.",
            
            'legend_areas_title': "Areas",
            'legend_areas_elevators_entrance': "<strong>Elevator's entrance area.</strong>",
            'legend_areas_elevators_shaft': "<strong>Elevator shaft</strong>",
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

                    if (!(rules.legend.boundaries.orange === false))
                    {
                        aide += "<div class='map-map-legend-boundaries-orange'>"
                                    + Maps._i18n[Language].legend_boundaries_orange
                              + "</div>"
                    }
                    if (!(rules.legend.boundaries.white === false))
                    {
                        aide += "<div class='map-map-legend-boundaries-white'>"
                                    + Maps._i18n[Language].legend_boundaries_white
                              + "</div>"
                    }
                    if (!(rules.legend.boundaries.special === false))
                    {
                        aide += "<div class='map-map-legend-boundaries-special'>"
                                    + Maps._i18n[Language].legend_boundaries_special
                              + "</div>"
                    }
                    if (!(rules.legend.boundaries.wall === false))
                    {
                        aide += "<div class='map-map-legend-boundaries-wall'>"
                                    + Maps._i18n[Language].legend_boundaries_wall
                              + "</div>"
                    }
                    if (!(rules.legend.boundaries.wall_level === false))
                    {
                        aide += "<div class='map-map-legend-boundaries-walllevel'>"
                                    + Maps._i18n[Language].legend_boundaries_wall_level
                              + "</div>"
                    }
                    
                    aide += "</div>";
                }
                
                if (rules.legend.special_moves)
                {
                    aide += "<div class='map-map-legend map-map-legend-specialmoves'>"
                            + "<h1><div>" + Maps._i18n[Language].legend_specialmoves_title + "</div></h1>";

                    if (!(rules.legend.special_moves.jumb === false))
                    {
                        aide += "<div class='map-map-legend-specialmoves-jumb'>"
                                    + Maps._i18n[Language].legend_specialmoves_jump
                              + "</div>"
                    }
                    if (!(rules.legend.special_moves.climb === false))
                    {
                        aide += "<div class='map-map-legend-specialmoves-climb'>"
                                    + Maps._i18n[Language].legend_specialmoves_climb
                              + "</div>"
                    }
                    if (!(rules.legend.special_moves.fall === false))
                    {
                        aide += "<div class='map-map-legend-specialmoves-fall'>"
                                    + Maps._i18n[Language].legend_specialmoves_fall
                              + "</div>"
                    }
                    if (!(rules.legend.special_moves.climb_fall === false))
                    {
                        aide += "<div class='map-map-legend-specialmoves-climb_fall'>"
                                    + Maps._i18n[Language].legend_specialmoves_climb_fall.replace(/\n/g, '<br/>')
                              + "</div>"
                    }

                    aide += "</div>";
                }

                if (rules.legend.areas)
                {
                    aide += "<div class='map-map-legend map-map-legend-areas'>"
                            + "<h1><div>" + Maps._i18n[Language].legend_areas_title + "</div></h1>";

                    for (var i=0; i< rules.legend.areas.length; i++)
                    {
                        var area = rules.legend.areas[i];
                        aide += "<div class=\"map-map-legend-areas-" + area + "\">"
                            + Maps._i18n[Language]['legend_areas_' + area]
                            + "</div>"
                    }
                            
                    aide += "</div>";
                }
            }
        }
        
        return aide;
    }
});
