/*jshint browser:true, node:true */
'use strict';

var ga = document.createElement('script');
var s = document.getElementsByTagName('script')[0];
var protocol = 'https:' === document.location.protocol ? 'https://ssl' : 'http://www';

global._gaq = [['_setAccount', 'UA-161519-2'], ['_trackPageview']];

ga.async = true;
ga.src = protocol + '.google-analytics.com/ga.js';

s.parentNode.insertBefore(ga, s);
