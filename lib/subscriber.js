var _ = require('underscore');

var subscriber = function () {
    this.listeners = {};
    this.oneListenerNames = {};
};

_.extend(subscriber.prototype, {

    one: function (name, callback) {

        this.on(name, callback);
        this.oneListenerNames[name] = null;
    },

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

                    if (_.has(this.oneListenerNames, name)) {
                        delete this.oneListenerNames[name];
                        this.off(name);
                    }

                }, this);
            }
        }, this);
    }

});

module.exports = subscriber;