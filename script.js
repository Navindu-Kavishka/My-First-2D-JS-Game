//run sound
var runSound = new Audio("run.mp3");
runSound.loop=true;

//jump sound
var jumpSound = new Audio("jump.mp3");

//dead sound
var deadSound = new Audio("dead.mp3");


//key check

function keyCheck(event){

    

    //enter key
    if(event.which == 13) {

        clearInterval(idleAnimationNumber);

        if(runWorkerId==0){

            runWorkerId =setInterval(run,100);
            runSound.play();

           

            moveBackgroundWorkerId = setInterval(backgroundMove,100);
            scoreWorkerId=setInterval(score,100);
            createBlockWorkerId=setInterval(createBlock,100);
            moveBlockWorkerId=setInterval(moveBlock,100);
      
        }

    }

    //space key
    if(event.which==32){

        clearInterval(idleAnimationNumber);

        if (jumpWorkerId==0){

            clearInterval(runWorkerId);
            runWorkerId=-1;
            runSound.pause();

            jumpWorkerId = setInterval(jump,100);
            jumpSound.play();

            
        }
    }
}


//idle
var idleImageNumber =1;
var idleWorkerId = 0;
var idleAnimationNumber=0;

function idle(){

    idleImageNumber++;

    if (idleImageNumber ==11){
        idleImageNumber=1;
    }


    girlId.src="Idle (" + idleImageNumber +").png";
}

function idleAnimation(){

    
   idleAnimationNumber = setInterval(idle,100);
}


//run

var girlId = document.getElementById("girlId");
var runImageNumber = 1;
var runWorkerId =0;

function run(){

 runImageNumber++;

 if(runImageNumber==9) {
    runImageNumber=1;
 }

 girlId.src = "Run (" + runImageNumber + ").png";
}

//jump
var jumpImageNumber =1;
var jumpWorkerId =0;
var girlMarginTop = 440;

function jump(){

    jumpImageNumber++;

    if(jumpImageNumber<=6){
        girlMarginTop = girlMarginTop-35;
        girlId.style.marginTop = girlMarginTop+"px";
    }

    if(jumpImageNumber>=7){
        girlMarginTop = girlMarginTop+35;
        girlId.style.marginTop = girlMarginTop+"px";

    }

    if (jumpImageNumber==11){
        jumpImageNumber=1;

        clearInterval(jumpWorkerId); 
        jumpWorkerId=0;

        runWorkerId=setInterval(run,100);
        runSound.play();

                if(moveBackgroundWorkerId==0){
                    moveBackgroundWorkerId=setInterval(backgroundMove,100);
                }

                if (scoreWorkerId==0){
                    scoreWorkerId=setInterval(score,100);
                }

                if (createBlockWorkerId==0) {
                    createBlockWorkerId=setInterval(createBlock,100);
                }

                if (moveBlockWorkerId==0) {
                    moveBlockWorkerId=setInterval(moveBlock,100);
                }

    }

    girlId.src= "jump (" + jumpImageNumber + ").png";

}

//move background
var backgroundImage = document.getElementById("background");
var backgroundX=0;
var moveBackgroundWorkerId = 0;

function backgroundMove(){

    backgroundX = backgroundX-20;
    backgroundImage.style.backgroundPositionX = backgroundX+"px";
}

//update Score
var scoreId = document.getElementById("score");
var newScore=1;
var scoreWorkerId=0;
  

function score(){
    newScore++;

    scoreId.innerHTML=newScore;

}

//create block

var blockmarginLeft=250;
var createBlockWorkerId =0;
var blockId=1;

function createBlock(){

    var block = document.createElement("div");
    block.className = "block";
    block.id="block"+blockId;

    blockId++;

    var gap =Math.random()*(1000-400)+400;

    blockmarginLeft = blockmarginLeft+gap;
    block.style.marginLeft=blockmarginLeft+"px";

    document.getElementById("background").appendChild(block);

}

//move block

var moveBlockWorkerId=0;

function moveBlock(){

    for(var i=1; i<=blockId;i++){

        var currentBlock =document.getElementById("block"+i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentBlockMarginLeft)- 20;

        currentBlock.style.marginLeft = newMarginLeft+ "px";


        //alert(newMarginLeft);
        //89-9

        if(newMarginLeft<89 & newMarginLeft >9){
            //390
           if (girlMarginTop>390){

            clearInterval(runWorkerId);
            runSound.pause();

            clearInterval(jumpWorkerId);
            jumpWorkerId= -1;
            clearInterval(moveBackgroundWorkerId);
            clearInterval(scoreWorkerId);
            clearInterval(createBlockWorkerId);
            clearInterval(moveBlockWorkerId);


             deadWorkerId= setInterval(dead,100);
             deadSound.play();
            
            }
        }

    }

}

//dead
var deadImageNumber=1;
var deadWorkerId=0;

function dead(){
    deadImageNumber++;

    if(deadImageNumber==11){

        deadImageNumber=10;

        girlId.style.marginTop="440px";

        document.getElementById("endScreen").style.visibility="visible";
        document.getElementById("endScore").innerHTML=newScore;
    }

    girlId.src = "Dead (" + deadImageNumber + ").png"
}


//page reload

function reload(){

    location.reload();
}


