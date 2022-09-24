class Carrot{
    constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.origin = {x,y};
        this.image = document.querySelector('#carrot');
        this.framey = 0;
        this.framex = 0;
        this.maxframe = 1;
        this.frameInterval = 500;
        this.frametimer = 0;
        this.width = 62.666666666666664;
        this.height = 66.66666666666667;
        this.maxMovementMarginX = 4;
        this.maxMovementMarginY = 2;
        this.movedX = 0;
        this.movedY = 0;
        this.movex = Math.random() * Math.PI * 2;
        this.movey = Math.random() * this.movex * 2;
        this.markedForDeletion = false;
        this.moveInterval = 100;
        this.moveTimer = 0;

    }

    draw(context){
        context.save();
        context.fillStyle = 'rgba(0,0,0,0.4)';
        if (this.game.input.debug)context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image,
            this.framex * this.width * 1.5,
            this.framey * this.height * 1.5,
            this.width * 1.5,
            this.height * 1.5,
            this.x,
            this.y,
            this.width,
            this.height
        );
        context.restore();
    }

    update(deltatime){
        // Sprite Animations
        if (this.frametimer > this.frameInterval){
            this.frametimer = 0;
            if (this.framex < this.maxframe){this.framex++;}
            else this.framex = 0;
        }else{
            this.frametimer += deltatime
        }
        this.moveTimer = 0;
        this.movex += 0.1;
        this.movey += 0.2;
        this.x = this.origin.x + Math.cos(this.movex) * 12 + Math.random();
        this.y = this.origin.y + Math.sin(this.movey) * 9 + Math.random();

        if(this.game.rectangularCollision(this.game.player, this)){
            this.markedForDeletion = true;
            this.game.replaceInLevel.push(this.origin);
            let oldAmountOfHearts = this.game.hearts.length
            this.game.addScore(this);
            if(this.game.hearts.length > oldAmountOfHearts) this.game.player.HandleeMessages('CarrotsMessages');
            this.game.sounds.carrotCrunch.cloneNode(true).play();
            for(let i=0; i<35;i++){
                this.game.goundParticles.unshift(
                    new GoundParticle(
                        this.x + this.width / 2,
                        this.y + this.height / 2,
                        [
                            'rgb(247, 196, 43)',
                            'rgb(240, 160, 48)',
                            'rgb(240, 160, 48)',
                            'rgb(240, 160, 48)',
                            'rgb(240, 160, 48)'
                        ]
                    )
                );
            }
        }
    }

    
}