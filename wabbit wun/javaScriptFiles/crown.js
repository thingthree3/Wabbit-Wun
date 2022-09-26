class Crown{
    constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y + 30;
        this.image = document.getElementById('crown');
        this.width = 74;
        this.height = 44;
        this.playerIsFrozen = false;
    }
    
    draw(context){
        if (this.game.input.debug)context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update(deltatime){
        if(this.game.rectangularCollision(this, this.game.player) && !this.playerIsFrozen){
            this.game.player.isAllowedToMove = false;
            this.game.player.currentState = this.game.player.states.FALLING;
            this.game.player.currentState.enterState('FALLING');
            this.game.player.speed = 0;
            this.playerIsFrozen = true;
            this.game.starExsplosions.push(new Exsplosion(this.x, this.y, 'rgba(255, 255, 0, '));

        }
        if(this.playerIsFrozen){
            this.x += (((this.game.player.x + this.game.player.width / 2) - (this.x + this.width / 2)) * 0.03);
            this.y += (this.game.player.y - 25 - this.y) * 0.03;
        }
        
    }
}