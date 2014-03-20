ears
=============

#### Description

Listen to and fire events.

#### Examples

````
var Ears = require('elephant-ears');

var ears = new Ears();

var callback = function() {
    console.log('Event Fired!');
};

ears.on('foo', callback);

ears.trigger('foo');                    // Event Fired!

ears.off('foo');

ears.trigger('foo');                    // nothing happens

ears.one('foo', callback);              // event will only fire once

ears.trigger('foo');                    // Event Fired!
ears.trigger('foo');                    // nothing happens

ears.on('foo', callback);
ears.on('bar', callback);

ears.trigger('foo bar');                // Event Fired!
                                        // Event Fired!

````
