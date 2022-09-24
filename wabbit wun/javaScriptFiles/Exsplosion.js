class Exsplosion{
    constructor(x, y, color= `rgba(83, 173, 254, `, speed=35, thicknesslessenAmount=0.01, lifeSpan=2000){
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.lifeSpan = lifeSpan;
        this.color = color;
        this.markedForDeletion = false;
        this.exspandAmount = speed;
        this.thickness = 0.8;
        this.timer = 0;
        this.thicknesslessenAmount = thicknesslessenAmount;
        this.interval = 400;

    }
    
    draw(context){
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        context.fillStyle = this.color + this.thickness + ')';
        context.fill();
        context.restore();
    }
    
    update(deltatime){
        this.radius += this.exspandAmount;
        if(this.lifeSpan < 0){
            this.markedForDeletion = true;
        }else this.lifeSpan -= deltatime;
        this.thickness -= this.thicknesslessenAmount;
    }
}