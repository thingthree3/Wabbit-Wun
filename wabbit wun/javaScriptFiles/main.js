window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1150;
    canvas.height = 866;

    class Game {
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.maxparticles = 450;
            this.particles = [];
            this.replaceInLevel = [];

            this.pausedTimer = 0;
            this.time = 30000;
            this.maxtime = 30000;
            this.gameover = false;

            this.currentLevel = 0;
            this.wallsRemoved = false;
            this.sounds = {
                dashSound:document.getElementById('dashSound'),
                enemyDie:document.getElementById('enemyDie'),
                starSound:document.getElementById('starSound'),
                enemyShootSound:document.getElementById('enemyShootSound'),
                JumpSound:document.getElementById('JumpSound'),
                carrotCrunch:document.getElementById('carrotCrunch'),
                hitSound:document.getElementById('hitSound'),
            }

            this.speed = 0;
            this.overLapMargin = 6;
            this.ammos = [];
            this.boosts = [];
            this.floatingMessages = [];
            this.lives = 5;
            this.collisions = [];
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemeyInterval = 500;
            this.score = 0;

            this.fontColor = 'black';


            this.hearts = [new Heart(250, 0), new Heart(350, 0), new Heart(450, 0)];
            this.platforms = [];
            this.stars = [];
            this.bullets = [];
            this.starExsplosions = [];
            this.goundParticles = [];
            this.carrots = [];
            this.grasses = [];
            this.input = new InputHandler();
            this.UI = new UI(this);
            this.player = new Player(this, 420, 480);
            this.background = new BackGround(this);

        }

        draw(context){
            this.background.draw(context);
            this.goundParticles.forEach(goundParticle => goundParticle.draw(context));
            this.carrots.forEach(carrot => carrot.draw(context));
            this.boosts.forEach(boost => boost.draw(context));
            this.grasses.forEach(grass => grass.draw(context));
            this.platforms.forEach(platform => platform.draw(context));
            this.player.draw(context);
            this.particles.forEach(particle => particle.draw(context));
            this.enemies.forEach(enemy => enemy.draw(context));
            this.ammos.forEach(ammo => ammo.draw(context));
            this.hearts.forEach(heart => {heart.draw(context)});
            this.stars.forEach(star => star.draw(context));
            this.bullets.forEach(bullet => bullet.draw(context));
            this.starExsplosions.forEach(exsplosion => exsplosion.draw(context));
            this.UI.draw(context);
        }
        
        update(deltatime){
            //if all carrots are eaten walls should be removed for next level
            if(this.carrots.length === 0 && !this.wallsRemoved){
                this.background.removeWallsInLevel();
                this.wallsRemoved = true;
            }
            if(this.particles.length > this.maxparticles){
                this.particles.length = this.maxparticles;
            }
            this.bullets.forEach(bullet => bullet.update(deltatime));
            this.ammos.forEach(ammo => ammo.update(deltatime, this));
            this.starExsplosions.forEach(exsplosion => exsplosion.update(deltatime));
            this.stars.forEach(star => star.update(deltatime, this));
            this.hearts.forEach(heart => heart.update(deltatime));
            this.goundParticles.forEach(goundParticle => {goundParticle.update(deltatime, this.background.solidObjectsInLevel, this.rectangularCollision)});
            this.grasses.forEach(grass => grass.update(deltatime));
            this.boosts.forEach(boost => boost.update(deltatime));
            this.platforms.forEach(platform => platform.update(this.background.solidObjectsInLevel));
            this.player.update(deltatime, this.background.solidObjectsInLevel, this.input.keys);
            this.enemies.forEach(enemy => enemy.update(deltatime));
            this.particles.forEach(particle => particle.update());
            this.carrots.forEach(carrot => {carrot.update(deltatime)});
            

            //filter items
            this.bullets = this.bullets.filter(bullet => !bullet.markedForDeletion);
            this.starExsplosions = this.starExsplosions.filter(exsplosion => !exsplosion.markedForDeletion)
            this.boosts = this.boosts.filter(boost => !boost.markedForDeletion);
            this.goundParticles = this.goundParticles.filter(goundParticle => !goundParticle.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.carrots = this.carrots.filter(carrot => !carrot.markedForDeletion);
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            
            /* stars are specail because when they collide with player
               them become apart of the ui instead of being deleted */
            this.stars.forEach((star, index) => {
                if(star.markedForDeletion){
                    const newAmmo = this.stars.splice(index, 1)[0];
                    newAmmo.isAmmo = true;
                    newAmmo.markedForDeletion = false;
                    this.replaceInLevel.push(newAmmo.origin);
                    this.ammos.push(newAmmo, newAmmo);
                }
            });
        }

        enterNewlevel([x, y, newLevel]){
            const PlayerIsJumping = this.player.vy < 0;
            console.log(newLevel, this.currentLevel);
            this.background.removeWallsInLevel();
            this.wallsRemoved = false;
            this.goundParticles = [];
            this.grasses = [];
            this.carrots = [];
            this.enemies = [];
            this.particles = [];
            this.spikes = [];
            this.stars = [];
            this.platforms = [];
            this.player = new Player(this, x, y);
            if(this.currentLevel < Number(newLevel)){
                this.player.speed = -1;
                
            }else{
                this.player.speed = 1;
            }
            this.player.currentState.enterState('RUNNING');
            if(PlayerIsJumping) {this.player.vy = this.player.maxJumpHeight;};
            this.player.Dir = (this.player.speed === -1)? 'Right':'Left';
            this.player.lastDirection = (this.player.Dir == 'Right')?'Right':'Left';
            this.currentLevel = Number(newLevel);
            this.background.currentLevel = this.currentLevel;
            this.background.findSolidObjects(this.background.levels[this.currentLevel]);
            

        }

        rectangularCollision(rect1, rect2){
            return (
                rect1.x + ((rect1.size)? rect1.size:rect1.width) > rect2.x &&
                rect2.x + ((rect2.size)? rect2.size:rect2.width) > rect1.x &&
                rect1.y + ((rect1.size)? rect1.size:rect1.height) > rect2.y && 
                rect2.y + ((rect2.size)? rect2.size:rect2.height) > rect1.y    
            );
        }

        getWidthAndHeight(obj){
            return [(obj.size)? obj.size : obj.width, (obj.size)? obj.size : obj.height];
        }

        Collidingside(rect1, rect2){
            //if the obect is colliding with the player
            if(this.rectangularCollision(rect1, rect2)){
    

                const [w1, h1] = this.getWidthAndHeight(rect1), [w2, h2] = this.getWidthAndHeight(rect2);
    
                const cornersNotToClose =   (Math.abs(rect1.x + w1 - rect2.x) > this.overLapMargin) && (Math.abs(rect1.x - rect2.x - w2) > this.overLapMargin);
                
                if((rect1.y + h1 >= rect2.y && rect1.y < rect2.y) && (cornersNotToClose)){
                    return 'BOTTOM';
                }
    
                if((rect1.y <= rect2.y + h2 && rect2.y + h2 < rect1.y + this.overLapMargin * 5) && (cornersNotToClose)){
                    return 'TOP';
                }
    
                if((rect1.x <= rect2.x + w2 && rect2.x + w2 < rect1.x + this.overLapMargin * 7)
                && (Math.abs(rect1.y + h1 - rect2.y) > this.overLapMargin * 2)){
                    return 'LEFT';
                }
    
                if((rect1.x + w1 >= rect2.x && rect1.x + w1 < rect2.x + this.overLapMargin * 7)
                && (Math.abs(rect1.y + h1 - rect2.y) > this.overLapMargin * 2)){
                    return 'RIGHT';
                }
            }
    
            return '';
        }

        //addEnemy(){
        //    if (this.speed>0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
        //    else if(this.speed > 0 )this.enemies.push(new ClimbingEnemy(this));
        //    this.enemies.push(new FlyingEnemy(this));
        //}

        addHeart(){
            const range = (this.hearts.length + 1 > 6)? 6 : this.hearts.length + 1;
            this.hearts = [];
            for (let i = 0; i < range; i++){
                var newHeart = new Heart(250 + 100 * i, 0);
                this.hearts.push(newHeart);
            }
            this.starExsplosions.unshift(new Exsplosion(newHeart.x + newHeart.width / 2, newHeart.y + newHeart.height / 2, `rgba(235, 30, 37, `, 3))

        }
        
        addMessageToScreen({messagesChoice, Color='black', Style='bold 20px Helvetica', Id=''}){
            if(!messagesChoice)return;
            const randomMessage = this.randomMessage(messagesChoice);
            this.UI.messagesOnScreen.push(
                {
                    text:randomMessage,
                    spawnDate:new Date().getTime(),
                    lifeSpan:1500 + randomMessage.split(' ').length * 250,
                    id:Id,
                    color:Color,
                    style:Style
                }
            );
        }

        addScore(object){
            const addedScore =  {'GroundEnemy':3, 'Carrot':1, 'FireBall':2, 'Spike':1, 'Star':5}[object.__proto__.constructor.name];
            if(Math.floor((this.score + addedScore) / 5) > Math.floor(this.score / 5)){
                this.addHeart();
            }
            this.score += addedScore;
        }

        randomMessage(messages){
            return  messages[Math.floor(Math.random() * messages.length)]
        }
    }

    const displayGameOverScreen = () => {
        backgroundMusic.pause();
        pausedMusic.pause();
        deadMusic.play();
        let blackScreenThickness = 0;
        let wordThickness = 0;
        let restartWordThickness = 0;
        const blackScreenThicknessAdder = 0.05;
        setInterval(()=>{
            //kristen ITC
            ctx.fillStyle = 'rgba(0, 0, 0, ' + blackScreenThickness + ')'
            ctx.fillRect(0,0,canvas.width,canvas.height);
            if(blackScreenThickness >= 1.5){
                if(wordThickness >= 1.5){
                    if(restartWordThickness >= 1.5 || restartWordThickness < 0) blackScreenThickness = -blackScreenThickness;
                    restartWordThickness += blackScreenThickness
                    ctx.fillStyle = 'white';
                    ctx.font = 50 + 'px kristen ITC';
                    ctx.fillText('Press "R" To Try Again.', canvas.width / 2, canvas.height / 2 + 70);
                }
                else wordThickness += blackScreenThickness;
                ctx.font = 100 + 'px kristen ITC';
                ctx.textAlign = 'center';
                ctx.save();
                ctx.fillStyle = 'red';
                ctx.fillText('YOU DIED', canvas.width / 2, canvas.height / 2);
                ctx.restore();
            }else blackScreenThickness += blackScreenThicknessAdder;
        },50);
    }

    const pauseGame = resolve => {
        game.pausedTimer = new Date();
        backgroundMusic.pause();
        pausedMusic.play();
        const puasedInterval = setInterval(() => {
            if(!game.input.isPaused){
                clearInterval(puasedInterval);
                backgroundMusic.play();
                pausedMusic.pause();
                resolve();
            }else{
                game.draw(ctx);
            }
        }, 200);
    };

    const game = new Game(canvas.width, canvas.height);      
    let lastime = 0;
    async function animate(timestamp){
        const deltatime = timestamp - lastime;
        lastime = timestamp;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.update(deltatime);
        game.draw(ctx);
        if(game.input.isPaused) await new Promise(pauseGame);
        if(!game.gameover)requestAnimationFrame(animate);
        else displayGameOverScreen();
    }
    animate(0);
});