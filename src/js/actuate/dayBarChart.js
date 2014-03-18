/*! Actuate: dayBarChart */
/* jshint laxcomma:true */

// just to be safe.
if (typeof(actuate) == "undefined") actuate = {};

(function( $, d3, actuate ) {

    actuate.dayBarChart = function(selector,w,h,data)
    {
        this.graph = $(selector).svgGraph(w,h);
        this.width = w;
        this.height = h;
        this.data = data;
        this.max = 0;
        this.spaceX = 40;
        this.space = 4;
        this.barHeight = this.height/data.length; 
        this.type = ''; // water or electricity 

        // this.graph.append("rect")
        //     .attr("class",'graph--background')
        //     .attr("x",this.padding)
        //     .attr("y",0)
        //     .attr("width",this.width)
        //     .attr("height",this.height);

        this.createScales = function()
        {
             // x scale for the data.
            this.scaleX = d3.scale.linear()            
                // .domain(d3.extent(this.data,function(d){return d.num;}))
                .domain([0,d3.max(this.data,function(d){return d.num;})])
                .range([0,this.width-this.spaceX]);
        }    

        this.setType = function(type)
        {
            this.type = type;
            if (type == 'water') this.price = actuate.price.water;
            else this.price = actuate.price.electric;
        }

        this.plotGraph = function()
        {
            var scaleX = this.scaleX;
            var spaceX = this.spaceX;
            var barHeight = this.barHeight;
            var mid = this.width/2;       
            var price = this.price;
            var ttype = this.type;    

            var bar = this.graph.selectAll("g")
                .data(this.data)
                .enter().append("a")
                .attr('xlink:href', function(d) 
                    { 
                        var t = d.date.split(' ');
                        var s = new Date(parseInt(t[0])+' '+t[1]+' '+t[2]);
                        return '/'+ttype+'/day/'+s.getDate()+'-'+(s.getMonth()+1)+'-'+s.getFullYear()+'/'; 
                    })
                .attr("transform", function(d, i) { return "translate(0," + (1 + (i * barHeight)) + ")"; });

            // the background bars
            bar.append("rect")
                .attr("x",this.spaceX)
                .attr("width", this.width-this.spaceX)
                .attr("height", this.barHeight - 2)
                .attr("class", function(d,i)
                {
                    if (i%7 == 0 || i%7 == 1) return "bar--background weekend";
                    else return "bar--background weekday";
                });

            // actual bar graph bars
            bar.append("rect")
                .attr("x",this.spaceX)
                .attr("class","lk-turq")
                .attr("width", function(d)
                    {
                        // console.log(d.num);        
                        return scaleX(d.num);
                    })
                .attr("height", this.barHeight - (2 + (2 * this.space)))
                .attr("y", this.space);

            // usage amount
            bar.append("text")
                .attr("x", function(d) { 
                    var x = scaleX(d.num); 
                    if (x > mid) return spaceX + x - 10;
                    else return spaceX + x + 10;
                })
                .attr("y", this.barHeight / 2)
                .attr("dy", "0.25em")
                .attr("class",function(d) {
                    if (scaleX(d.num) > mid)
                    {
                        return "lk-white";
                    } else {
                        return "lk-blue";
                    }
                })
                .attr("style",function(d) {
                    if (scaleX(d.num) > mid)
                    {
                        return "font-size:1em;text-anchor:end";
                    } else {
                        return "font-size:1em;text-anchor:start";
                    }
                })
                .text(function(d) { return price.call(actuate.price, d.num); });

            // day text
            bar.append("text")
                .attr("x",this.spaceX-5)
                .attr("y", this.barHeight / 2)
                .attr("dy", "0.25em")
                .attr("style","font-size:0.8em;text-anchor:end")
                .attr("class","brand-face lk-blue")
                .text(function(d,i) { 
                    return d.date.substr(0,4);
                }); 
        }

        this.render = function()
        {
            if (this.price === undefined) 
            {
                actuate.error('Charles Babbage','With dayBarChart you need to setType before calling render.');
                return;
            }
            this.createScales();
            this.plotGraph();
        }

    }

})( jQuery, d3, actuate );