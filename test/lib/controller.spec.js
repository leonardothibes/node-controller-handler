'use strict';

const Controller = require('../../lib/controller'),
      assert     = require('unit.js');

describe('Controller', function()
{
    it('Message 1 is VALID', function(done)
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

    it('Message 2 is VALID', function(done)
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
        '',
        {},
        {command: ''},
        {command: '', action: ''},
        {command: 'command', action: ''},
        {command: 'command', action: 'action', params: ''},
    ].forEach(function(message, i)
    {
        it(`Message ${i+3} is INVALID`, function(done)
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
});
