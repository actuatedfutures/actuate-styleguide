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