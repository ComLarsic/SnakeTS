"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var cellSize = 32;
var gameover = false;
var WindowSize = {
    "Height": 800,
    "Width": 1280
};
var snake;
var apple;
var GameObject = /** @class */ (function () {
    function GameObject(PosX, PosY) {
        this.PosX = PosX;
        this.PosY = PosY;
    }
    GameObject.prototype.Draw = function () {
        fill(40, 200, 15);
        rect(this.PosX * (cellSize), this.PosY * (cellSize), cellSize, cellSize, 5);
    };
    return GameObject;
}());
var Trail = /** @class */ (function (_super) {
    __extends(Trail, _super);
    function Trail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Trail.prototype.Draw = function () {
        fill(40, 200, 15);
        rect(this.PosX * (cellSize), this.PosY * (cellSize), cellSize, cellSize, 5);
    };
    return Trail;
}(GameObject));
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Apple.prototype.Draw = function () {
        fill(255, 0, 0);
        rect(this.PosX * (cellSize), this.PosY * (cellSize), cellSize, cellSize, 5);
    };
    Apple.prototype.changePosition = function () {
        this.PosY = Math.floor(Math.random() * WindowSize["Height"] / cellSize);
        this.PosX = Math.floor(Math.random() * WindowSize["Width"] / cellSize);
    };
    return Apple;
}(GameObject));
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(PosX, PosY, TrailAmount) {
        var _this = _super.call(this, PosX, PosY) || this;
        _this.VelX = 0;
        _this.VelY = 0;
        _this.Trails = [];
        _this.TrailAmount = TrailAmount;
        return _this;
    }
    Snake.prototype.Draw = function () {
        fill(40, 200, 15);
        rect(this.PosX * (cellSize), this.PosY * (cellSize), cellSize, cellSize, 5);
        //console.log([this.PosX*(cellSize), this.PosY*(cellSize)])
        this.Trails.push(new Trail(this.PosX, this.PosY));
        while (this.Trails.length > this.TrailAmount) {
            this.Trails.shift();
        }
        this.Trails.forEach(function (trail) { trail.Draw(); });
    };
    Snake.prototype.Update = function () {
        var _this = this;
        this.PosX += this.VelX;
        this.PosY += this.VelY;
        this.Trails.forEach(function (trail) {
            if (trail.PosX == _this.PosX && trail.PosY == _this.PosY && (_this.VelX != _this.VelY))
                gameover = true;
            if (trail.PosX == apple.PosX && trail.PosY == apple.PosY)
                apple.changePosition();
        });
        console.log([this.PosX, this.PosY]);
        if (this.PosX < 0)
            this.PosX = WindowSize["Width"] / cellSize;
        if (this.PosX > WindowSize["Width"] / cellSize)
            this.PosX = 0;
        if (this.PosY < 0)
            this.PosY = WindowSize["Height"] / cellSize;
        if (this.PosY > WindowSize["Height"] / cellSize)
            this.PosY = 0;
        if (apple.PosX == snake.PosX && apple.PosY == snake.PosY) {
            snake.TrailAmount++;
            apple.changePosition();
        }
    };
    return Snake;
}(GameObject));
function setup() {
    snake = new Snake(0, 0, 5);
    apple = new Apple(0, 0);
    apple.changePosition();
    createCanvas(WindowSize["Width"], WindowSize["Height"]);
    frameRate(15);
}
function draw() {
    if (!gameover) {
        background(60, 60, 60);
        apple.Draw();
        snake.Draw();
        snake.Update();
    }
    else {
        fill(255, 255, 255);
        textSize(25);
        text("Press enter to restart", WindowSize["Width"] / 2 - 125, WindowSize["Height"] / 2, 400, 400);
    }
}
function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            if (snake.VelY != 1) {
                snake.VelX = 0;
                snake.VelY = -1;
            }
            break;
        case DOWN_ARROW:
            if (snake.VelY != -1) {
                snake.VelX = 0;
                snake.VelY = 1;
            }
            break;
        case LEFT_ARROW:
            if (snake.VelX != 1) {
                snake.VelX = -1;
                snake.VelY = 0;
            }
            break;
        case RIGHT_ARROW:
            if (snake.VelX != -1) {
                snake.VelX = 1;
                snake.VelY = 0;
            }
            break;
        case ENTER:
            if (gameover)
                location.reload();
            break;
    }
}
