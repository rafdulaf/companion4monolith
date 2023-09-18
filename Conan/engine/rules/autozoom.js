var width;
function autoZoom() {
    var zoom = Math.floor(window.innerWidth / width * 10000.0) / 10000.0;
    
    document.body.style.overflow = "hidden";
    if (navigator.userAgent.indexOf('Firefox') != -1
        || navigator.userAgent.indexOf("Safari") != -1)
    {
        document.body.style.transform = "scale(" + zoom + ")";
        document.body.style.transformOrigin = "top left";
    }
    else
    {
        document.body.style.zoom = zoom;
    }
}
window.onresize = autoZoom;
window.onorientationchange = autoZoom;

var iframe = parent.document.getElementById(window.name);
iframe.style.opacity = 0;
window.onload = function() {
    width = parseInt(document.querySelector("body > div").style.width);
    autoZoom();
    iframe.style.opacity = null;
}