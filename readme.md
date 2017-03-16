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
![Screenshot](screenshot.gif?raw=true "Fireworks")

```js
'use strict';

// Full circle
var TAU = Math.PI * 2;

// Main drawing queue
var fireworks = [];

// Drawing board
var context = document.getElementById('canvas').getContext('2d');

// Downward pull
var gravity = new Vector(0, 0.25);

// Dot drawing
var Particle = function Particle(options) {
  var defaults = {
    // Initialize to zero
    acceleration: new Vector(),

    // Set lifespan to half the available vertical space
    lifespan: getRandomInt(0, 0.5 * context.canvas.height),

    // Position somewhere along the bottom line
    position: new Vector(getRandomInt(0, context.canvas.width), context.canvas.height),

    // Pixel size
    radius: 1,

    // No scaling
    scale: 1,

    // Go places
    velocity: Vector.rand()
  };

  // Merge options and defaults
  var settings = Object.assign({}, defaults, options);

  // Reached the top
  var isReadyToBurst = function isReadyToBurst() {
    return settings.velocity.y >= 0;
  };

  // No more lives to live
  var isDead = function dead() {
    return settings.lifespan === 0;
  };

  // Move
  var update = function update(f) {
    var force = f || 0;

    // Reset acceleration
    settings.acceleration.multiply(0);

    // Add everything together
    settings.acceleration.add(force);
    settings.velocity.add(settings.acceleration);
    settings.position.add(settings.velocity);

    settings.lifespan -= 1;
  };

  // Draw
  var render = function render(context) {
    settings.radius += settings.radius * settings.scale;

    settings.radius = Math.max(settings.radius, 0);
    settings.radius = Math.min(settings.radius, 5);

    context.beginPath();
    context.arc(settings.position.x, settings.position.y, settings.radius, 0, TAU);
    context.fillStyle = '#fff';
    context.fill();
  };

  return {
    update,
    render,
    isReadyToBurst,
    isDead,
    settings
  }
};

var Firework = function Firework(x, y, N) {
  var total = N || 40;
  var particles = [];
  var living = true;

  var rocket = new Particle({
    // Rockets have a longer lifespan
    lifespan: context.canvas.height,

    // Rockets scale up
    scale: 0.1,

    // Rockets shoot up vertically
    velocity: new Vector(0, getRandomInt(-2, 2)).multiply(5)
  });

  var done = function() {
    return particles.length === 0;
  };

  var blow = function() {
    // Change life status :)
    living = false;

    // Remove rocket from queue
    particles.splice(0, 1);

    // Explode
    for (var i = 0; i < total; i += 1) {
      // Add particles
      particles.push(new Particle({
        // Start where the rocket burst
        position: rocket.settings.position.clone(),

        // Particles start bigger
        radius: 4,

        // Shrink factor
        scale: -0.75 * Math.random(),

        // Particles shoot on all sides
        velocity: Vector.rand().multiply(getRandomInt(-7, 2))
      }));
    }
  };

  var update = function update(gravity) {
    if (living && rocket.isReadyToBurst()) {
      blow();
    }

    for(var i = particles.length - 1; i >= 0; i -= 1) {
      particles[i].update(gravity);

      if (particles[i].isDead()) {
        particles.splice(i, 1);
      }
    }
  };

  var render = function render(context) {
    for (var i = particles.length - 1; i >= 0; i -= 1) {
      particles[i].render(context);
    }
  };

  // Initialize
  particles.push(rocket);

  return {
    deadAndDone: function() {
      return rocket.isDead() && done();
    },
    update,
    render
  };
};

var animate = function animate() {
  // Clear the canvas
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  // Add fireworks, no need to bother with frame count this way
  if (Math.random() < 0.25) {
    fireworks.push(new Firework());
  }

  for(var i = fireworks.length - 1; i >= 0; i -= 1) {
    // Move
    fireworks[i].update(gravity);

    // Draw
    fireworks[i].render(context);

    // Cleanup
    if (fireworks[i].deadAndDone()) {
      fireworks.splice(i, 1);
    }
  }

  // Repeat
  window.requestAnimationFrame(animate);
}

// Once everything's been loaded in
window.addEventListener('load', function onLoad() {
  // Animate
  window.requestAnimationFrame(animate);
}, false);

// Get random number in range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```
