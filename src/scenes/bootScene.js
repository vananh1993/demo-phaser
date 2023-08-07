/**
 * Created by CLIMAX PRODUCTION on 7/1/2019.
 */
import Phaser from 'phaser';
//import diamond_icon from "../../assets/ui/textures/diamond.png";
//import textLoading from "../../assets/ui/textures/loading-text.png";
import config from "../config/config.js"
import ui from "../config/ui.js"
class BootScene extends Phaser.Scene{
    constructor(){
        super('Boot');
    }
    preload () {
        this.load.image('diamond_icon', ui.textures[0].src);
        this.load.image('textLoading', ui.textures[1].src);
    }
    create () {
        this.scene.start('Preloader');
    }
}
export default BootScene;
