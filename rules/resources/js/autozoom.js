function autoZoom() {
    document.body.style.zoom = Math.floor(window.innerWidth / 909.0 * 100.0) / 100.0; 
}
window.onresize = autoZoom;
autoZoom();