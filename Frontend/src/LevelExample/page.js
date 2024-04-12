﻿import Phaser from 'phaser';
import {useEffect} from 'react';

class LevelExampleClass extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'LevelExample' });
    }

    preload()
    {
        this.load.atlas('player', 'cat_sprite.png', 'cat_sprite.json');
        this.load.image('background', 'snowy_mountains.jpg');
        this.load.image('ground', 'platform.jpg');
        this.load.image('rock', 'snowy_rock.png')
        this.load.image('tree', 'snowy_tree.png')
        this.load.image('fish', 'fish.png')
        this.load.image('pauseBtn', 'pause_button.png');
    }

    create()
    {
        // create background
        const { width, height } = this.sys.game.canvas;
        this.bg = this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0, 0);
        this.bg.setTileScale(2);

        // create ground
        this.ground = this.add.tileSprite(0, 525, width, height, 'ground').setOrigin(0, 0);
        this.ground.setTileScale(3);
        this.physics.add.existing(this.ground, true);

        // user input
        this.cursors = this.input.keyboard.createCursorKeys();

        // player animation
        this.anims.create({ 
            key:'walk', 
            frames: this.anims.generateFrameNames('player', {
                prefix:'cat_sprite', 
                end: 2, 
                zeroPad: 1
            }),
            repeat: -1
        });

        // create player
        this.player = this.physics.add.sprite(200, 475, 'player');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground)
        this.player.play('walk');

        //  the score
        this.scoreValue = 0;
        this.scoreText = this.add.text(16, 16, 'score: ' + this.scoreValue, { fontSize: '32px', fill: '#000' });

        // the time
        this.timerValue = 30;
        this.timerText = this.add.text(16, 48, 'time: ' + this.timerValue, { fontSize: '32px', fill: '#000' });
       
        // game end flag
        this.gameOver = false;

        // create fish to collect
        this.fish = this.physics.add.group({
            key: 'fish',
            repeat: 4,
            setXY: { x: 500, y: getRandomY(), stepX: 225 }
        });
        this.fish.children.iterate(function (child) {
            child.setScale(0.05)
            child.body.setAllowGravity(false)
            child.y = getRandomY();
        });
        this.fishVelocityX = -100; 
        this.physics.add.collider(this.fish, this.ground);
        this.physics.add.overlap(this.player, this.fish, collectFish, null, this);

        // create rock obstacles
        this.rocks = this.physics.add.group({
            key: 'rock',
            repeat: 2,
            setXY: { x: 600, y: 510, stepX: 430 }
        });
        this.rocks.children.iterate(function (child) {
            child.setScale(2)
        });
        this.rocksVelocityX = -100; 
        this.physics.add.collider(this.rocks, this.ground);
        this.physics.add.collider(this.player, this.rocks, hitObstacle, null, this);

        // button stuff
        this.isGamePaused = false;

        this.pauseBtn = this.add.sprite(1350, 10, 'pauseBtn').setOrigin(0, 0);
        this.pauseBtn.setInteractive({ useHandCursor: true });

        this.pauseBtn.on('pointerdown', () =>
        {
            this.scene.sendToBack('LevelExample')
            this.scene.pause('LevelExample');
            this.scene.launch('PauseScreen');

            this.pauseBtn.setVisible(false);
        });
    }

    update()
    {
        // check if time is left
        outOfTime(this.timerValue, this);

        if (this.gameOver)
        {
            this.player.anims.stop();
            this.pauseBtn.disableInteractive();
            return;
        }

        // update background and ground
        this.bg.tilePositionX += 2;
        this.ground.tilePositionX += 2;

        // update timer
        this.timerText.setText('time: ' + this.timerValue.toFixed(0));
        this.timerValue -= 0.025;

        
       // player jumping
        if (this.cursors.up.isDown && this.player.body.onFloor())
        {
            this.player.setVelocityY(-350);
        }
        
        // spawn more fish
        if (Math.abs(this.timerValue % 2.5) < 0.025) {
            spawnFish(this);
        }

        // fish moving
        this.fish.children.iterate(function (child) {
            child.x -= 2;
        });

        // rocks moving
        this.rocks.children.iterate(function (child) {
            child.x -= 3;
        });

        // reset rock position when it goes off screen
        this.rocks.children.iterate(function (child) {
            if (child.x < -60) {
                child.x = 1400;
                child.y = 510;
            }
        });
    }
}

class PauseScreen extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'PauseScreen'});
    }

    preload ()
    {
        this.load.image('quitLevelBtn', 'QuitLevelBtn.png');
        this.load.image('resetLevelBtn', 'ResetLevelBtn.png');
        this.load.image('resumeLevelBtn', 'ResumeLevelBtn.png');
        this.load.image('backToMainMenuBtn', 'BackToMainMenuBtn.png');
    }

    create ()
    {

        this.resumeLevelBtn = this.add.sprite(445, 110, 'resumeLevelBtn').setOrigin(0, 0);
        this.resumeLevelBtn.setInteractive({ useHandCursor: true });
        this.resumeLevelBtn.setScale(0.5);

        this.resetLevelBtn = this.add.sprite(555, 230, 'resetLevelBtn').setOrigin(0, 0);
        this.resetLevelBtn.setInteractive({ useHandCursor: true });
        this.resetLevelBtn.setScale(0.5);

        this.quitLevelBtn = this.add.sprite(530, 350, 'quitLevelBtn').setOrigin(0, 0);
        this.quitLevelBtn.setInteractive({ useHandCursor: true });
        this.quitLevelBtn.setScale(0.5);

        this.backToMainMenuBtn = this.add.sprite(500, 450, 'backToMainMenuBtn').setOrigin(0, 0);
        this.backToMainMenuBtn.setInteractive({ useHandCursor: true });
        this.backToMainMenuBtn.setScale(0.5);

        this.resumeLevelBtn.on('pointerdown', () =>
        {
            this.scene.resume('LevelExample');
            this.scene.stop();
            
            const levelExampleScene = this.scene.get('LevelExample');
            levelExampleScene.pauseBtn.setVisible(true); 
            
        });

        this.resetLevelBtn.on('pointerdown', () =>
        {
            this.scene.start('LevelExample');
            this.scene.stop();
        });

        this.quitLevelBtn.on('pointerdown', () =>
        {
            
        });

        this.backToMainMenuBtn.on('pointerdown', () =>
        {
            //window.location.href = 
        });

    }

    update ()
    {

    }
}

// gets a y position ranging from 350-510 to spawn fish
function getRandomY()
{
    return Math.random() * (510 - 350) + 350;
}

function hitObstacle (player, rock)
{
    this.physics.pause();
    this.gameOver = true;
}

function spawnFish(scene)
{
    const aFish = scene.fish.create(1400, getRandomY(), 'fish');
    aFish.setScale(0.05);
    aFish.body.setAllowGravity(false);
}

function collectFish (player, fish)
{
    fish.disableBody(true, true);

    //  add and update the score
    this.scoreValue += 10;
    this.scoreText.setText('Score: ' + this.scoreValue);
}

function outOfTime (timerValue, scene)
{
    if (timerValue <= 0)
    {
        scene.physics.pause();
        scene.gameOver = true;
    }
}

function LevelExample()
{
    const config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.RESIZE,
            width: '100%',
            height: '100%'
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        backgroundColor: '#304858',
        scene: [LevelExampleClass, PauseScreen]
    };

    const game = new Phaser.Game(config);
    return game;
}

function Game() {
    useEffect(() => {
        const game = LevelExample();
        return () => {
            game.destroy(true); 
        };
    }, []);
    return <div id={"level-example"}/>;
}

export default Game;
