import Phaser from 'phaser';

class LevelTwoFailScreen extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'LevelTwoFailScreen'});
    }

    preload ()
    {
        this.load.image('resetLevelBtn', 'ResetLevelBtn.png');
        this.load.image('viewLeaderboardBtn', 'ViewLeaderboardBtn.png');
        this.load.image('backToMainMenuBtn', 'BackToMainMenuBtn.png');
    }

    create (data)
    {
        const navigate = data.navigate
        this.text = this.add.text(530, 150, 'Level Failed', { font: 'bold 64px Arial' });

        this.resetLevelBtn = this.add.sprite(560, 220, 'resetLevelBtn').setOrigin(0, 0);
        this.resetLevelBtn.setInteractive({ useHandCursor: true });
        this.resetLevelBtn.setScale(0.5);
        this.resetLevelBtn.tint = 0xFF9999;

        this.viewLeaderboardBtn = this.add.sprite(475, 340, 'viewLeaderboardBtn').setOrigin(0, 0);
        this.viewLeaderboardBtn.setInteractive({ useHandCursor: true });
        this.viewLeaderboardBtn.setScale(0.5);
        this.viewLeaderboardBtn.tint = 0xFF9999;

        this.backToMainMenuBtn = this.add.sprite(505, 440, 'backToMainMenuBtn').setOrigin(0, 0);
        this.backToMainMenuBtn.setInteractive({ useHandCursor: true });
        this.backToMainMenuBtn.setScale(0.5);
        this.backToMainMenuBtn.tint = 0xFF9999


        this.resetLevelBtn.on('pointerdown', () =>
        {
            this.scene.start('LevelTwo');
            this.scene.stop();
        });

        this.viewLeaderboardBtn.on('pointerdown', () => {
            navigate('/ViewLeaderboard')
        });

        this.backToMainMenuBtn.on('pointerdown', () => {
            navigate('/');
        });
    }
}
export default LevelTwoFailScreen;