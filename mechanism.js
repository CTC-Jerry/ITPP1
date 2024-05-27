function ifAddingMountain(xPos)
{
    var possibility=random(0,1);
    if(possibility<0.03){
        var overlap=false;
        for(let i=0;i<mountains.length;i++){
            let con1=abs(xPos-mountains[i].mid)>1000;
            if(!con1){
                overlap=true;
                break;
            }
        }
        if(!overlap){
            var upHalfWidth=random(150/2,230/2);
            var yUp=random(80,300);
            var m=new CreateMountain(xPos,
                                     upHalfWidth,
                                     432,
                                     yUp
                                );
            mountains.push(m);
            
            if(possibility<0.02){
                var m=new CreateMountain(xPos+random(200,350),
                                         random(150/2,230/2),
                                         432,
                                         random(80,300)
                                        );
                mountains.push(m);
            };
            
            if(possibility<0.0175){
                var m=new CreateMountain(xPos-random(200,300),
                                         random(150/2,230/2),
                                         432,
                                         random(80,300)
                                        );
                mountains.push(m);
                
                ifAddingEruptionAndBombs(xPos,yUp,upHalfWidth);
            }
        }
    }
}

//whether to add volcano animation including eruption and falling bomb to a mountain
function ifAddingEruptionAndBombs(xPos,yUp,mounUpHalfWidth)
{
    var possibility=random(0,1);
    if(possibility<0.25){
        var e=new Emitter(xPos,yUp+30,mounUpHalfWidth,0,-1,10);
        e.startEmitter(900,100);
        eruption.push(e);
        
        for(let i=0;i<2;i++){
            var x_pos=xPos+random(-mounUpHalfWidth*4,mounUpHalfWidth*4);
            var y_pos=-600-600*i;
            var onCanyon=false;
            for(let j=0;j<canyons.length;j++){
                var c=canyons[j];
                var con1=(c.mid-c.upHalfWidth+15)<x_pos-15;
                var con2=x_pos+15<(c.mid+c.upHalfWidth-15);
                if(con1&&con2){
                    onCanyon=true;
                    break;
                }
            }
            
            if(!onCanyon){
                var b=new BombEmitter(
                        x_pos,
                        y_pos,
                        0,
                        -2,
                        10,
                        color(255,0,0)
                );
                b.startEmitter(100,150);
                bombs.push(b);
            }
        }
    }
}

function ifShowVolcanoAndBombAnimation()
{
    var earthquack=random(-8,8);//used for earthquack animation
    for(let i=eruption.length-1;i>=0;i--){
        var e=eruption[i];
        if(
            !e.shouldExist||
            (e.pos.x-e.upHalfWidth)>gameChar_x+width*2/3||
            (e.pos.x+e.upHalfWidth)<gameChar_x-width*2/3
          ){
            //remove eruption animatin
            eruption.splice(i,1);
            
            volcanoSound.stop();
            volcanoSoundIsPlay=false;
            
            //remove fulling bombs animation
            for(let i=bombs.length;i>=0;i--){
                bombs.splice(i,1);
            }
        }
        else{
            //earth quack animation
            translate(0,earthquack);
            
            //whether to play volcano sound effect
            if(!volcanoSoundIsPlay){
                volcanoSound.play();
                volcanoSoundIsPlay=true;
            }
        }
    }
}

function ifAddingTree(xPos)
{
    var possibility=random(0,1);
    if(possibility<0.02){
        var onCanyon=false;
        var overlap=false
        for(let i=0;i<canyons.length;i++){
            var con1=(canyons[i].mid-canyons[i].upHalfWidth+15)<xPos;
            var con2=xPos<(canyons[i].mid+canyons[i].upHalfWidth-15);
            if(con1&&con2){
                onCanyon=true;
                break;
            }
        }
        for(let i=0;i<trees.length;i++){
            var d=abs(xPos-trees[i].x_pos);
            if(d<350){
                overlap=true;
                break;
            }
        }
        if(!onCanyon&&!overlap){
            var t=new CreateTree(
                xPos,
                floorPos_y-random(50,70),
                colour[int(random(0,3))]
            )
            trees.push(t);
            
            var sub_possibility=random(0,1);
            if(sub_possibility<0.25){
                var t=new CreateTree(
                    xPos+65,
                    floorPos_y-random(50,70),
                    colour[int(random(0,3))]
                )
                trees.push(t);
            }
        }
    }   
}

function ifAddingToken(xPos)
{
    var possibility=random(0,1);
    if(possibility<0.03){
        var onCanyon=false
        var overlap=false;
        for(let i=0;i<canyons.length;i++){
            var con1=(canyons[i].mid-canyons[i].upHalfWidth+15)<xPos;
            var con2=xPos<(canyons[i].mid+canyons[i].upHalfWidth-15);
            if(con1&&con2){
                onCanyon=true;
                break;
            }
        }
        for(let i=0;i<tokens.length;i++){
            var d=abs(xPos-tokens[i].x);
            if(d<100){
                overlap=true;
                break;
            }
        }
        if(!onCanyon&&!overlap){
            var t=new CreateToken(xPos,int(random(0,2)),60,60,0.5);
            tokens.push(t);
        }
    }   
}

function ifAddingPlatform(xPos)
{
    var sub_possibility=random(0,1);
    var platformYUp=[floorPos_y-77,floorPos_y-92];
    if(sub_possibility<0.75){
        var yPos=platformYUp[round(random(0,1))];
        var p=createPlatform(xPos,yPos);
        platforms.push(p);
    }
}

function checkIfBombHitChar()
{
    if(bombs.length>0){
        for(let i=0;i<bombs.length;i++){
            var bo=bombs[i];
            var d=dist(bo.Pos.x,bo.Pos.y,gameChar_x,gameChar_y-20);
            if(d<15){
                overlapBomb=true;
                charDie=true;
                if(!hitSoundIsPlay){
                    hitSound.play();
                    hitSoundIsPlay=true;
                }
                if(bo.Pos.x<gameChar_x){
                    layRight=true;
                }
                else{
                    layRight=false;
                }
            }
        }
    }
}

function checkIfCharReachFlagpole()
{
    if(level.levelUP){
        var d=dist(gameChar_x,floorPos_y,flagpole.x+5,floorPos_y);
        if(abs(d)<=15){
            flagpole.isReached=true;
        }
        else{
            flagpole.isReached=false;
        }
    }
}

function checkIfCharDie()
{
    if(
        (gameChar_y>height+300||
        overlapEnemy||
        overlapBomb)&&
        !charDie
    ){
        lives--;
        
        if(lives>0){
            iniVariables();
        }
        else{
            if(!gameOver){
                loseSound.play();
            }
        }
        
    }
}

function checkIfCharIsOnAnyCanyon()
{
    for(var i=0;i<canyons.length;i++){
        checkIfCharIsOnCanyon(canyons[i],canyons[i].mid);
    }
}

function checkIfCharIsOnCanyon(can,middle)
{   
    //check whether the game character is on the floor
    var con1=(gameChar_y==floorPos_y);
    //check whether game character is from the left of canyon
    var con2=(gameChar_x-gameChar_width/2)>=(middle-can.upHalfWidth+15);
    //check whether the game character is from the right of canyon
    var con3=(gameChar_x+gameChar_width/2)<=(middle+can.upHalfWidth-15);
    if(con1&&con2&&con3){
        isPlummeting=true;
        fullingSound.play();
    }
}

function checkIfGameOver()
{
    if(lives<1||(flagpole.isReached&&level.number==2)){
        gameOver=true;
        return gameOver;
    }
    else if(flagpole.isReached&&level.number<2){
        return level.levelUP;
    }
}

function checkGameCharInAnyTokenRange()
{
    for(var i=0;i<tokens.length;i++){
        checkGameCharInTokenRange(tokens[i]);
    }
}

function checkGameCharInTokenRange(token)
{
    if(!token.isFound){
        var d=dist(gameChar_x,gameChar_y-20,token.x,token.y);
        if(d<token.width*token.scale){
            token.isFound=true;
            collectSound.play();
            score++;
        }
    }
}

function checkCharOnAnyPlatform()
{
    onPlatform=false;
    var char_x=gameChar_x;
    var char_y=gameChar_y;
    for(let i=0;i<platforms.length;i++){
        var platform=platforms[i];
        if(
        char_x-6>=platform.xPos-platform.halfWidth-26-6&&
        char_x+6<=platform.xPos+platform.halfWidth+8+6&&
        (char_y>=platform.yUp&&char_y<=platform.yDown)
        ){
            gameChar_y=platform.yUp;
            onPlatform=true;
            gameChar_x+=platform.xSpeed;
            break;
        }
    }
}

function checkIfGetRequirdNumOfTokens()
{
    if(score==level.requiredToken[level.number]){
        level.levelUP=true;
    }
}