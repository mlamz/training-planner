Cycling Training Planner
================

Try out the [Demo](http://freezing-mist-5531.herokuapp.com/).

View the [Source](https://github.com/treadsafely/training-planner).

The Cycling Training Planner is an application that lets helps plan the cycling training year based around key races, sportives and time trials.

The training plan is split into weeks - allowing planning your different phases - base, build, taper, race and rest.

Server side tech:
*	[node.js](http://nodejs.org/)
*	[passport](http://passportjs.org/)
*	[express](http://expressjs.com/)
*	[jade](https://github.com/visionmedia/jade)
*	[mongoose](http://mongoosejs.com/)
 
Client side:
*	[backbone.js](http://documentcloud.github.com/backbone/)
*	[requireJS](http://requirejs.org/)
*	[underscore](http://documentcloud.github.com/underscore/)

##Creating a unique calendar

One of the challenges of the planner is creating a unique calendar which emphasises the week number - as cycling training plans are most often split up into weeks. The first goal was to always start every calendar year with a Sunday. I wanted this to be the last sunday of the past year, unless January the 1st was on a Sunday.

##Use of backbone

As this is a client-side heavy single page application, I used Backbone to organise the client side javascript, by splitting out the models, collections and views. I find that Backbone views act more like event handlers for a defined HTML element, rather than view template renderers.

##RequireJS

RequireJS allows loading of modules as they are required by each backbone model, collection and view, and sorts out all your nested dependencies for you, that would be a pain to handle otherwise.

##Passport

In hindsight, I did not really need to use Passport, an authentication mechanism for node.js. It was a useful experience however to do authentication in node.







