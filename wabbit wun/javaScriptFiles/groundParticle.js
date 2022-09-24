class GoundParticle{
    constructor(x, y, colors, collide=true){
        this.onscreenInterval = 2000;
        this.x = x;
        this.y = y;
        this.collide = collide;
        this.size = Math.random() * 7 + 3;
        this.speedx =( (Math.random() < 0.5)? -Math.random():Math.random()) * 3;
        this.speedy = Math.random() * 2 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.gravity = 0;
        this.maxGravity = 20;
        this.markedForDeletion = false;
    }
    
    update(deltatime, objects, collision){
        if(this.onscreenInterval <= 0){this.markedForDeletion = true;}
        else {this.onscreenInterval -= deltatime;};
        if(this.speedy == 0){return;};
        this.x += this.speedx;
        if(this.gravity < this.maxGravity){this.gravity += 0.5;};
        this.y += this.gravity - this.speedy;
        if(this.collide){
            objects.forEach(object => {
                if(collision(this, object)&&(this.y + this.size >= object.y && this.y < object.y+10)){this.speedy = 0;}
            });
        }
    }

    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
}