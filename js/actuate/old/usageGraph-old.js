!function(i){i.fn.usageGraph=function(){var n=i(this),e=n.find(".bar"),t=n.find(".carousel__slider"),a=n.find(".car__btn--left"),f=n.find(".car__btn--right");e.each(function(n){var e=n,t=5*n;size=10;var a=200*PerlinNoise.noise(size*e,size*t,1.49);i(this).css({"margin-top":a,height:200-a})}),a.on("click",function(i){i.preventDefault();var n=t.position().left;t.animate({left:n-100})}),f.on("click",function(i){i.preventDefault(),t.animate({left:0})})}}(jQuery);