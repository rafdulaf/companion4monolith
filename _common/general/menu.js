Menu = {
    _id: null,
    _items: [],
    
    addMenu: function(label, icon, action, line) 
    {
        var item = {
            label: label,
            icon: icon,
            action: action,
            line: line
        };
        Menu._items.push(item);
        
        if (Menu._id)
        {
            var code = Menu._drawItem(item);
            $("#" + Menu._id).find("ul").append(code);
        }
    },

    _drawItems: function ()
    {
        var s = "";
        for (var i in Menu._items)
        {
            s += Menu._drawItem(Menu._items[i]);
        }
        return s;
    },
    
    _drawItem: function (item)
    {
        return "<li" + (item.line ? " class='line'" : "") + "><a class=\"" + item.icon + "\" href=\"javascript:void(0);\" onclick=\"" + item.action + "\">" + item.label + "</a></li>"
    },

    initialize: function()
    {
        Menu._id = "menu-" + parseInt(Math.random() * 1000);
        var code = "<nav class=\"menu\" id=\"" + Menu._id + "\">" 
                        + "<div>"
                            + "<input id=\"" + Menu._id + "-input\" type=\"checkbox\" />"
                            + "<span></span><span></span><span></span>"
                            + "<label for=\"" + Menu._id + "-input\"></label>"
                            + "<ul>"
                            + Menu._drawItems()
                            + "</ul>"
                        + "</div>"
                    + "</nav>";
        $(document.body).prepend(code);
    }
}

Utils._toInitialize.push(Menu.initialize);