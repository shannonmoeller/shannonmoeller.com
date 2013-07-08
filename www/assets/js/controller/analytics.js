(function(e){if("function"==typeof bootstrap)bootstrap("shannonmoeller.com",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeShannonmoellercom=e}else"undefined"!=typeof window?window.shannonmoellercom=e():global.shannonmoellercom=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function(global){/*jshint browser:true, node:true */
'use strict';

var ga = document.createElement('script');
var s = document.getElementsByTagName('script')[0];
var protocol = 'https:' === document.location.protocol ? 'https://ssl' : 'http://www';

global._gaq = [['_setAccount', 'UA-161519-2'], ['_trackPageview']];

ga.async = true;
ga.src = protocol + '.google-analytics.com/ga.js';

s.parentNode.insertBefore(ga, s);

})(self)
},{}]},{},[1])(1)
});
;