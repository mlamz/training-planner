Cycling Training Planner
================

Try out the [Demo](http://freezing-mist-5531.herokuapp.com/).

View the [Source](https://github.com/treadsafely/training-planner).

The Cycling Training Planner is my latest node.js project - an application that lets helps plan the cycling training year based around key races, sportives and time trials.

The training plan is split into weeks - allowing planning your different phases - base, build, taper, race and rest.

Server side tech:
*	node.js
*	passport
*	express
*	jade
*	mongoose

Client side:
*	backbone
*	require
*	underscore

##Creating a unique calendar

One of the challenges of the planner is creating a unique calendar which emphasises the week number - as cycling training plans are most often split up into weeks. The first goal was to always start every calendar year with a Sunday. I wanted this to be the last sunday of the past year, unless January the 1st was on a Sunday. 

Step 1: Create the HTML elements for the days and weeks, with each day's data-day value set.

	<div data-day="1">Sunday</div>
	<div data-day="2">Monday</div>
	<div data-day="3">Tuesday</div>

I've used a for loop within the Jade template for the calendar to achieve this. If the logic was any busier than this, I would create this using JavaScript templates, but I feel it's ok for now.

Step 2: Select the day number (Sunday is 0, Monday  is 1 and so on) of January 1st.

	var firstJan = new Date(thisYear,0,1)
	,	firstSunday = firstJan.getDay();

Step 3: Workout how many days into the year the day element is:

	







