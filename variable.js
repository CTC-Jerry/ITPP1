//For preload
var mmFont;//used for drawing sun and moon
var backgroundMusic;
var jumpSound;
var jumpSound;
var fullingSound;
var collectSound;
var winSound;
var nextLevelSound;
var volcanoSound;
var volcanoSoundIsPlay=false;
var bombSound;
var hitSound;
var hitSoundIsPlay=false;
var preloadNumber=0;
var preloadFinished=false;

var gameChar_x;
var gameChar_y;
var floorPos_y;
var gameChar_width;
var moveSpeed=5;//control the moving speed of the character
var jumpHeight=110;//control the jumping height of the character

var isLeft;
var isRight;
var isFalling;//game char jump and fall onto ground
var isPlummeting;//game char fall into canyon and game over
var overlapEnemy;
var overlapBomb;
var onPlatform=false;
var bombStart=false;

//For scene
var sun;
var moon;
var riseSpeed=0.1;//control the rising speed of sun and moon
var extremeHeightUp;//the highest y position the sun can be
var extremeHeightDown;//the lowest positin the moon can be
var mountains=[];
var canyons;
var waterFlow;//used for canyon
var clouds;
var colour;//used for the colour of tree
var trees;
var tokens; 
var flagpole;
var platforms=[];
var enemies=[];
var eruption=[];
var bombs=[];

var leftmost;
var rightmost;

var level;
var noteBlink=true;

var score;
var lives;
var countFrame;
var charDie=false;
var layRight;
var fixedBody=false;
var gameOver;

function iniVariables()
{
    floorPos_y=height*3/4;
	gameChar_x=width/2;
	gameChar_y=floorPos_y;
    gameChar_width=12;
    
    isLeft=false;
    isRight=false;
    isFalling=false;
    isPlummeting=false;
    overlapEnemy=false;
    overlapBomb=false;
    
    cameraPosX=0;
    
    flagpole={
        x:586,
        y:(floorPos_y-50),
        isReached:false,
        atTop:false
    };
    
    hitSoundIsPlay=false;
    
    countFrame=0;
    fixedBody=false;
}

function toNextLevel()
{
    floorPos_y=height*3/4;
	gameChar_x=width/2;
	gameChar_y=floorPos_y;
    gameChar_width=12;
    
    isLeft=false;
    isRight=false;
    isFalling=false;
    isPlummeting=false;
    overlapEnemy=false;
    overlapBomb=false;
    
    cameraPosX=0;
    
    flagpole={
        x:586,
        y:(floorPos_y-50),
        isReached:false,
        atTop:false
    };
    
    level.number++;
    level.levelUP=false;
    score=0;
    leftmost=width/2;
    rightmost=width/2;
    
    countFrame=0;
}

function restartGame()
{
    leftmost=width/2;
    rightmost=floorPos_y;
    
    sun.y=80;
    moon.y=floorPos_y*2-sun.x;
    
    floorPos_y=height*3/4;
	gameChar_x=width/2;
	gameChar_y=floorPos_y;
    gameChar_width=12;
    
    level={
        number:0,
        requiredToken:[3,5,8],
        levelUP:false
    };
    
    isLeft=false;
    isRight=false;
    isFalling=false;
    isPlummeting=false;
    overlapEnemy=false;
    overlapBomb=false;
    
    cameraPosX=0;
    
    flagpole.isReached=false;
    flagpole.atTop=false;
    
    mountains=[
        new CreateMountain(300,115,432,110),
        new CreateMountain(1000,115,432,110),
    ];

    clouds=[
        new CreateCloud(sun.x,150,80),
        new CreateCloud(-500,random(120,150),40),
        new CreateCloud(random(400,500),random(80,180),60)
    ];
    
    canyons=[
        new CreateCanyon(445,60,75,floorPos_y,576),
        new CreateCanyon(745,60,75,floorPos_y,576)
    ];
    
    tokens=[
        new CreateToken(400,1,60,60,0.5),
        new CreateToken(600,0,60,60,0.5),
        new CreateToken(800,0,60,60,0.5)
    ];
    
    trees=[
        new CreateTree(57,floorPos_y-70,colour[1]),
        new CreateTree(122,floorPos_y-50,colour[2]),
        new CreateTree(187,floorPos_y-70,colour[0]),
        new CreateTree(890,floorPos_y-70,colour[int(random(0,3))]),
        new CreateTree(953,floorPos_y-50,colour[int(random(0,3))])
    ];
    
    platforms=[];
    
    enemies=[
        new CreateEnemy(createVector(50,floorPos_y))
    ];
    
    flagpole={
        x:586,
        y:(floorPos_y-50),
        isReached:false,
        atTop:false
    };
    
    hitSoundIsPlay=false;
    
    score=0;
    lives=3;
    countFrame=0;
    charDie=false;
    fixedBody=false;
    gameOver=false;

    backgroundMusic.loop();
}