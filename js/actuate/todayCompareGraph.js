"undefined"==typeof actuate&&(actuate={}),function(t,a,r){r.dayCompareGraph=function(r,i,e){this.graph=t(r).svgGraph(i,e),this.width=i,this.height=e,this.type="",this.graph.append("rect").attr("class","lk-white").attr("opacity","0.2").attr("x",0).attr("y",0).attr("width",this.width).attr("height",this.height),this.setType=function(t){this.type=t,this.suffix="water"==t?"L":"kWh"},this.createScales=function(t){this.scaleX=a.scale.linear().range([0,this.width]),this.scaleY=a.scale.linear().domain([0,a.max(t,function(t){return t.num})]).range([0,this.height-20])},this.addXAxis=function(){var t=a.svg.axis().scale(this.scaleX).orient("bottom").tickSize(-this.height).ticks(0);this.graph.append("g").attr("class","x axis").attr("transform","translate(0,"+this.height+")").call(t)},this.addYTicks=function(){var r=a.svg.axis().scale(this.scaleY).orient("left").tickSize(-this.width).ticks(10);this.graph.append("g").attr("class","y axis").call(r),t(".y.axis").find(".domain").hide()},this.plotGraph=function(t){var a=this.scaleY,r=this.height,i=this.width/24,e=6*i,n=2*i,s=30,h=1,c=this.graph.append("g").attr("class","the_data_bars"),u=c.selectAll("g").data(t).enter().append("g").attr("transform",function(t,a){var r=n/2+a*(e+n);return"translate("+r+", 0)"});u.append("rect").attr("class",function(){return"bar lk-blue"}).attr("opacity",h).attr("width",function(){return e}).attr("height",function(t){return Math.round(a(t.num-s))}).attr("y",function(t){var i=r-Math.round(a(t.num-s));return i}),u.append("g").attr("transform",function(t){var i=r-Math.round(a(t.num))+1;return"translate(0,"+i+")"}).append("rect").attr("class",function(){return"bar"}).attr("opacity",h).attr("width",function(){return e}).attr("height",function(){return Math.round(a(s))}).attr("fill",function(){return"url(#waves)"}),u.append("path").attr("stroke","white").attr("fill","transparent").attr("d",function(t){var i=a(t.num),n=r-i;return"M0,"+n+" l0,"+i+" l"+e+",0 l0,-"+i}),u.append("text").attr("class","lk-mustard third-face").attr("style","text-anchor:middle;font-size:16px").attr("x",e/2).attr("y",r-10).text(function(t){return t.label});var l=this.suffix;u.append("text").attr("class","lk-white brand-face").attr("style","text-anchor:middle;font-size:16px").attr("x",e/2).attr("y",r-30).text(function(t){return t.num/100+""+l})},this.render=function(t){this.createScales(t),this.addYTicks(),this.plotGraph(t)}}}(jQuery,d3,actuate);