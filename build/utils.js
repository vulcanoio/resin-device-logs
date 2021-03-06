
/*
Copyright 2016 Resin.io

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
var isArray, isString;

isString = require('lodash/isString');

isArray = require('lodash/isArray');


/**
 * @summary Get logs channel name from a uuid
 * @function
 * @protected
 *
 * @param {Object} device - device
 * @returns {String} logs channel
 *
 * @example
 * channel = utils.getChannel('...')
 */

exports.getChannel = function(device) {
  return "device-" + (device.logs_channel || device.uuid) + "-logs";
};


/**
 * @summary Extract messages from PubNub payload
 * @function
 * @public
 *
 * @param {*} message - message
 * @returns {Object[]} log messages
 *
 * @example
 * messages = utils.extractMessages('foo bar')
 */

exports.extractMessages = function(message) {
  if (isString(message)) {
    return [
      {
        isSystem: /\[system\]/.test(message),
        message: message,
        timestamp: null
      }
    ];
  } else if (isArray(message)) {
    return message.map(function(arg) {
      var m, s, t;
      m = arg.m, t = arg.t, s = arg.s;
      return {
        message: m,
        timestamp: t,
        isSystem: Boolean(s)
      };
    });
  } else {
    return [message];
  }
};
