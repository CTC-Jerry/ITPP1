function CreateTree(x_pos,trunk_y,flavour)
{
    this.x_pos=x_pos;
    this.trunk_y=trunk_y;
    this.flavour=flavour;
    
    this.halfTrunkWidth=7;
    this.trunkHeight=70;
    this.halfLeaveWidth=50;
    this.leaveHeight=180;
    
    this.draw=function(){
        fill(230,209,178);
            //ice stick
            stroke(202,164,38);
            rect(
                this.x_pos-this.halfTrunkWidth,
                this.trunk_y,
                this.halfTrunkWidth*2,
                this.trunkHeight,
                5
            );
            noStroke();
            //milk ice cream
            fill(255,244,226);
            rect(
                this.x_pos-this.halfLeaveWidth,
                this.trunk_y-165,
                this.halfLeaveWidth*2,
                this.leaveHeight,
                20
            );
            //flavour
            fill(this.flavour);
            rect(
                this.x_pos-this.halfLeaveWidth,
                this.trunk_y-165,
                this.halfLeaveWidth*2,
                this.leaveHeight-20,
                20
            );
    }
}

function drawTree()
{
    for(let i=0;i<trees.length;i++){
        trees[i].draw();
    }
}