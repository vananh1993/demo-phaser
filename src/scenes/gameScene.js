/**
 * Created by CLIMAX PRODUCTION on 7/1/2019.
 */
import Phaser from 'phaser';
class GameScene extends Phaser.Scene {
    constructor(){
        super('Game');
    }
    preload(){
    }
    create () {
        this.scene.start('Boot');
    }
}
export default GameScene;