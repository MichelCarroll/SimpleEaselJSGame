
stage = null;
bounds = null;

balls = [];

var BALL_SPEED = 2;
var BALL_SPAWN_SPEED = 2000;

loadGame = function() {
    var canvas = document.getElementById('main');
    stage = new Stage(canvas);
    bounds = new Rectangle(0,0,canvas.width, canvas.height);

    startSpawningBalls();

    stage.onMouseMove = moveCanvas;
    stage.onMouseDown = clickCanvas;

    Ticker.setFPS(20);
    Ticker.addListener(window);
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
    stage.update();
};

clickCanvas = function(/**MouseEvent*/ e)
{

};

moveCanvas = function(/**MouseEvent*/ e)
{

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