var Protector;
var Hostage;
var playerx = 200;
var playery = 200;
var Wall;
var Rain = [];
var bullets;
var MARGIN = 40;
var Intro = true;




function HandleInput() {
    if (keyIsDown(LEFT_ARROW)) {
        Intro = false;
        playerx -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        Intro = false;
        playerx += 5;
    }
    if (keyIsDown(UP_ARROW)) {
        Intro = false;
        playery -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        Intro = false;
        playery += 5;
    }
}

function setup() {
    createCanvas(windowWidth - 5, windowHeight - 50);
    var HostageImg = loadImage('pickleses.png');
    var ProtectorImg = loadImage('frannie.png');
    Hostage = createSprite(width / 2, height - 60, 100, 100);
    Hostage.addImage(HostageImg);
    Protector = createSprite(random(width - 20), random(height - 20), 20, 20);
    Protector.addImage(ProtectorImg);
    Protector.shapeColor = color(255, 255, 255);
    Hostage.shapeColor = color(255, 255, 255);
    Protector.friction = 0.02;
    Hostage.friction = 0.02;
    Protector.maxSpeed = 6;

    bullets = new Group();


}

function draw() {
    background(190);
    // fill(0, 255, 0);
    HandleInput();
    // Protector.position.x = playerx;
    // Protector.position.y = playery;

    if(Intro)
    {
        push();
        textAlign(CENTER, CENTER);
        textSize(100);
        fill(86, 0, 226);
        text('GIRLFRIEND QUEST', width / 2, height / 2);
        textSize(50);
        fill(0, 173, 2);
        text('PROTECT YOUR BF!', width / 2, height / 2 + 70);
        pop();

    }


    for (var i = 0; i < allSprites.length; i++) {
        var s = allSprites[i];
        if (s.position.x < -MARGIN) s.position.x = width + MARGIN;
        if (s.position.x > width + MARGIN) s.position.x = -MARGIN;
        if (s.position.y < -MARGIN) s.position.y = height + MARGIN;
        if (s.position.y > height + MARGIN) s.position.y = -MARGIN;
    }


    if (Protector.collide(Hostage)) {
        Hostage.addSpeed(.2, Protector.rotation);
    }
     if (keyDown("LEFT_ARROW"))
        Protector.rotation -= 4;
    if (keyDown("RIGHT_ARROW"))
        Protector.rotation += 4;
    if (keyDown("UP_ARROW")) {
        Protector.addSpeed(.2, Protector.rotation);
    }
    if (frameCount % 200 == 0) {
        Intro = false;
        var bullet = createSprite(Hostage.position.x + random(-30, 30), -10, 7, 7);
        bullet.setSpeed(2, 90);
        bullet.shapeColor = color(255, 255, 255);
        var img = loadImage('spider.png');
        bullet.addImage(img);
        bullet.life = 450;
        bullets.add(bullet);
        //Wbullet.debug = true;
    }
    if (bullets.collide(Hostage)) {
        push();
        fill(255, 0, 0);
        textSize(100);
        textAlign(CENTER, CENTER);
        text('GAME OVER', width / 2, height / 2);
        textSize(50);
        fill(255, 0, 0);
        text('Reload to try again', width / 2, height / 2 + 70);
        noLoop();
        pop();
    }
//    bullets.collide(Protector, brickHit)


    Protector.displace(Hostage);


    drawSprites();
}

function brickHit(SpriteA, SpriteB) {
  SpriteA.remove();
}
