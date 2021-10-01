const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var bg,zombie,z1,z2,z3,z4,z5,z6,z7,z8,z9
var zombieGroup
var shooter,shooterImg1,shooterImg2
var bullet,bulletImg,bulletGroup
var gameState="fight"
var score=0
var lives=3
var bullets=70
var heart1,heart2,heart3,heart1Img,heart2Img,heart3Img
var restart,restartImg1,restartImg2

function preload() {
   bg=loadImage("sprites/night_lawn.jpg")
   z1=loadImage("sprites/zombie1.png")
   z2=loadImage("sprites/zombie2.png")
   z3=loadImage("sprites/spider.png")
   z4=loadImage("sprites/zombie4.png")
   z5=loadImage("sprites/zombie5.png")
   z6=loadImage("sprites/zom1.png")
   z7=loadImage("sprites/zom2.png")
   z8=loadImage("sprites/zom3.png")
   z9=loadImage("sprites/zom4.png")
   shooterImg1=loadAnimation("sprites/shooter_1.png","sprites/shooter_2.png")
   shooterImg2=loadAnimation("sprites/shooter_3.png")
   bulletImg=loadImage("sprites/bullet.png")
   heart1Img=loadImage("sprites/heart_1.png")
   heart2Img=loadImage("sprites/heart_2.png")
   heart3Img=loadImage("sprites/heart_3.png")
   restartImg1=loadAnimation("sprites/restart.png")
   restartImg2=loadAnimation("sprites/restart2.png")
}

function setup(){
    var canvas = createCanvas(1600,800);
    engine = Engine.create();
    world = engine.world;

    zombieGroup=new Group()
    bulletGroup=new Group()

    shooter=createSprite(300,400)
    shooter.addAnimation("shooter",shooterImg1) 
    shooter.debug=true
    shooter.scale=0.3   
    //ground = new Ground(600,height,1200,20);

    heart1=createSprite(displayWidth-150,40,20,20)
    heart1.visible=false
    heart1.scale=0.4
    heart1.addImage("heart1",heart1Img)

    heart2=createSprite(displayWidth-100,40,20,20)
    heart2.visible=false
    heart2.scale=0.4
    heart2.addImage("heart2",heart2Img)

    heart3=createSprite(displayWidth-150,40,20,20)
    //heart3.visible=false
    heart3.scale=0.4
    heart3.addImage("heart3",heart3Img)

    restart=createSprite(750,400)
    restart.scale=0.5
    restart.addAnimation("restart1",restartImg2)
    restart.addAnimation("restart2",restartImg1)
    restart.visible=false
    
    
}   

function draw(){
    Engine.update(engine);
    background(bg)

    if (gameState==="fight") {

        restart.visible=false
            
        if (lives===3) {
            heart3.visible=true
            heart2.visible=false
            heart1.visible=false     
        }

        if (lives===2) {
                heart3.visible=false
                heart2.visible=true
                heart1.visible=false     
            }

            if (lives===1 ){
                heart3.visible=false
                heart2.visible=false
                heart1.visible=true     
            }

            if (lives===0) {
                gameState="lost"
                heart3.visible=false
                heart2.visible=false
                heart1.visible=false 
                }

            if (score===100) {
               gameState="won"

            }

            

            

        enemy()

        if (keyDown("UP_ARROW")) {
          shooter.y=shooter.y-30      
        }
    
        if (keyDown("DOWN_ARROW")) {
            shooter.y=shooter.y+30      
          }
          if (keyWentDown("W")) {
             shooter.addAnimation("shooter",shooterImg2) 
             bullet=createSprite(100,shooter.y,20,10) 
             bullet.addImage("bullet",bulletImg)
             bullet.scale=0.3 
             bullet.velocityX=20
             shooter.depth=bullet.depth
             shooter.depth=shooter.depth+2
             bulletGroup.add(bullet)
             bullets=bullets-1 
          }
          
          if (keyWentUp("W")) {
            shooter.addAnimation("shooter",shooterImg1)     
         } 
         
          if (zombieGroup.isTouching(bulletGroup)) {
                  for(var i=0;i<zombieGroup.length;i++){
                          if(zombieGroup[i].isTouching(bulletGroup)){
                                  zombieGroup[i].destroy()
                                  bulletGroup.destroyEach()
                                  score=score+2                                
                          }
                  }
          } 
          
          if (zombieGroup.isTouching(shooter)) {
                for(var i=0;i<zombieGroup.length;i++){
                        if(zombieGroup[i].isTouching(shooter)){
                                zombieGroup[i].destroy()
                                
                                lives=lives-1                               
                        }
                }
          }

          if (bullets===0) {
                gameState="bullet"  
          }

    }    
    
    
    else if (gameState==="lost") {
       textSize(100)
       fill("red")
       text("YOU LOST",530,200) 
       zombieGroup.destroyEach()
       shooter.destroy() 
       restart.visible=true 
       
       if (mousePressedOver(restart)) {
          restart.changeAnimation("restart2")   
          gameState="fight"     
       }
    }
    else if(gameState==="won"){
        textSize(100)
       fill("green")
       text("YOU WON",750,400)
       zombieGroup.destroyEach()
       shooter.destroy() 
    }
    else if(gameState==="bullet"){
            textSize(50)
            fill("red")
            text("YOU RAN OUT OF BULLETS",500,400)
            zombieGroup.destroyEach()
            shooter.destroy() 
            bulletGroup.destroyEach()
    }

    drawSprites()
    textSize(20)
    fill("white")
    text("BULLETS= "+bullets,displayWidth-200,displayHeight/2-300)
    text("SCORE= "+score,displayWidth-200,displayHeight/2-280)
    text("LIVES= "+lives,displayWidth-200,displayHeight/2-260)
    

}
    

  function enemy(){
        if(frameCount%100===0){
                zombie=createSprite(1600,random(100,500),40,40)
                zombie.velocityX=-3
                
                zombie.lifetime=500
                var rand = Math.round(random(1,9));
                switch(rand) {
                  case 1: zombie.addImage(z1);
                          break;
                  case 2: zombie.addImage(z2);
                          break;
                  case 3: zombie.addImage(z3);
                          break;
                  case 4: zombie.addImage(z4);
                          break;
                  case 5: zombie.addImage(z5);
                          break;
                  case 6: zombie.addImage(z6);
                          break;
                  case 7: zombie.addImage(z7);
                          break;
                  case 8: zombie.addImage(z8);
                          break;
                  case 9: zombie.addImage(z9);
                          break;      
                  default: break;
                         
               }


               zombie.scale=0.3 
               zombie.debug=true              
               zombieGroup.add(zombie)
        }
}


