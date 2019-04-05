'use strict';

const errors = require('./errors');

/**
 * Controller Handler.
 *
 * @see https://www.npmjs.com/package/controller-handler
 */
module.exports = class
{
    /**
     * Constructor.
     *
     * @param {String} basedir Base directory for commands
     */
    constructor(basedir)
    {
        this.basedir = basedir || '.';
    }

    /**
     * Resumed validation.
     *
     * @param {Object} message
     *
     * @return {Bool}
     */
    isValid(message)
    {
        const validation = this.validate(message);

        return (validation.command && validation.action && validation.params);
    }

    /**
     * Message contents validations
     *
     * @param {Object} message
     *
     * @return {Object}
     */
    validate(message)
    {
        const isObject   = (typeof message === 'object');
        const validation = {
            command: (isObject && message.hasOwnProperty('command') && message.command !== ''),
            action : (isObject && message.hasOwnProperty('action')  && message.action  !== ''),
            params : true,
        };

        if (message.hasOwnProperty('params')) {
            validation.params = (typeof message.params === 'object');
        }

        return validation;
    }

    /**
     * Handle the message.
     *
     * @param {Object}   message
     * @param {String}   message.command  Name of file who contains the actions
     * @param {String}   message.action   Name of action to execute
     * @param {Object}   [message.params] List of parameters to pass to the action
     * @param {Function} callback         Callback function
     */
    handle(message, callback)
    {
        const validation = this.validate(message);
        callback         = callback || function() {};

        var source, command, params = message.params || {};

        if (!validation.command) {
            callback(errors.command.missing);
            return;
        }

        if (!validation.action) {
            callback(errors.action.missing);
            return;
        }

        try {
            source  = this.basedir + '/' + message.command;
            command = require(source);
        } catch (e) {
            callback(errors.command.notFound);
            return;
        }

        if (!command[message.action]) {
            callback(errors.action.notFound);
            return;
        }

        command[message.action](params, callback);
    }
};
