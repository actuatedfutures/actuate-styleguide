! function(t, e) {
    t.fn.svgGraph = function(n, r) {
        var a = t(this)[0],
            i = e.select(a).attr("viewBox", "0 0 " + n + " " + r);
        return t(a.parentNode).attr("style", "padding-top:" + 100 * r / n + "%"), i
    }
}(jQuery, d3);