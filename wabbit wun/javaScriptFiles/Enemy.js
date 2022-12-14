class Enemy{
    constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.origin = {x,y};
        this.framex = 0;
        this.framey = 0;
        this.speedx = 0;
        this.speedy = 0;
        this.fps = 7;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        
        this.markedForDeletion = false;
    }
    update(deltatime){
        this.x -= this.speedx;
        this.y += this.speedy;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0
            if (this.framex < this.maxFrame) this.framex++;
            else this.framex = 0;
        }else{
            this.frameTimer += deltatime;
        }
    }
    draw(context){
        let height = (this.size)? this.size : this.height, width = (this.size)? this.size : this.width;
        if (this.game.input.debug)context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(
            this.image,
            this.framex * width,
            this.framey * height,
            width,
            height,
            this.x,
            this.y,
            width,
            height
        )
    }
}

class FireBall{
    constructor(game, x, y, dir, PerantId){
        this.game = game;
        this.x = x;
        this.y = y;
        this.Dir = dir;
        this.PerantId = PerantId;
        this.size = 50;
        this.speedx = (this.Dir === 'LEFT')? -6:6;
        this.maxspeed = (this.Dir === 'LEFT')? -28:28;
        this.markedForDeletion = false;
        this.acceluration = (this.Dir === 'LEFT')? -0.85:0.85;
    }
    update(deltatime){
        this.game.background.solidObjectsInLevel.forEach(object => {
            if(this.game.rectangularCollision(this, object) && object.id.slice(0,2) !== '48'){this.markedForDeletion = true;}
        });
        if(Math.abs(this.speedx) < Math.abs(this.maxspeed)){this.speedx += this.acceluration;};
        this.x += this.speedx;
        this.game.particles.unshift(new Fire(this.x, this.y));

        if(this.game.rectangularCollision(this.game.player, this)){
            this.markedForDeletion = true;
            const PerantEnemy = this.game.enemies.find(enemy => enemy.id == this.PerantId);
            this.game.addMessageToScreen(
                {
                    messagesChoice:PerantEnemy.HitPlayerMessages,
                    Id:this.PerantId
                }
            );
            if(Math.random() > 0.5) setTimeout(() => this.game.player.HandleeMessages('responseMessages'), 400);
            if(this.Dir === 'LEFT'){
                this.game.player.x -= 24;
                this.game.player.speed = -20;                        
            }
            else{
                this.game.player.x += 24;
                this.game.player.speed = 20;
            }
            this.game.player.handleHit();
            for (let i=0;i<70;i++) {this.game.particles.unshift(new Splash(this.x, this.y, document.getElementById('fire')));};};
    }
    draw(context){
        if(!this.game.input.debug)return;
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI *2);
        context.stroke();
        context.restore();
    }
}

class GroundEnemy extends Enemy{
    constructor(game, x, y){
        super(game, x, y);
        this.HitPlayerMessages = [
            'Ezzz, get Sniped Nooob!',
            'Me > You',
            'Never seen Worse ;-;',
            'I do like me some cocked Wabbit',
            "I didn't think you would be this easy to hit...",
            'Say bye bye to your Health :3',
            'Go back to level 1 when?',
            'Imagine Getting clapped 💀'
        ];
        this.DyingMessages = [
            'Ayo Wtf?!?!!?!??! ',
            "You fr pulled out a star that's crazy",
            "Toxic e.e",
            "Imagine needing me gone to win, Nub!",
            "I'll be speaking with my lawyer about this.",
            "i did't think you could hit me with that aim of yours 💀",
            'Took you long enough XD'
        ];
        this.width = 60;
        this.height = 87;
        this.x = x - this.width / 2 + 48;
        this.y = y  + 16;
        this.image = document.getElementById('Enemy_plant');
        this.id = "" + this.game.enemies.length;
        this.maxFrame = 1;
        this.coolDownInterval = 0;
        this.justSaw = false;
        this.justSawCountDown = 300;
        this.Dir = 'LEFT';
    }

    update(deltatime){
        super.update(deltatime);

        if(this.Dir === 'RIGHT'){
            this.framey = 1;
        }else{
            this.framey = 0;
        }
        if(this.coolDownInterval > 0){this.coolDownInterval -= deltatime;};
        this.game.particles.unshift(new Dust(this.x + this.width / 2, this.y + 40));
        if(this.justSaw && this.justSawCountDown > 0){
            this.justSawCountDown -= deltatime;
        }
        if(this.justSawCountDown <= 0){
            this.game.enemies.unshift(new FireBall(this.game, this.x, this.y, this.Dir, this.id));
            this.game.sounds.enemyShootSound.cloneNode(true).play();
            this.justSawCountDown = 200;
            this.justSaw = false;
        }
        if(this.game.rectangularCollision(this, this.game.player)){
            
            
            for (let i = 0; i < 140; i++) {
                const newSplash = new Splash(
                    this.x + this.width / 2,
                    this.y + this.height / 2,
                    null,
                    'rgba(0,0,0,0.2)',
                    false,
                    10
                );
                newSplash.speedx *= 2;
                newSplash.speedy *= 2;
                this.game.particles.unshift(newSplash);
            }
            const playersCollidingSide = this.game.Collidingside(this.game.player, this);

            switch (playersCollidingSide) {
                case 'BOTTOM':
                    this.game.player.vy = -20;
                    break;
                case 'RIGHT':
                    this.game.player.speed = - this.game.player.maxspeed * 2;
                    break;
                case 'LEFT':
                    this.game.player.speed = this.game.player.maxspeed * 2;
                case 'TOP':
                    if(this.game.player.y >= this.y + this.height){
                        this.game.player.y = this.y + this.height + 10;
                        this.game.player.vy = 5;
                        this.game.player.x -= (this.x - this.game.player.x);
                    }
                    break;
                default:
                    break;
            }
            if(playersCollidingSide) this.game.player.handleHit();
        };

        if (this.game.player.y + this.game.player.height - 30 > this.y && this.y + this.height > this.game.player.y + 50){
            if(this.game.player.x > this.x + this.width){
                this.Dir = 'RIGHT';
            }
            else if(this.game.player.x + this.game.player.width < this.x){
                this.Dir = 'LEFT';
            }

            if(!this.justSaw && this.coolDownInterval <= 0){
                this.justSaw = true;
                this.coolDownInterval = 2000;
                //           2 seconds  ^
            }
        }

        //Handle if on platform
        this.game.platforms.forEach(platform => {
            if((Math.abs(platform.y - (this.y + this.height)) < 10) && Math.abs(platform.x - this.x) < this.width){
                this.y = platform.y - this.height;
                this.x = platform.x - this.width / 2 + 48;
            }
        });
    }
}

class Spike{
    constructor(game, x, y){
        this.game = game;
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
    update(deltatime){
        this.game.platforms.forEach(platform => {
            if((Math.abs(platform.y - (this.y + this.height)) < 10) && Math.abs(platform.x - this.x) < this.width){
                this.y = platform.y - this.height + 2;
                this.x = platform.x - this.width / 2 + 48;
            }
        });

        if(this.game.rectangularCollision(this, this.game.player)){
            const collidingSide = this.game.Collidingside(this, this.game.player);
            switch (collidingSide) {
                case 'TOP':
                    this.game.player.vy = -20;
                    this.game.player.handleHit();
                    return;
                case 'LEFT':
                    this.game.player.x = this.x - this.game.player.width - 1;
                    //stop player from moving further into object
                    this.game.player.speed = (this.game.player.speed < 0)? 0:this.game.player.speed;
                    return;
                case 'RIGHT':
                    this.game.player.x = this.x + this.width + 1;
                    //stop player from moving further into object
                    this.game.player.speed = (this.game.player.speed > 0)? 0:this.game.player.speed;
                    return;
                case 'BOTTOM':
                    this.game.player.vy = 2;
                    this.game.player.y = this.y + this.height + 5;
                    //this.game.player.handleHit();
                    return;
                default:
                    return;
            }
        }
    }
}