function CreateMountain(mid,upHalfWidth,yDown,yUp)
{
    this.mid=mid;
    this.upHalfWidth=upHalfWidth;
    this.yDown=yDown;
    this.yUp=yUp;
    
    this.draw=function(){
        var downHalfWidth=max(this.upHalfWidth,250);
        //pudding
        stroke(0,0,0,100);
        fill(239,226,40);
        quad(
            this.mid-this.upHalfWidth,this.yUp,
            this.mid+this.upHalfWidth,this.yUp,
            this.mid+downHalfWidth,this.yDown,
            this.mid-downHalfWidth,this.yDown
            );
        //pudding reflective
        noStroke();
        fill(250, 241, 110);
        quad(
            this.mid-this.upHalfWidth+30,this.yUp,
            this.mid-this.upHalfWidth,this.yUp,
            this.mid-downHalfWidth,this.yDown,
            this.mid-downHalfWidth+30,this.yDown
            );

        var mounHeight=this.yDown-this.yUp;
        var distXUpDown=downHalfWidth-this.upHalfWidth;
        //caramal
        stroke(0,0,0,100);
        fill(137,54,7);
        quad(
            //topRight
            this.mid+this.upHalfWidth,this.yUp,
            //topLeft
            this.mid-this.upHalfWidth,this.yUp,
            //downLeft
            this.mid-this.upHalfWidth-distXUpDown*0.125,this.yUp+mounHeight*0.125,
            //downRight
            this.mid+this.upHalfWidth+distXUpDown*0.125,this.yUp+mounHeight*0.125
            );
        var caramelWidth=distXUpDown*0.125*2+this.upHalfWidth*2;
        var caramelDist=caramelWidth/8;
        noStroke();
        ellipse(
            this.mid-caramelDist*3,
            this.yUp+mounHeight*0.125,
            caramelDist*2,
            caramelDist,
            0,PI);
        ellipse(
            this.mid-caramelDist,
            this.yUp+mounHeight*0.125,
            caramelDist*2,
            caramelDist,
            0,PI);
        ellipse(
            this.mid+caramelDist,
            this.yUp+mounHeight*0.125,
            caramelDist*2,
            caramelDist,
            0,PI);
        ellipse(
            this.mid+caramelDist*3,
            this.yUp+mounHeight*0.125,
            caramelDist*2,
            caramelDist,
            0,PI);
    };
}

function drawMountain()
{
    for(let i=0;i<mountains.length;i++){
        mountains[i].draw();
    }
}