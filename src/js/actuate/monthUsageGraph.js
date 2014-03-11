"undefined" == typeof actuate && (actuate = {}),
function(t, a, s)
{
    // i = $
    // h = d3
    // e = actuate
    s.monthUsageGraph = function(i, h, e)
    {
        this.graph = t(i).svgGraph(h, e), this.padding = 30, this.width = h - this.padding, this.height = e - 20, this.data = [], this.max = 0, this.type = "", this.setMax = function(t)
        {
            this.max = t
        }, 

        this.setType = function(t)
        {
            this.type = t;            
            this.suffix = ("water" == t) ? "L" : "kWh";
            this.padding = ("electricity" == t) ? 40;
            // "electricity" == t && (this.padding = 40)
        }, 

        this.renderBackground = function()
        {
            this.graph.append("rect").attr("class", "graph--background").attr("x", this.padding).attr("y", 0).attr("width", this.width).attr("height", this.height)
        }, 

        this.createScales = function()
        {
            this.scaleX = a.scale.linear().domain([0, 30]).range([0, this.width]), this.scaleY = a.scale.linear().domain([0, this.max]).range([this.height, 0])
        }, 

        this.plotGraph = function(t, s)
        {
            var i = this.scaleX,
                h = this.scaleY,
                e = 0,
                r = a.svg.area().x(function(t, a)
                {
                    return i(a)
                }).y0(this.height).y1(function(t)
                {
                    return e += t.num, h(e)
                }).interpolate("line");
            this.graph.append("path").datum(t).attr("class", s).attr("transform", "translate(" + this.padding + ",0)").attr("d", r)
        }, 

        this.addXAxis = function()
        {
            var t = a.svg.axis().scale(this.scaleX).orient("bottom").tickSize(-this.height).ticks(32);
            this.graph.append("g").attr("class", "x axis").attr("transform", "translate(" + this.padding + "," + this.height + ")").call(t);
            var s = this.data.this.length - 1,
                i = this.data.this[s].date.split(" ");
            this.graph.append("text").attr("class", "citu-yellow brand-face").attr("style", "text-anchor:start;font-size:12px").attr("x", this.scaleX(s) + this.padding).attr("y", this.height + 16).text(i[0] + " " + i[1]), this.graph.append("rect").attr("class", "citu-yellow").attr("width", "1").attr("height", "8").attr("x", this.scaleX(s) - 1 + this.padding).attr("y", this.height - 2), this.addLineLabel(this.data.sums.last, "lk-white"), this.addLineLabel(this.data.sums.this, "citu-yellow"), this.addLineLabel(this.data.sums.average, "lk-beige")
        }, 

        this.addLineLabel = function(t, a)
        {
            this.graph.append("text").attr("class", a + " brand-face").attr("style", "text-anchor:end;font-size:11px").attr("x", this.padding - 2).attr("y", this.scaleY(t) + 10).text(Math.round(t) + "" + this.suffix)
        }, 

        this.addLine = function(t)
        {
            var a = this.scaleY(t),
                s = this.graph.append("g").attr("transform", "translate(" + this.padding + ",0)");
            return s.append("line").attr("x1", -10).attr("x2", this.width).attr("y1", a).attr("y2", a), s
        }, 

        this.render = function(t)
        {
            this.data = t, void 0 === this.suffix && s.error("William Bald", "monthUsageGraph needs you to set a type using setType.");
            var i = a.max([t.sums.this, t.sums.last, t.sums.average]);
            this.setMax(1.1 * i), this.renderBackground(), this.createScales(), this.plotGraph(t.last, "graph--area--prev"), this.addLine(t.sums.last, "last month").attr("class", "graph graph--previous"), this.plotGraph(t.this, "graph--area"), this.addLine(t.sums.this, "so far").attr("class", "graph graph--sofar"), this.addLine(t.sums.average, "average").attr("class", "graph graph--average").attr("stroke-dasharray", "2,2"), this.addXAxis()
        }
    }
}(jQuery, d3, actuate);