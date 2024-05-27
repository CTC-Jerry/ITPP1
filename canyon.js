function ifAddingCanyon(xPos)
{
    var possibility=random(0,1);
    if(possibility<0.01){
        var overlap=false;
        for(let i=0;i<canyons.length;i++){
            let con1=abs(xPos-canyons[i].mid)>400;
            if(!con1){
                overlap=true;
                break;
            }
        }
        if(!overlap){
            var c=new CreateCanyon(xPos,60,75,floorPos_y,576);
            canyons.push(c);
            
            //determine whether to add platform
            ifAddingPlatform(xPos);
        }
        
    }
}

function CreateCanyon(mid,upHalfWidth,downHalfWidth,yUp,yDown)
{
    this.mid=mid;
    this.upHalfWidth=upHalfWidth;
    this.downHalfWidth=downHalfWidth;
    this.yUp=yUp;
    this.yDown=yDown;
            
    this.draw=function(){
        push();
        noStroke();
        fill(112,44,4);
        quad(
            this.mid-this.upHalfWidth,this.yUp,
            this.mid+this.upHalfWidth,this.yUp,
            this.mid+this.downHalfWidth,this.yDown,
            this.mid-this.downHalfWidth,this.yDown
        );
        fill(255,204,127);
        quad(
            this.mid-this.upHalfWidth+15,this.yUp,
            this.mid+this.upHalfWidth-15,this.yUp,
            this.mid+this.downHalfWidth-15,this.yDown,
            this.mid-this.downHalfWidth+15,this.yDown
        );
        pop();
    },
        
    //give the ellipses for waterflow animation to canyon
    this.giveWater=function(){ 
        push();
        fill("#FFECD0");
        ellipse(this.mid-30,
                waterFlow[0][0],
                waterFlow[0][1],
                waterFlow[0][2]);
        ellipse(this.mid-15,
                waterFlow[1][0],
                waterFlow[1][1],
                waterFlow[1][2]);
        ellipse(this.mid,
                waterFlow[2][0],
                waterFlow[2][1],
                waterFlow[2][2]);
        ellipse(this.mid+15,
                waterFlow[3][0],
                waterFlow[3][1],
                waterFlow[3][2]);
        ellipse(this.mid+30,
                waterFlow[4][0],
                waterFlow[4][1],
                waterFlow[4][2]);

        pop(); 
    }
}

function drawCanyon()
{
    for(let i=0;i<canyons.length;i++){
        canyons[i].draw();
        canyons[i].giveWater();
    }
}

function waterMove()
{
    for(let i=0;i<waterFlow.length;i++){
        waterFlow[i][0]+=10;
        if(waterFlow[i][0]-waterFlow[i][2]/2>height){
            waterFlow[i][0]=450;
        }
    }
}