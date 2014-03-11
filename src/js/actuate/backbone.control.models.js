// if actuate doesn't exist initialise it 
// (not sure right now which of these is going to happen first)
"undefined" == typeof actuate && (actuate = {}),

// the meat
(function(actuate)
{
	var Nonessential = new Backbone.Model;
	Nonessential.urlRoot = '/api/control/nonessential';

	var WaterHeater = new Backbone.Model;
	WaterHeater.urlRoot = '/api/control/waterheating';

	var TargetTemperature = new Backbone.Model;
	TargetTemperature.urlRoot = '/api/control/targettemp';
	
	var HouseAlarm = new Backbone.Model;
	HouseAlarm.urlRoot = '/api/control/housealarm/';

    var ControlAll = new Backbone.Model;
    ControlAll.urlRoot = '/api/control/all/';
    ControlAll.fetch({success:function(model, response, options)
    { 
        Nonessential.set(response.nonessential)
        WaterHeater.set(response.waterheating)
        TargetTemperature.set(response.targettemp)
        HouseAlarm.set(response.housealarm)	
    }}); 

    actuate.controls = {
    	nonessential: Nonessential,
    	waterheating: WaterHeater,
    	targettemp: TargetTemperature,
    	housealarm: HouseAlarm
    }

})(actuate);