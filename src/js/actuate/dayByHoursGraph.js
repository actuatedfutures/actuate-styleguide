"undefined"==typeof actuate&&(actuate={}),function(t,a,i){i.dayByHoursGraph=function(i,s,h){this.graph=t(i).svgGraph(s,h),this.padding=2,this.width=s-2*this.padding,this.height=h-20,this.type="",this.all_bars=96,this.bar_width=this.width/this.all_bars,this.graph.append("rect").attr("class","lk-sea").attr("x",this.padding).attr("y",0).attr("width",this.width).attr("height",this.height),this.data=[],this.setType=function(t){this.type=t},this.createScales=function(){this.scaleX=a.scale.linear().domain([0,this.all_bars]).range([0,this.width]),this.scaleY=a.scale.linear().domain(a.extent(this.data,function(t){return t.num})).range([0,this.height-5])},this.addXAxis=function(){var t=a.svg.axis().scale(this.scaleX).orient("bottom").tickSize(-this.height).ticks(0);this.graph.append("g").attr("class","x axis").attr("transform","translate("+this.padding+","+this.height+")").call(t),this.graph.append("text").attr("class","lk-cream").attr("style","text-anchor:left;font-size:12px").attr("x",this.padding+2).attr("y",this.height+14).text("midnight"),this.graph.append("rect").attr("class","lk-cream").attr("width","1").attr("height","4").attr("x",this.padding).attr("y",this.height);var i=this.scaleX(this.data.length),s="start";i>this.width/2?(i-=2,s="end"):(i+=2,s="start"),this.graph.append("text").attr("class","lk-cream").attr("style","text-anchor:"+s+";font-size:12px").attr("x",i).attr("y",this.height+14).text(this.data[this.data.length-1].time),this.graph.append("rect").attr("class","lk-cream").attr("width","1").attr("height","4").attr("x",this.scaleX(this.data.length)).attr("y",this.height)},this.addYTicks=function(){var i=a.svg.axis().scale(this.scaleY).orient("left").tickSize(-this.width).ticks(10);this.graph.append("g").attr("class","y axis").attr("transform","translate("+this.padding+",0)").call(i),t(".y.axis").find(".domain").hide()},this.plotGraph=function(){var t=this.scaleY,a=this.bar_width,i=this.height,s=this.padding,h=this.graph.append("g").attr("class","the_data_bars"),e=h.selectAll("g").data(this.data).enter().append("g").attr("transform",function(t,i){var h=s+i*a;return"translate("+h+", 0)"});e.append("rect").attr("class","bar lk-blue").attr("width",function(){return a}).attr("height",function(a){return t(a.num)}).attr("y",function(a){return i-t(a.num)})},this.render=function(t){this.data=t,this.createScales(),this.addYTicks(),this.plotGraph(),this.addXAxis()}}}(jQuery,d3,actuate);