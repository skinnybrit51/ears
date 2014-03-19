var _ = require('underscore');

var subscriber = function () {
    this.listeners = {};
};

_.extend(subscriber.prototype, {

    on: function (name, callback) {

        if (_.has(this.listeners, name)) {
            var callbacks = this.listeners[name];
            callbacks.push(callback);
        } else {
            this.listeners[name] = [callback];
        }
    },

    off: function (name) {

        delete this.listeners[name];
    },

    trigger: function (names, args) {

        _.each(names.split(' '), function (name) {
            if (_.has(this.listeners, name)) {
                _.each(this.listeners[name], function (callback) {
                    callback.call(null, args);
                }, this);
            }
        }, this);
    }

});

module.exports = subscriber;