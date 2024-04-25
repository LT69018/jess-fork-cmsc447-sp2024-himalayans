import Phaser from 'phaser';

class LevelTwoCompleteScreen extends Phaser.Scene
{x
    constructor ()
    {
        super({ key: 'LevelTwoCompleteScreen'});
    }

    preload ()
    {
        this.load.image('viewLeaderboardBtn', 'ViewLeaderboardBtn.png');
        this.load.image('backToMainMenuBtn', 'BackToMainMenuBtn.png');
        this.load.image('nextLevelBtn', 'nextLevelBtn.png');
    }

    create ()
    {
        this.text = this.add.text(500, 150, 'Level Complete', { font: 'bold 64px Arial' });

        this.nextLevelBtn = this.add.sprite(560, 230, 'nextLevelBtn').setOrigin(0, 0);
        this.nextLevelBtn.setInteractive({ useHandCursor: true });
        this.nextLevelBtn.setScale(0.5);
        this.nextLevelBtn.tint = 0xFF9999;

        this.viewLeaderboardBtn = this.add.sprite(475, 320, 'viewLeaderboardBtn').setOrigin(0, 0);
        this.viewLeaderboardBtn.setInteractive({ useHandCursor: true });
        this.viewLeaderboardBtn.setScale(0.5);
        this.viewLeaderboardBtn.tint = 0xFF9999;

        this.backToMainMenuBtn = this.add.sprite(505, 420, 'backToMainMenuBtn').setOrigin(0, 0);
        this.backToMainMenuBtn.setInteractive({ useHandCursor: true });
        this.backToMainMenuBtn.setScale(0.5);
        this.backToMainMenuBtn.tint = 0xFF9999;

        this.nextLevelBtn.on('pointerdown', () =>
        {
            window.location.href = '/LevelThree'
        });

        this.viewLeaderboardBtn.on('pointerdown', () =>
        {
            window.location.href = '/ViewLeaderboard'
        });

        this.backToMainMenuBtn.on('pointerdown', () =>
        {
            window.location.href = '/';
        });
    }
}

export default LevelTwoCompleteScreen;