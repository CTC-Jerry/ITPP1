function drawBackground()
{
    //fill the sky with the colour which gradually changes from day to night and from night to day
    var r=map(
        min(floorPos_y,moon.y),
        extremeHeightUp,
        floorPos_y,
        45,
        6
    );
    var g=map(
        min(floorPos_y,moon.y),
        extremeHeightUp,
        floorPos_y,
        45,
        185
    );
    var b=map(
        min(floorPos_y,moon.y),
        extremeHeightUp,
        floorPos_y,
        45,
        245
    );
    background(r,g,b);
}

function drawEnemy()
{
    for(let i=0;i<enemies.length;i++){
        enemies[i].drawEnemy();
    }
}

function drawSun()
{   
    push();
    fill('#FF9007');
    noStroke();
    ellipse(sun.x,sun.y,sun.radius,sun.radius);
    fill(255);
    //m&m letter
    textFont(mmFont);
    textSize(70);
    text("m",sun.x-25,sun.y+15);
    //sun animation
    sun.y+=sun.yMove;
    if(sun.y<extremeHeightUp||sun.y>extremeHeightDown){
        sun.yMove*=-1;
    }
    pop();
    
    //sun shine
    push();
    translate(sun.x,sun.y);
    rotate(sun.angle);//make sun shine spin
    var v=createVector(90,0);
    var u=createVector(65,0);
    fill('#FF9007');
    stroke('#FF9007');
    strokeWeight(5);
    for(let i=0;i<PI*2;i+=PI*2/8){//having 8 lines for sun shine
        v.rotate(i);
        u.rotate(i);
        line(u.x,u.y,v.x,v.y);
    }
    pop();
    sun.angle+=0.005;
}

function drawMoon()
{   
    push();
    fill('#FFDA1E');
    ellipse(moon.x,moon.y,moon.radius);
    fill(255);
    //m&m letter
    textFont(mmFont);
    textSize(70);
    text("m",moon.x-25,moon.y+15);
    //moon animation
    moon.y-=moon.yMove;
    if(moon.y<extremeHeightUp||moon.y>extremeHeightDown){
        moon.yMove*=-1;
    }
    pop();
}

function drawGround()
{
    noStroke();
	fill(0,155,0);
	rect(gameChar_x-width/2,floorPos_y,width,height-floorPos_y+3); 
}

function drawFlagpole()
{
    if(level.levelUP){
        fill(150);
        rect(flagpole.x,100,10,(floorPos_y-100));
        rect(flagpole.x-10,(floorPos_y-50),30,50);
        drawFlag(flagpole);
    }
}

function drawFlag(t_flagpole)
{
    if(t_flagpole.isReached==true){
        t_flagpole.y=max(t_flagpole.y,160);
        push();
        fill(255,0,0);
        triangle(
            t_flagpole.x+10,t_flagpole.y-60,
            t_flagpole.x+10+100,t_flagpole.y-30,
            t_flagpole.x+10,t_flagpole.y
        );
        pop();
        t_flagpole.y-=3;
        if(t_flagpole.y==160&&!flagpole.atTop){
            t_flagpole.atTop=true;
            if(level.number==2){
                winSound.play();
            }
            else{
                nextLevelSound.play();
            }
        }
    }
    else{
        push();
        fill(255,0,0);
        triangle(
            t_flagpole.x+10,t_flagpole.y-60,
            t_flagpole.x+10+100,t_flagpole.y-30,
            t_flagpole.x+10,t_flagpole.y
        );
        pop();
    }
}


function drawGameScore()
{
    push();
    var r=map(moon.y,floorPos_y,extremeHeightUp+300,0,255);
    var g=map(moon.y,floorPos_y,extremeHeightUp+300,0,218);
    var b=map(moon.y,floorPos_y,extremeHeightUp+300,0,7);
    fill(r,g,b);
    noStroke();
    textSize(30);
    text("Score "+drawCollectableExample(100,20,25)+": "+score,0,30);
    pop();
}

function drawCollectableExample(xPos,yPos,radius)
{
    push();
    fill(0); 
    ellipse(
        xPos,
        yPos,
        radius,
        radius);
    fill(255,200);
    ellipse(
        xPos-5,
        yPos,
        radius/4,
        radius/2);
    pop();
    return "    ";
}

function drawLifeToken()
{
    for(var i=0;i<lives;i++){
        fill(255,0,0);
        noStroke();
        arc((width-30+1)-i*50,26,17,20,PI,0);
        arc((width-30+14)-i*50,26,17,20,PI,0);
        triangle(
            (width-30-15/2)-i*50,26,
            (width-30+15/2)-i*50,26+20,
            (width-30+15+15/2)-i*50,26
        );
    }
}

function drawLevel()
{
    push();
    var r=map(moon.y,floorPos_y,extremeHeightUp+300,0,255);
    var g=map(moon.y,floorPos_y,extremeHeightUp+300,0,218);
    var b=map(moon.y,floorPos_y,extremeHeightUp+300,0,7);
    fill(r,g,b);
    noStroke();
    textSize(30);
    text("Level "+(level.number+1),width/2-20,31);
    pop();
}

function drawGoToFlagpole()
{   
    // var colourChoice=[color(255,0,0),color(255,255,0)];
    if(level.levelUP){
        push();
        if(frameCount/50==parseInt(frameCount/50)){
            noteBlink=!noteBlink;
        }
        
        if(noteBlink){
            fill(255,0,0);
        }
        else{
            fill(255,255,0);
        }
        
        noStroke();
        textSize(35);
        text("Go to the spawn point and reach the flagpole",width/2-330,100);
        pop();
    }
}

//the scene shown when gameover
function drawGameOver()
{
    if(lives<1){
        push();
        fill(255,255,255,200);
        rect(0,0,width,height);
        textSize(50);
        noStroke();
        fill(255,0,0);
        text("You Lose... ಥ﹏ಥ",width/3-20,height/2);
        textSize(20);
        text("Press space bar to restart the game",700,550);
        backgroundMusic.stop();
        pop();
    }
    else if(flagpole.isReached&&flagpole.atTop&&level.number==2){
        push();
        fill(255,255,255,200);
        rect(0,0,width,height);
        textSize(50);
        fill(0,0,255);
        noStroke();
        text("Congtadulation, You Win~~~",width/5,height/2-40);
        text("୧⍢⃝୨  ≧ω≦  ୧⍢⃝୨",width/3,height/2+40);
        textSize(20);
        text("Press space bar to restart the game",700,550);
        backgroundMusic.stop();
        pop();
    }
    else if(flagpole.isReached&&flagpole.atTop&&level.number<2){
        push();
        fill(255,255,255,200);
        rect(0,0,width,height);
        textSize(50);
        fill(0,131,0);
        noStroke();
        text("Level Up!!!",width/5+200,height/2-40);
        text("≧ω≦",width/3+100,height/2+40);
        textSize(20);
        text("Press space bar to proceed the next level",650,550);
        pop();
    }
}