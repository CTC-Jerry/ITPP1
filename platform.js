function createPlatform(x_pos,y_pos)
{
    var platform={
        
        halfWidth:58,
        xPos:undefined,
        yUp:undefined,
        yDown:undefined,
        xLeftmost:undefined,
        xRightmost:undefined,
        xSpeed:random(0.7,0.9),
        length:6,
        distance:this.length*2.8,
        v1:createVector(0,-28),
        v2:createVector(0,-12),
        
        setup:function(x,y){
            this.xPos=x;
            this.yUp=y-8;
            this.yDown=y+8;
            
            var moveScale=random(30,50);
            this.xLeftmost=x-moveScale;
            this.xRightmost=x+moveScale;
        },
        
        draw:function(){
            
            push();
            
            noStroke();
            fill(255);
            rect(this.xPos-this.halfWidth,this.yUp,this.halfWidth*2,16);
            arc(
                this.xPos-0.5+this.halfWidth,
                this.yUp+8,
                16,
                16,
                -HALF_PI,
                HALF_PI
            );
            noFill();
            stroke(255);
            strokeWeight(16);
            arc(
                this.xPos-this.halfWidth,
                this.yUp+28,
                40,
                40,
                HALF_PI,
                PI+HALF_PI
            );
            
            var length=this.length;
            var distance=length*2.8;
            for(let i=0;i<7;i++){
                if(i%2==0){
                    fill(255,0,0);
                }
                else{
                    fill(99,255,31);
                }
                
                noStroke();
                quad(
                this.xPos-this.halfWidth+6+i*distance,this.yUp,
                this.xPos-this.halfWidth+6+3+i*distance,this.yDown,
                this.xPos-this.halfWidth+6+3+length+i*distance,this.yDown,
                this.xPos-this.halfWidth+6+length+i*distance,this.yUp
                );
            }
            
            push();
            translate(this.xPos-this.halfWidth,this.yUp+28);
            for(let i=0;i<5;i++){

                if(i==0){
                    rotate(-0.4);
                }
                else{
                    rotate(-0.68);
                }

                if(i%2==0){
                    fill(99,255,31);
                }
                else{
                    fill(255,0,0);
                }
                rect(
                    this.v1.x,
                    this.v1.y,
                    length,
                    (this.v2.y-this.v1.y),
                    2.5
                );

            }
            pop();
            
            pop();
            
            //move platform
            this.xPos+=this.xSpeed;
            if(
                this.xPos<=this.xLeftmost||
                this.xPos>=this.xRightmost
            ){
                this.xSpeed*=-1;
            }
        }
        
    }
    
    platform.setup(x_pos,y_pos);
    
    return platform;
}

function drawPlatform()
{
    for(let i=0;i<platforms.length;i++){
        platforms[i].draw();
    }
}