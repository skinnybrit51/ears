### elephant-ears

[![NPM version](https://badge.fury.io/js/elephant-ears.svg)](http://badge.fury.io/js/elephant-ears)

#### Description

Listen to and fire synchronous events.

#### Installation

````npm install elephant-ears````

#### Examples

````
var Ears = require('elephant-ears');

var ears = new Ears();

var callback = function(arg1, arg2) {
    if (arg1 != null) {
        console.log(arg1);
    }

    if (arg2 != null) {
        console.log(arg2);
    }

    console.log('Event Fired!');
    return ha;
};

ears.on('foo', callback);

var value = ears.trigger('foo');        // Event Fired!
console.log(value);                     // ha

ears.off('foo');

ears.trigger('foo');                    // nothing happens

ears.one('foo', callback);              // event will only fire once

ears.trigger('foo');                    // Event Fired!
ears.trigger('foo');                    // nothing happens

ears.on('foo', callback);
ears.on('bar', callback);

var values = ears.trigger('foo bar');   // Event Fired!
                                        // Event Fired!
console.log(values[0] + value[1]);      // haha

ears.trigger('foo', 'arg1', 'arg2');    // arg1
                                        // arg2
                                        // Event Fired!
                                        
// add a namespace
ears = new Ears('myNameSpace');
ears.on('myNameSpace.change', function() {
    console.log('namespace event fired');
});
ears.trigger('change');                 // namespace event fired

````
