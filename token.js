function CreateToken(x,yIndex,width,height,scale)
{
    this.tokenY=[330,410];
    
    this.x=x;
    this.y=this.tokenY[yIndex];
    this.width=width;
    this.height=height;
    this.scale=scale;
    this.isFound=false;
    
    this.draw=function(){
        if(!this.isFound){
            push();
            fill(0); 
            ellipse(
                this.x,
                this.y,
                this.width*this.scale,
                this.height*this.scale
            );
            fill(255,200);
            ellipse(
                this.x-15*this.scale,
                this.y,
                this.width/4*this.scale,
                this.height/2*this.scale
            );
            pop();
        }
    }
}

function drawToken()
{
    for(let i=0;i<tokens.length;i++){
        tokens[i].draw();
    }
}