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

async function exportHero(id)
{
    console.log("Handling " + id);
    let heroSheet = document.getElementById("hero-" + id);
    let canvas = await html2canvas(heroSheet);
    await exportImage(id + "_sheet.webp", canvas.toDataURL('image/webp'))
    canvas = null;
}

for (let hero of Encyclopedia.heroes.list)
{
    await exportHero(hero.id);
}