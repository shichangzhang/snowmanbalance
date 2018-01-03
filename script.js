window.onload = function() {
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

class Ball {
	constructor(x, y, r, c = "#FFFFFF") {
		this.x = x;
		this.y = y;
		this.r = r;
		this.c = c;
	}

	update(dir) {
		this.x += dir;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.fillStyle = this.c;
		ctx.fill();
		ctx.closePath();
	}
}

class Board {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	update(dir) {
		this.x += dir;
	}

	draw() {
		ctx.beginPath();
		ctx.rect(this.x,this.y,this.width,this.height);
		ctx.fillStyle = "#D2691E";
		ctx.fill();
		ctx.closePath();
	}
}

class Skateboard {
	constructor(x = 100, y = 110, width = 100, height = 10) {
		this.x = x;
		this.y = y;
		this.board = new Board(x, y, width, height);
		this.leftWheel = new Ball(x+10, y+10, 10, "#111111");
		this.rightWheel = new Ball(x+90, y+10, 10, "#111111");
	}

	update(dir) {
		this.board.update(dir);
		this.leftWheel.update(dir);
		this.rightWheel.update(dir);
	}

	draw() {
		this.board.draw();
		this.leftWheel.draw();
		this.rightWheel.draw();
	}
}

class Snowman {
	constructor(x = 100, y = 100, headSize = 30, bodySize = 50) {
		this.x = x;
		this.y = y;
		this.head = new Ball(x, y, headSize);
		this.body = new Ball(x, y+headSize/1.5+bodySize, bodySize);
	}

	update(dir) {
		this.head.update(dir);
		this.body.update(dir);
	}

	draw() {
		this.head.draw();
		this.body.draw();
	}
}

var snowman = new Snowman();
var skateboard = new Skateboard(100-50,215);

//Controls
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var rightPressed = false;

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == LEFT) {
		leftPressed = true;
	} 
	else if(e.keyCode == UP) {
		upPressed = true;
	}
	else if(e.keyCode == DOWN) {
		downPressed = true;
	}
	else if(e.keyCode == RIGHT) {
		rightPressed = true;	
	}
}

function keyUpHandler(e) {
	if(e.keyCode == LEFT) {
		leftPressed = false;
	} 
	else if(e.keyCode == UP) {
		upPressed = false;
	}
	else if(e.keyCode == DOWN) {
		downPressed = false;
	}
	else if(e.keyCode == RIGHT) {
		rightPressed = false;
	}
}

var speed = 0;
function gameLoop() {
	if(rightPressed) {
		speed = 10;
	} else if(leftPressed) {
		speed = -10;
	} else {
		speed = 0;
	}
	snowman.update(speed);
	skateboard.update(speed);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	snowman.draw();
	skateboard.draw();
	requestAnimationFrame(gameLoop);	
}

gameLoop();
};