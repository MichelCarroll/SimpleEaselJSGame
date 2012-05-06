
stage = null;
bounds = null;

shooter = null;
balls = [];
bullets = [];

var BALL_SPEED = 2;
var BULLET_SPEED = 10;
var BALL_SPAWN_SPEED = 2000;

loadGame = function() {
    var canvas = document.getElementById('main');
    stage = new Stage(canvas);
    bounds = new Rectangle(0,0,canvas.width, canvas.height);

    registerShooter();
    startSpawningBalls();

    stage.onMouseMove = moveCanvas;
    stage.onMouseDown = clickCanvas;

    Ticker.setFPS(20);
    Ticker.addListener(window);
};

registerShooter = function()
{
    shooter = new BitmapAnimation(getShooterSheet());
    shooter.x = 5;
    shooter.y = bounds.height / 2;
    shooter.gotoAndPlay("idle");

    stage.addChild(shooter);
};

getShooterSheet = function()
{
    var paddleData =
    {
        'images':
            [
                'assets/images/paddle1.png',
                'assets/images/paddle2.png',
                'assets/images/paddle3.png',
                'assets/images/paddle4.png',
                'assets/images/paddle5.png',
                'assets/images/paddle6.png'
            ],
        'frames':
            [
                [0,0,20,50,0],
                [0,0,20,50,1],
                [0,0,20,50,2],
                [0,0,20,50,3],
                [0,0,20,50,4],
                [0,0,20,50,5]
            ],
        "animations": {"shoot": [1,5], "idle": [0]}
    }

    var shooterSheet = new SpriteSheet(paddleData);

    shooterSheet.getAnimation("shoot").frequency = 2;
    shooterSheet.getAnimation("shoot").next = "idle";

    return shooterSheet;
};

tick = function()
{
    for(x in balls)
    {
        var animation = balls[x];
        animation.x -= BALL_SPEED;

        if(animation.x + 50 < bounds.x)
        {
            balls.splice(x, 1);
            stage.removeChild(animation);
        }
    }

    for(x in bullets)
    {
        var animation = bullets[x];
        animation.x += BULLET_SPEED;

        if(animation.x > bounds.width)
        {
            bullets.splice(x, 1);
            stage.removeChild(animation);
        }
    }
    stage.update();
};

launchBullet = function()
{
    var originX = 10;
    var originY = shooter.y + 20;

    var bulletAnimation = getBulletBitmap();
    bulletAnimation.x = originX;
    bulletAnimation.y = originY;

    stage.addChild(bulletAnimation);

    var bulletId = UID.get();
    bullets[bulletId] = bulletAnimation;
}

clickCanvas = function(/**MouseEvent*/ e)
{
    if(shooter)
    {
        launchBullet();
        shooter.gotoAndPlay("shoot");
    }
};

moveCanvas = function(/**MouseEvent*/ e)
{
    if(shooter)
    {
        shooter.y = e.stageY - 25;
    }
};



getBallSheet = function()
{
    var blueBallData =
    {
        'images':
            [
                'assets/images/blueball1.png',
                'assets/images/blueball2.png',
                'assets/images/blueball3.png',
                'assets/images/blueball4.png'
            ],
        'frames':
            [
                [0,0,30,30,0],
                [0,0,30,30,1],
                [0,0,30,30,2],
                [0,0,30,30,3]
            ],
        "animations": {"blink": [0,1,2,3,2,1]}
    }

    var ballSpriteSheet = new SpriteSheet(blueBallData);

    ballSpriteSheet.getAnimation("blink").frequency = 2;
    ballSpriteSheet.getAnimation("blink").next = "blink";
    return ballSpriteSheet;
};


getBulletBitmap = function()
{
    var bulletImg = new Image();
    bulletImg.src = "assets/images/bullet.png";

    return new Bitmap(bulletImg);
}


spawnBlueBallAt = function(/**int*/ y)
{
    var ballId = UID.get();
    var ballAnimation = new BitmapAnimation(getBallSheet());
    ballAnimation.x = bounds.width;
    ballAnimation.y = y;
    ballAnimation.gotoAndPlay("blink");
    balls[ballId] = ballAnimation;
    stage.addChild(ballAnimation);
};

startSpawningBalls = function()
{
    setInterval(function() {
        spawnBlueBallAt(Math.random() * bounds.height);
    }, BALL_SPAWN_SPEED);
}