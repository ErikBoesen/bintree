var canvas = document.getElementById('canv');
canvas.height = window.innerHeight;
canvas.width  = window.innerWidth;
var ctx = canvas.getContext('2d');

var xSpeed = 1,
    ySpeed = 1;

function rand(x) {
     return (Math.floor(Math.random() * 256));
}
var size = 100;
for (i = 0; i < 20; i++) {
    ctx.fillStyle = 'rgb(' + rand(256) + ',' + rand(256) + ',' + rand(256) + ')';
    ctx.fillRect(rand(canvas.width - size), rand(canvas.height - size), rand(size), rand(size));
}
