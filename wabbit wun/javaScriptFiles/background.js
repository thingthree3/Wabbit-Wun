class BackGround{
    constructor(game){
        this.game = game;
        console.log(this.game.player.x)
        this.currentLevel = game.currentLevel;
        this.image = document.getElementById('sprite');
        this.spriteWidth = 8;
        this.column = 8;
        this.tile_size = 96;
        this.airBlocks = ['40', '32'];
        // in level c = carrotPos, G = grassPos, [eg] = enemy_groundPos,  d = doorPos
        this.levels = [
            [
                ['51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51'],
                ['51', '49','18','18','18','18','18','19','20','17','18','36','37', '51'],
                ['51', '11','40s','40','17','19','32','40','32','32','32','40c',' 8wall','51 door 00 096 01', '51'],//' 8','40 door']
                ['51', '11','32','40','32','32','32','40','13',' 6',' 6','29',' 2', '51'],
                ['51', '36',' 7','40','40','32','40','40','20','40','40c',' 9','10', '51'],
                ['51', ' 3','32','32','40','48','40','40','32','32',' 5','37','26', '51'],
                ['51', '11','40','40','32','40','40','40','32','32','32','40c','38', '51'],
                ['51', '11','40f','32',' 5','15',' 7','40','40',' 4','40f',' 1','43', '51'],
                ['51', '50',' 3','32f','32c','40c','40c','40','32[eg]','12',' 1','43','10', '51'],
                ['51', ' 9', '41', '28', '14', '38', '28', '14', ' 4', '23', '35', '10', '25', '51'],
                ['51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51'],
            ],
            [
                ['51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51'],
                ['51', '43', '25', '18', '18', '18', '18', '27', '25', '18', '36', ' 6', '45', '51'] ,
                ['51 door 01056  096 00', '32', '32', '32', '40', '40', '32c', '40[eg]', '32[eg]', '40', '32', '40c', '12', '51'] ,
                ['51', '13', ' 7', '40', '40', '40', ' 5', '5', '22', '40', '40', ' 1', '42', '51'] ,
                ['51', '11', '40', '32', '48', '40', '40', '32', '32', '40', '40', '17', '18', '51'] ,
                ['51', '44', '40', '40', '32', '32', '40', '32', '40', '48', '40', '40c',' 8wall','51 door 00 0576 02', '51'] ,
                ['51', '39', '32f', '32', '32f', ' 8', '40', '32', '40', '32', '40f', ' 8', '13', '51'] ,
                ['51', '33', ' 7', '32c', ' 4', ' 8', ' 8', '40', '40', '40', '48', '40', '38', '51'] ,
                ['51', '11', ' 8', '13', '24', '14', ' 8', ' 4', '32f', '32', '32c', '40[eg]', ' 9', '51'] ,
                ['51', '41', ' 2', '42', ' 2', '42', ' 2', '42', ' 2', ' 2', ' 2', ' 2', '49', '51'] ,
                ['51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51'],
            ],
            [
                ['51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51'] ,
                ['51', '28', '37', '36', '06', '37', '26', '18', '36', '45', '18', '36', '06', '51'] ,
                ['51', '31', '40', '40', '40[eg]', '40', '12', '32c', '40c', '20', '32', '40', ' 8wall', '51 door 00 092 03'] ,
                ['51', '39', '32c', '40', '32p', '32c', '12', '40c', '40', '40', '40', '40', ' 8wall', '51 door 00 0192 03'] ,
                ['51', '31', '04', '32', '40', '05', '24', '07', '32', '32', '40', '05', '15', '51'] ,
                ['51', '23', '22', '40', '32', '32', '40', '32', '40', '32c', '40', '32[eg]', '21', '51'] ,
                ['51', '08', '08', '40[eg]', '40', '40', '32', '40c', '40', '04', '40f', '04', '13', '51'] ,
                ['51  door 01056 0384 01', '32', '32s', '32p', '32s', '32c', '40', '04', '40', '12', '32p', '05', '47', '51'] ,
                ['51', '41', '03', '40', '40c', '04', '40f', '12', '40f', '12', '32', '40c', '09', '51'] ,
                ['51', '25', '50', '03', '04', '38', '28', '24', '14', '12', '40c', '14', '09', '51'] ,
                ['51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '13', '51', '51', '51'] ,
            ],
            [
                ['51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51'],
                ['51', '18', '18', '19', ' 8', '17', '44', '22', '17', '18', '18', '18', '18', '51'] ,
                ['51 door 01056 096 02', '32', '32', '40', ' 5', ' 6', '22', '40', '40', '32', '32', '32c', ' 8', '51'] ,
                ['51 door 01056 0192 02', '40', '32', '32', '32', '32', '32', '40', '40', '32c', '32s', ' 8', ' 8', '51'] ,
                ['51', '28', ' 7', '40', '32', '40', '40', '32', '32[eg]', ' 5', ' 6', ' 6', '15', '51'] ,
                ['51', '11', '32[eg]', '32', '48', '40', '40', '32', '32p', '40', '40', '40', '38', '51'] ,
                ['51', '41', ' 3', '40', '40', '40', '40', ' 4', '32', '32', '40', '40', ' 9', '51'] ,
                ['51', '25', '31', '32', '32', '48', '32', ' 4', '32f', '40', '32c', '32c', ' 9', '51'] ,
                ['51', '50', '39', ' 8wall', ' 8wall', ' 8wall', ' 8wall', ' 8wall', ' 6', '14', '40f', '40c', ' 9', '51'] ,
                ['51', ' 9', '11', '32', '48', '32', '48', '32', '12', '38', ' 2', ' 2', '43', '51'] ,
                ['51', '51', '51', '32', '32', '32', '32', '32', '32', '32', '32', '32', '32', '32'] ,
                ['51', '51', '51', '51 door 0192 00 04', '51 door 0288 00 04', '51 door 0384 00 04', '51 door 0480 00 04', '51 door 0576 00 04', '51', '51', '51', '51', '51', '51'] ,
            ],
            [
                ['51', '51', '51', '51 door 0192 0768 03', '51 door 0288 0768 03', '51 door 0384 0768 03', '51 door 0480 0768 03', '51 door 0576 0768 03', '51', '51', '51', '51', '51', '51'] ,
                ['51', '17', '19', '32', '32', '32', '32', '32', '12', '17', '18', '26', '18', '51'] ,
                ['51', ' 8', '40c', '40', '48', '40', '48', '40', '20', '40', '32', '20', ' 1', '51'] ,
                ['51', ' 8', ' 8', '40f', '40', '40', '40', '40', '40', '40', '32', '40c', ' 9', '51'] ,
                ['51', ' 2', ' 2', ' 3', '40', '48', '32', '32', ' 4', '32f', '32c', '40c', '30', '51'] ,
                ['51', '25', '18', '31', '32', '40', '40', '13', '24', ' 6', ' 6', ' 6', '22', '51'] ,
                ['51', '19', '32', '20', '40', '48', '32', '20', '40', '40', '40', '32', '32', '51 door 00 0480 05'] ,
                ['51', ' 8', '32c', '40', '32', '40c', '40', '40', '32', '48', '32[eg]', '32', '32', '51 door 00 0576 05'] ,
                ['51', ' 8', ' 8', '40f', '40', ' 4', '32', '32', '32', '32[eg]', ' 1', ' 3', ' 3', '51'] ,
                ['51', '29', ' 2', ' 2', '28', '47', ' 2', ' 3', ' 8', ' 8', ' 1', '43', '33', '51'] ,
                ['51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51'] ,
            ],
            [
                ['51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51'] ,
                ['51', '27', '41', '42', '43', '11', '17', '18', '26', '36', '37', '26', '27', '51'] ,
                ['51', '43', '10', '25', '18', '19', '32', '40', '12', '40', '40', '21', '35', '51'] ,
                ['51', '10', '25', '19', '32', '40', '40', '05', '24', '07', '32', '40', '30', '51'] ,
                ['51', '26', '19', '32', '40', '40', '40', '32', '32', '32', '40', '40', '12', '51'] ,
                ['51', '20', '40', '32', '40', '32', '48', '32', '32', '32', '48', '32', '38', '51'] ,
                ['51 door 01056 0480 04', '32', '40', '40', '32', '32', '40', '32', '48', '32', '40', '05', '35', '51'] ,
                ['51 door 01056 0576 04', '32', '32', '40', '05', '15', '07', '32', '40', '40', '08', '08', '09', '51'] ,
                ['51', '01', '03', '32', '40', '12', '32', '32', '32', '08', '08', '08', '09', '51'] ,
                ['51', '45', '19', '05', '15', '34', '29', '03', '01', '02', '02', '02', '49', '51'] ,
                ['51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51', '51'] ,
            ]
        ];
        this.solidObjectsInLevel = [];
        this.findSolidObjects(this.levels[this.currentLevel]);
        console.log(this.solidObjectsInLevel)
        //this.levelHeight = this.game.height / this.levels.length;
        //this.levelWidth = this.game.width / this.levels[this.currentLevel].length;
    }
    
    draw(context){
        // draw tile in game
        context.save();
        context.imageSmoothingEnabled = false;
        for (let y = 1; y < this.levels[this.currentLevel].length-1; y++){
            const row = this.levels[this.currentLevel][y];
            for (let x=1;x<row.length-1;x++) {
                const tile = Number(row[x].slice(0,2)) - 1;
                context.drawImage(
                    this.image,
                    tile % this.column * this.tile_size,
                    Math.floor(tile / this.column) * this.tile_size,
                    this.tile_size,
                    this.tile_size,
                    x * this.tile_size - this.tile_size,
                    y * this.tile_size - this.tile_size,
                    this.tile_size+2,
                    this.tile_size+2
                )
            }
        }
        context.fillStyle = 'rgba(0,0,0,0.4)';
        if (this.game.input.debug) { this.solidObjectsInLevel.forEach(({x, y , size}) => context.fillRect(x, y, size, size)); };
        context.restore();
    }

    checkIfBlockIsSolid(level, x, y){
        const

            right  = (level[y][x+1] === undefined)?'':level[y][x+1],
            left = (level[y][x-1] === undefined)?'':level[y][x-1],
            below = (level[y+1] === undefined || x+1 >= level[y].length)?'':level[y+1][x],
            above = (level[y-1] === undefined || x+1 >= level[y].length)?'':level[y-1][x];

        if([left, right, below, above].includes(undefined)){
            console.log([left, right, below, above], x, y, level[y][x], level[y-1][x], level[y+1][x], level[y].length)
        }
        let solidBlock = null;
        for (let index = 0; index < 4; index++) {
            const adjacentBlock = [left, right, below, above][index];
            
            //if any of the blocks we are itterating through are air blocks then the middle(not in the itteration) should be marked as solid.
            if(this.airBlocks.includes(adjacentBlock.slice(0,2)) || adjacentBlock.includes('wall')){
                //add grass if 'above' is a airblock
                if(index === 3 && !above.includes('f') && !level[y][x].includes('wall')) { this.game.grasses.push(new Grass(x * this.tile_size - this.tile_size, y * this.tile_size - this.tile_size)); };

                solidBlock = {
                    x: x * this.tile_size - this.tile_size,
                    y: y * this.tile_size - this.tile_size,
                    size:this.tile_size,
                    id: level[y][x]
                };
            }
        }
        return solidBlock;
    }

    reFactorLevels(){
        console.log(this.game.replaceInLevel)
        this.game.replaceInLevel.forEach(({x, y})=>{
            this.levels[this.currentLevel][(y / this.tile_size) + 1][(x / this.tile_size + 1)] = this.levels[this.currentLevel][(y / this.tile_size) + 1][(x / this.tile_size + 1)].slice(0,2);
        });
        this.game.replaceInLevel = [];
    }


    removeWallsInLevel(){
        this.reFactorLevels();
        for (let Y = 1; Y < this.levels[this.currentLevel].length-1; Y++){
            //const row = this.levels[this.currentLevel][Y];
            for (let X=1;X<this.levels[this.currentLevel][Y].length-1;X++) {
                const item = this.levels[this.currentLevel][Y][X];
                if(item.includes('wall')){
                    this.levels[this.currentLevel][Y][X] = this.airBlocks[Math.floor(Math.random() * this.airBlocks.length)];
                    this.solidObjectsInLevel.forEach(({x, y}, index) => {
                        console.log(x, y, X, Y)
                        if(
                            (x / this.tile_size) + 1 === X &&
                            (y / this.tile_size) + 1 === Y
                        ){
                            console.log('ddawdaw')
                            this.solidObjectsInLevel.splice(index, 1);
                        }
                    });
                }
            }
        }
        console.log(this.solidObjectsInLevel)
    }


    
    findSolidObjects(level){
        this.solidObjectsInLevel = [];
        console.log(level[0][0])
        for (let y = 0; y < level.length; y++){
            for (let x = 0; x < level[y].length; x++){
                const item = level[y][x];
                switch (item.slice(2)) {
                    case 'p':
                        this.game.platforms.push(new Plamtform(this.game, x * this.tile_size - this.tile_size, y * this.tile_size - this.tile_size));
                        break;
                    case 'f':
                        this.game.enemies.push(new Spike(this.game, x * this.tile_size - this.tile_size, y * this.tile_size - this.tile_size));
                        break;
                    case 's':
                        this.game.stars.push(new Star(this.game, x * this.tile_size - this.tile_size, y * this.tile_size - this.tile_size));
                        break;
                    case 'c':
                    this.game.carrots.push(new Carrot(this.game, x * this.tile_size - this.tile_size, y * this.tile_size - this.tile_size));
                        break;
                    case '[eg]':
                        this.game.enemies.push(new GroundEnemy(this.game, x * this.tile_size - this.tile_size, y * this.tile_size - this.tile_size));
                        break;
                    default:
                        break;
                }

                // Handle Somthing
                    //if item is an air block it could never be soild
                if( !this.airBlocks.includes(item.slice(0,2)) ){
                    const newSolidBlock = this.checkIfBlockIsSolid(level, x, y);
                    if(newSolidBlock !== null){
                        this.solidObjectsInLevel.push(newSolidBlock);
                    }
                };

            }
        }
    }
}

