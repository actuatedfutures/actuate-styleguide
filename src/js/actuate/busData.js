/*! Actuate: busData */
/* jshint laxcomma:true */

// just to be safe.
if (typeof(actuate) == "undefined") actuate = {};

(function( $, actuate ) {

    actuate.busData = function()
    {
        this.mapAPIKey = "AIzaSyBA66fxnd7fJkSLfqWxu2fm-X8VQbcw2RM";
        this.lat = 53.388488;
        this.lon = -1.472875;
        this.zoom = 15;
        if (window.innerWidth < 481) this.zoom = 15;
        this.data = {};

        var _this = this;

        var mapOptions = {
            zoom: this.zoom,
            center: new google.maps.LatLng(this.lat,this.lon),
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            scrollwheel: false,
            scaleControl: false
            };
        this.map = new google.maps.Map(document.getElementById('map-container'),mapOptions);

        this.init = function()
        {
            this.box = $('.busstop_data');    
        }
        
        this.loading = function(type)
        {
            this.box.empty();
            if (type) this.box.append($('<p class="loading">Loading...</p>'));
        };

        this.showBusStopList = function()
        {
            if ($.isEmptyObject(_this.data)) 
            {
                $.get('/api/transport/busstops', {}, function(data, textStatus, jqXHR)
                {
                    _this.data = data;
                    _this.renderBusStopList(data);
                },'json');                
            } else {
                _this.renderBusStopList(_this.data);
            }
        };

        this.showBusStopsOnMap = function()
        {
            $.get('/api/transport/busstops', {}, function(data, textStatus, jqXHR)
            {
                for (var i=0; i < data.stops.length; i++) 
                {
                    var d = data.stops[i];                
                    _this.addMarker(d);
                };
            },'json');                
        }

        this.renderBusStopList = function(data)
        {   
            // log('data',data);     
            this.box.empty();
            var p = $('<p class="m--half">The closest bus stops to Little Kelham</p>');
            var u = $('<ul class="block-list link-group"></ul>');
            for (var i=0; i < 7; i++) 
            {
                var d = data.stops[i];                
                var e = $('<li><a class="stop block-list__link" href="#'+d.atcocode+'|'+d.name+'">'+d.name+' ('+d.bearing+') - '+d.atcocode.substr(3)+'</a></li>');
                u.append(e);
            };  
            this.box.append(p);
            this.box.append(u);

            $(".stop").on('click',function(e)
            {
                e.preventDefault();
                var code = $(this).attr('href').substr(1);
                _this.showBusStops(code);
            });                      
        }

        this.addMarker = function(d)
        {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(d.latitude, d.longitude),
                map: this.map,
                animation: google.maps.Animation.DROP,
                title: d.name
            });

            var infowindow = new google.maps.InfoWindow({
                content: d.name
            });

            google.maps.event.addListener(marker, 'click', function() { 
                infowindow.open(this.map,marker);
            });
        }        

        this.showBusStops = function(data)
        {
            var a = data.split('|');
            var atcocode = a[0];
            var name = a[1];

            this.loading(true);
            $.get('/api/transport/busstop/'+atcocode, {}, this.renderBusStops, 'json');
        }

        this.renderBusStops = function(data, textStatus, jqXHR)
        {
            _this.loading(false);
            var h = $('<p class="m--half">Next buses to leave '+name+'</p>');
            var u = $('<ul class="block-list"></ul>');
            var b = $('<a href="#" class="button more_detail">Back<span class="icon-arrow-left left"></span></a>');
            var buses = [];
            // put the data into a more sortable array.
            for(var k in data.departures)
            {
                var d = data.departures[k][1];
                var o = {
                    time: d.best_departure_estimate,
                    line: d.line,
                    direction: d.direction,
                    operator: d.operator
                }
                buses.push(o);
            }
            // sort by time.
            buses.sort(function(a,b)
            {
                c = a.time.split(':'); d = b.time.split(':');
                e = parseInt(c[1]) + c[0]*60; f = parseInt(d[1]) + d[0]*60;
                return e - f;
            });
            // output the data.
            for (var i = 0; i < buses.length; i++) {
                var d = buses[i];
                var e = $('<li>'+d.time+' &mdash; '+d.line+' to '+d.direction+' ('+d.operator+')</li>');
                u.append(e);
            };
            _this.box.append(h);
            _this.box.append(u);
            _this.box.append(b);

            $(b).on('click',function(e)
            {
                e.preventDefault();
                _this.renderBusStopList(_this.data);
            });
        }
    }
})( jQuery, actuate );