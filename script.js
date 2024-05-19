// Waits for the DOM to be fully loaded before executing the code inside it.
document.addEventListener('DOMContentLoaded', function () {
// Get references to the necessary elements in the HTML document    
var container = document.getElementById('firework-container');
var ground = document.getElementById('ground');
// Calculate the dimensions of canvas and the ground.
var canvasWidth = container.offsetWidth;
var canvasHeight = container.offsetHeight;
var groundHeight = ground.offsetHeight;
var halfCanvasHeight = canvasHeight / 2;
/*creating fireworks,, Called when the user clicks on the page.
Creates a new firework at the specified coordinates. Send firework
from bottom, and move upwards until reaches the a random height of the
current window height.Once it touches the halfway point. It will trigger
the explode function, create multiple particles*/
function createFirework(x, y) {
    //create new div element to represent the firework
    var firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.bottom = '0';
    container.appendChild(firework);
      var halfHeight = halfCanvasHeight;
      //set a interval letting the fireworks to move up.
      /*(Part of this Function referred to Chat GPT)*/
      var interval = setInterval(function () {
         var currentBottom = parseInt(firework.style.bottom);
         if (currentBottom >= halfHeight) {
                //when it move to the destination, clear the interval
                clearInterval(interval);
                firework.style.opacity = '0';
                explode(firework);
         } else {
                firework.style.bottom = (currentBottom + 2) + 'px';
            }
         }, 10);
    }
    /*When the firework touchs the desitination line, This function will be
    called. It takes the original firework(circle) as an argument. Creates
    Multiple new particles. They will have different color.*/
    function explode(parentFirework) {
        var particles = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
        /*create the particles. /*(Part of this Function referred to Chat GPT)*/
        for (var i = 0; i < particles; i++) {
            var particle = document.createElement('div');
            particle.className = 'firework';
            particle.style.left = parentFirework.style.left;
            particle.style.bottom = parentFirework.style.bottom;
            particle.style.backgroundColor = getRandomColor();
            container.appendChild(particle);
            /* Make each of them move randomly and gives the feeling of an Explosion.
            (Part of this Function referred to Chat GPT)*/
            var angle = (Math.random() * 360) * (Math.PI / 180);
            var velocity = 1 + Math.random() * 2;
            var x = Math.sin(angle) * velocity;
            var y = Math.cos(angle) * velocity + 2;
            //animate the movement
            animateParticle(particle, x, y);
        }
        //play the explosion sound after a delay and remove the parent firework from the page.
        setTimeout(function () {
            var explosionAudio = document.getElementById('explosion-audio');
            explosionAudio.play();
            parentFirework.remove();
        }, 100);
    }
    /* Animate the movement of a particle*/
    function animateParticle(particle, x, y) {
        var posX = parseInt(particle.style.left);
        var posBottom = parseInt(particle.style.bottom);
        //set the interval to update the particle's position based on the velocities
        var interval = setInterval(function () {
            posX += x;
            posBottom += y;
            y -= 0.05;

            particle.style.left = posX + 'px';
            particle.style.bottom = posBottom + 'px';
            /*(Part of this Function referred to Chat GPT)*/
            if (posBottom <= groundHeight) {
                var randomNum = Math.random();
                if (randomNum <= 0.04) {
                    clearInterval(interval);
                    setTimeout(function () {
                        animateToRandomHeight(particle);
                    }, 1000);
                } else {
                    particle.remove();
                    clearInterval(interval);
                }
            } else if (posBottom <= 0 || posX <= 0 || posX >= canvasWidth) {
                particle.remove();
                clearInterval(interval);
            }
        }, 20);
    }
    //animate a particle to a random height.
    function animateToRandomHeight(particle) {
        var posY = parseInt(particle.style.bottom);
        var canvasHeight = window.innerHeight;
        var minHeight = canvasHeight * 0.3;
        var maxHeight = canvasHeight * 0.5;
        var randomHeight = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
        //set the interval letting th eparticle move towards the random height. 
        var interval = setInterval(function () {
            var dy = randomHeight - posY;
            var speed = 3;
            var vy = (dy / Math.abs(dy)) * speed;

            posY += vy;

            particle.style.bottom = posY + 'px';
            
            if (posY >= randomHeight) {
                //if the particle reaches its explosion height, trigger an explosion
                clearInterval(interval);
                explode(particle);
            }
        }, 20);
    }

    //generate a random RGB color. (From Tutorial Materials)*
    function getRandomColor() {
        return `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
    }
    //event listener to trigger creatFirework when the user clicks on the page.
    document.addEventListener('click', function (event) {
        createFirework(event.clientX, event.clientY);
    });
});

//For background Music
function playAudio() {
    var audio = document.getElementById("myAudio");
    audio.play();
}
//Pause the background Music
function pauseAudio() {
    var audio = document.getElementById("myAudio");
    audio.pause();
}

//Refresh the screen
function refreshScreen() {
    location.reload();
}

//Change the color of all the fireworks on the page
function changeFireworkColor() {
    var fireworks = document.getElementsByClassName('firework');
    for (var i = 0; i < fireworks.length; i++) {
        fireworks[i].style.backgroundColor = getRandomColor();
    }
}

//Getting a random rgb color (From tutorial material)*
function getRandomColor() {
    var red = Math.round(Math.random() * 255);
    var green = Math.round(Math.random() * 255);
    var blue = Math.round(Math.random() * 255);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

//Funtion to change the size of all fireworks currently on the page
function changeFireworkSize() {
    var fireworks = document.getElementsByClassName('firework');
    for (var i = 0; i < fireworks.length; i++) {
        var size = getRandomSize(1, 100);
        fireworks[i].style.width = size + 'px';
        fireworks[i].style.height = size + 'px';
    }
}
//Get a rrandom size between min and max.
function getRandomSize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Change the background color of the container
function changeBackgroundColor() {
    var container = document.getElementById('firework-container');
    var red = Math.round(Math.random() * 255);
    var green = Math.round(Math.random() * 255);
    var blue = Math.round(Math.random() * 255);
    var color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    container.style.backgroundColor = color;
}