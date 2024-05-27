function preload()
{   
    //load m&m font
    mmFont=loadFont('assets/MM-Logo-Font/Aachen Std Medium.otf',checkPrelaod);
    
    soundFormats('mp3');
    //load sounds
    backgroundMusic=loadSound('assets/sound/backgroundMusic',checkPrelaod);
    jumpSound=loadSound('assets/sound/jumpSound.mp3',checkPrelaod);
    fullingSound=loadSound('assets/sound/fullingSound.mp3',checkPrelaod);
    collectSound=loadSound('assets/sound/collectSound.mp3',checkPrelaod);
    winSound=loadSound('assets/sound/winSound.mp3',checkPrelaod);
    nextLevelSound=loadSound('assets/sound/nextLevelSound',checkPrelaod);
    loseSound=loadSound('assets/sound/loseSound.mp3',checkPrelaod);
    volcanoSound=loadSound('assets/sound/volcanoSound',checkPrelaod);
    bombSound=loadSound('assets/sound/bombSound',checkPrelaod);
    hitSound=loadSound('assets/sound/hitSound',checkPrelaod);
    
    //set the volume
    backgroundMusic.setVolume(0.5);
    jumpSound.setVolume(0.2);
    fullingSound.setVolume(0.6);
    collectSound.setVolume(1);
    winSound.setVolume(0.5);
    nextLevelSound.setVolume(0.4);
    volcanoSound.setVolume(0.25);
    bombSound.setVolume(1);
}

function checkPrelaod()
{
    preloadNumber+=1;
    if(preloadNumber==10){
        preloadFinished=true;
    }
}