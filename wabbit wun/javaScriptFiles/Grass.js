class Grass{
    constructor(x, y){
        this.image = document.querySelector('#grass');
        this.framey = 0;
        this.framex = 0;
        this.maxframe = 2;
        this.newFrame = 1;
        //one second = 1000;
        this.frameInterval = 1500;
        this.frametimer = 0;
        this.width = 100;
        this.height = 26;
        this.x = x;
        this.y = y - this.height + 10;
    }

    draw(context){
        context.drawImage(this.image,
            this.framex * this.width,
            this.framey * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width - 5,
            this.height
        );
    }
    update(deltatime){
        // Sprite Animations
        if (this.frametimer > this.frameInterval){
            this.frametimer = 0;
            if (this.framey === 0 || this.framey === 2){
                this.framey = 1;
                this.newFrame = -this.newFrame;
            }
            else {this.framey += this.newFrame}
            
        }else{
            this.frametimer += deltatime
        }
    }
    
}