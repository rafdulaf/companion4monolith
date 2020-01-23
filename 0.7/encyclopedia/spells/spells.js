var EncyclopediaSpells = {
    _i18n: {
        'fr': {
            'tab': "Sorts"
        },
        'en': {
            'tab': "Spells"
        }
    },
    
    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaSpells._i18n[Language].tab, id: "encyclopedia-spell", onShow: EncyclopediaSpells.onShow,  onHide: EncyclopediaSpells.onHide });
    },
    
    init: function() 
    {
        EncyclopediaSpells.displaySpells();
    },
    
    displaySpells: function()
    {
        var spells = "";
        
        Encyclopedia.spells.list.sort(function(s1, s2) { return s1.title[Language].toLowerCase().localeCompare(s2.title[Language].toLowerCase()); })
        for (var i in Encyclopedia.spells.list)
        {
            var spell = Encyclopedia.spells.list[i];
            
            if (spell.text[Language])
            spells += CardSpell._cardCode(EncyclopediaSpells._convertSpellToStudio(spell));
        }
        
        $("#encyclopedia-spell").html(spells);
    },
    
    _convertSpellToStudio: function(spell)
    {
        return {
            id: spell.id + "-" + Math.random(),
            name: spell.title[Language],
            longName: spell.titleLong && spell.titleLong[Language],
            text: spell.text[Language],
            textSize: spell.textStyle[Language].textSize,
            textInter: spell.textStyle[Language].textInter,
            cost: spell.cost,
            saturation: spell.saturation,
            image: Version + "/" + spell.image,
            imageEffect: false,
            imagelocation: {x: "50", y: "50"},
            imagezoom: "100",
            imagerotation: "0",
            explosion: spell.explosion,
            reaction: spell.reaction
        };
    },
    
    onShow: function() {
    },
    
    onHide: function() {
    },

}
