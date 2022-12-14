class Player{
    constructor(game, x, y){
        this.game = game;
        this.image = document.querySelector('#player');
        this.width = 55;
        this.height = 67;
        this.x = Number(x) + 25;
        this.y = Number(y) + 30;
        
        this.fps = 20;
        this.framex = 0;
        this.framey = 0;
        this.maxframe = 0;
        this.frametimer = 0;
        this.frameInterval = 1000/this.fps;
        this.hitCooldown = 0;
        this.hitCooldownInterval = 1000;

        this.isAllowedToMove = true;
        this.boostCoolDownTimer = 0;
        this.boostCoolDownInterval = 400;
        this.attackCooldownInterval = 750;

        //`again... Really?╭∩╮( •̀_•́ )╭∩╮`
        this.textColor = 'rgb(254, 1, 154)';
        this.responseMessages = [
            ':((',
            'Omg why are they so mean? (⋟﹏⋞)',
            "be Quiet you can't even move 💀",
            "let's see if your still talking when i come back with a star",
            'why do they always bully me? :<',
            "why TF can they talk again? ._."
        ];
        this.hurtMessages = [
            `Oww :(((`,
            'i Really want to Go Home (⋟﹏⋞)',
            `Omg why are you doing this to me? o(╥﹏╥)o`,
            `Omg why are you doing this to me? o(╥﹏╥)o`,
            `Omg why are you doing this to me? o(╥﹏╥)o`,
            `you find this amusing: don't you? (~.~)`,
            `that one hurt... (*~*) wait where am i?`,
            `I thought we where friends o(╥﹏╥)o`,
            `I... i can see the light (×﹏×)`,
            `I Can't... I Can't feel my legs `,
        ];
        this.gainStarMessages = [
            'OMG SO SHIIINNNYYY (っ´ω`c)♡',
            `WTF. so much health щ(ὸロὸ щ)`,
            `Press 'X' when? ._.`,
            'i feel stronger...',
        ];
        this.CarrotsMessages = [
            'Im so Full!! (^-^)',
            'best day ever tbh (ヅ',
            `So many Carrots, you'll never know where they go >:)`,
            'munch munch',
            'munch munch',
            'munch munch',
            'I love you, best player ever 💜'
        ]
        this.UsePowerUpMessages = [
            'And they said wabbits are prey animals ψ(`∇´)ψ',
            'bye bye losers >:)',
            `Those guys we're so mean anyways >:[`,
            'they finally gone 💀',
            'wabbit > all'
        ];
        this.IdleMessages = [
            'Umm... you still there?',
            'We just chillen out or what? XD',
            '(∪｡∪)｡｡｡zz…',
            `don't move = gay`,
            `... i'm still here ._.`,
            'alrighty then, imma just sit here... ;-;',
            'imagine being afk 💀',
            'i guess im a solo wabbit now :/',
            'i wanna go home ;('

        ];
        this.wasHit = false;
        this.wasHitInterval = 200;
        this.wasHitTimer = 0;
        
        this.hearts = 3;

        this.attackCooldown = 0;
        
        this.dashSpeed = 25;
        this.friction = 0.90;
        this.maxFallSpeed = 20;
        this.maxJumpHeight = -20;
        this.vy = 0;
        this.speed = 0;
        this.maxspeed = 6;
        this.weight = 1;
        this.isOnGround = false;
        this.lastDirection = 'Right'
        
        this.Dir = 'Right'
        this.stillFacingSameDir = 'Right'
        this.currentState = new IDLE(this);
        this.currentState.enterState('IDLE')
        this.states = {
            IDLE: new IDLE(this),
            RUNNING:new RUNNING(this, this.game),
            JUMPING: new JUMPING(this),
            FALLING: new FALLING(this)
        };
    }

    draw(context){
        context.save();
        if (this.game.input.debug) { context.strokeRect(this.x, this.y, this.width ,this.height); };
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
        context.restore();
    }

    update(deltatime, solidObjects, input){
        // Handle object collisions 
        this.checkCollisions(solidObjects.concat(this.game.platforms));
        if(this.isAllowedToMove) this.currentState.handleInput(input);

        // Handle Horizontal Movement And Player's Speed's
        if(this.isAllowedToMove) this.HandlePlayerMovement(input, deltatime);

        //handle player damage cooldown
        if(this.wasHit){
            if(this.wasHitTimer < this.wasHitInterval){
                this.wasHitTimer+=deltatime;
            }else{
                this.wasHitTimer = 0;
                this.wasHit = false;
            }
        }

    // Handle applying gravity 
        if(this.vy >= this.maxFallSpeed) this.vy = this.maxFallSpeed;
        if (!this.isOnGround){this.vy++;} //+= this.weight;
        this.y += this.vy;
     
    // Handle Sprite Animations
        if (this.frametimer > this.frameInterval){
            this.frametimer = 0;
            if (this.framex < this.maxframe) this.framex++;
            else this.framex = 0;
        }else{
            this.frametimer += deltatime
        }

    }

    checkCollisions(objects){
        this.isOnGround = false;
        for (const object of objects) {
            const collidingSide = this.game.Collidingside(this, object);

            if(!collidingSide) continue;
            
            // if the object is a specal floating platform it should be jumped through
            if(object.id.slice(0,2) === '48'){
                if(collidingSide === 'BOTTOM' && this.vy >= 0){
                    if(object.id.includes('platform')){
                        this.x += object.speedx;
                        if(object.speedy > 0){
                            this.y = object.y - this.height + 10;
                            this.isOnGround = true;
                            this.vy = 0;
                            continue;
                        }
                    }
                    this.y = object.y - this.height + 1;
                    this.isOnGround = true;
                    this.vy = 0;
                    continue;
                }
                continue;
            }
            
            if(object.id.includes('door')){
                this.game.enterNewlevel(object.id.match(/0[0-9]+/g));
                return;
            };

            switch (collidingSide) {
                case 'TOP':
                    this.vy = (this.vy < 0)? 0:this.vy;
                    break;
                case 'BOTTOM':
                    this.y = object.y - this.height + 1;
                    this.isOnGround = true;
                    this.vy = 0;
                    break;
                case 'LEFT':
                    this.x = object.x + object.size - 1;
                    //stop player from moving further into object
                    this.speed = (this.speed < 0)? 0:this.speed;
                    break;
                case 'RIGHT':
                    this.x = object.x - this.width + 1
                    //stop player from moving further into object
                    this.speed = (this.speed > 0)? 0:this.speed;
                    break;

                default:
                    break;
            }
        }
    }

    handleHit(){
        if(new Date() - this.hitCooldown < this.hitCooldownInterval) return;

        this.game.minusHeart();
        
        this.hitCooldown = new Date();
        
        if(Math.random() < 0.3) this.HandleeMessages('hurtMessages');
        
        for(let i=0; i<35;i++){this.game.goundParticles.unshift(new GoundParticle(
            this.x + this.width / 2,
            this.y,
            [`rgb(235, 30, 37)`, `rgb(255, 36, 41)`]
            ));
        }
    }

    HandlePlayerMovement(input, deltatime){
        //Handle horizontal movement
        
        if (input.right && Math.abs(this.speed) < this.maxspeed){
            this.speed += (this.maxspeed - Math.abs(this.speed)) * 0.15;
        }
        else if (input.left && Math.abs(this.speed) < this.maxspeed){
            this.speed += -(this.maxspeed - Math.abs(this.speed)) * 0.15;
        }
        else if(Math.abs(this.speed) < 0.5){this.speed = 0;}
        
        //handle friction xox slowly stop player
        else this.speed *= this.friction;
        if((this.Dir === 'Right' && this.speed < 0)||(this.Dir === 'Left' && this.speed > 0)){this.speed *= this.friction;}
        this.x += this.speed;

        // Handle Direction Change's
        if(input.left && this.lastDirection === 'Right') { this.Dir = 'Left'; this.lastDirection = 'Left';};
        if(input.right && this.lastDirection === 'Left') { this.Dir = 'Right'; this.lastDirection = 'Right';};
        // if the direction we were facing has changed flipp player
        if(this.Dir !== this.stillFacingSameDir){
            this.stillFacingSameDir = this.Dir;
        // Re-Enter PLayer-State so player image Flipps
        this.currentState.enterState(this.currentState.name);
        }

        //Handle dash xoxx space bar speed bost
        if(input.dash && this.boostCoolDownTimer <= 0){
            this.speed = (this.Dir == 'Right')?this.dashSpeed:-this.dashSpeed;
            this.game.sounds.dashSound.cloneNode(true).play();
            this.boostCoolDownTimer = this.boostCoolDownInterval;
            this.game.boosts.unshift(new Boom(this.x + this.width / 2, this.y + this.hearts / 2 + 25));
        } else if(this.boostCoolDownTimer > 0) this.boostCoolDownTimer -= deltatime;

        //Handle attack and attack animations
        if(
            input.attack
            &&this.attackCooldown <= 0
            &&this.game.ammos.length > 0
            ){
            this.HandleeMessages('UsePowerUpMessages');
            this.game.bullets.unshift(new Bullet(this.game, this.x, this.y, this.Dir));
            this.attackCooldown = this.attackCooldownInterval;
            const deletedHEart = this.game.ammos.pop();
            for (let i = 0; i < 70; i++) {
                this.game.goundParticles.unshift(new GoundParticle(
                    deletedHEart.x + deletedHEart.width / 2 - 10,
                    deletedHEart.y + deletedHEart.height / 2,
                    [`rgb(83, 173, 254)`, `rgb(122, 239, 255)`],
                    false
                    ));

            }
        }else if(this.attackCooldown > 0) this.attackCooldown -= deltatime;
    }

    HandleeMessages(messageName){
        this.game.addMessageToScreen(
            {
                messagesChoice:this[messageName],
                Id:'Player',
                Color:this.textColor
            }
        )
    }
}