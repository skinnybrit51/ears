var _ = require('underscore');

var subscriber = function (namespace) {
    this.namespace = namespace || '';
    this.listeners = {};
    this.oneListenerNames = {};
};

_.extend(subscriber.prototype, {

    _getEventName: function (name) {
        if (this.namespace.length) {
            return this.namespace + '.' + name;
        }
        return name;
    },

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

        delete this.listeners[this._getEventName(name)];
    },

    trigger: function () {
        var args = Array.prototype.slice.call(arguments);
        var names = args[0],
            params = _.rest(args, 1);

        var results = [];
        _.each(names.split(' '), function (name) {
            var eventName = this._getEventName(name);
            if (_.has(this.listeners, eventName)) {
                _.each(this.listeners[eventName], function (callback) {
                    results.push(callback.apply(null, params));

                    if (_.has(this.oneListenerNames, eventName)) {
                        delete this.oneListenerNames[eventName];
                        this.off(eventName);
                    }
                }, this);
            }
        }, this);

        if (results.length === 1) {
            // just return the one value
            return results[0];
        }
        return results.length ? results : null;
    }

});

module.exports = subscriber;