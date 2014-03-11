var TempView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.model, "change", this.render)
    },
    render: function() {
        var e = Math.floor(this.model.get("temperature"));
        this.$el.html(e + "&deg;C")
    }
});

var StatusView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.model, "change", this.render)
    },
    render: function() {
        this.$el.html(" " + this.model.get("status") + " "); 
        // this.$el.slabText()
    }
});

/*
    A base view for rendering the control panels.
*/
var ControlView = Backbone.View.extend(
{        
    events: {
        "click .button": "changeStatus",
    },
    initialize: function() {
        this.listenTo(this.model, "change", this.render)
        this.$statusEl = this.$el.find(".status");
        this.$actionEl = this.$el.find(".action");
    },
    render: function()
    {
        var s = this.model.get('status');
        this.$statusEl.text(s);
        this.$actionEl.text(this.actionify(s));
        $('#menu__back').text('Done');
    },
    actionify: function(s)
    {
        return (s == 'on') ? 'off' : 'on';
    },
    changeStatus:function()
    {
        // overright in child views.
    }
});

/*
    A specific view for the Nonessential control panel.
*/
var NonEssentialView = ControlView.extend({        

    changeStatus: function(e)
    {
        e.preventDefault();

        var status = this.model.get('status'); 
        if (status == 'on')
        {
            this.model.set({status:'off'});
        } else {
            this.model.set({status:'on'});                
        }       
        this.model.save();
    },
});

/*
    A specific view for the Water Heating control panel.
*/
var WaterHeatingView = ControlView.extend({        

    changeStatus: function(e)
    {
        e.preventDefault();

        var status = this.model.get('status'); 
        if (status == 'on')
        {
            this.model.set({status:'off'});
        } else {
            this.model.set({status:'on'});                
        }       
        this.model.save();
    },
});

/*
    A specific view for the Target Temperature control panel.
*/
var TargetTempView = ControlView.extend({        
    render: function()
    {
        var s = this.model.get('target');
        this.$statusEl.text(s);
        $('#menu__back').text('Done');
    },
    changeStatus: function(e)
    {
        e.preventDefault();

        var target = parseInt(this.model.get('target')); 

        var s = $(e.currentTarget).attr('href').substr(1);        
        if (s == 'up') target++;
        else target--;

        this.model.set({target:target});
        this.model.save();
    },
});

/*
    A specific view for the Target Temperature control panel.
*/
var HouseAlarmView = ControlView.extend({        
    changeStatus: function(e)
    {
        e.preventDefault();

        var status = this.model.get('status'); 
        if (status == 'armed')
        {
            this.model.set({status:'disarmed'});
        } else {
            this.model.set({status:'armed'});                
        }       
        this.model.save();
    },
    actionify: function(s)
    {
        return (s == 'armed') ? 'disarm' : 'arm';
    },
});