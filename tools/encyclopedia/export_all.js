await $.ajax({
    dataType: "script",
    cache: true,
    crossDomain:true,
    url: '../tools/encyclopedia/html2canvas.js' + "?version=" + Version
});

async function exportImage(filename, data)
{
    console.log("saving");
    let a = document.createElement("a");
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
    }, 0);    
}

async function exportElement(id, filename)
{
    console.log("Handling " + id + " => " + filename);
    let element = document.getElementById(id);
    
    // Preparing
    let count = element.getAttribute("data-count");
    element.removeAttribute("data-count", 0); // Remove the multiplicator for many items
    
    let canvas = await html2canvas(element.children[0]);
    
    // Fixing
    if (count)
    {
        element.setAttribute("data-count", count);
    }
    element.style.backgroundColor = null;
    element.children[0].style.margin = null;
    
    // Export    
    await exportImage(filename, canvas.toDataURL('image/webp'))
    canvas = null;
}

async function exportHero(hero)
{
    await exportElement("hero-" + hero.id, hero.id + "_cardpreview_" + Language + ".webp");
}
async function exportHeroes()
{
    for (let hero of Encyclopedia.heroes.list)
    {
        await exportHero(hero);
    }
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function exportTile(tile)
{
    let domTile = document.getElementById("tile-" + tile.id);
    
    let defaultColor;
    let borderImg;
    
    if (tile.color != "none")
    {
        borderImg = $("picture img", domTile)[0];
                
        /background_([a-z]*).webp/i.test(borderImg.src);
        defaultColor = RegExp.$1;

        console.log("Switching from " + defaultColor + " to " + tile.color);
        borderImg.src = borderImg.src.replace("background_" + defaultColor + ".webp", "background_" + tile.color + ".webp");
    }
    
    await exportElement("tile-" + tile.id, tile.id + (tile.color != "none" ? "_" + tile.color : "") + "_cardpreview_" + Language + ".webp");
    
    if (defaultColor != null)
    {
        borderImg.src = borderImg.src.replace("background_" + tile.color + ".webp", "background_" + defaultColor + ".webp");
    }
}

async function exportTiles()
{
    let exportedTiles = {};
    
    for (let tile of Encyclopedia.tiles.list)
    {
        if (exportedTiles[tile.id] && exportedTiles[tile.id][tile.color] && exportedTiles[tile.id][tile.color][tile.image])
        {
            continue;
        }
        
        exportedTiles[tile.id] = exportedTiles[tile.id] || {};
        exportedTiles[tile.id][tile.color] = exportedTiles[tile.id][tile.color] || {};
        exportedTiles[tile.id][tile.color][tile.image] = true;
        
        await exportTile(tile);
    }
}

async function exportEquipment(equipment, position = 1)
{
    let domEquipment = document.getElementById("equipment-" + equipment.id);

    let defaultImage;
    let img;

    if (position != 1)
    {
        img = $(".image img", domEquipment)[0];
        defaultImage = img.src;
        console.log("Switching image to " + equipment.image);
        img.src = equipment.image + "?version=" + Version;
        await delay(100); // Wait for image to load
    }
    
    let imgId = equipment.image ? _keepImageId(equipment.image) : equipment.id;
    
    function _keepImageId(imageSrc)
    {
        let i = imageSrc.lastIndexOf("/");
        let filename = imageSrc.substring(i + 1);
        let dotIndex = filename.lastIndexOf(".");
        return filename.substring(0, dotIndex);
    }

    await exportElement("equipment-" + equipment.id, imgId + "_cardpreview_" + Language + ".webp");

    if (position != 1)
    {
        img.src = defaultImage;
    }
}

async function exportEquipments()
{
    let exportedEquipments = {};
    
    for (let equipment of Encyclopedia.equipments.list)
    {
        if (exportedEquipments[equipment.id] && exportedEquipments[equipment.id][equipment.image])
        {
            continue;
        }
        
        exportedEquipments[equipment.id] = exportedEquipments[equipment.id] || {};
        exportedEquipments[equipment.id][equipment.image] = true;

        await exportEquipment(equipment, Object.keys(exportedEquipments[equipment.id]).length);
    }
}

async function exportSpell(spell)
{
    await exportElement("spell-" + spell.id, spell.id + "_cardpreview_" + Language + ".webp");
}
async function exportSpells()
{
    let exportedSpells = {};

    for (let spell of Encyclopedia.spells.list)
    {
        if (exportedSpells[spell.id])
        {
            continue;
        }
        
        exportedSpells[spell.id] = true;

        await exportSpell(spell);
    }
}

