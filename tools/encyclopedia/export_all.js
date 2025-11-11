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
    console.log("Handling " + id);
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
    await exportElement("hero-" + hero.id, hero.id + "_cardpreview.webp");
}
async function exportHeroes()
{
    for (let hero of Encyclopedia.heroes.list)
    {
        await exportHero(hero);
    }
}

async function exportTile(tile)
{
    let domTile = document.getElementById("tile-" + tile.id);
    console.log(domTile)
    
    let defaultColor;
    let img;
    if (tile.color != "none")
    {
        img = $("picture img", domTile)[0];
                
        console.log(img.src, /background_([a-z]*).webp/i.test(img.src));
        defaultColor = RegExp.$1;

        console.log("Switching from " + defaultColor + " to " + tile.color);
        img.src = img.src.replace("background_" + defaultColor + ".webp", "background_" + tile.color + ".webp");
    }
    
    await exportElement("tile-" + tile.id, tile.id + "_" (tile.color != "none" ? "_" + tile.color : "") + "_cardpreview.webp");
    
    if (defaultColor != null)
    {
        img.src = img.src.replace("background_" + tile.color + ".webp", "background_" + defaultColor + ".webp");
    }
}

async function exportTiles()
{
    let exportedTiles = {};
    
    for (let tile of Encyclopedia.tiles.list)
    {
        if (exportedTiles[tile.id] && exportedTiles[tile.id][tile.color])
        {
            continue;
        }
        
        await exportTile(tile);
        
        exportedTiles[tile.id] = exportedTiles[tile.id] || {};
        exportedTiles[tile.id][tile.color] = true;
    }
}