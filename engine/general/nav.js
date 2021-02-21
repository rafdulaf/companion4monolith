Nav = {
    _id: null,
    _icons: [],
    _actions: {},
    _floatingActions: {},
    _cb: [],
    _applyHash: {},
    
    addIcon: function(label, icon, id, applyHash) 
    {
        var item = {
            label: label,
            icon: icon,
            id: id
        };
        Nav._applyHash[id] = applyHash;
        Nav._icons.push(item);
        Nav._actions[id] = [];
        
        if (Nav._id)
        {
            var code = Nav._drawIcon(item);
            $("#" + Nav._id).children("ul").append(code);
            code = Nav._drawContent(item);
            $("#" + Nav._id + "-contents").append(code);
            code = "<ul for=\"" + id + "\"></ul>";
            $("#" + Nav._id + "-toolbar").append(code);
        }
    },

    _drawIcons: function ()
    {
        var s = "";
        for (var i in Nav._icons)
        {
            s += Nav._drawIcon(Nav._icons[i]);
        }
        return s;
    },

    _drawIcon: function (item)
    {
        return "<li><a class=\"" + item.icon + "\" href=\"javascript:void(0);\" for=\"" + item.id + "\" onclick=\"Nav.switchTo(this)\"><div><span>" + item.label + "</span></div></a></li>"
    },

    _drawContents: function ()
    {
        var s = "";
        for (var i in Nav._icons)
        {
            s += Nav._drawContent(Nav._icons[i]);
        }
        return s;
    },

    _drawContent: function (item)
    {
        return "<div id=\"" + item.id + "\" title=\"" + item.label + "\"></div>"
    },
    
    addAction: function(iconId, label, icon, id, fn) 
    {
        var item = {
            label: label,
            icon: icon,
            id: id,
            fn: fn,
            hidden: false
        };
        Nav._actions[iconId].push(item);
        
        if (Nav._id)
        {
            var code = Nav._drawAction(iconId, item);
            $("#" + Nav._id + "-toolbar").children("ul[for='" + iconId + "']").append(code);
        }
    },
    
    addFloatingAction: function(iconId, label, icon, id, fn)
    {
        var item = {
            label: label,
            icon: icon,
            id: id,
            fn: fn,
            hidden: false
        };
        Nav._floatingActions[iconId] = Nav._floatingActions[iconId] || [];
        Nav._floatingActions[iconId].push(item);
    
        var code = Nav._drawFloatingAction(iconId, item);
        $("ul[for='" + iconId + "']").append(code);
    },

    showAction: function(iconId, id)
    {
        for (var i in Nav._actions[iconId])
        {
            if (Nav._actions[iconId][i].id == id && Nav._actions[iconId][i].hidden)
            {
                Nav._actions[iconId][i].hidden = false;
                anychange = true;
                $('#actions-' + iconId + "-" + Nav._actions[iconId][i].id).show();
                Nav.updateTitle();
                return;
            }
        }        
    },

    showFloatingAction: function(iconId, id)
    {
        for (var i in Nav._floatingActions[iconId])
        {
            if (Nav._floatingActions[iconId][i].id == id && Nav._floatingActions[iconId][i].hidden)
            {
                Nav._floatingActions[iconId][i].hidden = false;
                anychange = true;
                $('#floatingactions-' + iconId + "-" + Nav._floatingActions[iconId][i].id).show();
                return;
            }
        }        
    },

    hideAction: function(iconId, id)
    {
        for (var i in Nav._actions[iconId])
        {
            if (Nav._actions[iconId][i].id == id && !Nav._actions[iconId][i].hidden)
            {
                Nav._actions[iconId][i].hidden = true;
                $('#actions-' + iconId + "-" + Nav._actions[iconId][i].id).hide();
                Nav.updateTitle();
                return;
            }
        }        
    },

    hideFloatingAction: function(iconId, id)
    {
        for (var i in Nav._floatingActions[iconId])
        {
            if (Nav._floatingActions[iconId][i].id == id && !Nav._floatingActions[iconId][i].hidden)
            {
                Nav._floatingActions[iconId][i].hidden = true;
                $('#floatingactions-' + iconId + "-" + Nav._floatingActions[iconId][i].id).hide();
                return;
            }
        }        
    },

    _drawActions: function ()
    {
        var s = "";
        
        for (var i in Nav._icons)
        {
            s = "<ul for=\"" + Nav._icons[i].id + "\">";
            s += "</ul>";
        }
        
        return s ;
    },

    _drawFloatingActions: function ()
    {
        var s = "";
        
        for (var i in Nav._icons)
        {
            s = "<ul for=\"" + Nav._icons[i].id + "\">";
            s += "</ul>";
        }
        
        return s ;
    },

    _drawAction: function (iconId, item)
    {
        return "<li><a class=\"" + item.icon + "\" href=\"javascript:void(0);\" id=\"actions-" + iconId + "-" + item.id + "\" onclick=\"Nav.act(this)\" title=\"" + item.label + "\"></a></li>";
    },

    _drawFloatingAction: function (iconId, item)
    {
        return "<li><a class=\"" + item.icon + "\" href=\"javascript:void(0);\" id=\"floatingactions-" + iconId + "-" + item.id + "\" onclick=\"Nav.floatingAct(this)\" title=\"" + item.label + "\"><span>" + item.label + "</span></a></li>";
    },

    switchTo: function(elt)
    {
        elt = elt || $('.nav > ul > li > a')[0];
        
        var id = elt.getAttribute("for");
        
        var toSelect = $('#' + id);
        if (!toSelect.is(".active"))
        {
        	Nav.setHash(id);
    
            $("#" + Nav._id + "-toolbar ul.active").removeClass("active");
            $("#" + Nav._id + "-toolbar ul[for='" + id + "']").addClass("active");
    
            $("#" + Nav._id + "-contents > .active").removeClass("active");
            toSelect.addClass("active");
            toSelect.trigger("show");
            
            $("#" + Nav._id + " ul li a.active").removeClass("active");
            $("#" + Nav._id + " ul li a[for=" + id + "]").addClass("active");
            
            Nav.updateTitle();
        }
    },
    
    act: function(elt)
    {
        var id = elt.getAttribute("id").substring("actions-".length);
        var iconId = elt.parentNode.parentNode.getAttribute("for");
        id = id.substring(iconId.length + 1);

        for (var i in Nav._actions[iconId])
        {
            if (Nav._actions[iconId][i].id == id)
            {
                Nav._actions[iconId][i].fn();
            }
        }
    },
    
    
    floatingAct: function(elt)
    {
        var id = elt.getAttribute("id").substring("floatingactions-".length);
        var iconId = elt.parentNode.parentNode.getAttribute("for");
        id = id.substring(iconId.length + 1);

        for (var i in Nav._floatingActions[iconId])
        {
            if (Nav._floatingActions[iconId][i].id == id)
            {
                Nav._floatingActions[iconId][i].fn();
            }
        }
    },    
    
    updateTitle: function()
    {
        var id = $("#" + Nav._id + " ul li a.active").attr("for");
        var toSelect = $("#" + id);
        
        var t = $(".header .title div")
        t.html((toSelect.attr('title') || About._i18n[Language].smallName));

        var sizes = ["size10", "size9", "size8", "size7", "size6", "size5", "size4", "size3", "size2", "size1", "size0", "size-1", "size-2"];
        t.removeClass(sizes.join(" "));
        
        var tb = $(".header .toolbar")
        var maxWidth = $(".header").width() - tb.width();
        var maxHeight = 60;
        
        for (var i = 0; i < sizes.length; i++)
        {
            if (t.width() > maxWidth || t.height() > maxHeight)
            {
                t.addClass(sizes[i]);
            }
            else
            {
                break;
            }
        }
    },
    
    updateNav: function()
    {
        var nav = $("#" + Nav._id);
        
        var sizes = ["size10", "size9", "size8", "size7", "size6", "size5", "size4", "size3", "size2", "size1"];

        nav.removeClass(sizes.join(" "));
        
        var tabs = nav.find("a div");
        var maxWidth = tabs.width();

        for (var i = 0; i < sizes.length; i++)
        {
            var tooSmall = false;
            tabs.each(function(tindex, t) {
                var st = $("span", t); 
                if (st.width() > maxWidth)
                {
                    tooSmall = true;
                    return false;
                }
            });
            if (tooSmall)
            {
                nav.addClass(sizes[i]);
            }
            else
            {
                break;
            }
        }
    },
    
    createFloatingBar: function(id, cls) {
        Nav._floatingActions[id] = Nav._floatingActions[id] || [];
        
        let s = "<ul for=\"" + id + "\" class='floatingactions" + (cls ? ' ' + cls : '') + "'>";
        for (let item of Nav._floatingActions[id])
        {
            s += Nav._drawFloatingAction(id, item);
        }
        s += "</ul>"; 
        
        $('#' + id).css('transform', 'translateX(0)') // hack for fixed toolbars to be relative to this
                   .append(s);
    },

    initialize: function()
    {
        
        Nav._id = "nav-" + parseInt(Math.random() * 1000);
        var code = "<header class=\"header\">"
                    + "<div class=\"title\"><div>" + About._i18n[Language].smallName + "</div></div>"
                    + "<nav class=\"toolbar\" id=\"" + Nav._id + "-toolbar\">"
                        + Nav._drawActions()
                    + "</nav>"
                    + "</header>"
                    + "<nav class=\"nav\" id=\"" + Nav._id + "\">"
                        + "<ul>" 
                            + Nav._drawIcons()
                        + "</ul>"
                    + "</nav>"
                    + "<div class=\"contents\" id=\"" + Nav._id + "-contents\">"
                        + Nav._drawContents()
                    + "</div>";
        $(document.body).prepend(code);
        
        document.fonts.ready.then(function() { Nav.updateTitle(); Nav.updateNav(); $(".nav-menu").each(function(i, s) { Nav.updateTabsSize(s) }); });
        $(window).on('resize', function() { Nav.updateTitle(); Nav.updateNav(); });
        $(window).on('orientationchange', function() { Nav.updateTitle(); Nav.updateNav(); });
        $(window).on('hashchange', function(e) { Nav._hashChange(e) });
        
        function resize()
        {
           a = (window.innerHeight) + "px"
           document.body.parentNode.style.height = a;
        }
        $(window).on('resize', resize);
        $(window).on('orientationchange', resize);
        resize();  
        
        window.scrollTo(0, 111111)
    },
    
    startUp: function()
    {
    	Nav._canChangeHash = true;
        if (!Nav._hashChange())
        {
            Nav.switchTo();
        }
    },
    
    setHash: function(hash) {
    	if (!Nav._canChangeHash)
		{
    		return;
		}
    	
    	var newHash = "#" + hash;
    	if (window.location.hash != newHash)
    	{
    		Nav._changingHash = true;
    		window.location.hash = newHash
    	}
    },
    setHashDialog: function(quit) {
        if (quit && window.location.hash.endsWith("-dialog"))
        {
        	Nav.setHash(window.location.hash.substring(1, window.location.hash.indexOf('-dialog')));
        }
		if (!quit && !window.location.hash.endsWith("-dialog"))
		{
        	Nav.setHash(window.location.hash.substring(1) + "-dialog");
		}
    },
    
    _hashChange: function(e)
    {
    	if (Nav._changingHash)
		{
    		Nav._changingHash = false;
    		return;
		}
    		
        window.scrollTo(0, 0);

        if (e && e.originalEvent.oldURL.endsWith("-dialog"))
        {
            Nav.closeDialog(true);
        }
        
        var hash = window.location.hash;
        if (hash.endsWith("-dialog"))
        {
            hash = hash.substring(0, hash.indexOf("-dialog"));
        }

        var elt;
        
        var matcher = /#([a-z0-9_]*)(?:-([a-z0-9_]*))?/i.exec(hash);
        if (matcher
        	&& matcher[1]
            && (elt = $("nav a[for=" + matcher[1] + "]")[0]))
        {
            Nav.switchTo(elt);
            if (matcher[2])
        	{
            	var applyHash = Nav._applyHash[matcher[1]];
            	if (applyHash)
        		{
            		applyHash(matcher[2])
        		}
        	}
            return true;
        }
        else
        {
            // Nothing
            return false;
        }
    },
    
    dialog: function(title, code, callback, actions, floatingactions)
    {
        function drawactions()
        {
            var c = "";
            if (actions)
            {
                c += "<ul class='actions'>";
                for (var i in actions)
                {
                    c += "<li>"
                    c += "<a href=\"javascript:void(0);\" onclick=\"" + actions[i].fn + "\" class=\"" + actions[i].icon + "\" title=\"" + actions[i].label + "\"></a>"
                    c += "</li>"
                }
                c += "</ul>";
            }
            return c;
        }
        function drawfloatingactions()
        {
            var c = "";
            if (floatingactions)
            {
                c += "<ul class='floatingactions'>";
                for (var i in floatingactions)
                {
                    c += "<li>"
                    c += "<a href=\"javascript:void(0);\" onclick=\"" + floatingactions[i].fn + "\" class=\"" + floatingactions[i].icon + "\" title=\"" + floatingactions[i].label + "\"><span>" + floatingactions[i].label + "</span></a>"
                    c += "</li>"
                }
                c += "</ul>";
            }
            return c;
        }
        
        code = "<div id=\"dialog\" class=\"dialog\">"
                + "<div class=\"dialog-header\">"
                    + "<a class=\"dialog-back\" href=\"javascript:void(0);\" onclick=\"Nav.closeDialog()\"></a>"
                    + "<div class=\"dialog-title\">" + title + "</div>"
                    + drawactions()
                + "</div>"
                + "<div class=\"dialog-content\">"
                    + drawfloatingactions()
                    + code 
                + "</div>"
              + "</div>";
        $(document.body).append(code);
        Nav.setHashDialog();
        
        Nav._cb.push(callback);
    },
    
    closeDialog: function(all)
    {
        var d = $(".dialog").last();
        if (d.length > 0)
        {
            var cb = Nav._cb.pop(); 
            if (cb)
            {
                cb();
            }

            d.remove();
            
            if ($(".dialog").length == 0)
            {
            	Nav.setHashDialog(true);
            }
            else if (all)
            {
                Nav.closeDialog(true);
            }
        }
    },
    
    updateTabsSize: function(s)
    {
            var slider = $(s);
            
            var sizes = ["size10", "size9", "size8", "size7", "size6", "size5", "size4", "size3", "size2", "size1"];
            
            slider.removeClass(sizes.join(" "));
            
            
            var tabs = slider.find("a");
            var maxWidth = tabs.width();
            
            var button = slider.prev();
            if (button)
            {
                $(button).width(tabs.offset().left);
            }

            for (var i = 0; i < sizes.length; i++)
            {
                var tooSmall = false;
                tabs.each(function(tindex, t) {
                    if ($("span", t).width() > maxWidth)
                    {
                        tooSmall = true;
                        return false;
                    }
                });
                if (tooSmall)
                {
                    slider.addClass(sizes[i]);
                }
                else
                {
                    break;
                }
            }
    },
    
    createTabs: function(id, tabs, onSetPosition, button)
    {
        var subcode = "";
        var subzone = "";
        for (var i in tabs)
        {
            subcode += "<a href=\"javascript:void(0)\"><span>" + tabs[i].label + "</span></a>";
            subzone += "<div id=\"" + tabs[i].id + "\"></div>";
        }
        
        var code = "";
        if (button)
        {
            code += "<a class='nav-button " + button.cls + "' onclick=\"" + button.action + "\" href='javascript:void(0)' title=\"" + button.label + "\"></a>"
        }
        code += "<div class=\"nav-menu\">"
              +      subcode
              + "</div>"
              + "<div class=\"nav-wrapper\">"
              +      subzone
              + "</div>";
        
        $("#" + id).attr("data-navsize", tabs.length).append(code);
        
        var m = "#" + id + " .nav-menu";
        var w = "#" + id + " .nav-wrapper";
        
        var $m = $(m);
        var $w = $(w);

        var aaa = $m.slick({
            slidesToShow: tabs.length + 0.5,
            slidesToScroll: 1,
            arrows: true,
            infinite: false,
            swipeToSlide: true,
            focusOnSelect: true,
            touchThreshold: 10,
            asNavFor: w 
        });
        var t = aaa[0].slick.setDimensions;
        aaa[0].slick.setDimensions = function() {
            t.apply(aaa[0].slick);
            Nav.updateTabsSize(aaa[0]);
        }
        Nav.updateTabsSize(aaa[0]);
        
        $w.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: false,
            swipeToSlide: true,
            touchThreshold: 10,
            asNavFor: m 
        });
            
        if (onSetPosition)
        {
            $(w).on('setPosition', onSetPosition);
        }
    }
}

Utils._toInitialize.push(Nav.initialize);