import Phaser from "phaser";
import config from "./config/config.js"
import Model from "./config/model.js"
import GameScene from "./scenes/gameScene.js";
import BootScene from "./scenes/bootScene.js";
import PreloaderScene from "./scenes/preloaderScene.js";
import PlayScene from "./scenes/playScene.js";
class Game extends Phaser.Game {
    constructor () {
        super(config);
        const model = new Model();
        this.globals = { model, bgMusic : null };
        //this.init();
    }
    init(){
        this.scene.add('Boot', BootScene);
        this.scene.add('Preloader', PreloaderScene);
        this.scene.add('Play', PlayScene);
        this.scene.add('Game', GameScene);
        this.scene.start('Game');
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    window.game = new Game();
});
