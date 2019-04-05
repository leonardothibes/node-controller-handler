'use strict';

const Controller = require('../../lib/controller'),
      assert     = require('unit.js');

describe('Controller', function()
{
    it('Message 01 is VALID', function(done)
    {
        const message = {command: 'command', action: 'action'};

        const controller = new Controller(),
              validation = controller.validate(message),
              isValid    = controller.isValid(message);

        assert.object(validation);
        assert.bool((validation.command && validation.action && validation.params)).isTrue();
        assert.bool(isValid).isTrue();

        done();
    });

    it('Message 02 is VALID', function(done)
    {
        const message = {command: 'command', action: 'action', params: {}};

        const controller = new Controller(),
              validation = controller.validate(message),
              isValid    = controller.isValid(message);

        assert.object(validation);
        assert.bool((validation.command && validation.action && validation.params)).isTrue();
        assert.bool(isValid).isTrue();

        done();
    });

    [
        true,
        false,
        1,
        0,
        'a',
        '1',
        '',
        {},
        {command: ''},
        {command: '', action: ''},
        {command: 'command', action: ''},
        {command: 'command', action: 'action', params: ''},
    ].forEach(function(message, i)
    {
        var number = i+3;
        it(`Message ${number < 10 ? '0' + number : number} is INVALID`, function(done)
        {
            const controller = new Controller(),
                  validation = controller.validate(message),
                  isValid    = controller.isValid(message);

            assert.object(validation);
            assert.bool((validation.command && validation.action && validation.params)).isFalse();
            assert.bool(isValid).isFalse();

            done();
        });
    });

    it ('Invocation success', function(done)
    {
        const name     = 'John Doe';
        const message = {
            command: 'hello',
            action : 'world',
            params : {name: name},
        };

        const controller = new Controller(__dirname + '../../commands');
        controller.handle(message, function(error, data)
        {
            assert.bool(!error).isTrue();
            assert.string(data).isEqualTo(`Hello ${name}!`);
        });

        done();
    });

    it ('Invocation error 1: command missing', function(done)
    {
        const message = {
            action : 'world',
            params : {name: 'john'},
        };

        const controller = new Controller(__dirname + '../../commands');
        controller.handle(message, function(error)
        {
            assert.object(error);
            assert.string(error.code).isEqualTo('ERROR');
            assert.string(error.message).isEqualTo('Command is missing');
        });

        done();
    });

    it ('Invocation error 2: command not found', function(done)
    {
        const message = {
            command: 'invalid',
            action : 'world',
            params : {name: 'john'},
        };

        const controller = new Controller(__dirname + '../../commands');
        controller.handle(message, function(error)
        {
            assert.object(error);
            assert.string(error.code).isEqualTo('ERROR');
            assert.string(error.message).isEqualTo('Command not found');
        });

        done();
    });

    it ('Invocation error 3: action missing', function(done)
    {
        const message = {
            command: 'hello',
            params : {name: 'john'},
        };

        const controller = new Controller(__dirname + '../../commands');
        controller.handle(message, function(error)
        {
            assert.object(error);
            assert.string(error.code).isEqualTo('ERROR');
            assert.string(error.message).isEqualTo('Action is missing');
        });

        done();
    });

    it ('Invocation error 4: action not found', function(done)
    {
        const message = {
            command: 'hello',
            action : 'invalid',
            params : {name: 'john'},
        };

        const controller = new Controller(__dirname + '../../commands');
        controller.handle(message, function(error)
        {
            assert.object(error);
            assert.string(error.code).isEqualTo('ERROR');
            assert.string(error.message).isEqualTo('Action not found');
        });

        done();
    });
});
