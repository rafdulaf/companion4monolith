function autoZoom() {
    document.body.style.transform = "scale(" + Math.floor(window.innerWidth / 909.0 * 100.0) / 100.0 + ")";
    document.body.style.transformOrigin = "top left";
    document.body.style.overflow = "hidden";
}
window.onresize = autoZoom;
autoZoom();