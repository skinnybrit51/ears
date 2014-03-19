ears
=============

#### Description

Listen to and fire events.

#### Examples

````
var Ears = require('ears');

var ear = new Ears();

var callback = function() {
    console.log('Event Fired!');
};

ear.on('foo', callback);

ear.trigger('foo');                 // Event Fired!

ear.off('foo');

ear.trigger('foo');                 // nothing happens

ear.one('foo', callback);           // event will only fire once

ear.trigger('foo');                 // Event Fired!
ear.trigger('foo');                 // nothing happens

ear.on('foo', callback);
ear.on('bar', callback);

ear.trigger('foo bar');             // Event Fired!
                                    // Event Fired!

````
