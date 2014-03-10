"undefined" == typeof actuate && (actuate = {}),
function(t, e, r) {
    var i = function() {
        this.perKiloWattHour = .03, this.perLitre = .05, this.electric = function(t) {
            var e = t * this.perKiloWattHour;
            return "£" + e.formatMoney(2)
        }, this.water = function(t) {
            var e = (parseInt(t) * this.perLitre, t * this.perLitre);
            return "£" + e.formatMoney(2)
        }
    };
    r.price = new i, log("actuate.price.perLitre", r.price.perLitre)
}(jQuery, d3, actuate);