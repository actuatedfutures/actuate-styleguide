/*! Actuate: dayByHoursGraph */
/* jshint laxcomma:true */

// just to be safe.
if (typeof(actuate) == "undefined") actuate = {};

(function( $, d3, actuate ) {
    
    actuate.dayByHoursGraph = function(selector,w,h)
    {
        this.graph = $(selector).svgGraph(w,h);
        this.padding = 2;
        this.width = w - (2*this.padding);
        this.height = h-20;
        this.type = ''; // water or electricity

        this.all_bars = 96; // == 24 hours in 15 min chunks.
        this.bar_width = this.width/this.all_bars;

        this.graph.append("rect")
            .attr("class",'lk-sea')
            .attr("x",this.padding)
            .attr("y",0)
            .attr("width",this.width)
            .attr("height",this.height);

        this.data = [];

        this.setType = function(type)
        {
            this.type = type;
        }

        this.createScales = function()
        {
            // x scale for the data.
            this.scaleX = d3.scale.linear()            
                .domain([0,this.all_bars])
                .range([0,this.width]);
     
            // y scale for the data.
            this.scaleY = d3.scale.linear()
                .domain(d3.extent(this.data,function(d){return d.num;}))
                .range([0,this.height-5]);
        }

        this.addXAxis = function() {

            var xAxis = d3.svg.axis()
                .scale(this.scaleX)
                .orient("bottom")
                .tickSize(-(this.height))
                .ticks(0);

            this.graph.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate("+this.padding+"," + this.height + ")")
                .call(xAxis);

            // MIDNIGHT
            this.graph.append("text")
                .attr("class",'lk-cream')
                .attr("style",'text-anchor:left;font-size:12px')
                .attr("x",this.padding+2)
                .attr("y",this.height+14)
                .text('midnight');

            // MIDNIGHT TICK
            this.graph.append("rect")
                .attr("class",'lk-cream')
                .attr("width",'1')
                .attr("height",'4')
                .attr("x",this.padding)
                .attr("y",this.height)

            var labelX = this.scaleX(this.data.length), tanc = 'start';
            if (labelX >     this.width/2)
            {
                labelX -= 2;
                tanc = 'end';
            } else {
                labelX += 2;
                tanc = 'start';
            }

            this.graph.append("text")
                .attr("class",'lk-cream')
                .attr("style",'text-anchor:'+tanc+';font-size:12px')
                .attr("x",labelX)
                .attr("y",this.height+14)
                .text(this.data[this.data.length-1].time);

            this.graph.append("rect")
                .attr("class",'lk-cream')
                .attr("width",'1')
                .attr("height",'4')
                .attr("x",this.scaleX(this.data.length))
                .attr("y",this.height)
        };

        this.addYTicks = function()
        {
            var yAxis = d3.svg.axis()
                .scale(this.scaleY)
                .orient('left')
                .tickSize(-(this.width))
                .ticks(10);

            this.graph.append('g')
                .attr('class','y axis')
                .attr("transform", "translate("+this.padding+",0)")
                .call(yAxis);

            $('.y.axis').find('.domain').hide();
        };

        this.plotGraph = function()
        {
            var scaleY = this.scaleY;
            var bar_width = this.bar_width;
            var height = this.height;
            var padding = this.padding;

            var c = this.graph.append("g")
                        .attr('class','the_data_bars');

            var bar = c.selectAll('g')
                .data(this.data)
                .enter().append("g")
                .attr("transform", function(d, i) { var dx = padding + (i * bar_width); return "translate("+ dx + ", 0)"; });

            bar.append("rect")
                .attr('class','bar lk-blue')
                .attr("width", function(d) { return bar_width; })
                .attr("height", function(d) { return scaleY(d.num); })
                .attr("y", function(d) { return height - scaleY(d.num); });
        };   

        this.render = function(data)
        {
            this.data = data;

            this.createScales();
            this.addYTicks();
            this.plotGraph();
            this.addXAxis();
        } 
    }

})( jQuery, d3, actuate );

