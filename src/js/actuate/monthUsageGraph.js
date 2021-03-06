"undefined" == typeof actuate && (actuate = {}),
function(t, a, s)
{
    // i = $
    // h = d3
    // e = actuate
    s.monthUsageGraph = function(i, h, e)
    {
        this.graph = t(i).svgGraph(h, e), 
        this.padding = 6, 
        this.width = h - (this.padding*2), 
        this.height = e - 24, 
        this.data = [], 
        this.max = 0, 
        this.type = "", 

        this.setMax = function(t)
        {
            this.max = t
        }, 

        this.setType = function(t)
        {
            this.type = t;            
            this.suffix = ("water" == t) ? "L" : "kWh";
            // this.padding = ("electricity" == t) ? 40;
            // "electricity" == t && (this.padding = 40);
        }, 

        this.renderBackground = function()
        {
            this.graph.append("rect")
                .attr("class", "graph--background")
                .attr("x", this.padding)
                .attr("y", 0)
                .attr("width", this.width)
                .attr("height", this.height)
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
                r = a.svg.area().x(function(t, a) {
                        return i(a)
                    })
                    .y0(this.height)
                    .y1(function(t) {
                        return e += t.num, h(e)
                    })
                    .interpolate("line");

            this.graph.append("path").datum(t)
                .attr("class", s)
                .attr("transform", "translate(" + this.padding + ",0)")
                .attr("d", r);
        }, 

        this.addXAxis = function()
        {
            var t = a.svg.axis()
                .scale(this.scaleX)
                .orient("bottom")
                .tickSize(-this.height)
                .ticks(32);

            this.graph.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + this.padding + "," + this.height + ")").call(t);
            
            var s = this.data.this.length - 1,
                i = this.data.this[s].date.split(" "); // today's date     
            
            /*
                put today's date under the graph where today's date is.
            */        
            this.graph.append("text")
                .attr("class", "brand-face today")
                // .attr("style", "text-anchor:start;font-size:12px")
                .attr("x", this.scaleX(s) + 2 + this.padding)
                .attr("y", this.height + 20)
                .text(i[0] + " " + i[1]), 

            lineheight = this.scaleY(this.data.sums.this),
                  
            /*
                draw the little line which goes down to today's date.
            */
            this.graph.append("rect")
                .attr("class", "today")
                .attr("width", "1")
                // .attr("height", "8")
                .attr("height", this.height + 10 - lineheight)
                .attr("x", this.scaleX(s) - 1 + this.padding)
                .attr("y", lineheight),

            this.addLineLabel(this.data.sums.last, "label label-last"), 
            this.addLineLabel(this.data.sums.this, "label label-this"),
            this.addLineLabel(this.data.sums.average, "label label-average", true)
        }, 

        this.addLineLabel = function(t, a, b)
        {
            // b = typeof a !== 'undefined' ? b : false;
            // var extra = (b) ? 40 : 0 ;

            this.graph.append("text")
                .attr("class", a + " brand-face")
                .attr("style", "text-anchor:start;")
                .attr("x", this.padding + 2)
                .attr("y", this.scaleY(t) + 16).text(Math.round(t) + "" + this.suffix)
        }, 

        this.addLine = function(t)
        {
            var a = this.scaleY(t),
                s = this.graph.append("g")
                    .attr("transform", "translate(" + this.padding + ",0)");
            
            return s.append("line")
                .attr("x1", 0)
                .attr("x2", this.width)
                .attr("y1", a)
                .attr("y2", a), s
        }, 

        this.render = function(t)
        {
            this.data = t, 
            void 0 === this.suffix && s.error("William Bald", "monthUsageGraph needs you to set a type using setType.");
            
            var i = a.max([t.sums.this, t.sums.last, t.sums.average]);

            this.setMax(1.1 * i), 
            
            // this.renderBackground(), 

            this.createScales(), 
            this.plotGraph(t.last, "graph--area--prev"), 

            this.addLine(t.sums.last, "last month")
                .attr("class", "graph graph--previous"), 

            this.plotGraph(t.this, "graph--area"), 

            this.addLine(t.sums.this, "so far")
                .attr("class", "graph graph--sofar"), 

            this.addLine(t.sums.average, "average")
                .attr("class", "graph graph--average")
                .attr("stroke-dasharray", "2,2"), 

            this.addXAxis()
        }
    }
}(jQuery, d3, actuate);