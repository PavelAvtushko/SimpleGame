window.onload = game();

function game() {
    const HEALTH_DEFAULT = 200;
    const DIAGRAM_WIDTH = 200;
    const SCORE_REQUIRED = 40;
    const BACKGROUND_ROTATION_SPEED = 3;
    const PLAYER_SPEED = 2;
    const ENEMY_SPEED = 6;
    const COINS_NUMBER = 3;
    const COINS_MINIMUM_SPEED = 4; 

    let backgroundImage;
    let playerImage;
    let enemyImage;
    let coinImage;
    let player;
    let enemy;
    let coins;
    let images;
    let crush;
    let playingStatus;
    let backgroundObj;
    let healthValue = document.getElementById('Health');
    let scoreValue = document.getElementById('Score');
    let startBtn = document.getElementById('play-again');
    let lifeItems;

    let requestAnimFrame = (function(){
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function initialization() {
        backgroundImage = document.getElementById('background').getContext('2d');
        playerImage = document.getElementById('player').getContext('2d');
        enemyImage = document.getElementById('enemy').getContext('2d');
        coinImage = document.getElementById('coin').getContext('2d');
        underAtack = document.getElementById('playerUnderAtack');
        gameOver = document.getElementById('gameOver');
        winGame = document.getElementById('winGame');
        let healthDiagram = document.getElementById('healthDiagram');
        let scoreDiagram = document.getElementById('scoreDiagram');
        lifeItems = document.getElementById('lifePanel').children;
        backgroundObj = new BackGround(BACKGROUND_ROTATION_SPEED);
        player = new Player(PLAYER_SPEED, HEALTH_DEFAULT);
        enemy = new Enemy(ENEMY_SPEED);
        coins = new ArrayCoins(COINS_NUMBER, COINS_MINIMUM_SPEED);
        images = new imageResurses();
        keybordEvent = new KeybordHandler();
        crush = new CrashEvent();

        images.imageInit();
        coins.create();
        
        healthValue.innerHTML = player.health;
        scoreValue.innerHTML = player.score;
        
        startBtn.addEventListener('click', restart);
        document.addEventListener("keydown", e => {
            keybordEvent.checkKeyPress(e, player)
        }); 
        document.addEventListener("keyup", e => {
            keybordEvent.checkKeyUnpress(e, player)
        });

        startGameloop();
        lifeItemsFill(player.life);
    }
    
    //fill life points and establish it default value
    function lifeItemsFill(item) {
        for (let i = item; i > 0; --i) {
            lifeItems[i].classList.add('lifeVisible');
        }
    }

    //delete life points method
    function lifeItemsDel() {
        for (let i = 3; i > 0; --i) {
            lifeItems[i].classList = " ";
        }
    }

    function gameLoop() {
        if (playingStatus) {
            backgroundObj.draw(backgroundImage, images);
            player.draw(playerImage, images);
            enemy.draw(enemyImage, images);
            coins.draw(coinImage, images);
            update();
            requestAnimFrame(gameLoop); 
        }
    }

    function startGameloop() {  
        playingStatus = true;
        gameLoop();
    }

    function stopGameloop() {
        playingStatus = false;
    }


    function update() {
        player.move();
        enemy.move();
        coins.move();
        crush.crashAction(player, enemy, coins, underAtack); 
        healthDiagram.style.width = (DIAGRAM_WIDTH * player.health / HEALTH_DEFAULT) + 'px';
        scoreDiagram.style.width = (DIAGRAM_WIDTH * player.score / SCORE_REQUIRED)+ 'px';
        healthValue.innerHTML = player.health;
        scoreValue.innerHTML = player.score;
        lifeItemsDel();
        lifeItemsFill(player.life);
        
        if (player.life === 0) {
            playingStatus = false;
            healthValue.innerHTML = 0;
            gameOver.classList.remove('hiddenText');
        }

        if (player.score === SCORE_REQUIRED) {
            playingStatus = false;
            winGame.classList.remove('hiddenText');
        }
    }
 

    function restart() {
        healthDiagram.style.width = DIAGRAM_WIDTH +'px';
        scoreDiagram.style.width = 0;
        gameOver.classList.add('hiddenText');
        winGame.classList.add('hiddenText');
        backgroundObj = new BackGround(BACKGROUND_ROTATION_SPEED);
        player = new Player(PLAYER_SPEED, HEALTH_DEFAULT);
        enemy = new Enemy(ENEMY_SPEED);
        coins = new ArrayCoins(COINS_NUMBER, COINS_MINIMUM_SPEED);
        healthValue.innerHTML = player.health;
        scoreValue.innerHTML = player.score;
        
        coins.create();
        lifeItemsFill(lifeItems);
        if (!playingStatus) {
            playingStatus = true
            startGameloop();
        }
    }

    initialization();
}


