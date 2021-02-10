function displayImage(input)
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
          $('#image').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
    input.value = '';
}




function doImport(input)
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
           _doImport(e.target.result);
        }
        
        reader.readAsText(input.files[0]);
    }
    input.value = '';
}
function _doImport(text)
{
    try
    {
        var json = JSON.parse(text);
    }
    catch (e)
    {
        alert("Error: the file is not a valid json")
        return;
    }

    try
    {
        if (json.list)
        {
            var cards = "";
            for (var i =0; i <json.list.length; i++)
            {
                var card = json.list[i];
                
                cards += "\n" + (i+1) + ") " + (card.description.title.en || card.description.title.fr || card.description.title.it  || card.id)
            }
            
            var number = prompt("Choisissez la carte à importer" + cards)
            if (number != parseInt(number)) return;
            json = json.list[number - 1]
        }
        
        $("#id")[0].value = json.id;
        _setLanguageJson('title', json.description.title);
        $("#version")[0].value = json.description.version;
        $("#origins")[0].value = json.description.origins.join("\n");
        $("#copyright")[0].value = json.description.copyright;
        _setRules(json.description.rules);
        _setLanguageJson('totopic', json.description.totopic);
        $("#thumbnail")[0].value = json.description.thumbnail.substring(json.description.thumbnail.lastIndexOf('/') + 1);
        $("#board")[0].value = json.description.board.substring(json.description.board.lastIndexOf('/') + 1);
        $("#losFile")[0].value = json.description.losFile.substring(json.description.losFile.lastIndexOf('/') + 1);
        _setLanguageJson('pdf', json.description.pdf);
        
        $("#zones")[0].value = stringify(json.zones);
        $('#image').attr('src', "../../" + $("#rulesselector")[0].value.substring(0,1).toUpperCase() + $("#rulesselector")[0].value.substring(1) + "/" + json.description.board);
        
    }
    catch (e)
    {
        alert("Error: the json is not a map or maps file format")
        throw e;
    }
}



function doExport()
{
    try {
        var zones = JSON.parse($("#zones")[0].value)
    }
    catch (e) {
        alert("Zones is not a correct json")
        throw e;
    }
    
    var data = {};
    data.id = $("#id")[0].value 
    data.description = {};
    data.description.title = _getLanguageJson('title');
    data.description.version = $("#version")[0].value;
    data.description.origins = $("#origins")[0].value.split("\n");
    data.description.copyright = $("#copyright")[0].value;
    data.description.rules = _getRules();
    data.description.totopic = _getLanguageJson('totopic');
    data.description.thumbnail = _getPath() + $("#thumbnail")[0].value;
    data.description.board = _getPath() + $("#board")[0].value;
    if ($("#losFile")[0].value) data.description.losFile = _getPath() + $("#losFile")[0].value;
    var pdf = _getLanguageJson('pdf'); if (pdf.fr || pdf.en || pdf.it) data.description.pdf = pdf;
    data.size = [$('#image').prop("naturalWidth"), $('#image').prop("naturalHeight")];
    data.zones = zones;

    data = stringify(data);
    data = data.replace(/^(.*)$/gm, '        $1');
    
    var file = new Blob([data], {type: "application/json"});
    var a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = $("#id")[0].value + "-" + new Date().getTime() + ".json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0);    
}

function stringify(data)
{
    data = JSON.stringify(data, null, 4);
    
    // Oneline coords
    data = data.replace(/\[\s*([0-9.]+),\s*([0-9.]+)\s*]/g, "[$1, $2]");
    // Oneline coords arrays
    data = data.replace(/\[\s*(\[([0-9.]+), ([0-9.]+)\])/g, "[$1").replace(/(\[([0-9.]+), ([0-9.]+)\]),\s*(?=(\[([0-9.]+), ([0-9.]+)\]))/g, "$1, ").replace(/(\[([0-9.]+), ([0-9.]+)\])\s*\]/g, "$1]");
    // Oneline string arrays
    data = data.replace(/\[\s*(".*")/g, "[$1").replace(/("[0-9]#[^"]+#[0-9]"),\s*(?="[0-9]#[^"]+#[0-9]")/g, "$1, ").replace(/(".*")\s*\]/g, "$1]");
    data = data.replace(/\["corebox",\n\s+"stretchgoal",\n\s+"king"/g, '["corebox", "stretchgoal", "king"');
    // Oneline successive brackets
    data = data.replace(/\},\n\s+{/g, '}, {');

    return data; 
}

function _setLanguageJson(id, value)
{
    $("#" + id + "-fr")[0].value = (value || {}).fr || '';
    $("#" + id + "-en")[0].value = (value || {}).en || '';
    $("#" + id + "-it")[0].value = (value || {}).it || '';
}
function _getLanguageJson(id)
{
    var values = {}
    if ($("#" + id + "-fr")[0].value) values.fr = $("#" + id + "-fr")[0].value;
    if ($("#" + id + "-en")[0].value) values.en = $("#" + id + "-en")[0].value;
    if ($("#" + id + "-it")[0].value) values.it = $("#" + id + "-it")[0].value;
    return values;
}

function _getPath()
{
    return "data/maps/" + $("#id")[0].value + "/";
}

function _setRules(rules)
{
    rules = rules || [];
    
    if (rules.length)
    {
        $("#rulesselector")[0].value = 'conan';
        $("#rules-conan")[0].value = stringify(rules);
    }
    else
    {
        rules.elevation = rules.elevation || [] 
        
        $("#rulesselector")[0].value = 'batman'
        
        $("#rules-image-ratio")[0].value = rules.ratio;
        
        $("#rules-elevation")[0].value = rules.elevation.map(o => o.level + " " + o.color).join("\n");
        
        $("#rules-boundaries-orange")[0].checked = rules.boundaries && !(rules.boundaries.orange === false);
        $("#rules-boundaries-white")[0].checked = rules.boundaries && !(rules.boundaries.white === false);
        $("#rules-boundaries-special")[0].checked = rules.boundaries && !(rules.boundaries.special === false);
        $("#rules-boundaries-wall")[0].checked = rules.boundaries && !(rules.boundaries.wall === false);
        $("#rules-boundaries-wall_level")[0].checked = rules.boundaries && !(rules.boundaries.wall_level === false);
        
        $("#rules-specialmoves-jump")[0].checked = rules.special_moves && !(rules.special_moves.jump === false);
        $("#rules-specialmoves-climb")[0].checked = rules.special_moves && !(rules.special_moves.climb === false);
        $("#rules-specialmoves-fall")[0].checked = rules.special_moves && !(rules.special_moves.fall === false);
        $("#rules-specialmoves-climb_fall")[0].checked = rules.special_moves && !(rules.special_moves.climb_fall === false);
        
        $("#rules-areas-elevators_entrance")[0].checked = rules.areas && rules.areas.indexOf('elevators_entrance') >= 0;
        $("#rules-areas-elevator_shaft")[0].checked = rules.areas && rules.areas.indexOf('elevator_shaft') >= 0;
        $("#rules-areas-promontory")[0].checked = rules.areas && rules.areas.indexOf('promontory') >= 0;
        $("#rules-areas-elevator_orientation")[0].checked = rules.areas && rules.areas.indexOf('elevator_orientation') >= 0;
    }
    
    $("#rulesselector").attr("data-value", $("#rulesselector")[0].value)
}

function _getRules()
{
    if ($("#rulesselector")[0].value == 'batman') 
    {
        var rules = {}
        
        if ($("#rules-boundaries-orange")[0].checked
            || $("#rules-boundaries-white")[0].checked
            || $("#rules-boundaries-special")[0].checked
            || $("#rules-boundaries-wall")[0].checked
            || $("#rules-boundaries-wall_level")[0].checked)
        {
            rules.boundaries = {};
            if (!$("#rules-boundaries-orange")[0].checked) rules.boundarie.orange = false;
            if (!$("#rules-boundaries-white")[0].checked) rules.boundarie.white = false;
            if (!$("#rules-boundaries-special")[0].checked) rules.boundarie.special = false;
            if (!$("#rules-boundaries-wall")[0].checked) rules.boundarie.wall = false;
            if (!$("#rules-boundaries-wall_level")[0].checked) rules.boundarie.wall_level = false;
        }

        if ($("#rules-specialmoves-jump")[0].checked
            || $("#rules-specialmoves-climb")[0].checked
            || $("#rules-specialmoves-fall")[0].checked
            || $("#rules-specialmoves-climb_fall")[0].checked)
        {
            rules.special_moves = {};
            if (!$("#rules-specialmoves-jump")[0].checked) rules.special_moves.jump = false;
            if (!$("#rules-specialmoves-climb")[0].checked) rules.special_moves.climb = false;
            if (!$("#rules-specialmoves-fall")[0].checked) rules.special_moves.fall = false;
            if (!$("#rules-specialmoves-climb_fall")[0].checked) rules.special_moves.climb_fall = false;
        }

        if ($("#rules-areas-elevators_entrance")[0].checked
            || $("#rules-areas-elevator_shaft")[0].checked
            || $("#rules-areas-promontory")[0].checked
            || $("#rules-areas-elevator_orientation")[0].checked)
        {
            rules.areas = [];
            if ($("#rules-areas-elevators_entrance")[0].checked) rules.areas.push("elevators_entrance");
            if ($("#rules-areas-elevator_shaft")[0].checked) rules.areas.push("elevator_shaft");
            if ($("#rules-areas-promontory")[0].checked) rules.areas.push("promontory");
            if ($("#rules-areas-elevator_orientation")[0].checked) rules.areas.push("elevator_orientation");
        }

        rules.image = _getPath() + "help.png";
        rules.ratio = $("#rules-image-ratio")[0].value;
        
        rules.elevation = $("#rules-elevation")[0].value.split('\n').filter(function(i) { return i != ""}).map(function(i) {return { level: i.replace(/^(.*) (.*)$/, '$1'), color: i.replace(/^(.*) (.*)$/, '$2') }});

        return rules;
    }
    else
    {
        try
        {
            return JSON.parse($("#rules-conan")[0].value);
        }
        catch (e)
        {
            alert("Conan rules are not a correct JSON")
            throw e;
        }
    }
}

function zoom(direction)
{
    var newWidth = parseInt(($("#image").attr('data-width') || 100)) + direction*10;
    $("#image").attr('data-width', newWidth).css('width', newWidth + '%');
    window.setTimeout("displayZones()", 1);
}

function position(x, y)
{
    $("#position").html("x: " + x + "%, y: " + y + "%");
}

$(window).on('resize', displayZones);
$(document).ready(function() {
    position("-", "-");
    
    function getXY(event)
    {
        var iPos = $("#image").offset();
        return {
            x: parseInt(((event.clientX + $(document.body).scrollLeft() - iPos.left) / $("#image").width()) * 10000.0)/100.0, 
            y: parseInt(((event.clientY + $(document.body).scrollTop()  - iPos.top ) / $("#image").height()) * 10000.0)/100.0
        };
    }
    
    
    $("#image").on('mouseout', function(event) {
        position("-", "-");
    });
    $("#image").on('mousemove', function(event) {
        var pos = getXY(event);
        position(pos.x, pos.y);
        detectCenters(pos.x, pos.y);
    });
    $("#image").on('click', function(event) {
        var pos = getXY(event);
        var v = $("#draw")[0].value;
        if (v) v+= ", "
        v+= "[" + pos.x + ", " + pos.y + "]"
        $("#draw")[0].value = v;
        _displayZones();
    });
})

function detectCenters(x, y)
{
    try 
    {
        var zones = JSON.parse($('#zones')[0].value);

        var zNames = [];
        for (var z in zones)
        {
            zNames.push(z);
        }
        zNames = zNames.sort();

        for (var kz=0; kz < zNames.length; kz++)
        {
            var z = zNames[kz];
            var zone = zones[z];
            
            for (var i=0; i < zone.centers.length; i++)
            {
                var center = zone.centers[i];
                if (center[0] < x+0.5 && center[0] > x-0.5
                    && center[1] < y+0.5 && center[1] > y-0.5)
                {
                    window.lastKnownCenter = z;
                    displayZones();
                    return;
                }
            }
        }
    }
    catch (e)
    {
        
    }
}

function draw(svgWidth, svgHeight) {
    try
    {
        var d = JSON.parse("[" + $("#draw")[0].value + "]");
        
        var line = "";
        for (var i=0; i < d.length; i++)
        {
            line += (i == 0 ? "M" : "L") + svgWidth*d[i][0]/100 + "," + svgHeight*d[i][1]/100;
        }
        return "<path " +
                        "d='" + line + "' " +
                        "class='draw'>" +
                "</path>";
    }
    catch(e)
    {
        return "";
    }
}

var displayZones = $.debounce(250, _displayZones);
function _displayZones()
{
        var mapArea = $("#map-area");

        var svgWidth = $("#image").width();
        var svgHeight = $("#image").height();
        
        var code = "<svg style=\"width: " + svgWidth + "px; height: " + svgHeight + "px\">";
        try 
        {
            var zones = JSON.parse($('#zones')[0].value);

            var zNames = [];
            for (var z in zones)
            {
                zNames.push(z);
            }
            zNames = zNames.sort();
    
            var lastKnownZone = null;
            for (var kz=0; kz < zNames.length; kz++)
            {
                var z = zNames[kz];
                var zone = zones[z];
                
                if (z == window.lastKnownCenter)
                {
                    lastKnownZone = zone;
                }
    
                var line = "";
                for (var i=0; i < zone.area.length; i++)
                {
                    line += (i == 0 ? "M" : "L") + svgWidth*zone.area[i][0]/100 + "," + svgHeight*zone.area[i][1]/100;
                }
                if (zone.area.length)
                {
                    // ensure close
                    line += "L" + svgWidth*zone.area[0][0]/100 + "," + svgHeight*zone.area[0][1]/100;
                }
                code += "<path " +
                                "d='" + line + "' " +
                                "data-zone='" + z + "' " +
                                "class=''>" +
                        "</path>";
                        
    
                // Display level around centers
                for (var i=0; i < zone.centers.length; i++)
                {
                    code += "<circle class='center1' cx='" + svgWidth*zone.centers[i][0]/100 + "' cy='" + svgHeight*zone.centers[i][1]/100 + "' r='" + (0.30)*svgWidth/100.0 + "'/>";
                    code += "<circle class='center2' cx='" + svgWidth*zone.centers[i][0]/100 + "' cy='" + svgHeight*zone.centers[i][1]/100 + "' r='" + (0.40)*svgWidth/100.0 + "'/>";
                    code += "<circle class='center2' cx='" + svgWidth*zone.centers[i][0]/100 + "' cy='" + svgHeight*zone.centers[i][1]/100 + "' r='" + (0.45)*svgWidth/100.0 + "'/>";
                    for (var lev=0; lev < zone.level; lev++)
                    {
                        code += "<circle class='level' cx='" + svgWidth*zone.centers[i][0]/100 + "' cy='" + svgHeight*zone.centers[i][1]/100 + "' r='" + (0.65 + 0.3*lev)*svgWidth/100.0 + "'/>";
                    }
                    code += "<text x=\""+ (svgWidth*zone.centers[i][0]/100 - 10) + "\" y=\"" + (svgHeight*zone.centers[i][1]/100 - 10) + "\" font-size=\"25\" font-weight=\"bold\">" + z + (zone.centers.length > 1 ? (" (" + (i+1) + ")") : '') + "</text>"
                }
            }
            
            if (lastKnownZone)
            {
                for (var a=0; a < lastKnownZone.links.length; a++)
                {
                    var link = lastKnownZone.links[a];
                    /^([0-9]+)#(.+)#([0-9]+)$/.exec(link);
            
                    var center1 = parseInt(RegExp.$1) - 1; // 0 based
                    var target = RegExp.$2;
                    var center2 = parseInt(RegExp.$3) - 1; // 0 based
            
            
                    var zoneTarget = zones[target];
                    code += "<line class='los' x1='" + svgWidth*lastKnownZone.centers[center1][0]/100 + "' y1='" + svgHeight*lastKnownZone.centers[center1][1]/100 + "' x2='" + svgWidth*zoneTarget.centers[center2][0]/100 + "' y2='" + svgHeight*zoneTarget.centers[center2][1]/100 + "' />";
                }
            }
        }
        catch (e)
        {
            console.error(e)
        }
        
        code += draw(svgWidth, svgHeight);
        code += "</svg>";

        mapArea.html(code);

}


function renumbers()
{
    try {
        var zones = JSON.parse($("#zones")[0].value)
    }
    catch (e) {
        alert("Zones is not a correct json. Cannot change numbers")
        throw e;
    }
    
    var action = prompt("To change zone name enter a comma-separated list of\n'OldName->Newname'. For example:\n * 1->2 to rename zone 1 in 2\n * 1->2,2->1 to exchange zone 1 and 2")
    if (!action) return;
 
    
    var actions = action.split(",");
    actions = actions.map(function (item) { return { from: item.substring(0, item.indexOf('->')), to: item.substring(item.indexOf('->') + 2) } });
    
    // Rename zones to tmp name (to allow exchange)
    for (var i=0; i < actions.length; i++)
    {
        if (!actions[i].from || !actions[i].to)
        {
            alert("A zonename is empty. Canceling operation.")
            return;
        }
        else if (!zones[actions[i].from])
        {
            alert("Zone '" + actions[i].from + "' does not exist. Canceling operation.")
            return;
        }
        else
        {
            zones[actions[i].from + '-tmp'] = zones[actions[i].from]
            delete zones[actions[i].from]
        }
    }
    // Rename zones to final name (to allow exchange)
    for (var i=0; i < actions.length; i++)
    {
        if (zones[actions[i].to] != null)
        {
            alert("Zone '" + actions[i].to + "' already exists. Canceling operation.")
            return;
        }
        else if (zones[actions[i].from + '-tmp'])
        {
            zones[actions[i].to] = zones[actions[i].from + '-tmp']  
            delete zones[actions[i].from + '-tmp']
        }
        else
        {
            zones[actions[i].to] = zones[actions[i].from]  
            delete zones[actions[i].from]
        }
    }
    // Rename zones relations
    for (var i=0; i < actions.length; i++)
    {
        for (var z in zones)
        {
            for (var j=0; j < zones[z].links.length; j++)
            {
                var link = zones[z].links[j];
                
                var result = /^([0-9]+)#(.+)#([0-9]+)$/.exec(link)
                if (!result)
                {
                    alert("Error in zone '" + z + "', the link n°" + l + " is not readable: " + link);
                    return;
                }
                else
                {
                    var centerOfZ = parseInt(result[1]);
                    var targetZoneName = result[2];
                    var centerOfTarget = parseInt(result[3]);
                    
                    if (targetZoneName == actions[i].from)
                    {
                        var newLink = centerOfZ + "#" + actions[i].to + "#" + centerOfTarget
                        zones[z].links[j] = newLink;
                    }
                }
            }
        }
    }

    
    $("#zones")[0].value = stringify(zones);
    displayZones();
}


function transform()
{
    try {
        var zones = JSON.parse($("#zones")[0].value)
    }
    catch (e) {
        alert("Zones is not a correct json. Cannot apply any transformation.")
        throw e;
    }
    

    var trans = prompt("Put code here (based upon 2 vars: x and y) to transform all zones (area and centers)?\nNote that if any item of the zone is < 0 or > 100, the zone will be removed (but not links to it)")
    if (!trans)
    {
        return;
    }
    
    try
    {
        eval("function f(x, y) { " + trans + "; return [x, y]; }")
    }
    catch (e)
    {
        alert("The code you entered is not a valid js")
        throw e;
    }
    
    for (var z in zones)
    {
        var anyOutOfRange = false;
        
        for (var j=0; !anyOutOfRange && j < zones[z].area.length; j++)
        {
            zones[z].area[j] = f(zones[z].area[j][0], zones[z].area[j][1]);
            
            if (zones[z].area[j][0] < 0 || zones[z].area[j][0] > 100   
                || zones[z].area[j][1] < 0 || zones[z].area[j][1] > 100)
            {
                anyOutOfRange = true;
            }
        }
        for (var j=0; !anyOutOfRange && j < zones[z].centers.length; j++)
        {
            zones[z].centers[j] = f(zones[z].centers[j][0], zones[z].centers[j][1]);

            if (zones[z].centers[j][0] < 0 || zones[z].centers[j][0] > 100   
                || zones[z].centers[j][1] < 0 || zones[z].centers[j][1] > 100)
            {
                anyOutOfRange = true;
            }
        }
        
        if (anyOutOfRange)
        {
            delete zones[z];
        }
    }
    
    $("#zones")[0].value = stringify(zones);
    displayZones();
}
