class Spike{
    constructor(x, y){
        this.x = x;
        this.y = y + 33;
        this.origin = {x,y};
        this.width = 96;
        this.height = 66;
        this.markedForDeletion = false;
        this.image = document.getElementById('spike');
    }

    draw(context){
        //if (this.game.input.debug) { context.strokeRect(this.x, this.y, this.width ,this.height); };
        context.drawImage(this.image, this.x, this.y,this.width,this.height);
    }
    update(game){
        game.platforms.forEach(platform => {
            if((Math.abs(platform.y - (this.y + this.height)) < 10) && Math.abs(platform.x - this.x) < this.width){
                this.y = platform.y - this.height + 2;
                this.x = platform.x - this.width / 2 + 48;
            }
        });

        if(game.rectangularCollision(this, game.player)){
            const collidingSide = game.Collidingside(this, game.player);
            console.log(collidingSide)
            switch (collidingSide) {
                case 'TOP':
                    game.player.vy = -20;
                    game.player.handleHit();
                    return;
                case 'LEFT':
                    game.player.x = this.x - game.player.width - 1;
                    //stop player from moving further into object
                    game.player.speed = (game.player.speed < 0)? 0:game.player.speed;
                    return;
                case 'RIGHT':
                    game.player.x = this.x + this.width + 1
                    //stop player from moving further into object
                    game.player.speed = (game.player.speed > 0)? 0:game.player.speed;
                    return;
                case 'BOTTOM':
                    game.player.vy = 2;
                    game.player.y = this.y + this.height + 5;
                    //game.player.handleHit();
                    return;
                default:
                    return;
            }
        }
    }
}