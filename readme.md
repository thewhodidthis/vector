## Vector
> Simple vector operations extracted from [lightgl.js](https://github.com/evanw/lightgl.js/blob/master/src/vector.js)

### Setup
```sh
npm install thewhodidthis/vector --save
```

### Usage
```js
// Require like so if using browserify
var Vector = require('@thewhodidthis/vector');

// Or use standalone build
var Vector = window.Vector;
```

### Example
```js
(function(window, document) {
	'use strict';

	// Bouncing balls example
	var TAU = Math.PI * 2;

	var winW = window.innerWidth;
	var winH = window.innerHeight;

	var Ball = function Ball(x, y) {
		this.pos = new Vector(x, y);
		this.vel = new Vector(-5.25, 20);
		this.radius = 25;

		this.update = function _update(mouse) {
			if (this.pos.x > window.innerWidth || this.pos.x < 0) {
				this.vel.x = -1 * this.vel.x;
			}
			
			if (this.pos.y > window.innerHeight || this.pos.y < 0) {
				this.vel.y = -1 * this.vel.y;
			}
			
			this.pos = this.pos.add(this.vel);
		};

		this.render = function _render(target) {
			target.beginPath();
			target.arc(this.pos.x, this.pos.y, this.radius, 0, TAU);
			target.closePath();
		}
	};

	var balls = [];
	var ballsMax = 25;

	var context = document.createElement('canvas').getContext('2d');

	var animate = function _onEachFrame() {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		for(var i = 0, total = balls.length; i < total; i += 1) {
			balls[i].update();
			balls[i].render(context);

			context.fill();
		}

		window.requestAnimationFrame(animate);
	}

	context.canvas.width = winW;
	context.canvas.height = winH;

	context.fillStyle = '#00f';

	for (var i = 0, total = ballsMax; i < total; i += 1) {
		var x = Math.floor(Math.random() * winW);
		var y = Math.floor(Math.random() * winH);
		
		balls[i] = new Ball(x, y);
	}

	window.addEventListener('load', function _onLoad() {
		document.body.insertBefore(context.canvas, document.body.firstChild);

		window.requestAnimationFrame(animate);
	}, false);
})(window, document);
```
