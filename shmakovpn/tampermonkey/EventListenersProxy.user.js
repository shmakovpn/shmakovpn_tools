// ==UserScript==
// @name         EventListenersProxy
// @namespace    http://localhost/
// @version      0.2
// @description  Collects event listeners to window.EventListeners, makes possibility to wrap event handlers (callbacks) into proxy
// @author       shmakovpn
// @match        http://localhost*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const config = {
        loggingGreatind: false, // logging greating or not
        loggingEnding: false, // logging ending or not
        warns: false, // disable or enable warnings
        logging: false, // disable or enable 'console.log(config.loggingPrefix, evtList.callback);'
        loggingPrefix: 'added evtList.callback:', // advanced information for callback adding logging
        proxy: true, // wrap evtList.callback into proxy
        // proxy handler object
        proxyHandler: {
            apply: (target, thisArg, argArray) => {
                console.log('EventListener Proxy.apply',thisArg,argArray);
                console.log(target);
                // TODO: add here your proxy handling code
                target.apply(thisArg, argArray);
            }
        }
    }

    // creates a new instance of EventListener using original or proxied callback
    const createEventListener = (thisArg, eventType, callback) => {
        if(!config.proxy) {
            new EventListener(thisArg, eventType, callback);
        }
        return new EventListener(thisArg, eventType, new Proxy(callback, config.proxyHandler));
    }

    // Greating
    if(config.loggingGreating) {
        console.log('Change event listeners using Tampermonkey');
    }

    // ================================================== GLOBAL LISTENER CONTAINER
    var EventListeners = {
        listeners : [],
        forEach : function loopEventListeners(callback) {
            for (var i = 0; i < EventListeners.listeners.length; i++) {
                var listener = EventListeners.listeners[i];
                callback(listener, i);
            }
        },
        get : function getEventListeners(selector) {
            var result = [];
            EventListeners.forEach(function (listener) {
                switch (typeof selector) {
                    case "object":
                        if (listener.target == selector) {
                            result.push(listener);
                        }
                        break;
                    case "string":
                        if (listener.type == selector) {
                            result.push(listener);
                        }
                        break;
                }
            });
            return result;
        },
        add : function logEventListener(listener) {
            EventListeners.listeners.push(listener);
        },
        remove : function removeEventListener(victimListener) {
            EventListeners.forEach(function (listener, index) {
                if (victimListener.target == listener.target && victimListener.type == listener.type && victimListener.callback == listener.callback) {
                    EventListeners.listeners.splice(index, 1);
                }
            });
        },
    };


    // ================================================== EVENT LISTENER OBJECT
    function EventListener() {
        this.target         = null;
        this.type           = null;
        this.callback       = null;
        this.options        = null;
        this.useCapture     = null;
        this.wantsUntrusted = null;
        this.parseArgs.apply(this, Array.from(arguments));
    }

    EventListener.prototype.parseArgs = function parseArgs(target, type, callback) {
        if (arguments.length < 3) {
            return;
        }
        this.target   = target;
        this.type     = type;
        this.callback = callback;
        switch (arguments.length) {
            case 4:
                switch (typeof arguments[3]) {
                    case "object":
                        this.options = arguments[3];
                        break;
                    case "boolean":
                        this.useCapture = arguments[3];
                        break;
                }
                break;
            case 5:
                if (typeof args[3] == "boolean") {
                    this.useCapture = arguments[3];
                    this.wantsUntrusted = arguments[4];
                }
                break;
        }
    };

    EventListener.prototype.remove = function removeEventListener() {
        if (this.options) {
            this.target.removeEventListener(this.type, this.callback, this.options);
            EventListeners.remove(this);
        } else if (this.useCapture != null) {
            if (this.wantsUntrusted != null) {
                this.target.removeEventListener(this.type, this.callback, this.useCapture, this.wantsUntrusted);
                EventListeners.remove(this);
            } else {
                this.target.removeEventListener(this.type, this.callback, this.useCapture);
                EventListeners.remove(this);
            }
        } else {
            this.target.removeEventListener(this.type, this.callback);
            EventListeners.remove(this);
        }
    };

    // ================================================== NATIVE API

    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    EventTarget.prototype.addEventListener = function (addEventListener) {
        if(config.warns) {
            console.warn("EventTarget.prototype.addEventListener() has been modified.");
        }
        return function () {
            var evtList = null;
            switch (arguments.length) {
                    // EventTarget.addEventListener(type, callback)
                case 2:
                    // evtList = new EventListener(this, arguments[0], arguments[1]);
                    evtList = createEventListener(this, arguments[0], arguments[1]); // create a new instance of EventListener using original callback or proxied
                    addEventListener.call(evtList.target, evtList.type, evtList.callback);
                    if(config.logging) {
                        console.log(config.loggingPrefix, evtList.callback);
                    }
                    EventListeners.add(evtList);
                    return evtList;
                    // EventTarget.addEventListener(type, callback, options)
                    // EventTarget.addEventListener(type, callback, useCapture)
                case 3:
                    // evtList = new EventListener(this, arguments[0], arguments[1]);
                    evtList = createEventListener(this, arguments[0], arguments[1]); // create a new instance of EventListener using original callback or proxied
                    switch (typeof arguments[2]) {
                        case "object":
                            evtList.options = arguments[2];
                            addEventListener.call(evtList.target, evtList.type, evtList.callback, evtList.options);
                            EventListeners.add(evtList);
                            return evtList;
                        case "boolean":
                            evtList.useCapture = arguments[2];
                            addEventListener.call(evtList.target, evtList.type, evtList.callback, evtList.useCapture);
                            EventListeners.add(evtList);
                            return evtList;
                    }
                    break;
                    // EventTarget.addEventListener(type, callback, useCapture, wantsUntrusted)
                case 4:
                    // evtList = new EventListener(this, arguments[0], arguments[1]);
                    evtList = createEventListener(this, arguments[0], arguments[1]); // create a new instance of EventListener using original callback or proxied
                    if (typeof arguments[2] == "boolean") {
                        evtList.useCapture     = arguments[2];
                        evtList.wantsUntrusted = arguments[3];
                        addEventListener.call(evtList.target, evtList.type, evtList.callback, evtList.useCapture, evtList.wantsUntrusted);
                        EventListeners.add(evtList);
                        return evtList;
                    }
                    break;
            }
        }
    }(EventTarget.prototype.addEventListener);

    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
    EventTarget.prototype.removeEventListener = function (removeEventListener) {
        if(config.warns) {
            console.warn("EventTarget.prototype.removeEventListener() has been modified.");
        }
        return function () {
            var evtList = null;
            switch (arguments.length) {
                case 2:
                    evtList = new EventListener(this, arguments[0], arguments[1]);
                    removeEventListener.call(evtList.target, evtList.type, evtList.callback);
                    EventListeners.remove(evtList);
                    break;
                case 3:
                    evtList = new EventListener(this, arguments[0], arguments[1]);
                    switch (typeof arguments[2]) {
                        case "object":
                            evtList.options = arguments[2];
                            removeEventListener.call(evtList.target, evtList.type, evtList.callback, evtList.options);
                            EventListeners.remove(evtList);
                            break;
                        case "boolean":
                            evtList.useCapture = arguments[2];
                            removeEventListener.call(evtList.target, evtList.type, evtList.callback, evtList.useCapture);
                            EventListeners.remove(evtList);
                            break;
                    }
                    break;
            }
        }
    }(EventTarget.prototype.removeEventListener);
    window.EventListeners = EventListeners;
    if(config.loggingEnding) {
        console.log('Event listeners successfully changed');
    }
})();
