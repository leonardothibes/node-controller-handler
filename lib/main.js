'use strict';

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
        this.basedir = basedir;
    }

    /**
     * Validate the mesage body.
     *
     * @param {Object}   message  Message body to validate
     * @param {Function} callback Callback function
     */
    validate(message, callback)
    {
        callback = callback || function() {};

        callback();
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
        callback = callback || function() {};

        callback();
    }
};
