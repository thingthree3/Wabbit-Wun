class Particle{
    constructor(x, y){
        this.markedForDeletion = false;
        this.x = x;
        this.y = y;

    }
    update(){
        this.x -= this.speedx;// + this.peed;
        this.y -= this.speedy;
        this.size *= 0.97;
        if (this.size < 0.5)this.markedForDeletion = true;
    }
}
class Dust extends Particle{
    constructor(x, y){
        super(x, y);
        this.size = Math.random() * 10 + 7.5;
        this.speedx = Math.random();
        this.speedy = Math.random();
        this.color = 'rgba(0,0,0,0.2)';
    }
    draw(context){
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI *2);
        context.fillStyle = this.color;
        context.fill();
        context.restore();
    }
}
class Splash extends Particle{
    constructor(x, y, image=null, color='', isSquare=null, size=null){
        super(x, y);
        this.image = image;
        this.color = color;
        this.isSquare = isSquare;
        //this.y -= this.size * 0.4;
        //this.x -= this.size * 0.5;
        this.size = (size !== null)? size:Math.random() * 100 + 100;
        this.speedx = ((Math.random() > 0.5)? Math.random():-Math.random()) * 3// - 4;
        this.speedy = ((Math.random() > 0.5)? Math.random():-Math.random()) * 3// + 2;
    }
    draw(context){
        context.save();
        if(this.image !== null){
            context.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
        else if(this.isSquare !== null){
            if(context !== ''){context.fillStyle = this.color;};
            if(this.isSquare){context.fillRect(this.x, this.y, this.size, this.size);}
            else{
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI *2);
                context.fillStyle = this.color;
                context.fill();
            }
        }
        context.restore();
    }
}
class Fire extends Particle{
    constructor(x, y){
        super(x, y);
        this.image = document.getElementById('fire');
        this.size = Math.random() * 100 + 100;
        this.speedx = 1;
        this.speedy = (Math.random() > 0.5)? Math.random():-Math.random();
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }
    update(){
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }
    draw(context){
        context.save();
        context.translate(this.x,this.y);
        context.rotate(this.angle);
        context.drawImage(
            this.image,
            -this.size * 0.5,
            -this.size * 0.5,
            this.size,
            this.size
        );
        context.restore();
    }
}