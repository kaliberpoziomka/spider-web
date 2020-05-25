let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

let c = canvas.getContext('2d');

let dotNumber = 100;
let dotSpeed = 0.8;
let radius = 2;



// Event listeners
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

// global functions
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

function distance(x1, x2, y1, y2) {
    return Math.hypot((x2 - x1), (y2 - y1));
};
// global variables
let mouse = {
    x: undefined,
    y: undefined,
};


// Class object

function Dot(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'rgba(0,0,0,0.8)';
        c.fill();
        c.closePath();
    };

    this.update = function() {
        this.draw();

        if (this.x > innerWidth - this.radius || this.x < this.radius) {
            this.dx = -this.dx;
        }

        if (this.y > innerHeight - this.radius *2 || this.y < this.radius) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
    };


};

// connect


// initialization
let dotsArray = [];
function init() {
    dotsArray = [];

    for (let i = 0; i < dotNumber; i++) {
        let x = getRandomInt(radius, (innerWidth-radius*2));
        let y = getRandomInt(radius, (innerHeight-radius*2));
        let dx = (Math.random() - 0.5) * dotSpeed;
        let dy = (Math.random() - 0.5) * dotSpeed;

        dotsArray.push(new Dot(x, y, dx, dy, radius));
    };
};


// animation
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < dotsArray.length; i++) {
        dotsArray[i].update();
    }

    for (let a = 0; a < dotsArray.length; a++) {
        for (let b = a; b < dotsArray.length; b++) {
            let dist = distance(dotsArray[a].x, dotsArray[b].x, dotsArray[a].y,  dotsArray[b].y);
            let distMouse = distance(mouse.x, dotsArray[b].x, mouse.y, dotsArray[b].y);
            let color = `rgba(0,0,0,${(1 - (dist/200))})`;
            let colorMouse = `rgba(214, 73, 51,${(1 - (distMouse/230))})`;
            if (dist < 250) {
                c.strokeStyle = color;
                c.lineWidth = .8;
                c.beginPath();
                c.moveTo(dotsArray[a].x, dotsArray[a].y);
                c.lineTo(dotsArray[b].x, dotsArray[b].y);
                c.stroke();
            };

            if (distMouse < 300) {
                c.strokeStyle = colorMouse;
                c.lineWidth = .3;
                c.beginPath();
                c.moveTo(dotsArray[b].x, dotsArray[b].y);
                c.lineTo(mouse.x, mouse.y);
                c.stroke();
            };
            
        }
    }

};

init();
animate();
