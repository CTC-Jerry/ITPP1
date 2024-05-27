function setup()
{
	createCanvas(1024, 576);
	iniVariables();
    
    leftmost=width/2;
    rightmost=width/2;
    
    //set up level
    level={
        number:0,
        requiredToken:[3,5,8],
        levelUP:false
    };
    
    //set up sun and moon
    sun={x:random(60,130),y:80,radius:100,yMove:riseSpeed,angle:0};
    moon={x:sun.x,y:floorPos_y*2-sun.x,radius:100,yMove:riseSpeed};
    extremeHeightUp=sun.y;//the highest y position the sun can be
    extremeHeightDown=moon.y;//the lowest positin the moon can be
    
    //set up clouds
    clouds=[
        new CreateCloud(sun.x,150,80),
        new CreateCloud(-500,random(120,150),40),
        new CreateCloud(random(400,500),random(80,180),60)
    ];
    
    //set up trees
    colour=[
            color(92,57,3),
            color(121,255,161),
            color(255,121,220)
    ];
       
    trees=[
        new CreateTree(57,floorPos_y-70,colour[1]),
        new CreateTree(122,floorPos_y-50,colour[2]),
        new CreateTree(187,floorPos_y-70,colour[0]),
        new CreateTree(890,floorPos_y-70,colour[int(random(0,3))]),
        new CreateTree(953,floorPos_y-50,colour[int(random(0,3))])
    ];
    
    //set up mountains
    mountains=[
            new CreateMountain(300,115,432,110),
            new CreateMountain(1000,115,432,110),
    ];
    
    //canyons set up
    canyons=[
        new CreateCanyon(445,60,75,floorPos_y,576),
        new CreateCanyon(745,60,75,floorPos_y,576)
    ];
    
    waterFlow=[
        [530,10,37],
        [460,10,37],
        [515,10,37],
        [475,10,37],
        [550,10,37]
    ];
    
    //token setup
    tokens=[
        new CreateToken(400,1,60,60,0.5),
        new CreateToken(600,0,60,60,0.5),
        new CreateToken(800,0,60,60,0.5)
    ];
    
    //flagpole setup
    flagpole={
        x:586,
        y:(floorPos_y-50),
        isReached:false,
        atTop:false
    };
    
    //set up enemy
    enemies=[
        new CreateEnemy(createVector(50,floorPos_y))
    ];
    
    score=0;
    lives=3;
    countFrame=0;
    fixedBody=false;
    gameOver=false;

    backgroundMusic.loop();
}

function draw()
{
    //nothing would be drawn before the preload function finish loading all the assets
    if(!preloadFinished){
        return;
    }
    
    cameraPosX=width/2-gameChar_x;
    
    //determine whether to add items to scene
    if(gameChar_x<leftmost){
        leftmost=gameChar_x;
        
        ifAddingCanyon(gameChar_x-width*2/3);
        
        ifAddingMountain(gameChar_x-width/2);
        
        ifAddingTree(gameChar_x-width/2);
        
        ifAddingToken(gameChar_x-width/2);
        
        ifAddingEnemy(gameChar_x-width/2+100);
    }
    
    if(gameChar_x>rightmost){
        rightmost=gameChar_x;
        
        ifAddingCanyon(gameChar_x+width*2/3);
        
        ifAddingMountain(gameChar_x+width/2);
        
        ifAddingTree(gameChar_x+width/2);
        
        ifAddingToken(gameChar_x+width/2);
        
        ifAddingEnemy(gameChar_x+width/2-100);
    }
    
    //draw background
    drawBackground();
    
    //game mechanism
    checkIfCharReachFlagpole();
    checkIfCharIsOnAnyCanyon();
    checkCharOnAnyPlatform();
    checkIfCharDie();
    checkGameCharInAnyTokenRange();
    checkIfCharOverlapAnyEnemy();
    checkIfBombHitChar();
    checkIfGetRequirdNumOfTokens();//check whether the palyer get the required tokens to proceed to the next level
    
    push();
    translate(cameraPosX,0);
    
    //draw sun and moon
    drawSun();
    drawMoon();
    
    //draw the clouds
    drawCloud();
    
    //determine whether volcano and bomb animation should be shown
    //if not, then remove them
    ifShowVolcanoAndBombAnimation();
    
    //draw the volcano animation
    drawVolcanoAnimation();
    
    //draw mountain
    drawMountain();
    
    //draw ground
    drawGround();

    //draw canyon
    drawCanyon();
    
    //For water flow
    //move the ellipses so all canyons would have the same waterflow animation
    waterMove();
    
    //draw the trees
    drawTree();
    
    //draw fulling bombs
    drawFallingBomb();
    
    //draw platform
    drawPlatform();
    
    //draw the flagpole
    drawFlagpole();
    
    //draw the token
    drawToken();
    
    //draw the enemy
    drawEnemy();
       
	//draw the game character
    if(!charDie){
        if(isPlummeting)
        {
            //jumping
            drawGameCharIsFallingOrIsPlummeting();
        }
        else if(isLeft && isFalling)
        {
            //jumping and moving left
            drawGameCharIsLeftAndIsFalling();
        }
        else if(isRight && isFalling)
        {
            //jumping and moving right
            drawGameCharIsRightAndIsFalling();
        }
        else if(isLeft)
        {
            //move left
            drawGameCharIsLeft();
        }
        else if(isRight)
        {
            //move right
            drawGameCharIsRight();
        }
        else if(isFalling )
        {
            //jumping
            drawGameCharIsFallingOrIsPlummeting();
        }
        else
        {
            //standing and facing front
            drawGameCharStandingFront();
        }
    }
    else{
        //show character die for 100 frames
        drawGameCharDie();
        if(countFrame==100&&lives>=1){
            charDie=false;
        }
        countFrame++;
    }
    
    pop();
    
    //Gravity and isFalling setting
    if(gameChar_y<floorPos_y&&!onPlatform){
        gameChar_y+=jumpHeight/44;
        isFalling=true;
    }
    else{
        isFalling=false;
    }
    
    drawGameScore();
    drawLifeToken();
    drawLevel();
    drawGoToFlagpole();
    
    if(checkIfGameOver()){
        drawGameOver();
        return;
    }

    if(isPlummeting){
        gameChar_y+=10;
        return;
    }
    
    //moving left and right
    if(!flagpole.isReached){
        if(isLeft&&!charDie){
            gameChar_x-=moveSpeed;
        }
        else if(isRight&&!charDie){
            gameChar_x+=moveSpeed;
        }
    }
}

function keyPressed()
{     
    if(gameOver==false){
        if(keyCode==37){
            isLeft=true;
        }
        else if(keyCode==39){
            isRight=true;
        }

        if(flagpole.atTop&&lives>0){
            toNextLevel();
        }

        if(isFalling==false&&isPlummeting==false&&!charDie){
            if(keyCode==32){
                gameChar_y-=jumpHeight;
                jumpSound.play();
            }
        }
    }
    if(gameOver==true){
        if(keyCode==32&&(flagpole.atTop==true||lives<1)){
            restartGame();
        }
    }
}

function keyReleased()
{
	if(keyCode==37){
       isLeft=false;
    }
    else if(keyCode==39){
        isRight=false;
    }
}
