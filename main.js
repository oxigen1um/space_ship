window.onload = function() {
  var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth, //making our canvas to fill all browser area
      height = canvas.height = window.innerHeight, // same thing
      ship = particle.create(width / 2, height / 2, 0 ,0),
      thrust = vector.create(0, 0), // impulse vector
      angle = 0,
      turningLeft = false,
      turningRight = false,
      thrusting = false;

      document.body.addEventListener("keydown", function(event) {
      //  console.log(event.keyCode);
      switch(event.keyCode) {
        case 87: //up
        thrusting = true;
        break;

        case 65: //left
        turningLeft = true;
        break;

        case 68: //right
        turningRight = true;
        break;

        default:
          break;
      }
      });

      document.body.addEventListener("keyup", function(event) {
      //  console.log(event.keyCode);
      switch(event.keyCode) {
        case 87: //up
        thrusting = false;
        break;

        case 65: //left
        turningLeft = false;
        break;

        case 68: //right
        turningRight = false;
        break;

        default:
          break;
      }
      });

      update();

      function update() {
        context.clearRect(0, 0, width, height);

        if (turningLeft) {
          angle -= 0.05;
        }
        if (turningRight) {
          angle += 0.05;
        }
        if (thrusting) {
          thrust.setLength(0.1);
        }
        else {
          thrust.setLength(0);
        }

        thrust.setAngle(angle);
        // animation gose here
        ship.accelerate(thrust);
        ship.update();

        context.save();
        context.translate(ship.position.getX(), ship.position.getY());
        context.rotate(angle);

        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        if (thrusting) {
          context.moveTo(-10, 0);
          context.lineTo(-18, 0);
        }
        context.stroke();

        context.restore();

        if (ship.position.getX() > width) {
          ship.position.setX(0);
        }
        if (ship.position.getX() < 0) {
          ship.position.setX(width);
        }
        if (ship.position.getY() > height) {
          ship.position.setY(0);
        }
        if (ship.position.getY() < 0) {
          ship.position.setY(height);
        }

        requestAnimationFrame(update);
      }
};
