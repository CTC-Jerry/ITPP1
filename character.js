function drawGameCharIsLeftAndIsFalling()
{   
    //move left and jump
    fill(255);
    stroke(0);
    strokeWeight(3);
    fill(255,242,148);
    quad(
        gameChar_x-17,gameChar_y-58,
        gameChar_x-12,gameChar_y-18,
        gameChar_x+12,gameChar_y-18,
        gameChar_x+17,gameChar_y-58,
    );
    fill(255);
    ellipse(gameChar_x,gameChar_y-58,34,6);
    //limbs
    line(gameChar_x-16,gameChar_y-48,gameChar_x-26,gameChar_y-34);
    line(gameChar_x+16,gameChar_y-48,gameChar_x+26,gameChar_y-34);
    line(gameChar_x-6,gameChar_y-18,gameChar_x-10,gameChar_y-10);
    line(gameChar_x+6,gameChar_y-18,gameChar_x+10,gameChar_y-10);
    fill(255,0,0);
    //straw
    quad(
        gameChar_x+2,gameChar_y-73,
        gameChar_x+4,gameChar_y-73,
        gameChar_x+2,gameChar_y-59,
        gameChar_x,gameChar_y-59
    );
    //eyes and mouse
    strokeWeight(1);
    fill(0);
    ellipse(gameChar_x-11,gameChar_y-48,5,5);
    ellipse(gameChar_x,gameChar_y-48,5,5);
    line(gameChar_x-11,gameChar_y-33,gameChar_x+1,gameChar_y-33);
}

function drawGameCharIsRightAndIsFalling()
{   
    //move right and jump
    fill(255);
    stroke(0);
    strokeWeight(3);
    fill(255,242,148);
    quad(
        gameChar_x-17,gameChar_y-58,
        gameChar_x-12,gameChar_y-18,
        gameChar_x+12,gameChar_y-18,
        gameChar_x+17,gameChar_y-58,
    );
    fill(255);
    ellipse(gameChar_x,gameChar_y-58,34,6);
    //limbs
    line(gameChar_x-16,gameChar_y-48,gameChar_x-26,gameChar_y-34);
    line(gameChar_x+16,gameChar_y-48,gameChar_x+26,gameChar_y-34);
    line(gameChar_x-6,gameChar_y-18,gameChar_x-10,gameChar_y-10);
    line(gameChar_x+6,gameChar_y-18,gameChar_x+10,gameChar_y-10);
    fill(255,0,0);
    //straw
    quad(
        gameChar_x+2,gameChar_y-73,
        gameChar_x+4,gameChar_y-73,
        gameChar_x+2,gameChar_y-59,
        gameChar_x,gameChar_y-59
    );
    //eyes and mouse
    strokeWeight(1);
    fill(0);
    ellipse(gameChar_x,gameChar_y-48,5,5);
    ellipse(gameChar_x+11,gameChar_y-48,5,5);
    line(gameChar_x-1,gameChar_y-33,gameChar_x+11,gameChar_y-33);
}

function drawGameCharIsLeft()
{   
    //move left
    fill(255);
    stroke(0);
    strokeWeight(3);
    fill(255,242,148);
    quad(
        gameChar_x-17,gameChar_y-50,
        gameChar_x-12,gameChar_y-10,
        gameChar_x+12,gameChar_y-10,
        gameChar_x+17,gameChar_y-50,
    );
    fill(255);
    ellipse(gameChar_x,gameChar_y-50,34,6);
    //limbs
    line(gameChar_x-16,gameChar_y-40,gameChar_x-22,gameChar_y-20);
    line(gameChar_x+16,gameChar_y-40,gameChar_x+18,gameChar_y-20);
    line(gameChar_x-6,gameChar_y-10,gameChar_x-10,gameChar_y);
    line(gameChar_x+6,gameChar_y-10,gameChar_x+6,gameChar_y);
    fill(255,0,0);
    //straw
    quad(
        gameChar_x+2,gameChar_y-65,
        gameChar_x+4,gameChar_y-65,
        gameChar_x+2,gameChar_y-51,
        gameChar_x,gameChar_y-51
    );
    //eyes and mouse
    strokeWeight(1);
    fill(0);
    ellipse(gameChar_x-10,gameChar_y-40,5,5);
    ellipse(gameChar_x,gameChar_y-40,5,5);
    line(gameChar_x-11,gameChar_y-25,gameChar_x+1,gameChar_y-25);
}

function drawGameCharIsRight()
{   
    //move right
    fill(255);
    stroke(0);
    strokeWeight(3);
    fill(255,242,148);
    quad(
        gameChar_x-17,gameChar_y-50,
        gameChar_x-12,gameChar_y-10,
        gameChar_x+12,gameChar_y-10,
        gameChar_x+17,gameChar_y-50,
    );
    fill(255);
    ellipse(gameChar_x,gameChar_y-50,34,6);
    //limbs
    line(gameChar_x-16,gameChar_y-40,gameChar_x-18,gameChar_y-20);
    line(gameChar_x+16,gameChar_y-40,gameChar_x+22,gameChar_y-20);
    line(gameChar_x-6,gameChar_y-10,gameChar_x-6,gameChar_y);
    line(gameChar_x+6,gameChar_y-10,gameChar_x+10,gameChar_y);
    fill(255,0,0);
    //straw
    quad(
        gameChar_x+2,gameChar_y-65,
        gameChar_x+4,gameChar_y-65,
        gameChar_x+2,gameChar_y-51,
        gameChar_x,gameChar_y-51
    );
    //eyes and mouse
    strokeWeight(1);
    fill(0);
    ellipse(gameChar_x,gameChar_y-40,5,5);
    ellipse(gameChar_x+10,gameChar_y-40,5,5);
    line(gameChar_x-1,gameChar_y-25,gameChar_x+11,gameChar_y-25);
}

function drawGameCharIsFallingOrIsPlummeting()
{   
    //jumping
    fill(255);
    stroke(0);
    strokeWeight(3);
    fill(255,242,148);
    quad(
        gameChar_x-17,gameChar_y-58,
        gameChar_x-12,gameChar_y-18,
        gameChar_x+12,gameChar_y-18,
        gameChar_x+17,gameChar_y-58,
    );
    fill(255);
    ellipse(gameChar_x,gameChar_y-58,34,6);
    //limbs
    line(gameChar_x-16,gameChar_y-48,gameChar_x-26,gameChar_y-34);
    line(gameChar_x+16,gameChar_y-48,gameChar_x+26,gameChar_y-34);
    line(gameChar_x-6,gameChar_y-18,gameChar_x-10,gameChar_y-10);
    line(gameChar_x+6,gameChar_y-18,gameChar_x+10,gameChar_y-10);
    fill(255,0,0);
    //straw
    quad(
        gameChar_x+2,gameChar_y-73,
        gameChar_x+4,gameChar_y-73,
        gameChar_x+2,gameChar_y-59,
        gameChar_x,gameChar_y-59
    );
    //eyes and mouse
    strokeWeight(1);
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-48,5,5);
    ellipse(gameChar_x+5,gameChar_y-48,5,5);
    line(gameChar_x-6,gameChar_y-33,gameChar_x+6,gameChar_y-33);
}

function drawGameCharStandingFront()
{   
    //standing and facing forward
    fill(255);
    stroke(0);
    strokeWeight(3);
    fill(255,242,148);
    quad(
        gameChar_x-17,gameChar_y-50,
        gameChar_x-12,gameChar_y-10,
        gameChar_x+12,gameChar_y-10,
        gameChar_x+17,gameChar_y-50,
    );
    fill(255);
    ellipse(gameChar_x,gameChar_y-50,34,6);
    //limbs
    line(gameChar_x-16,gameChar_y-40,gameChar_x-18,gameChar_y-20);
    line(gameChar_x+16,gameChar_y-40,gameChar_x+18,gameChar_y-20);
    line(gameChar_x-6,gameChar_y-10,gameChar_x-6,gameChar_y);
    line(gameChar_x+6,gameChar_y-10,gameChar_x+6,gameChar_y);
    fill(255,0,0);
    //straw
    quad(
        gameChar_x+2,gameChar_y-65,
        gameChar_x+4,gameChar_y-65,
        gameChar_x+2,gameChar_y-51,
        gameChar_x,gameChar_y-51
    );
    //eyes and mouse
    strokeWeight(1);
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-40,5,5);
    ellipse(gameChar_x+5,gameChar_y-40,5,5);
    line(gameChar_x-6,gameChar_y-25,gameChar_x+6,gameChar_y-25);
}

function drawGameCharDie()
{   
    push();
    translate(gameChar_x,gameChar_y);
    if(layRight){
        rotate(HALF_PI)
    }
    else if(!layRight){
        rotate(-HALF_PI);
    }
    //standing and facing forward
    fill(255);
    stroke(0);
    strokeWeight(3);
    fill(255,242,148);
    quad(
        -17,-50,
        -12,-10,
        12,-10,
        17,-50,
    );
    fill(255);
    ellipse(0,-50,34,6);
    //limbs
    line(-16,-40,-20,-20);
    line(16,-40,20,-20);
    line(-6,-10,-6,0);
    line(6,-10,6,0);
    fill(255,0,0);
    //straw
    quad(
        2,-65,
        4,-65,
        2,-51,
        0,-51
    );
    //eyes
    fill(0);
    //left eye
    line(-8,-43,-2,-37);
    line(-8,-37,-2,-43);
    //right eye
    line(2,-43,8,-37);
    line(2,-37,8,-43);
    //mouse
    ellipse(0,-22,4,6);
    pop();
}