//For volcano eruption
function Emitter(xPos,yPos,upHalfWidth,xSpeed,ySpeed,size)
{
    this.pos=createVector(xPos,yPos);
    this.velocity=createVector(xSpeed,ySpeed);
    this.upHalfWidth=upHalfWidth;
    this.range=upHalfWidth*2/3;
    this.size=size;
    
    this.startParticle=0;
    this.lifetime=0;
    
    this.particles=[];
    this.existTime=0;
    this.duration=this.range*6;
    this.originalLifetime=0;
    this.timeToEnd=this.duration/2;
    this.shouldExist=true;
    
    this.startEmitter=function(startParticle,lifetime){
        this.startParticle=startParticle;
        this.lifetime=lifetime;
        this.originalLifetime=lifetime;
        
        for(let i=0;i<this.startParticle;i++){
            var p=this.createParticle();
            this.particles.push(p);
        };
    }
        
    this.createParticle=function(){
        var x=this.pos.x+random(-this.range,this.range);
        var y=this.pos.y;
        var xVel=this.velocity.x+random(-1,1);
        var yVel=this.velocity.y+random(-7,-4);
        
        var Pos=createVector(x,y);
        var velocity=createVector(xVel,yVel);

        if(this.existTime>=this.timeToEnd){ 
            this.lifetime=map(
                this.existTime,
                this.timeToEnd,
                this.duration,
                this.originalLifetime,
                0);
        }
        
        var p=new Particle(Pos,velocity,this.size);
        return p;
    };
        
    this.drawAndUpdateParticle=function(){
        for(let i=0;i<this.startParticle;i++){
            this.particles[i].drawParticle();
            this.particles[i].updateParticle();
        };
        
        this.existTime++;
        if(this.existTime>this.duration){
            this.shouldExist=false;
        }
        
        var deadNumber=0;
        for(let i=this.particles.length-1;i>=0;i--){
            var time=this.lifetime;
            if(this.particles[i].age>random(time/4,time)){
                deadNumber++;
                this.particles.splice(i,1);
            }
        }
            
        for(let i=0;i<deadNumber;i++){
            var p=this.createParticle();
            this.particles.push(p);
        }
    }
}

function Particle(pos,velocity,size)
{
    this.pos=pos;
    this.velocity=velocity;
    this.size=size;
    
    this.age=0;
    this.originalPosY=this.pos.y;
    
    this.drawParticle=function(){
        var colourGChangeY=this.originalPosY-230;
        var colourBChangeY=this.originalPosY-80;
        var g=map(this.pos.y,this.originalPosY,colourGChangeY,255,0);
        var b=map(this.pos.y,this.originalPosY,colourBChangeY,255,0);
        fill(255,g,b);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.size,this.size*2);
    };
    
    this.updateParticle=function(){
        this.pos=this.pos.add(this.velocity);
        this.age++;
    }
}

function drawVolcanoAnimation()
{
    for(let i=0;i<eruption.length;i++){
        eruption[i].drawAndUpdateParticle();   
    }
}

//For fulling bombs
function BombEmitter(xPos,yPos,xSpeed,ySpeed,size,colour)
{
    this.Pos=createVector(xPos,yPos);
    this.velocity=createVector(xSpeed,ySpeed);
    this.size=size;
    this.colour=colour;
    this.particles=[];
    
    this.startParticle=0;
    this.lifetime=0;
    
    this.soundIsPlay=false;
    
    this.startEmitter=function(startParticle,lifetime){
        this.startParticle=startParticle;
        this.lifetime=lifetime;
        //start emitter with the initial particle
        for(let i=0;i<this.startParticle;i++){
            
            var p=this.createParticle();
            this.particles.push(p);
        }
    },
        
    this.createParticle=function(){
        var xPos=random(-15,15);
        var yPos=random(0,10);
        var xVel=random(this.velocity.x-1,this.velocity.x+1);
        var yVel=random(this.velocity.y-1,this.velocity.y+1);
        var Pos=createVector(xPos,yPos);
        var velocity=createVector(xVel,yVel);
        
        var p=new BombParticle(
            Pos,
            velocity,
            this.size,
            this.colour,
            0
        );
        
        return p;
    },
    
    this.drawAndUpdateParticle=function(){
        var deadParticle=0;
        push();
        translate(this.Pos.x,this.Pos.y);
        fill(0);
        noStroke();
        ellipse(0,0,30,30);
        pop();
        for(let i=this.particles.length-1;i>=0;i--){
            push();
            translate(this.Pos.x,this.Pos.y);
            this.particles[i].drawParticle();
            this.particles[i].updateParticle();
            pop();
            
            if(this.particles[i].age>random(0,this.lifetime)){
                this.particles.splice(i,1);
                deadParticle++;
            }
        }
        for(let i=0;i<deadParticle;i++){
            var p=this.createParticle();
            this.particles.push(p);
        }
        
        this.Pos.y+=10;
        this.Pos.y=min(this.Pos.y,floorPos_y-15);
    } 
}

function BombParticle(pos,velocity,size,colour,corePosY)
{
    this.pos=pos;
    this.velocity=velocity;
    this.size=size;
    this.colour=colour;
    this.age=0;
    this.corePosY=corePosY;
    this.greenColour=green(colour);
    
    
    this.drawParticle=function(){
        var maxHeight=this.corePosY-300;
        
        this.greenColour=map(
            this.pos.y,
            this.corePosY,
            maxHeight,
            215,
            0);
        fill(255,this.greenColour,0);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.size);
    }
    
    this.updateParticle=function(){
        this.pos=this.pos.add(this.velocity);
        this.age++;
    }
}

function drawFallingBomb()
{
    for(let i=0;i<bombs.length;i++){
        bombs[i].drawAndUpdateParticle();
        if(!bombs[i].soundIsPlay&&bombs[i].Pos.y==0){
            bombSound.play();
            bombs[i].soundIsPlay=true;
        }
    }
}