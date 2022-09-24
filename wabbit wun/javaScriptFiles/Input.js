class InputHandler{
    constructor(){
        this.debug = false;
        this.isPaused = false;
        this.vaildKeys = {'ArrowUp':'up','ArrowDown':'down','ArrowRight':'right','ArrowLeft':'left',' ':'dash', 'x':'attack'};
        this.lastKey = 'dash'
        this.keys = {up:false, down:false, right:false, left:false, dash:false, attack:false};

        window.addEventListener('keydown', ({ key }) => {
            if (this.vaildKeys.hasOwnProperty(key)){
                if(!this.keys[this.vaildKeys[key]]){
                    if(key === 'ArrowRight' && this.keys.left){this.keys.left = false;}
                    else if(key === 'ArrowLeft' && this.keys.right){this.keys.right = false;};
                    this.keys[this.vaildKeys[key]] = true;
                    
                    //if(key !== 'ArrowUp' && key !== ' '){
                    //    if(key !== this.lastKey)this.keys[this.vaildKeys[this.lastKey]] = false;
                    //    this.lastKey = key;
                    //}
                }
            }
            else if(key.toLocaleLowerCase() === 'r') { window.location.reload();console.log('dwadwa') }
            else if(key.toLocaleLowerCase() === 'd') { this.debug = !this.debug; console.log(this.debug) }
            else if(key.toLocaleLowerCase() === 'p') {this.isPaused = !this.isPaused};
        });
        
        window.addEventListener('keyup', ({ key }) => {
            if (this.vaildKeys.hasOwnProperty(key)){
                if(this.keys[this.vaildKeys[key]]){
                    this.keys[this.vaildKeys[key]] = false;
                }
            }
        });
    }
}