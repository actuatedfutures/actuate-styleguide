"undefined" == typeof actuate && (actuate = {}),
function(t, a, e)
{
    e.usagePie = function(e, r, n)
    {
        this.graph = t(e).svgGraph(r, n), this.width = r, this.height = n, this.render = function(t)
        {
            var e = a.layout.pie(),
                r = this.width / 2,
                n = a.scale.category20(),
                i = this.graph.append("g").attr("class", "the_pie").data([t]).attr("transform", "translate(" + r + "," + r + ")"),
                s = a.svg.arc().outerRadius(r),
                e = a.layout.pie().value(function(t)
                {
                    return t.num
                }),
                u = i.selectAll("g.slice").data(e).enter().append("svg:g").attr("class", "slice");
            u.append("svg:path").attr("fill", function(t, a)
            {
                return n(a)
            }).attr("d", s), u.append("svg:text").attr("transform", function(t)
            {
                return t.innerRadius = 0, t.outerRadius = r, "translate(" + s.centroid(t) + ")"
            })
        }
    }
}(jQuery, d3, actuate);