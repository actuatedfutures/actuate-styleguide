"undefined" == typeof actuate && (actuate = {}),
function(t, o) {
    o.busData = function() {
        this.mapAPIKey = "AIzaSyBA66fxnd7fJkSLfqWxu2fm-X8VQbcw2RM", this.lat = 53.388488, this.lon = -1.472875, this.zoom = 15, window.innerWidth < 481 && (this.zoom = 15), this.data = {};
        var o = this,
            s = {
                zoom: this.zoom,
                center: new google.maps.LatLng(this.lat, this.lon),
                mapTypeControl: !1,
                streetViewControl: !1,
                zoomControl: !1,
                scrollwheel: !1,
                scaleControl: !1
            };
        this.map = new google.maps.Map(document.getElementById("map-container"), s), this.init = function() {
            this.box = t(".busstop_data")
        }, this.loading = function(o) {
            this.box.empty(), o && this.box.append(t('<p class="loading">Loading...</p>'))
        }, this.showBusStopList = function() {
            t.isEmptyObject(o.data) ? t.get("/api/transport/busstops", {}, function(t) {
                o.data = t, o.renderBusStopList(t)
            }, "json") : o.renderBusStopList(o.data)
        }, this.showBusStopsOnMap = function() {
            t.get("/api/transport/busstops", {}, function(t) {
                for (var s = 0; s < t.stops.length; s++) {
                    var e = t.stops[s];
                    o.addMarker(e)
                }
            }, "json")
        }, this.renderBusStopList = function(s) {
            this.box.empty();
            for (var e = t('<p class="m--half">The closest bus stops to Little Kelham</p>'), a = t('<ul class="block-list link-group"></ul>'), n = 0; 7 > n; n++) {
                var i = s.stops[n],
                    p = t('<li><a class="stop block-list__link" href="#' + i.atcocode + "|" + i.name + '">' + i.name + " (" + i.bearing + ") - " + i.atcocode.substr(3) + "</a></li>");
                a.append(p)
            }
            this.box.append(e), this.box.append(a), t(".stop").on("click", function(s) {
                s.preventDefault();
                var e = t(this).attr("href").substr(1);
                o.showBusStops(e)
            })
        }, this.addMarker = function(t) {
            var o = new google.maps.Marker({
                position: new google.maps.LatLng(t.latitude, t.longitude),
                map: this.map,
                animation: google.maps.Animation.DROP,
                title: t.name
            }),
                s = new google.maps.InfoWindow({
                    content: t.name
                });
            google.maps.event.addListener(o, "click", function() {
                s.open(this.map, o)
            })
        }, this.showBusStops = function(o) {
            var s = o.split("|"),
                e = s[0];
            s[1], this.loading(!0), t.get("/api/transport/busstop/" + e, {}, this.renderBusStops, "json")
        }, this.renderBusStops = function(s) {
            o.loading(!1);
            var e = t('<p class="m--half">Next buses to leave ' + name + "</p>"),
                a = t('<ul class="block-list"></ul>'),
                n = t('<a href="#" class="button more_detail">Back<span class="icon-arrow-left left"></span></a>'),
                i = [];
            for (var p in s.departures) {
                var r = s.departures[p][1],
                    l = {
                        time: r.best_departure_estimate,
                        line: r.line,
                        direction: r.direction,
                        operator: r.operator
                    };
                i.push(l)
            }
            i.sort(function(t, o) {
                return c = t.time.split(":"), r = o.time.split(":"), d = parseInt(c[1]) + 60 * c[0], f = parseInt(r[1]) + 60 * r[0], d - f
            });
            for (var u = 0; u < i.length; u++) {
                var r = i[u],
                    d = t("<li>" + r.time + " &mdash; " + r.line + " to " + r.direction + " (" + r.operator + ")</li>");
                a.append(d)
            }
            o.box.append(e), o.box.append(a), o.box.append(n), t(n).on("click", function(t) {
                t.preventDefault(), o.renderBusStopList(o.data)
            })
        }
    }
}(jQuery, actuate);