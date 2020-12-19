function autoZoom() {
    var zoom = Math.floor(window.innerWidth / 914.0 * 100.0) / 100.0;
    
    if (navigator.userAgent.indexOf('Firefox') != -1)
    {
        document.body.style.transform = "scale(" + zoom + ")";
        document.body.style.transformOrigin = "top left";
        document.body.style.overflow = "hidden";
    }
    else
    {
        document.body.style.zoom = zoom;
    }
}
window.onresize = autoZoom;
autoZoom();