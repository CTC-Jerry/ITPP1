function CreateEnemy(pos_velocity)
{
    this.pos_velocity=pos_velocity;
    this.index=0.95;
    this.speed_velocity=createVector(random(0.5,0.6),0);
    this.leftmost=pos_velocity.x-50;
    this.rightmost=pos_velocity.x+50;
    this.drawEnemy=function(){
        if(this.pos_velocity.x>=gameChar_x){
            drawEnemyLookLeft(
                this.pos_velocity.x,
                this.pos_velocity.y,
                this.index
            );
        }
        else{
            drawEnemyLookRight(
                this.pos_velocity.x,
                this.pos_velocity.y,
                this.index
            );
        }
        
        //move enemy
        if(lives>=1&&!fixedBody){
            this.pos_velocity.add(this.speed_velocity);
            if(
                this.pos_velocity.x<=this.leftmost||
                this.pos_velocity.x>=this.rightmost
            ){
                this.speed_velocity.x*=-1;
            }
        }
    }
}

function ifAddingEnemy(xPos)
{
    var possibility=random(0,1);
    if(possibility>0.25){
        
        var onCanyon=false;
        for(let i=0;i<canyons.length;i++){
            if(
                abs(xPos-canyons[i].mid)<300
            ){
                onCanyon=true;
                break;
            }
        }
        
        var overlap=false;
        for(let i=0;i<enemies.length;i++){
            let con1=abs(xPos-enemies[i].pos_velocity.x)>1200;
            if(!con1){
                overlap=true;
                break;
            }
        }
        
        var onToken=false;
        for(let i=0;i<tokens.length;i++){
            let con1=abs(xPos-tokens[i].x)>40;
            if(!con1){
                onToken=true;
                break;
            }
        }

        if(!onCanyon&&!overlap&&!onToken){
            var posVelocity=createVector(xPos,floorPos_y);
            var e=new CreateEnemy(posVelocity);
            enemies.push(e);
        }
    }
}

function checkIfCharOverlapAnyEnemy()
{
    for(let i=0;i<enemies.length;i++){
        checkIfCharOverlapEnemy(enemies[i]);
    }
}

function checkIfCharOverlapEnemy(enemy)
{
    var d=dist(
        gameChar_x,
        gameChar_y-38,
        enemy.pos_velocity.x,
        enemy.pos_velocity.y-30*enemy.index
    );
    if(d<30){
        overlapEnemy=true;
        charDie=true;
        if(!hitSoundIsPlay){
            hitSound.play();
            hitSoundIsPlay=true;
        }
        if(!fixedBody){
            if(enemy.pos_velocity.x<gameChar_x){
                layRight=true;
                fixedBody=true;
            }
            else{
                layRight=false;
                fixedBody=true;
            }
        }
    }
}

function drawEnemyLookRight(enemy_x,enemy_y,index)
{
    //shape
    fill(255);
    stroke(0);
    strokeWeight(3);
    fill(255,233,209);
    quad(
        enemy_x-18*index,enemy_y-50*index,
        enemy_x-13*index,enemy_y-10*index,
        enemy_x+13*index,enemy_y-10*index,
        enemy_x+18*index,enemy_y-50*index
    );
    
    //coffee cup sleeve
    push();
    fill(175,87,0);
    strokeWeight(1.5);
    quad(
        enemy_x-16*index,enemy_y-40*index,
        enemy_x-14*index,enemy_y-20*index,
        enemy_x+14*index,enemy_y-20*index,
        enemy_x+16*index,enemy_y-40*index
    );
    pop();
    
    //coffee cup lid
    fill(90,45,0);
    quad(
        enemy_x-20*index,enemy_y-56.5*index,
        enemy_x-21.5*index,enemy_y-50*index,
        enemy_x+21.5*index,enemy_y-50*index,
        enemy_x+20*index,enemy_y-56.5*index
    );   
    
    //left hand
    push();
    noFill();
    beginShape();
    curveVertex(enemy_x-16*index,enemy_y-40*index);
    curveVertex(enemy_x-16*index,enemy_y-40*index);
    curveVertex(enemy_x-24*index,enemy_y-29*index);
    curveVertex(enemy_x-20*index,enemy_y-22*index);
    curveVertex(enemy_x-20*index,enemy_y-22*index);
    endShape();
    pop();
    ellipse(enemy_x-20*index,enemy_y-22*index,1.5,1.5);
    
    //right hand
    line(
        enemy_x+16*index,
        enemy_y-40*index,
        enemy_x+33*index,
        enemy_y-40*index
    );

    //right hand fingers
    line(
        enemy_x+29*index,
        enemy_y-39*index,
        enemy_x+33*index,
        enemy_y-39*index
    );
    line(
        enemy_x+29*index,
        enemy_y-38*index,
        enemy_x+33*index,
        enemy_y-38*index
    );
    line(
        enemy_x+29*index,
        enemy_y-37*index,
        enemy_x+33*index,
        enemy_y-37*index
    );

    //thumb
    push();
    strokeWeight(2.5);
    line(
        enemy_x+29.5*index,
        enemy_y-36*index,
        enemy_x+29.5*index,
        enemy_y-32*index
    );
    pop();
    
    //left leg
    line(
        enemy_x-6*index,
        enemy_y-10*index,
        enemy_x-6*index,
        enemy_y
    );

    //right leg
    line(
        enemy_x+6*index,
        enemy_y-10*index,
        enemy_x+6*index,
        enemy_y
    );
    
    //eyes
    strokeWeight(1);
    fill(0);
    ellipse(enemy_x,enemy_y-34*index,5*index,5*index);
    ellipse(enemy_x+10*index,enemy_y-34*index,5*index,5*index);
    
    //mouse
    noFill();
    strokeWeight(2);
    arc(enemy_x+4*index,enemy_y-24*index,12*index,4*index,PI,0);
}

function drawEnemyLookLeft(enemy_x,enemy_y,index)
{
    //shape
    fill(255);
    stroke(0);
    strokeWeight(3);
    fill(255,233,209);
    quad(
        enemy_x-17*index,enemy_y-50*index,
        enemy_x-12*index,enemy_y-10*index,
        enemy_x+12*index,enemy_y-10*index,
        enemy_x+17*index,enemy_y-50*index,
    );
    
    //coffee cup sleeve
    push();
    fill(175,87,0);
    strokeWeight(1.5);
    quad(
        enemy_x-15.5*index,enemy_y-40*index,
        enemy_x-13*index,enemy_y-20*index,
        enemy_x+13*index,enemy_y-20*index,
        enemy_x+15.5*index,enemy_y-40*index
    );
    pop();
    
    //coffee cup lid
    fill(90,45,0);
    quad(
        enemy_x-20*index,enemy_y-56.5*index,
        enemy_x-21.5*index,enemy_y-50*index,
        enemy_x+21.5*index,enemy_y-50*index,
        enemy_x+20*index,enemy_y-56.5*index
    );   
    fill(255);
    
    //left hand
    line(
        enemy_x-17*index,
        enemy_y-40*index,
        enemy_x-33*index,
        enemy_y-40*index
    );

    //left hand fingers
    line(
        enemy_x-29*index,
        enemy_y-39*index,
        enemy_x-33*index,
        enemy_y-39*index
    );
    line(
        enemy_x-29*index,
        enemy_y-38*index,
        enemy_x-33*index,
        enemy_y-38*index
    );
    line(
        enemy_x-29*index,
        enemy_y-37*index,
        enemy_x-33*index,
        enemy_y-37*index
    );

    //thumb
    push();
    strokeWeight(2.5);
    line(
        enemy_x-28.5*index,
        enemy_y-36*index,
        enemy_x-28.5*index,
        enemy_y-33*index
    );
    pop();
    
    //right hand
    push();
    noFill();
    beginShape();
    curveVertex(enemy_x+16*index,enemy_y-40*index);
    curveVertex(enemy_x+16*index,enemy_y-40*index);
    curveVertex(enemy_x+24*index,enemy_y-29*index);
    curveVertex(enemy_x+20*index,enemy_y-22*index);
    curveVertex(enemy_x+20*index,enemy_y-22*index);
    endShape();
    pop();
    ellipse(enemy_x+20*index,enemy_y-22*index,1.5,1.5);
    
    //left leg
    line(
        enemy_x-6*index,
        enemy_y-10*index,
        enemy_x-6*index,
        enemy_y
    );

    //right leg
    line(
        enemy_x+6*index,
        enemy_y-10*index,
        enemy_x+6*index,
        enemy_y
    );

    //eyes
    strokeWeight(1);
    fill(0);
    ellipse(enemy_x-10*index,enemy_y-34*index,5*index,5*index);
    ellipse(enemy_x,enemy_y-34*index,5*index,5*index);
    
    //mouse
    noFill();
    strokeWeight(2);
    arc(enemy_x-4*index,enemy_y-24*index,12*index,4*index,PI,0);
}