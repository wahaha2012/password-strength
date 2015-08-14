/*!
 * Password Strength Checker
 * Copyright (C) 2015  wxwdesign@gmail.com
 * Licensed under the GPL License.
 * https://github.com/wahaha2012/password-strength
 */
(function(root, factory) {
    factory = typeof factory === 'function' ? factory : function() {}
    if (typeof define === 'function') {
        if (define.amd) {
            define([], factory);
        } else if (define.cmd) {
            define(function(require, exports, module) {
                module.exports = factory();
            });
        }
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof DP === 'object' && typeof DP.define === 'function') {
        DP.define([], factory);
    } else {
        root.PasswordStrength = root.PasswordStrength || factory();
    }
}(this, '{{{factory}}}'));