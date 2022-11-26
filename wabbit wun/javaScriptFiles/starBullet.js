class Bullet{
    constructor(game, x, y, Dir){
        this.game = game;
        this.image =  document.getElementById('star');
        this.Dir = Dir;
        this.x = (x + ((this.Dir === 'Left')? -35: 35))
        this.y = y;
        this.origin = {x, y};
        this.radius = 65;
        this.radiusAdder = -0.5;
        this.framey = 0;
        this.framex = 0;
        this.speedx = (this.Dir === 'Left')? -4:4;
        this.acceluration = (this.Dir === 'Left')? -1:1;
        this.maxspeed = (this.Dir === 'Left')? -30:30;
        this.size = 15;
        this.markedForDeletion = false;
        this.frameInterval = 1000/50;
        this.frametimer = 0;
        this.maxframex = 4;
        this.maxframey = 5;
        this.width = 108.125;
        this.height = 108.125;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
        this.sizeUpMargin = 1.6;
        this.particleColors = [`rgb(83, 173, 254, 0.4)`, `rgb(83, 173, 254, 0.4)`, `rgb(122, 239, 255, 0.4)`]
        this.goingDownRight = true;
    }
    
    draw(context){
        context.save();
        //context.strokeRect(this.x, this.y, this.width ,this.height)
        if(this.game.input.debug){
            context.beginPath();
            context.fillStyle = 'black';
            context.arc(this.x + this.width / 2 - 2, this.y + this.height / 2 - 5, this.radius, 0, Math.PI *2);
            context.stroke();
        }
        context.drawImage(
            this.image,
            this.framex * this.width * this.sizeUpMargin,
            this.framey * this.height * this.sizeUpMargin - 35,
            this.width * this.sizeUpMargin,
            this.height * this.sizeUpMargin,
            this.x + 20,
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

        //handle gloying ball forcefield thingy
        if(this.radius >= 65 || this.radius <= 30){
            this.radiusAdder = -this.radiusAdder;
        }
        this.angle += this.va;
        this.y += Math.sin(this.angle);
        this.x += Math.sin(this.angle * 2);
        this.radius += this.radiusAdder;

        //hadnle collisions
        this.game.background.solidObjectsInLevel.forEach(object => {
            if(this.game.rectangularCollision(this, object) && object.id.slice(0,2) !== '48'){
                this.markedForDeletion = true;
                for (let i = 0; i < 90; i++) {
                    this.game.particles.unshift(new Splash(
                        this.x + this.width / 2 - 10,
                        this.y + this.height / 2,
                        null,
                        this.particleColors[Math.floor(Math.random() * this.particleColors.length)],
                        false,
                        10
                    ));

                    this.game.goundParticles.unshift(new GoundParticle(
                        this.x + this.width / 2 - 10,
                        this.y + this.height / 2,
                        [`rgb(83, 173, 254)`, `rgb(122, 239, 255)`],
                        true
                        ));
                }
            }
        });
        if(Math.abs(this.speedx) < Math.abs(this.maxspeed)){this.speedx += this.acceluration;};
        this.x += this.speedx;
        this.game.goundParticles.unshift(new GoundParticle(
            this.x + this.width / 2 - 10,
            this.y + this.height / 2,
            [`rgb(83, 173, 254)`, `rgb(122, 239, 255)`]
            ));
            
            this.game.enemies.forEach(enemy => {
                if(this.game.rectangularCollision(this, enemy)){
                    enemy.markedForDeletion = true;
                    if(enemy.origin){
                        this.game.replaceInLevel.push(enemy.origin);
                }
                if(enemy.id){
                    const randomMessage = this.game.randomMessage(enemy.DyingMessages);
                    this.game.UI.messagesOnScreen.push(
                        {
                            text:randomMessage,
                            spawnDate:new Date().getTime(),
                            lifeSpan:1500 + randomMessage.split(' ').length * 250,
                            id: enemy.id,
                            color: 'red',
                            style:'bold 20px Helvetica',
                            width:enemy.width,
                            x:enemy.x,
                            y:enemy.y
                        }
                    );                        
                }
                this.game.addScore(enemy);
                this.game.sounds.enemyDie.cloneNode(true).play();
                this.game.starExsplosions.unshift(
                    new Exsplosion(
                        enemy.x + ((enemy.width)? enemy.width:enemy.size) / 2,
                        enemy.y,
                        `rgba(83, 173, 254, `,
                        6,
                        0.015,
                        3000
                ));

            }
        });
    }

}