/**
 * Created by CLIMAX PRODUCTION on 7/1/2019.
 */
import Phaser from 'phaser';
const W = window.innerWidth;
const H = window.innerHeight;
let size = {width : 900, height : 900};
const config = {
    type: Phaser.AUTO,
    parent: "phaser-bobby",
    transparent: true,
    backgroundColor: 'rgba(0,0,0,0.000001)',
    width: size.width,
    height: size.height,
    rangePodium : {
        start : 120,
        end : size.width - 120,
        width : size.width - 240
    },
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_VERTICALLY,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
    //scene: GameScene
};
export default config;
