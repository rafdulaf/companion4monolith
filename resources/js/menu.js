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
        this._items.push(item);
        
        if (this._id)
        {
            var code = this._drawItem(item);
            $("#" + this._id).find("ul").append(code);
        }
    },

    _drawItems: function ()
    {
        var s = "";
        for (var i in this._items)
        {
            s += this._drawItem(this._items[i]);
        }
        return s;
    },
    
    _drawItem: function (item)
    {
        return "<li" + (item.line ? " class='line'" : "") + "><a class=\"" + item.icon + "\" href=\"javascript:void(0);\" onclick=\"" + item.action + "\">" + item.label + "</a></li>"
    },

    initialize: function()
    {
        this._id = "menu-" + parseInt(Math.random() * 1000);
        var code = "<nav class=\"menu\" id=\"" + this._id + "\">" 
                        + "<div>"
                            + "<input id=\"" + this._id + "-input\" type=\"checkbox\" />"
                            + "<span></span><span></span><span></span>"
                            + "<label for=\"" + this._id + "-input\"></label>"
                            + "<ul>"
                            + this._drawItems()
                            + "</ul>"
                        + "</div>"
                    + "</nav>";
        $(document.body).prepend(code);
    }
}
