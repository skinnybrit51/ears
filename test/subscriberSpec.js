var expect = require('chai').expect,
    _ = require('underscore'),
    Subscriber = require('subscriber'),
    sinon = require('sinon');

describe('Subscriber', function () {
    beforeEach(function () {
        this.subscriber = new Subscriber();
        this.sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        delete this.subscriber;
        this.sandbox.restore();
    });

    it('Should be able to listen for an event', function (done) {
        this.subscriber.on('foo', function (args) {
            expect(_.isObject(args)).to.be.true;
            expect(args.bar).to.equal('bar');
            done();
        });

        this.subscriber.trigger('foo', {bar: 'bar'});
    });

    it('Should not be listening to an event when off', function () {
        var callback = this.sandbox.spy();

        this.subscriber.on('foo', callback);

        this.subscriber.trigger('foo');

        expect(callback.callCount).to.equal(1);

        this.subscriber.trigger('foo');

        expect(callback.callCount).to.equal(2);

        this.subscriber.off('foo');

        this.subscriber.trigger('foo');

        expect(callback.callCount).to.equal(2);
    });

    it('Should call multiple listeners', function () {
        var callback1 = this.sandbox.spy();
        var callback2 = this.sandbox.spy();

        this.subscriber.on('foo', callback1);
        this.subscriber.on('foo', callback2);

        this.subscriber.trigger('foo');

        expect(callback1.calledOnce).to.be.true;
        expect(callback2.calledOnce).to.be.true;
    });

    it('Should be able to listen to multiple namespaces with a single callback', function () {

        var callback = this.sandbox.spy();

        this.subscriber.on('foo', callback);
        this.subscriber.on('bar', callback);
        this.subscriber.on('foobar', callback);

        this.subscriber.trigger('foo bar foobar');

        expect(callback.callCount).to.equal(3);
    });

    it('Should have "this" to be set to null', function (done) {
        this.subscriber.on('foo', function (args) {
            expect(this.listeners).to.be.undefined;
            done();
        });
        this.subscriber.trigger('foo');
    });

});