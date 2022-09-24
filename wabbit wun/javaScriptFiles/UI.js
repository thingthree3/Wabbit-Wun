class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 50;
        this.fontFamily = "Helvetica";
        this.heartImage = document.getElementById('heart1');
        this.heartSize = 20;
        this.pausedOffset = 0;
        this.messagesOnScreen = [];

        this.lastMessage = '';
        this.continueToDisplayMessage = false;
        this.messageInterval = 2000;
        this.messageTimer = 0;
        this.startedDisplay = false;
        this.time = new Date();
        

    }
    draw(context){
        context.save();
        this.HandleDisplayMessage(context);
        if(this.game.input.isPaused){
            this.pausedOffset = new Date() - this.game.pausedTimer;
            context.fillStyle = 'rgba(0, 0, 0, 0.7)';
            context.fillRect(0, 0, this.game.width, this.game.height);

            context.font = '100' + 'px ' + this.fontFamily;
            context.textAlign = 'center';
            context.fillStyle = `lightblue`;
            context.fillText('Paused', this.game.width / 2, this.game.height / 2);
            context.font = '30' + 'px ' + this.fontFamily;
            context.fillText(`Press: 'p' To Unpause.`, this.game.width / 2, this.game.height / 2 + 40);
            //return;
        }

        //context.shadowOffsetX = 2;
        //context.shadowOffsetY = 2;
        //context.shadowColor = 'pink';
        //context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = 'orange';
        context.fillText('Carrots: ' + this.game.carrots.length, 20, 50);

        context.font = 40 + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = 'rgb(57, 255, 20)';
        context.fillText('Time: ' + ((new Date() - this.time - this.pausedOffset) * 0.001).toFixed(1), 20, 90);

        context.font = 40 + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = 'yellow';
        context.fillText('Score: ' + this.game.score, 20, 130);

        //context.font = 20 + 'px ' + this.fontFamily;
        //context.textAlign = 'center';
        //context.fillStyle = 'black';
        //context.fillText(
        //    this.game.player.message,
        //    this.game.player.x + this.game.player.width / 2,
        //    this.game.player.y
        //    );



        if(this.game.ammos.length > 0){
            context.font = this.fontSize + 'px ' + this.fontFamily;
            context.textAlign = 'left';
            context.fillStyle = `rgb(83, 173, 254)`;
            context.fillText('Stars: ' + this.game.ammos.length, this.game.width - 305, 50);
        }


        //for (let heart = 0; heart < this.game.player.hearts; heart++) {
        //    context.drawImage(this.heartImage, 300, 15);
        //}
        context.restore();
    }

    HandleDisplayMessage(context){
        const messageRow = {};
        this.messagesOnScreen.forEach((message, index) => {
            if(new Date() - message.spawnDate > message.lifeSpan){
                this.messagesOnScreen.splice(index, 1);
            }else{
                const messageSize = '-'+message.style.match(/[0-9]+/g)[0];
                context.font = message.style;
                context.textAlign = 'center';
                context.fillStyle = message.color;
                
                //id undefined means its player ge ona, geona, g on a
                const {x, y, width} = (message.id === '')? this.game.player : this.game.enemies.find(enemy => enemy.id === message.id);
                messageRow[message.id] = (messageRow[message.id] !== undefined)? messageRow[message.id] + 1:0;
                context.fillText(message.text, x + width / 2, y + messageRow[message.id] * messageSize);
            }
        });
    }
}