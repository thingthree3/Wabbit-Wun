class Boom{
    constructor(x, y){
        this.image =  document.getElementById('boom');
        this.markedForDeletion = false;
        this.framey = 0;
        this.framex = 0;
        this.frameInterval = 1000/30;
        this.frametimer = 0;
        this.maxframe = 4;
        this.width = 100;
        this.height = 90;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }

    draw(context){
        context.drawImage(
            this.image,
            this.framex * this.width,
            this.framey * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
            );
    }

    update(deltatime){
        // Handle Sprite Animations
        if (this.frametimer > this.frameInterval){
            this.frametimer = 0;
            if (this.framex < this.maxframe) this.framex++;
            else this.markedForDeletion = true;
        }else{
            this.frametimer += deltatime
        }
    }
}