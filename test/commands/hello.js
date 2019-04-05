'use strict';

exports.world = function(params, callback)
{
    callback(null, `Hello ${params.name}!`);
};

exports.hola = function(params, callback)
{
    callback(null, 'Hola, que tal?');
};
