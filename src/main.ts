let cellSize = 32;
let gameover = false;

let WindowSize = {
    "Height" : 800,
    "Width" : 1280
}

let snake:Snake;
let apple:Apple;

let keysPressed:number[] = [];

class GameObject{

    PosX:number;
    PosY:number;

    constructor(PosX:number, PosY:number){
        
        this.PosX = PosX;
        this.PosY = PosY;
    }

    Draw():void{
        fill(40, 200, 15);
        rect(this.PosX*(cellSize), this.PosY*(cellSize), cellSize, cellSize, 5)
    }
}

class Trail extends GameObject{

    Draw():void{
        fill(40, 200, 15);
        rect(this.PosX*(cellSize), this.PosY*(cellSize), cellSize, cellSize, 5)
    }
}

class Apple extends GameObject{
    
    Draw():void{
        fill(255, 0, 0);
        rect(this.PosX*(cellSize), this.PosY*(cellSize), cellSize, cellSize, 5)
    }

    changePosition():void{
        this.PosY = Math.floor(Math.random() * WindowSize["Height"] / cellSize);
        this.PosX = Math.floor(Math.random() * WindowSize["Width"] / cellSize);
    }
}

class Snake extends GameObject{

    VelX:number = 0;
    VelY:number = 0;

    Trails:Trail[] = [];
    TrailAmount:number;

    constructor(PosX:number, PosY:number, TrailAmount:number){
        super(PosX, PosY)
        this.TrailAmount = TrailAmount;
    }

    Draw():void{
        fill(40, 200, 15);
        rect(this.PosX*(cellSize), this.PosY*(cellSize), cellSize, cellSize, 5);

        this.Trails.push(new Trail(this.PosX, this.PosY));
        while(this.Trails.length > this.TrailAmount){
            this.Trails.shift();
        }
        
        this.Trails.forEach((trail) => {trail.Draw();});
    }

    Update():void{
        this.PosX += this.VelX;
        this.PosY += this.VelY;

        this.Trails.forEach((trail:Trail) => {
            if(trail.PosX == this.PosX && trail.PosY == this.PosY && (this.VelX != this.VelY))
                gameover = true;
            if(trail.PosX == apple.PosX && trail.PosY == apple.PosY)
                apple.changePosition();
        });

        for(let i =0; i<=keysPressed.length; i++){
            switch(keysPressed[i]){
                case 87:
                    if(snake.VelY != 1){
                        snake.VelX = 0;
                        snake.VelY = -1;
                    }
                    break;
                case 83:
                    if(snake.VelY != -1){
                        snake.VelX = 0;
                        snake.VelY = 1;
                    }
                    break;
                case 65:
                    if(snake.VelX != 1){
                        snake.VelX = -1;
                        snake.VelY = 0;
                    }
                    break;
                case 68:
                    if(snake.VelX != -1){
                        snake.VelX = 1;
                        snake.VelY = 0;
                    }
                    break;
                }
                keysPressed.splice(0,1);
        }


        if (this.PosX < 0)
            this.PosX = WindowSize["Width"]/cellSize;
        if (this.PosX > WindowSize["Width"]/cellSize)
            this.PosX = 0;
        if (this.PosY < 0)
            this.PosY = WindowSize["Height"]/cellSize;
        if (this.PosY > WindowSize["Height"]/cellSize)
            this.PosY = 0;

        if (apple.PosX == snake.PosX && apple.PosY == snake.PosY){
            snake.TrailAmount++;
            apple.changePosition();
        }
    }
}


function setup(){
    snake = new Snake(0,0,5);
    apple = new Apple(0,0);
    apple.changePosition();

    createCanvas(WindowSize["Width"], WindowSize["Height"]);
    frameRate(20);
}

function draw(){
    if(!gameover){
        background(60,60,60);
        
        apple.Draw();
        snake.Draw();
        snake.Update();
    }
    else{
        fill(255, 255, 255);
        textSize(25);
        text("Press enter to restart", WindowSize["Width"]/2-125, WindowSize["Height"]/2, 400, 400);
    }
}

function keyPressed(){
    if(keysPressed.length < 2){
        keysPressed.push(keyCode);
    }
    if(keyCode == ENTER && gameover){
        location.reload();
    }
}
