class  Heart{
    constructor(x, y){
        this.image =  document.getElementById('heart');
        this.x = x;
        this.y = y;
        this.framey = 0;
        this.framex = 0;
        this.frameInterval = 1000/40;
        this.frametimer = 0;
        this.maxframe = 3;
        this.width = 105.5;
        this.height = 105;
        this.sizeUpMargin = 2;
    }

    update(deltatime){
        // Handle Sprite Animations
        if (this.frametimer > this.frameInterval){
            this.frametimer = 0;
            if (this.framex < this.maxframe) this.framex++;
            else{
                this.framex = 0;
                if(this.framey < this.maxframe){
                    this.framey++;
                }else{this.framey = 0;};
            }
        }else{
            this.frametimer += deltatime
        }
    }

    draw(context){
        context.save();
        context.drawImage(this.image,
            this.framex * this.width * this.sizeUpMargin,
            this.framey * this.height * this.sizeUpMargin,
            this.width * this.sizeUpMargin,
            this.height * this.sizeUpMargin,
            this.x,
            this.y,
            this.width,
            this.height
        );
        context.restore();
    }
}