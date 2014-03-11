"undefined" == typeof actuate && (actuate = {}),
function(t, e, a) {
    a.dayBarChart = function(r, i, n, s) {
        this.graph = t(r).svgGraph(i, n), this.width = i, this.height = n, this.data = s, this.max = 0, this.spaceX = 40, this.space = 4, this.barHeight = this.height / s.length, this.type = "", this.createScales = function() {
            this.scaleX = e.scale.linear().domain([0, e.max(this.data, function(t) {
                return t.num
            })]).range([0, this.width - this.spaceX])
        }, this.setType = function(t) {
            this.type = t, this.price = "water" == t ? a.price.water : a.price.electric
        }, this.plotGraph = function() {
            var t = this.scaleX,
                e = this.spaceX,
                r = this.barHeight,
                i = this.width / 2,
                n = this.price,
                s = this.type,
                h = this.graph.selectAll("g").data(this.data).enter().append("a").attr("xlink:href", function(t) {
                    var e = t.date.split(" "),
                        a = new Date(parseInt(e[0]) + " " + e[1] + " " + e[2]);
                    return "/" + s + "/day/" + a.getDate() + "-" + (a.getMonth() + 1) + "-" + a.getFullYear() + "/"
                }).attr("transform", function(t, e) {
                    return "translate(0," + (1 + e * r) + ")"
                });
            h.append("rect").attr("x", this.spaceX).attr("width", this.width - this.spaceX).attr("height", this.barHeight - 2).attr("class", function(t, e) {
                return e % 7 == 0 || e % 7 == 1 ? "bar--background weekend" : "bar--background weekday"
            }), h.append("rect").attr("x", this.spaceX).attr("class", "lk-turq").attr("width", function(e) {
                return t(e.num)
            }).attr("height", this.barHeight - (2 + 2 * this.space)).attr("y", this.space), h.append("text").attr("x", function(a) {
                var r = t(a.num);
                return r > i ? e + r - 10 : e + r + 10
            }).attr("y", this.barHeight / 2).attr("dy", "0.25em").attr("class", function(e) {
                return t(e.num) > i ? "lk-white" : "lk-blue"
            }).attr("style", function(e) {
                return t(e.num) > i ? "font-size:1em;text-anchor:end" : "font-size:1em;text-anchor:start"
            }).text(function(t) {
                return n.call(a.price, t.num)
            }), h.append("text").attr("x", this.spaceX - 5).attr("y", this.barHeight / 2).attr("dy", "0.25em").attr("style", "font-size:0.8em;text-anchor:end").attr("class", "brand-face lk-white").text(function(t) {
                return t.date.substr(0, 4)
            })
        }, this.render = function() {
            return void 0 === this.price ? void a.error("Charles Babbage", "With dayBarChart you need to setType before calling render.") : (this.createScales(), void this.plotGraph())
        }
    }
}(jQuery, d3, actuate);