Annihilate.css
==============

Annihilate.css is a reset stylesheet that eliminates all css rules from every single element on the page. In effect, erasing every element from the page until it is restyled.

What the heck… Why?
---------------------
It encourages [separation of structure from skin](http://oocss.org) by neutering the control html elements have over how the page is rendered, and instead, necesitates the use of html classes. This lends itself well to the usage of css components. Moreover, it facilitates the development of css components by preventing authors from neglecting to specify css properties for a component that he or she falsely assumed were defaults (i.e. it is attached to a block level element.)

Annihilate.css violates conventional wisdom on how you should approach styling your website. Unlike other reset stylesheets, it actually make's it *harder* to get going. Personally, I think this is a good thing and that it forces authors to separate the html document from the display. I wouldn't recommended it for small sites or sites that need to get started quickly. That being said, when the [componentization](http://tjholowaychuk.com/post/27984551477/components) movement comes under full swing, adding css components to your page will become easy... even fun.

How it works
------------

Basically, there is a giant * selector that sets all of the css properties that you can think of (and more) to falsy values. If the property is one that cascades, then it is set to inherit. The base value for all inherited properties are set on the html element.

How to use it
-------------

Just link to it in the header of your page the same way you would a reset stylesheet. Unlike normalize.css, I advise **against** editing the defaults set in the stylesheet.