'use strict';

const Controller = require('../lib/controller'),
      assert     = require('unit.js');

describe('Entry Point', function()
{
    it ('Invocation success: with callback', function(done)
    {
        const name     = 'John Doe';
        const message = {
            command: 'hello',
            action : 'world',
            params : {name: name},
        };

        const controller = new Controller(__dirname + '/commands');
        controller.handle(message, function(error, data)
        {
            assert.bool(!error).isTrue();
            assert.string(data).isEqualTo(`Hello ${name}!`);
        });

        done();
    });
});
