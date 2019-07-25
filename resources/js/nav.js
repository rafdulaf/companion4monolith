Nav = {
    _id: null,
    _icons: [],
    _actions: {},
    
    addIcon: function(label, icon, id) 
    {
        var item = {
            label: label,
            icon: icon,
            id: id
        };
        this._icons.push(item);
        this._actions[id] = [];
        
        if (this._id)
        {
            var code = this._drawIcon(item);
            $("#" + this._id).children("ul").append(code);
            code = this._drawContent(item);
            $("#" + this._id + "-contents").append(code);
            code = "<ul for=\"" + id + "\"></ul>";
            $("#" + this._id + "-toolbar").append(code);
        }
    },

    _drawIcons: function ()
    {
        var s = "";
        for (var i in this._icons)
        {
            s += this._drawIcon(this._icons[i]);
        }
        return s;
    },

    _drawIcon: function (item)
    {
        return "<li><a class=\"" + item.icon + "\" href=\"javascript:void(0);\" for=\"" + item.id + "\" onclick=\"Nav.switchTo(this)\">" + item.label + "</a></li>"
    },

    _drawContents: function ()
    {
        var s = "";
        for (var i in this._icons)
        {
            s += this._drawContent(this._icons[i]);
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
        this._actions[iconId].push(item);
        
        if (this._id)
        {
            var code = this._drawAction(iconId, item);
            $("#" + this._id + "-toolbar").children("ul[for='" + iconId + "']").append(code);
        }
    },
    
    showAction: function(iconId, id)
    {
        for (var i in this._actions[iconId])
        {
            if (this._actions[iconId][i].id == id && this._actions[iconId][i].hidden)
            {
                this._actions[iconId][i].hidden = false;
                anychange = true;
                $('#actions-' + iconId + "-" + this._actions[iconId][i].id).show();
                this.updateTitle();
                return;
            }
        }        
    },

    hideAction: function(iconId, id)
    {
        for (var i in this._actions[iconId])
        {
            if (this._actions[iconId][i].id == id && !this._actions[iconId][i].hidden)
            {
                this._actions[iconId][i].hidden = true;
                $('#actions-' + iconId + "-" + this._actions[iconId][i].id).hide();
                this.updateTitle();
                return;
            }
        }        
    },

    _drawActions: function ()
    {
        var s = "";
        
        for (var i in this._icons)
        {
            s = "<ul for=\"" + this._icons[i].id + "\">";
            s += this._drawAction(i, this._actions[this._icons[i]]);
            s += "</ul>";
        }
        
        return s ;
    },

    _drawAction: function (iconId, item)
    {
        return "<li><a class=\"" + item.icon + "\" href=\"javascript:void(0);\" id=\"actions-" + iconId + "-" + item.id + "\" onclick=\"Nav.act(this)\" title=\"" + item.label + "\"></a></li>";
    },

    switchTo: function(elt)
    {
        var id = elt.getAttribute("for");
        
        var toSelect = $('#' + id);
        if (toSelect.is(".active"))
        {
            return;
        }

        $("#" + this._id + "-toolbar ul.active").removeClass("active");
        $("#" + this._id + "-toolbar ul[for='" + id + "']").addClass("active");

        $("#" + this._id + "-contents > .active").removeClass("active");
        toSelect.addClass("active");
        toSelect.trigger("show");
        
        $("#" + this._id + " ul li a.active").removeClass("active");
        $("#" + this._id + " ul li a[for=" + id + "]").addClass("active");
        
        Nav.updateTitle();
    },
    
    act: function(elt)
    {
        var id = elt.getAttribute("id").substring("actions-".length);
        var iconId = elt.parentNode.parentNode.getAttribute("for");
        id = id.substring(iconId.length + 1);

        for (var i in this._actions[iconId])
        {
            if (this._actions[iconId][i].id == id)
            {
                this._actions[iconId][i].fn();
            }
        }
    },
    
    updateTitle: function()
    {
        var id = $("#" + this._id + " ul li a.active").attr("for");
        var toSelect = $("#" + id);
        
        var t = $(".header .title div")
        t.removeClass("small smaller smallest twolines").html(toSelect.attr('title') || "Conan");

        var tb = $(".header .toolbar")

        var width = $(".header").width() - tb.width();
        var height = $(".header").height();
        
        if (t.width() > width || t.height() > height)
        {
            t.addClass("small");
        }
        if (t.width() > width || t.height() > height)
        {
            t.addClass("smaller");
        }
        if (t.width() > width || t.height() > height)
        {
            t.addClass("smallest");
            if (t.height() > height)
            {
                t.addClass("twolines");
            }
        }
    },

    initialize: function()
    {
        
        this._id = "nav-" + parseInt(Math.random() * 1000);
        var code = "<header class=\"header\">"
                    + "<div class=\"title\"><div>Conan</div></div>"
                    + "<nav class=\"toolbar\" id=\"" + this._id + "-toolbar\">"
                        + this._drawActions()
                    + "</nav>"
                    + "</header>"
                    + "<nav class=\"nav\" id=\"" + this._id + "\">"
                        + "<ul>" 
                            + this._drawIcons()
                        + "</ul>"
                    + "</nav>"
                    + "<div class=\"contents\" id=\"" + this._id + "-contents\">"
                        + this._drawContents()
                    + "</div>";
        $(document.body).prepend(code);
        
        $(window).resize(function() { Nav.updateTitle(); });
    },
    
    dialog: function(title, code, callback)
    {
        code = "<div id=\"dialog\" class=\"dialog\">"
                + "<div class=\"dialog-header\">"
                    + "<a class=\"dialog-back\" href=\"javascript:void(0);\" onclick=\"Nav.closeDialog()\"></a>"
                    + "<div class=\"dialog-title\">" + title + "</div>"
                    + "<ul class='actions'>"
                    + "</ul>"
                + "</div>"
                + "<div class=\"dialog-content\">"
                    + code 
                + "</div>"
              + "</div>";
        $(document.body).append(code);
        Nav._cb = callback;
    },
    
    closeDialog: function()
    {
        if (Nav._cb)
        {
            Nav._cb();
        }
        Nav._cb = null;
        $("#dialog").remove();
    },
    
    createTabs: function(id, tabs, onSetPosition)
    {
        var subcode = "";
        var subzone = "";
        for (var i in tabs)
        {
            subcode += "<a href=\"javascript:void(0)\">" + tabs[i].label + "</a>";
            subzone += "<div id=\"" + tabs[i].id + "\"></div>";
        }
        
        var code = "<div class=\"nav-menu\">"
                 +      subcode
                 + "</div>"
                 + "<div class=\"nav-wrapper\">"
                 +      subzone
                 + "</div>";
        
        $("#" + id).append(code);
        
        var m = "#" + id + " .nav-menu";
        var w = "#" + id + " .nav-wrapper";
        
        var $m = $(m);
        var $w = $(w);

        $m.slick({
            slidesToShow: tabs.length + 0.5,
            slidesToScroll: 1,
            arrows: true,
            infinite: false,
            swipeToSlide: true,
            focusOnSelect: true,
            touchThreshold: 10,
            asNavFor: w 
        });
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
