class Plamtform{
    constructor(game, x, y){
        this.image = document.getElementById('plat');
        this.game = game;
        this.id = '48platform'
        this.x = x;
        this.y = y;
        this.size = 96;
        this.speedx = 0;
        this.speedy = 2;
        this.isPlatform = true;
    }

    draw(context){
        context.save();
        if(this.game.input.debug)context.strokeRect(this.x, this.y, this.size, this.size);
        context.drawImage(
            this.image,
            this.x,
            this.y
        );
        context.restore();
    }

    update(objects){
        this.x += this.speedx;
        this.y += this.speedy;
        objects.forEach(object => {
            if((
                this.x + this.size > object.x && 
                object.x + object.size > this.x &&
                this.y + this.size > object.y - object.size + 40&& 
                object.y + object.size > this.y - object.size + 15
            )){
                if(this.speedx !== 0){
                    this.speedx = - this.speedx;
                }else{
                    this.speedy = - this.speedy;
                }
            }
        });
        const collidingSide = this.game.Collidingside(this, this.game.player);
        //if(collidingSide === 'TOP'){
        //    game.player.y = this.y - game.player.height + 1;
        //    game.player.isOnGround = true;
        //    game.player.vy = 0;
        //}
    }
}