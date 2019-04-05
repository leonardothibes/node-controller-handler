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
});
