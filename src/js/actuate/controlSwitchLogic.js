/*! Actuate: controlSwitchLogic */
/* jshint laxcomma:true */

// just to be safe.
if (typeof(actuate) == "undefined") actuate = {};

(function( $, actuate ) {
    
    actuate.controlSwitchLogic = function(type,callback)
    {
        this.api      = '/api/control/'+type;
        this.control  = $('.module--control .control a');
        this.cover    = $('.module--control .cover');
        this.stext    = $('.module--control .status');
        this.callback = callback;
        var _this = this;

        $.getJSON(this.api,function(data,status,x)
        {        
            if (data.status == 'on')
            {
                _this.stext.text('ON');
                _this.cover.addClass('on');
            } else {
                _this.cover.removeClass('on');
                _this.stext.text('OFF');
            }
            _this.callback(data);
        });

        this.control.on('click',function(e)
        {
            e.preventDefault();
            _this.cover.toggleClass('on');
            
            var postdata;
            
            if (_this.cover.hasClass('on')) 
            {
                _this.stext.text('ON');
                postdata = {status:'on'};
            } else {
                postdata = {status:'off'};
                _this.stext.text('OFF');
            }

            $.post(_this.api, postdata, function(data, status, xhr)
            {
                _this.callback(postdata);
            });
        });  
    }

})( jQuery, actuate );
