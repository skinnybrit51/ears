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

        var results = this.subscriber.trigger('foo bar foobar');

        expect(callback.callCount).to.equal(3);
        expect(results).to.have.length(3);
    });

    it('Should have "this" to be set to null', function (done) {
        this.subscriber.on('foo', function () {
            expect(this.listeners).to.be.undefined;
            done();
        });
        this.subscriber.trigger('foo');
    });

    it('Should only fire event once', function () {
        var callback = this.sandbox.spy();

        this.subscriber.one('foo', callback);

        this.subscriber.trigger('foo');
        this.subscriber.trigger('foo');

        expect(callback.callCount).to.equal(1);
    });

    it('Should return a value from a callback', function () {

        this.subscriber.on('foo', function (value) {
            return value;
        });

        var value = this.subscriber.trigger('foo', 'bar');

        expect(value).to.equal('bar');

    });

    it('Should be able to handle multiple arguments', function (done) {
        this.subscriber.on('foo', function (arg1, arg2, arg3) {
            expect(arg1).to.equal('arg1');
            expect(arg2).to.equal('arg2');
            expect(arg3).to.equal('arg3');
            done();
        });

        this.subscriber.trigger('foo', 'arg1', 'arg2', 'arg3');
    });

    it('Add a namespace to event names', function (done) {
        var namespace = 'namespace';
        var subscriber = new Subscriber(namespace);
        subscriber.on(namespace + '.foo', function () {
            done();
        });
        subscriber.trigger('foo');
    });
});