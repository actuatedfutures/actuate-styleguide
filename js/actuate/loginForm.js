!function(s){s.fn.loginForm=function(){var i=s(this),l=i.find(".login__submit"),n=i.find("#username"),o=i.find("#password"),e=i.find(".form-fields input");l.on("click",function(i){i.preventDefault();var l=s(this).closest("form").serialize();s.post("/api/user/login",l,function(s){"success"==s?window.location.href="/":alert("login problem!")})}),e.on("keyup",function(){var s=n.val(),i=o.val(),e=0;""!=s?(e+=.5,n.siblings(".label").addClass("show")):n.siblings(".label").removeClass("show"),""!=i?(e+=.5,o.siblings(".label").addClass("show")):o.siblings(".label").removeClass("show"),1==e?l.addClass("show"):l.removeClass("show")})}}(jQuery);