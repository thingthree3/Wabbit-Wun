class InputHandler{
    constructor(){
        this.debug = false;
        this.isPaused = true;
        this.vaildKeys = {'w':'up', 'd':'right', 'a':'left', 'ArrowUp':'up', 'ArrowRight':'right', 'ArrowLeft':'left', ' ':'dash', 'x':'attack'};
        this.keys = {up:false, down:false, right:false, left:false, dash:false, attack:false};

        window.addEventListener('keydown', ({ key }) => {
            if (this.vaildKeys.hasOwnProperty(key)){
                if(!this.keys[this.vaildKeys[key]]){
                    // if players pressing both left and right key at same time update moving direction 
                    if(key === 'd' && this.keys.left){this.keys.left = false;}
                    else if(key === 'a' && this.keys.right){this.keys.right = false;};
                    this.keys[this.vaildKeys[key]] = true;
                }
            }
            else if(key.toLocaleLowerCase() === 'r') { window.location.reload();console.log('dwadwa') }
            else if(key.toLocaleLowerCase() === 'f') { this.debug = !this.debug; console.log(this.debug) }
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