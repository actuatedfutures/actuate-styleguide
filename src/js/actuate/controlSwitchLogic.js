"undefined" == typeof actuate && (actuate = {}),
function($, o)
{
    o.controlSwitchLogic = function(o, c)
    {
        this.api = "/api/control/" + o, 
        this.control = $(".module--control .control a"), 
        this.cover = $(".module--control .cover"), 
        this.stext = $(".module--control .status"), 
        this.callback = c;
        
        var e = this;

        $.getJSON(this.api, function(t)
        {
            "on" == t.status ? (e.stext.text("ON"), e.cover.addClass("on")) : (e.cover.removeClass("on"), e.stext.text("OFF")), e.callback(t)
        }), 

        this.control.on("click", function(o)
        {
            o.preventDefault(), 
            e.cover.toggleClass("on");
            
            var c;
            
            if (e.cover.hasClass("on"))
            {
                
                e.stext.text("ON"); 
                c = {status: "on"};
            }

            e.cover.hasClass("on") ? (e.stext.text("ON"), c = {
                status: "on"
            }) : (c = {
                status: "off"
            }, e.stext.text("OFF")), t.post(e.api, c, function()
            {
                e.callback(c)
            })
        })
    }
}(jQuery, actuate);