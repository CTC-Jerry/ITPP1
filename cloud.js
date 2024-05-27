function CreateCloud(x_pos,y_pos,radius)
{
    this.x_pos=x_pos;
    this.y_pos=y_pos;
    this.radius=radius;
    this.scale=map(radius,40,80,0.5,1);
    
    this.draw=function()
    {
        fill(255);
        noStroke();
        ellipse(this.x_pos,this.y_pos,this.radius,this.radius);
        ellipse(
            this.x_pos-40*this.scale,
            this.y_pos-20*this.scale,
            this.radius-10*this.scale,
            this.radius-10*this.scale
        );
        ellipse(
            this.x_pos+10*this.scale,
            this.y_pos-20*this.scale,
            this.radius-5*this.scale,
            this.radius-5*this.scale
        );
        ellipse(
            this.x_pos+60*this.scale,
            this.y_pos-20*this.scale,
            this.radius,
            this.radius
        );
        //cloud animation
        this.x_pos+=map(this.radius,0,80,3,0.1); 
    }
}

function drawCloud()
{
    for(let i=0;i<clouds.length;i++){
        clouds[i].draw();
    }
}