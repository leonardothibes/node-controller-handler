'use strict';

exports.world = function(params, callback)
{
    callback(null, `Hello ${params.name}!`);
};
