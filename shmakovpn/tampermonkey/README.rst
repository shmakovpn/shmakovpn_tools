EventListenersProxy
===================

It is a script for **Tampermonkey** browser addon.


This script collects *event listeners* to **window.EventListeners** and
makes possibility to wrap event handlers (callbacks) into **Proxy**.


Configuration:

.. code-block: javascript

 // ==UserScript==
 // @name         EventListenersProxy
 // @namespace    http://localhost/
 // @version      0.2
 // @description  Collects event listeners to window.EventListeners, makes possibility to wrap event handlers (callbacks) into proxy
 // @author       You
 // @match        http://localhost*/*
 // @grant        none
 // @run-at       document-start
 // ==/UserScript==

.. code-block: javascript

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

