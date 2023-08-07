import Phaser from 'phaser';
import config from "../config/config.js";
import WaterDrop from '../playScene/waterDrop.js';
import DiaperControl from '../playScene/diaperControl.js';
import PodiumStand from '../playScene/podiumStand.js';
import GifLayer from '../objects/gifLayer.js';
import TexturesPosition from "../config/positionTextures.js";
class PlayScene  extends Phaser.Scene {
    constructor(){
        super('Play');
    }
    preload(){
        this.speedRotate = 0.5;
        this.maxAngle = 10;
        this.angleDiaper = 0;
        this.directionDiaper = 1;
        this.diaperOldPosition = {x : null, y : null}
        //console.log('play');
    };
    create(){
        //scene, index gif data, name group gif data, name group position
        this.gifLayerDanDeu = new GifLayer(this, 0, 'arGif', 'gifLayerPosition');
        this.gifLayerThamNhanh = new GifLayer(this, 1, 'arGif', 'gifLayerPosition');
        this.gifLayerKhoaChat = new GifLayer(this, 2, 'arGif', 'gifLayerPosition');
        this.waterDrop = new WaterDrop(this);
        this.podiumStand = new PodiumStand(this);
        this.diaperControl = new DiaperControl(this);
        this.collisionWater();
    }
    update(){
        this.diaperControl.restoreAngle();
        this.diaperControl.restoreAngleAnimate();
        this.waterDrop.generatorWater();
        //
        this.gifLayerDanDeu.updateAnimateEllipse();
        this.gifLayerDanDeu.resumeLayer(() => {
            this.waterDrop.togglePause();
        });
        //
        this.gifLayerThamNhanh.updateAnimateEllipse();
        this.gifLayerThamNhanh.resumeLayer(() => {
            this.waterDrop.togglePause();
        });
        //
        this.gifLayerKhoaChat.updateAnimateEllipse();
        this.gifLayerKhoaChat.resumeLayer(() => {
            this.waterDrop.togglePause();
        })
        //
        if(this.waterDrop.isDone()){
            this.diaperControl.fadeOut();
        }
    }
    collisionWater(){
        this.physics.add.overlap(this.waterDrop.get(), this.diaperControl.get(), this.collectWater.bind(this), null, this);
        this.physics.add.overlap(this.waterDrop.get(), this.podiumStand.get(), this.collectWater.bind(this), null, this);
    }
    collectWater(collisionObject, waterDrop){
        const texturesDiamond = ['diamondDanDeu', 'diamondThamNhanh', 'diamondKhoaChat'];
        if(texturesDiamond.indexOf(waterDrop.texture.key) !== -1){
            var indexDiamond = texturesDiamond.indexOf(waterDrop.texture.key);
            if(collisionObject.texture.key.indexOf("diaperPlay") !== -1){
                this.waterDrop.togglePause();
                this.waterDrop.clearAll();
                this.gifLayerDanDeu.showMask(indexDiamond);
                this.gifLayerThamNhanh.showMask(indexDiamond);
                this.gifLayerKhoaChat.showMask(indexDiamond);
                this.diaperControl.updateStageDiaper(waterDrop.texture.key);
            }
        }
        this.waterDrop.collectWater(collisionObject, waterDrop);
    }
}
export default PlayScene;
