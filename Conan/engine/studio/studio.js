var Studio = {
    _currentSlide: null,
    _slides: [],
    
    _loadItems: function() {
        Studio._items = [];
    },

    init: function() {
        Studio._loadItems();
        if (Studio._items.length == 0)
        {
            return;
        }

        Nav.addIcon(Studio._i18n.menu, "studio-icon", "studio");
        
        Studio._items.forEach(item => item.preinit());

        Nav.createTabs('studio', Studio._slides, Studio.onChange);
        Nav.addAction("studio", Studio._i18n.printcardsLabel, "studio-icon-printcards", this.name + "-print", Studio.printCards);
        Nav.addAction("studio", Studio._i18n.exportcardsLabel, "studio-icon-exportcards", this.name + "-export", Studio.exportCards);
        Nav.addAction("studio", Studio._i18n.importcardsLabel, "studio-icon-importcards", this.name + "-import", Studio.importCards);

        Studio._items.forEach(item => item.init());

        Studio.onChange();

        let copyright = "";
        Studio._items.forEach(item => copyright += item.copyright());
        About.addCopyright(Studio._i18n.menu, copyright);
    },

    onChange: function(event, slick) {
        var slide = slick && slick.currentSlide || 0;

        if (Studio._currentSlide != null)
            Studio._slides[Studio._currentSlide].onHide();

        Studio._currentSlide = slide;
        Studio._slides[Studio._currentSlide].onShow();
    },

    printCards: function()
    {
        let studiosCode = "";
        Studio._items.forEach(item => studiosCode += "<h1>" + item._i18n.tab + "</h1>" + item.printCode());
        
        Nav.dialog(Studio._i18n.printcardsLabel,
            "<div class=\"printcards back cut\">"

            + "<p class='hint'>" + Studio._i18n.printcardsHint + "</p>"
            + "<p class='hint'><input type='checkbox' id='printback' checked='checked'  onchange='$(this.parentNode.parentNode).toggleClass(\"back\")'><label for='printback'>" + Studio._i18n.printfaces + "</label></p>"
            + "<p class='hint'><input type='checkbox' id='printcut' checked='checked' onchange='$(this.parentNode.parentNode).toggleClass(\"cut\")'><label for='printcut'>" + Studio._i18n.printmargin + "</label></p>"

            + studiosCode

            + "<div class=\"newpage\"></div>"

            + "</div>",
            null,
            [{
                label: About._i18n.custom_allin,
                icon: "studio-allin",
                fn: "Studio._allin();"
            }],
            [{
                icon: 'studio-icon-printcards',
                label: Studio._i18n.printcardsLabel,
                fn: "Studio._printCards()"
            }]
        );
        // share back of spell and equipment
        $(".newpage").append($(".printcards .back"));
    },
    
    importCards: function()
    {
        Nav.dialog(Studio._i18n.importcardsLabel,
            "<div class=\"importcards printcards back cut\">"
                + "<h1>" + Studio._i18n.importcardsHint + "</h1>"
                + "<p class='hint'><label><button type='button' onclick='this.nextSibling.click()'>" + Studio._i18n.importcardsButton + "</button><input type='file' accept='.json' onchange='Studio._importCardsFileSelected(this)'/></label></p>"
                + "<input type='hidden' id='import-data'/>"
                + "<h1>" + Studio._i18n.importcardsHint2 + "</h1>"
                + "<div id='importcards-result'><p class='hint'>" + Studio._i18n.importcardsHint2todo + "</p></div>"
                + "<div id='importcards-inputs'></div>"
                + "<h1>" + Studio._i18n.importcardsHint3 + "</h1>"
            + "</div>",
            null,
            [{
                label: About._i18n.custom_allin,
                icon: "studio-allin",
                fn: "Studio._allinImport();"
            }],
            [{
                icon: 'studio-icon-importcards',
                label: Studio._i18n.importcardsLabel,
                fn: "Studio._importCards()"
            }]);
    },
    
    _importCards: function()
    {
        if ($(".importcards input:checked").length == 0)
        {
            About.warnToast(Studio._i18n.importcardEmpty);
            return;
        }
        else
        {
            $(".importcards input:checked").each(function(index, item) {
                let data = $("#import-data").val();
                let json = JSON.parse(data);
                
                $i = $(item);
                
                let type = $i.attr('name');
                let number = parseInt($i.data('index'));
                
                let dataToImport = json[type][number];
                
                let itemType = Studio._items.filter(u => u.name == type)[0];
                itemType.import(dataToImport);
                itemType._displayCards();
            });
            Nav.closeDialog();
        }
    },
    
    _importCardsFileSelected: function(input)
    {
        $("#importcards-inputs").html("");
        
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function(e) {
                let data = e.target.result;
                let json = "";
                try
                {
                    json = JSON.parse(data);
                }
                catch (e)
                {
                    $("#importcards-result").html("<p class='hint'>" + Studio._i18n.importcardsHint2error + "</p>");
                    return;
                }
                
                $("#import-data").val(data);
                
                let nbItems = 0;
                for (let item of Studio._items)
                {
                    nbItems += (json[item.name] || []).length;
                }
                if (nbItems == 0)
                {
                    $("#importcards-result").html("<p class='hint'>" + Studio._i18n.importcardsHint2empty + "</p>");
                    return;
                }
                
                let code = "";
                for (let item of Studio._items)
                {
                    code += "<h2>" + item._i18n.tab + "</h2>";
                    
                    let subitems = (json[item.name] || []);
                    if (subitems.length == 0)
                    {
                        code += "<p>" + Studio._i18n.importcardsHint2emptytype + "</p>"
                    }
                    else
                    {
                        for (let subitem of subitems)
                        {
                            if (!item.existsItem(subitem))
                            {
                                subitem.prechecked = true;
                            }
                        }

                        code += item.importCode(subitems);
                    }
                }
                
                $("#importcards-result").html(code);
            }
            
            reader.readAsText(input.files[0]);
        }

        input.value = '';        
    },
    
    exportCards: function()
    {
        let studiosCode = "";
        Studio._items.forEach(item => studiosCode += "<h1>" + item._i18n.tab + "</h1>" + item.printCode());
        
        Nav.dialog(Studio._i18n.exportcardsLabel,
            "<div class=\"printcards back cut\">"

            + "<p class='hint'>" + Studio._i18n.exportcardsHint + "</p>"

            + studiosCode

            + "<div class=\"newpage\"></div>"

            + "</div>",
            null,
            [{
                label: About._i18n.custom_allin,
                icon: "studio-allin",
                fn: "Studio._allin();"
            }],
            [{
                icon: 'studio-icon-exportcards',
                label: Studio._i18n.exportcardsLabel,
                fn: "Studio._exportCards()"
            }]
        );
        // share back of spell and equipment
        $(".newpage").append($(".printcards .back"));
    },

    _allin: function() 
    {
        $(".printcards > ~input[type='checkbox']").prop( "checked", true );
    },
    
    _allinImport: function() 
    {
        $(".printcards input[type='checkbox']").prop( "checked", true );
    },

    _printCards: function()
    {
        if ($(".printcards > ~input:checked").length == 0)
        {
            About.warnToast(Studio._i18n.printcardEmpty);
            return;
        }
        else
        {
            window.print();
        }
    },

    _exportCards: function()
    {
        if ($(".printcards > ~input:checked").length == 0)
        {
            About.warnToast(Studio._i18n.exportcardEmpty);
            return;
        }
        else
        {
            let dataToExport = {};
            
            let selection = $("input[data-index]:checked").map((a,b) => { let $b = $(b); return { name:$b.prop("name"), index: $b.data("index") }; }).get();
            for (let s of selection)
            {
                dataToExport[s.name] = dataToExport[s.name] || [];
                dataToExport[s.name].push(s.index);
            }
            
            let data = {};
            Studio._items.filter(item => dataToExport[item.name]).forEach(item => data[item.name] = item.export(dataToExport[item.name]));

            data = JSON.stringify(data, null, 4);
            
            var file = new Blob([data], {type: "application/json"});
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = Application + "-Studio-" + new Date().getTime() + ".json";
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0);    
        }
    }
};

Utils._toInitialize.push(Studio.init);