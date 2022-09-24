class Star{
    constructor(game, x, y, isAmmo=false){
        this.game = game;
        this.image =  document.getElementById('star');
        this.x = x;
        this.y = y;
        this.isAmmo = isAmmo;
        this.origin = {x,y};
        this.radius = 30;
        this.radiusAdder = -0.5;
        this.framey = 0;
        this.framex = 0;
        this.size = 70;
        this.markedForDeletion = false;
        this.frameInterval = 1000/50;
        this.frametimer = 0;
        this.maxframex = 4;
        this.maxframey = 5;
        this.width = 86.5;
        this.height = 86.5;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
        this.sizeUpMargin = 2;
        this.particleColors = [`rgb(83, 173, 254, 0.4)`, `rgb(83, 173, 254, 0.4)`, `rgb(122, 239, 255, 0.4)`]
        this.goingDownRight = true;
    }

    draw(context){
        context.save();
        //context.strokeRect(this.x, this.y, this.width ,this.height)
        if (this.game.input.debug) { context.strokeRect(this.x, this.y, this.size ,this.size); };
        context.drawImage(this.image,
            this.framex * this.width * this.sizeUpMargin,
            this.framey * this.height * this.sizeUpMargin - 35,
            this.width * this.sizeUpMargin,
            this.height * this.sizeUpMargin,
            this.x + 10,
            this.y + 5,
            this.width,
            this.height
        );
        context.beginPath();
        context.arc(this.x + this.width / 2 - 2, this.y + this.height / 2 - 5, this.radius, 0, Math.PI *2);
        context.fillStyle = `rgba(83, 173, 254, 0.4)`;
        context.fill();
        context.restore();
    }

    update(deltatime){
            this.game.particles.unshift(new Splash(
                this.x + this.width / 2 - 10,
                this.y + this.height / 2,
                null,
                this.particleColors[Math.floor(Math.random() * this.particleColors.length)],
                false,
                10
            ));
        // Handle Sprite Animations
        if (this.frametimer > this.frameInterval){
            this.frametimer = 0;
            if(this.goingDownRight){
                if (this.framex < this.maxframex) this.framex++;
                else{
                    if(this.framey < this.maxframey){
                        this.framex = 0;
                        this.framey++;
                    }else{
                        this.goingDownRight = false;
                    };
                }
            }
            else{
                //going up lef
                if (this.framex > 0) this.framex--;
                else{
                    if(this.framey > 0){
                        this.framey--;
                        this.framex = this.maxframex;
                    }
                    else this.goingDownRight = true;
                }
            }
        }
        else{
            this.frametimer += deltatime
        }

        //handle gloying ball
        if(this.radius >= 65 || this.radius <= 30){
            this.radiusAdder = -this.radiusAdder;
        }
        this.angle += this.va;
        this.y += Math.sin(this.angle);
        this.x += Math.sin(this.angle * 2);
        this.radius += this.radiusAdder;

        //hadnle collisions
        if(this.isAmmo){
            this.x += (((this.game.width - (this.width + 20)) - this.x) * 0.03);
            this.y += (0 - this.y) * 0.03;
        }else{            
            if(this.game.rectangularCollision(this.game.player, this)){
                this.markedForDeletion = true;
                this.game.sounds.starSound.cloneNode(true).play();
                this.game.starExsplosions.unshift(new Exsplosion(this.x + this.width / 2, this.y + this.height / 2));
                this.game.player.HandleeMessages('gainStarMessages');
                this.game.addHeart();
                this.game.addScore(this);
            }
            this.game.goundParticles.unshift(new GoundParticle(
                this.x + this.width / 2 - 10,
                this.y + this.height / 2,
                [`rgb(83, 173, 254)`, `rgb(122, 239, 255)`]
                ));
        }
        //this.size = this.radius;
    }
}