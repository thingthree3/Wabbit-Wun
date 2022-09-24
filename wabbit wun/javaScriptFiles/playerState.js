const setState = {
    IDLE:{framey:2,maxframe:0},
    RUNNING:{framey:0,maxframe:3},
    JUMPING:{framey:1,maxframe:0},
    FALLING:{framey:2,maxframe:0},
    FLIPPED_RUNNING:{framey:3,maxframe:3},
    FLIPPED_JUMPING:{framey:4,maxframe:0},
    FLIPPED_FALLING:{framey:5,maxframe:0},
    FLIPPED_IDLE:{framey:5,maxframe:0},
};

const Flipped = 'FLIPPED_';

class States{
    constructor(name, player){
        this.player = player;
        this.name = name;
    }

    enterState(statesName){
        //if right else left 
        const { framey, maxframe } = (this.player.Dir === 'Right') ? setState[Flipped + statesName] : setState[statesName];
        this.player.framey = framey;
        this.player.maxframe = maxframe;
        this.player.framex = 0;
    }
}

class IDLE extends States{
    constructor(player){
        super('IDLE', player);
        this.timer = new Date();
    }
    handleInput(input){
        if (Math.abs(this.player.speed) >= 1 && this.player.isOnGround){
            this.player.currentState = this.player.states.RUNNING;
            this.player.currentState.enterState('RUNNING');
        }
        else if(input.up){
            this.player.currentState = this.player.states.JUMPING;
            this.player.currentState.enterState('JUMPING');
        }
        if(new Date() - this.timer  > 12000){
            this.timer = new Date();
            this.player.HandleeMessages('IdleMessages');
        }
        
        //else if (this.player.framex >= 10 && !this.player.isOnGround){
        //    this.player.currentState = this.player.states.FALLING;
        //    this.player.currentState.enterState(setState.FALLING);
        //}
    }
    enterState(statesName){
        super.enterState(statesName);
        this.timer = new Date();
    }
}

class RUNNING extends States{
    constructor(player, game){
        super('RUNNING', player)
        this.game = game;
    }
    handleInput(input){
        this.game.particles.unshift(new Dust(
            (this.player.Dir === 'Right')? this.player.x : this.player.x + this.player.width,
            this.player.y + this.player.height,
        ));
        
        if(input.up){
            this.player.currentState = this.player.states.JUMPING;
            this.player.currentState.enterState('JUMPING');
        }
        else if(this.player.speed === 0 && this.player.isOnGround){
            this.player.currentState = this.player.states.IDLE;
            this.player.currentState.enterState('IDLE');
        }
        else if(this.player.vy > this.player.weight){
            this.player.currentState = this.player.states.FALLING;
            this.player.currentState.enterState('FALLING');
        }
    }
}

class JUMPING extends States{
    constructor(player){
        super('JUMPING', player)
    }
    enterState(state){
        super.enterState(state);
        if (this.player.isOnGround){
            this.player.vy = this.player.maxJumpHeight;
            JumpSound.play();
        }
    }
    handleInput(input){
        if (this.player.vy >= 0){
            this.player.currentState = this.player.states.FALLING;
            this.player.currentState.enterState('FALLING');
        }
        if(this.player.isOnGround){
            this.player.currentState = this.player.states.RUNNING;
            this.player.currentState.enterState('RUNNING');
        }
    }
}


class FALLING extends States{
    constructor(player){
        super('FALLING', player);
    }

    handleInput(input){
        if(this.player.isOnGround){
            this.player.currentState = this.player.states.RUNNING;
            this.player.currentState.enterState('RUNNING');
        }
    }
}