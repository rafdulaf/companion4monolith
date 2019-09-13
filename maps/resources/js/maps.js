var ConanMaps = {
    _i18n: {
        'fr': {
            'menu': "Cartes",
            'back': "Retour au choix des cartes",
            'openMap': "Cliquez pour voir la carte: ",
            'los': "Lignes de vue",
            'help': "Règles du plateau",
            'rotate': "Tourner le plateau",
            'forum': "Une question sur la carte ? Demandez sur le forum !",
            'losfile': "Télécharger la carte statique des lignes de vue",
            'start': "Cliquez sur une zone pour voir les lignes de vue",
            'legend': "Légende",
            'clickhelp1': "La zone actuellement selectionnée est en bleu et offre des lignes de vues vers toutes les zones colorées.",
            'clickhelp4': "Les zones colorées en jaune sont en contrebas et donnent le bonus d'élévation d'un dé jaune.",
            'clickhelp6': "Les zones vertes sont au même niveau que la zone bleue.",   
            'clickhelp5': "Les zones colorées en turquoise sont au dessus.",
            'clickhelp3': "Les cercles verts indique le niveau d'élévation d'une zone.", 
            'copyright': "Les textes d'aide des cartes sont issus des textes proposés par leurs créateurs respectifs. Certains sont retouchés.<br/>"
                        + "Certaines cartes proposent de télécharger une vue statique des lignes de vue. Ces vues ont été réalisées par <a href='https://the-overlord.com/index.php?/profile/13-roolz/' target='_blank'>@Roolz</a>.<br/>"
                        + "Le principe des lignes de vues dynamiques est une idée de <a href='https://the-overlord.com/index.php?/profile/88-pamplerousse/' target='_blank'>@Pamplerousse</a>.<br/>"
                        + "La carte :",
            'copyright_prop': "est la propriété de"
        },
        'en': {
            'menu': "Boards",
            'back': "Back to the boards choice",
            'openMap': "Click to see the board: ",
            'los': "Lines of sight",
            'help': "Board rules",
            'rotate': "Turn the board",
            'forum': "A question on this board? Ask the forum!",
            'losfile': "Download the static lines of sight board",
            'start': "Click in an area to see the lines of sight",
            'legend': "Legend",
            'clickhelp1': "Blue area is the selected area. It has has line of sight to all colored areas.",
            'clickhelp4': "Yellow areas are below the blue area: Ranged attacks to these areas get an Elevation bonus of 1 yellow die.",
            'clickhelp6': "Green areas are at the same level as the blue area.",   
            'clickhelp5': "Turquoise areas are above the blue area.",
            'clickhelp3': "Note: The green circles around the dots show elevation levels.", 
            'copyright': "The help text of the boards are proposed by their respective creators. Some of them were modified.<br/>"
                        + "Some card allow to download a static ligne of sight view. This views were realized by <a href='https://the-overlord.com/index.php?/profile/13-roolz/' target='_blank'>@Roolz</a>.<br/>"
                        + "The principal of the dynamic line of sights is based on a idea of <a href='https://the-overlord.com/index.php?/profile/88-pamplerousse/' target='_blank'>@Pamplerousse</a>.<br/>"
                        + "The card:" ,
            'copyright_prop': "is the property of"
        }
    },
    
	init: function(config)
	{
        Nav.addIcon(ConanMaps._i18n[Language].menu, "maps-icon", "maps");
        
        Nav.addAction("maps", ConanMaps._i18n[Language].back, "maps-icon-index", "index", ConanMaps._displayIndex);
        Nav.addAction("maps", ConanMaps._i18n[Language].forum, "maps-icon-forum", "forum", ConanMaps._openForum);
        Nav.addAction("maps", ConanMaps._i18n[Language].losfile, "maps-icon-losfile", "losfile", ConanMaps._losFile);
        Nav.addAction("maps", ConanMaps._i18n[Language].legend, "maps-icon-legend", "legend", ConanMaps._legend );
        Nav.addAction("maps", ConanMaps._i18n[Language].rotate, "maps-icon-rotate", "rotate", function() { ConanMaps._rotate(-1); } );

        ConanMaps._rotation = window.screen.width / window.screen.height > 1.2 ? 0 : 3;
        
		var maps = [
            "Pict_Village",
            "Inn",
            "Ships",
            "Abandoned_Fort",
            "Citadel",
            "Swamp",
            "Forest",
            "Mound",
            "Market",
            "Tower",
            "Underground",
            "Port"
        ];

		ConanMaps._files = { };
		ConanMaps._filesCount = maps.length;
		for (var i = 0; i < ConanMaps._filesCount; i++)
		{
			ConanMaps._files[maps[i]] = null;
		}

		console.info("Loading " + ConanMaps._filesCount + " map(s)");

		for (var i in ConanMaps._files)
		{
			jQuery.getScript("maps/data/" + i + "/data.js")
				.done(ConanMaps._fileLoaded)
				.fail(ConanMaps._fileLoaded);
		}		
	},
	_init2: function()
	{
		var toRemove = [];
		for (var i in ConanMaps._files)
		{
			try
			{
				var map = eval(i);
				ConanMaps._files[i] = map;
                
                if (ConanMaps._files[i].description.origin == "stretchgoal" && Extensions["custom-box"] == "corebox"
                    || ConanMaps._files[i].description.origin != "stretchgoal" && ConanMaps._files[i].description.origin != "corebox" && !Extensions[ConanMaps._files[i].description.origin])
                {
                    console.info("Discarding map '" + i + "' ");
                    toRemove.push(i);
                }
                else
                {
    				console.info("Map '" + i + "' loaded");
                
                    ConanMaps._check(map);
                }
			}
			catch(e)
			{
				toRemove.push(i);
				console.error("Map '" + i + "' not loaded, " + e);
			}
		}
		
		for (var i in toRemove)
		{
			ConanMaps._filesCount--;
			delete ConanMaps._files[toRemove[i]];
		}

        $(window).resize(ConanMaps._onResize);
		ConanMaps._displayIndex();
        
        ConanAbout.addCopyright(ConanMaps._i18n[Language].menu, ConanMaps._i18n[Language].copyright + ConanMaps._copyright());
	},
	
	_filesLoaded: 0,
	_fileLoaded: function()
	{
		ConanMaps._filesLoaded++;
		if (ConanMaps._filesLoaded === ConanMaps._filesCount)
		{
			ConanMaps._init2();
		}			
	},
	
	_hideAll: function()
	{
		$("#maps > .map-card").hide();
	},
    
    _check: function(map)
    {
        for (var z in map.zones)
        {
            var zone = map.zones[z];
            var nbZCenters = zone.centers.length;
            for (var l=0; l < zone.links.length; l++)
            {
                var link = zone.links[l];
                var result = /^([0-9]+)#(.+)#([0-9]+)$/.exec(link)
                if (!result)
                {
                    console.error("    Error in zone '" + z + "', the link n°" + l + " is not readable: " + link);
                }
                else
                {
                    var centerOfZ = parseInt(result[1]);
                    var targetZoneName = result[2];
                    var centerOfTarget = parseInt(result[3]);
                    
                    if (centerOfZ < 1 || centerOfZ > nbZCenters)
                    {
                        console.error("    Error in zone '" + z + "', the link n°" + l + " starts from an unexisting center: " + link);
                    }
                    
                    var targetZone = map.zones[targetZoneName];
                    if (!targetZone)
                    {
                        console.error("    Error in zone '" + z + "', the link n°" + l + " links to an unexisting zone: " + link);
                    }
                    else
                    {
                        var nbTargetZoneCenters = targetZone.centers.length;
                        if (centerOfTarget < 1 || centerOfTarget > nbTargetZoneCenters)
                        {
                            console.error("    Error in zone '" + z + "', the link n°" + l + " leads to an unexisting center: " + link);
                        }
                        else if (!zone.onewaylinks)
                        {
                            var reverseLink = centerOfTarget + "#" + z + "#" + centerOfZ;
                            if (!targetZone.links.includes(reverseLink))
                            {
                                console.error("    Error in zone '" + z + "', the link n°" + l + " has no reverse link: " + link);
                            }
                        }
                    }
                }
            }
        }
    },
	
	_displayIndex: function()
	{
		ConanMaps._hideAll();
        Nav.hideAction("maps", "index");
        Nav.hideAction("maps", "forum");
        Nav.hideAction("maps", "losfile");
        Nav.hideAction("maps", "rotate");
        Nav.hideAction("maps", "legend");
		
		var id = "maps-index";
		
		var index = $('#' + id);

        $('#maps').attr('title', ConanMaps._i18n[Language].menu);
        Nav.updateTitle();
        
		if (index.length == 0)
		{
			var code = "";
			for (var i in ConanMaps._files)
			{
				var imgCode = "<div class='map-index-board-image' style=\"background-image: url('maps/data/" + i + "/thumb.png" + "\');\"/>"
                var subtitleCode = "<div class='map-index-board-sublegend'>" + ConanAbout._origins[Language][ConanMaps._files[i].description.origin + '-short'] + "</div>";
				var titleCode = "<div class='map-index-board-legend'>" + ConanMaps._files[i].description.title[Language] + "</div>";
				code += "<li><a href=\"javascript:void(0);\" title=\"" + ConanMaps._i18n[Language].openMap + ConanMaps._files[i].description.title[Language] + "\" onclick=\"ConanMaps._displayMap('" + i + "')\">" + imgCode + titleCode + subtitleCode + "</a></li>";
			}
			
			$('#maps').append("<div id='" + id + "' class='map-card map-index' style='display: none'><ul>" + code + "</ul></div>");
			index = $('#' + id);
		}

		index.show();
	},
    
    _onSetPosition: function(event, slick)
    {
        if ($('#maps-index').is(':visible'))
        {
            return;
        }
        
        if (ConanMaps.onresize)
        {
            ConanMaps.onresize = false;
            ConanMaps._rotate();
        }
        
        if ((slick.currentSlide || 0) == 0)
        {
            Nav.hideAction("maps", "forum");
            if (ConanMaps._files[ConanMaps._currentMap].description.losFile === true)
            {
                Nav.showAction("maps", "losfile");
            }
            Nav.showAction("maps", "rotate");
            Nav.showAction("maps", "legend");
        }
        else
        {
            if (ConanMaps._files[ConanMaps._currentMap].description.totopic)
            {
                Nav.showAction("maps", "forum");
            }
            Nav.hideAction("maps", "losfile");
            Nav.showAction("maps", "rotate");
            Nav.hideAction("maps", "legend");
        }
        Nav.updateTitle();
    },

    _onResize: function() 
    {
        ConanMaps.onresize = true;
    },
    
    _displayMap: function(map)
    {
        console.info('Display map ' + map)

        ConanMaps._lastSelectedZone = null;
        ConanMaps._hideAll();
        ConanMaps._currentMap = map;
        
        Nav.showAction("maps", "index");
        ConanMaps._onSetPosition(null, 0);

        $('#maps').attr('title', ConanMaps._files[ConanMaps._currentMap].description.title[Language]);
        Nav.updateTitle();

        var id = "maps-map";
        
        var mapC = $('#' + id);
        if (mapC.length == 0)
        {
            $('#maps').append("<div id='" + id + "' class='map-card map-map'></div>");
        }
        mapC = $('#' + id);
        mapC.html("");
        mapC.show();

        Nav.createTabs(id, [
                {label: ConanMaps._i18n[Language]['los'], id: "map-map-map"},
                {label: ConanMaps._i18n[Language]['help'], id: "map-map-help"}
            ], 
            ConanMaps._onSetPosition);
        
        $("#map-map-help")
            .addClass("map-map-help");
        $("#map-map-map")
            .addClass("map-map-wrapper map-map-wrapper-display-help")
            .attr("data-help", ConanMaps._i18n[Language]['start'])
            .html("<img class='map-bg' src='maps/data/" + ConanMaps._currentMap + "/board.png'/>" + "<div class='map-map-area'></div>");
            
        ConanMaps._rotate();
    },
    
    _helpPoints: function()
    {
        var rules = ConanMaps._files[ConanMaps._currentMap].description.rules;
        
        var helpImageSize = $(document.body).height() * .3; // Css says 30vh
        var bbSize = 10 / helpImageSize * 100; // 1 legend is 20px. so center is 10px at left/top
        
        function _applyRotate(a, n1, n2)
        {
            switch (ConanMaps._rotation)
            {
                case 0: return a ? n1 - bbSize        : n2 - bbSize;
                case 1: return a ? n2 - bbSize        : 100 - n1 - bbSize;
                case 2: return a ? 100 - n1 - bbSize  : 100 - n2 - bbSize;
                case 3: return a ? 100 - n2 - bbSize  : n1 - bbSize;
            }
        }
        
        var aide = "";
            // aide += "<h1>" + ConanMaps._files[ConanMaps._currentMap].description.title[Language] + "</h1>"; 
            aide += "<div class='map-help-thumb'>";
            aide += "<div style=\"transform: rotate(" + (-90*ConanMaps._rotation) + "deg)\">";
        if (rules)
        {
            for (var i=0; i < rules.length; i++) {
                if (rules[i].coordinates)
                {
                    for (var j=0; j < rules[i].coordinates.length; j++) 
                    {
                        var coo = rules[i].coordinates[j];
                        aide += "<span class='map-help-legend' style='left: " + (coo[0]-bbSize) + "%; top: " + (coo[1]-bbSize) + "%; transform: rotate(" + (90*ConanMaps._rotation) + "deg)'>" + (i+1) + "</span>";
                    }
                }
            }
        }
            aide += "<img src=\"maps/data/" + ConanMaps._currentMap + "/board.png\"/></div>";
            aide += "</div>";


        if (rules)
        {
            aide += "<ul>";
            for (var i=0; i < rules.length; i++) {
                aide += "<li>"
                + "<span class='map-help-rule-title' data-num='" + (i + 1) + "'>" + rules[i].title[Language] + "</span>"
                + "<span class='map-help-rule-description'>" + ConanMaps._replace(rules[i].description[Language]) + "</span>"
                + "</li>";
            }
            aide += "</ul>"
        }
        
        var id = "maps-map";
        var mapC = $('#' + id + " .map-map-help");
        mapC.html(aide);
    },
    
    _replace: function(text)
    {
        text = text.replace(/\{(.*?)\}/g, "<img src='resources/img/$1.png' class='map-help-character'/>");
        return text;
    },
    
    _rotate: function(direction)
    {
        direction = isNaN(direction) ? 0 : direction;
        
        ConanMaps._rotation = (ConanMaps._rotation + direction) % 4;
        ConanMaps._rotation = (ConanMaps._rotation + 4) % 4;
        
        ConanMaps._helpPoints();
        ConanMaps._mapArea();
        ConanMaps._click();
    },
    
    _mapArea: function()
    {
        var mapArea = $(".map-map-area");
        
        var availWidth = mapArea.parent().width();
        var availHeight = mapArea.parent().height();
        var availRatio = availWidth / availHeight;  
        
        var size = ConanMaps._files[ConanMaps._currentMap].size;
        var x = (0 + ConanMaps._rotation) % 2;
        var y = (1 + ConanMaps._rotation) % 2;
        var mapRatio = size[x] / size[y];
        
        var svgWidth, svgHeight;
        if (availRatio >= mapRatio)
        {
            // Height 100%
            svgWidth = availHeight * mapRatio;
            svgHeight = availHeight;
        }
        else
        {
            // Width 100%
            svgWidth = availWidth;
            svgHeight = availWidth / mapRatio;
        }
        
        $('#maps .map-map-wrapper img.map-bg').css({'width': ConanMaps._rotation % 2 == 0 ? svgWidth : svgHeight, 
                                                                    'height': ConanMaps._rotation % 2 == 1 ? svgWidth :  svgHeight, 
                                                                    'transform': 'translate(-50%,-50%) rotate(' + (-90 * ConanMaps._rotation) + 'deg)' });
        var code = "<svg style=\"width: " + svgWidth + "px; height: " + svgHeight + "px\">";
        
        function _applyRotate(a, n)
        {
            var n1 = n[0], n2 = n[1];
            switch (ConanMaps._rotation)
            {
                case 0: return a ? n1 *svgWidth/100.0             : n2 *svgHeight/100.0;
                case 1: return a ? n2 *svgWidth/100.0             : svgHeight - n1 *svgHeight/100.0;
                case 2: return a ? svgWidth - n1 *svgWidth/100.0  : svgHeight - n2 *svgHeight/100.0;
                case 3: return a ? svgWidth - n2 *svgWidth/100.0  : n1 *svgHeight/100.0;
            }
        }
        
        var zNames = [];
        for (var z in ConanMaps._files[ConanMaps._currentMap].zones)
        {
            zNames.push(z);
        }
        zNames = zNames.sort();
        
        for (var kz=0; kz < zNames.length; kz++)
        {
            var z = zNames[kz];
            var zone = ConanMaps._files[ConanMaps._currentMap].zones[z];
            
            var line = "";
            for (var i=0; i < zone.area.length; i++)
            {
                line += (i == 0 ? "M" : "L") + _applyRotate(true, zone.area[i]) + "," + _applyRotate(false, zone.area[i]);
            }
            code += "<path " +
                            "d='" + line + "' " +
                            "data-zone='" + z + "' " +
                            "class='map-map-area-zone'" +
                            "onclick='ConanMaps._click(this)'>" +
                    "</path>";

            // Display level around centers
            for (var i=0; i < zone.centers.length; i++)
            {
                code += "<circle class='center1' cx='" + _applyRotate(true, zone.centers[i]) + "' cy='" + _applyRotate(false, zone.centers[i]) + "' r='" + (0.30)*svgWidth/100.0 + "'/>";
                code += "<circle class='center2' cx='" + _applyRotate(true, zone.centers[i]) + "' cy='" + _applyRotate(false, zone.centers[i]) + "' r='" + (0.40)*svgWidth/100.0 + "'/>";
                code += "<circle class='center2' cx='" + _applyRotate(true, zone.centers[i]) + "' cy='" + _applyRotate(false, zone.centers[i]) + "' r='" + (0.45)*svgWidth/100.0 + "'/>";
                for (var lev=0; lev < zone.level; lev++)
                {
                    code += "<circle class='level' cx='" + _applyRotate(true, zone.centers[i]) + "' cy='" + _applyRotate(false, zone.centers[i]) + "' r='" + (0.65 + 0.3*lev)*svgWidth/100.0 + "'/>";
                }
            }
            
        }
            code += "</svg>";
        
        mapArea.html(code);
    },
    
    _click: function(i)
    {
        var svg = $(".map-map-area svg");
        var svgWidth = svg.width();
        var svgHeight = svg.height();
        function _applyRotate(a, n)
        {
            var n1 = n[0], n2 = n[1];
            switch (ConanMaps._rotation)
            {
                case 0: return a ? n1 *svgWidth/100.0             : n2 *svgHeight/100.0;
                case 1: return a ? n2 *svgWidth/100.0             : svgHeight - n1 *svgHeight/100.0;
                case 2: return a ? svgWidth - n1 *svgWidth/100.0  : svgHeight - n2 *svgHeight/100.0;
                case 3: return a ? svgWidth - n2 *svgWidth/100.0  : n1 *svgHeight/100.0;
            }
        }
        
        if (i)
        {
            ConanMaps._lastSelectedZone = $(i).attr('data-zone');
        }
        else if (ConanMaps._lastSelectedZone)
        {
            i = $(".map-map-area svg path[data-zone=" + ConanMaps._lastSelectedZone + "]");
        }
        else 
        {
            return;
        }
        
        var mapArea = $(".map-map-area svg path").removeClass("map-map-area-zone-active").removeClass("map-map-area-zone-target").removeClass("map-map-area-zone-target-upper").removeClass("map-map-area-zone-target-lower");
        $(i).addClass("map-map-area-zone-active");
        
        var mapArea = $(".map-map-area svg line").remove();

        var id = "maps-map";
        var mapC = $('#' + id + ' .map-map-wrapper').removeClass("map-map-wrapper-display-help");
        
        var zoneId = $(i).attr('data-zone');
        var zone = ConanMaps._files[ConanMaps._currentMap].zones[zoneId];
        
        for (var a=0; a < zone.links.length; a++)
        {
            var link = zone.links[a];
            /^([0-9]+)#(.+)#([0-9]+)$/.exec(link);

            var center1 = parseInt(RegExp.$1) - 1; // 0 based
            var target = RegExp.$2;
            var center2 = parseInt(RegExp.$3) - 1; // 0 based
            
            
            var okp = $(".map-map-area svg path[data-zone=" + target + "]"); 
            okp.addClass("map-map-area-zone-target");

            var lclass="";
            
            var zoneTarget = ConanMaps._files[ConanMaps._currentMap].zones[target];
            if (zone.level > zoneTarget.level)
            {
                okp.addClass("map-map-area-zone-target-upper");
                lclass=" class='map-map-area-line-target-upper'";
            }
            else if (zone.level < zoneTarget.level)
            {
                okp.addClass("map-map-area-zone-target-lower");
                lclass=" class='map-map-area-line-target-lower'";
            } 
            
            $(".map-map-area svg").append("<line" + lclass + " x1='" + _applyRotate(true, zone.centers[center1]) + "' y1='" + _applyRotate(false, zone.centers[center1]) + "' x2='" + _applyRotate(true, zoneTarget.centers[center2]) + "' y2='" + _applyRotate(false, zoneTarget.centers[center2]) + "' />");
        }
        
        // SVG fix
        $(".map-map-area").html($(".map-map-area").html());
    },
    
    _copyright: function()
    {
        var c = "<ul>";
        
        for (var i in ConanMaps._files)
        {
            c += "<li>"
                + "<strong>" + ConanMaps._files[i].description.title[Language] + "</strong>"
                + " " + ConanMaps._i18n[Language].copyright_prop
                + " <em>" + ConanMaps._files[i].description.copyright + "</em>"
                + " (" + ConanAbout._origins[Language][ConanMaps._files[i].description.origin] + ")"
                + "</li>"
        }
        
        c += "</ul>";
        return c;
    },
    
    _openForum: function()
    {
        window.open(ConanMaps._files[ConanMaps._currentMap].description.totopic[Language] + "#elContent");
    },
    
    _losFile: function()
    {
        window.open("maps/data/" + ConanMaps._currentMap + "/los.jpg");
    },
    
    _legend: function()
    {
        Nav.dialog(ConanMaps._i18n[Language].legend,
        
                    "<div class='line1'>" + ConanMaps._i18n[Language]['clickhelp1'] + "</div>"
               +    "<div class='line4'>" + ConanMaps._i18n[Language]['clickhelp4'] + "</div>"
               +    "<div class='line6'>" + ConanMaps._i18n[Language]['clickhelp6'] + "</div>"
               +    "<div class='line5'>" + ConanMaps._i18n[Language]['clickhelp5'] + "</div>"
               +    "<div class='line3'>" + ConanMaps._i18n[Language]['clickhelp3'] + "</div>"
        );
    }
}
