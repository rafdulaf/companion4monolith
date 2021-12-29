var AutoZoom = {
    autozoom: function(id, width, height) {
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0].contentRect.width != 0)
            {
                AutoZoom._resize(id, width, height);
            }
        });
        resizeObserver.observe($("#" + id)[0]);
    },
    _resize: function(id, width, height) {
        let elt = $("#" + id);
        let locationWidth = Math.floor(elt.width());
        
        if (elt.attr('data-width') == locationWidth) return;
        elt.attr('data-width', locationWidth);
        
        let ratio = locationWidth / width;
        
        let cols = Math.max(1, Math.ceil(ratio - 0.2));
        let zoom = Math.floor(locationWidth / (cols * width) * 1000.0) / 1000.0;
        
        let rules = $("#" + id + "-cssrule");
        if (!rules.length)
        {
            $("<style type='text/css' id='" + id + "-cssrule'></style>").appendTo("head");
            rules = $("#" + id + "-cssrule");
        }
        rules.html("#" + id + " > * { zoom: " + zoom + " } .ff #" + id + " > * { transform: scale(" + zoom + "); transform-origin: top left; margin-right: -" + (width - width*zoom) + "px; margin-bottom: -" + (height - height*zoom) + "px; }")
    }
}
