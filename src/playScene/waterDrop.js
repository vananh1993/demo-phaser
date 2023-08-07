import TexturesPosition from "../config/positionTextures.js";
import config from "../config/config.js";
import 'phaser';
export default class WaterDrop extends Phaser.GameObjects.Container {
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.waterY = 100;
        this.countDelayCreateWater = 0;
        this.maxCountDelayCreateWater = Phaser.Math.Between(5, 15);
        this.model = this.scene.sys.game.globals.model;
        this.texturesDiamond = this.model.sortType;
        this.usingDiamond = 0;
        this.delayToShowDiamond = 200;
        this.totalWater = 10;
        this.dropedDiamond = false;
        this.collectedFull = false;
        this.completeStage = this.model.completed;
        this.pauseDrop = false;
        this.gravityWater = {
            min : 200,
            max : 300
        };
        this.init();
    }
    init(){
        this.containerWaterDropBlock()
        this.createWaterGroup();
    }
    get(){
        return this.waterGroup;
    }
    isDone(){
        return this.completeStage;
    }
    togglePause(){
        //console.log(this.pauseDrop);
        if(this.collectedFull){
            this.completeStage = true;
        }
        return this.pauseDrop = !this.pauseDrop;
    }
    clearAll(){
        this.waterGroup.clear(true);
    }
    containerWaterDropBlock(){
        this.containerWaterDrop = this.scene.add.container(0, 0).setName('containWaterDropLayer');
    }
    generatorWater(){
        if(this.collectedFull || this.pauseDrop || this.completeStage){
            this.clearAll();
            return false;
        }
        if(this.waterGroup.total !== this.totalWater){
            this.countDelayCreateWater++;
        }
        let changeTexture = null;
        if(!this.dropedDiamond){
            this.delayToShowDiamond--;
            if(this.delayToShowDiamond === 0){
                this.delayToShowDiamond = Phaser.Math.Between(150, 240);
                this.waterGroup.changeTexture = this.usingDiamond;
                this.dropedDiamond = true;
            }
        }
        if(this.countDelayCreateWater === this.maxCountDelayCreateWater && this.waterGroup.total !== this.totalWater){
            this.createWater(
                Phaser.Math.Between(config.rangePodium.start, config.rangePodium.end),
                this.waterY,
                changeTexture
            );
            this.countDelayCreateWater = 0;
            this.maxCountDelayCreateWater = Phaser.Math.Between(15, 100);
        }
    }
    createWaterGroup(){
        this.waterGroup = this.scene.physics.add.group({
            'defaultKey' : 'waterDrop',
            'bounceX' : 0,
            'bounceY' : 0,
            'velocityY' : 0,
            'setXY' : { x : 100, y : 100},
            'collideWorldBounds': true
        });
        this.waterGroup.total = 0;
        this.scene.physics.world.on('worldbounds', this.onWorldBounds.bind(this));
    }
    onWorldBounds(body){
        this.destroy(body.gameObject);
    }
    collectWater(collisionObject, waterDrop){
        this.tweenFadeOutWater(waterDrop, () => {
            waterDrop.destroy();
            if(this.texturesDiamond.indexOf(waterDrop.texture.key) !== -1){
                this.dropedDiamond = false;
                if(collisionObject.texture.key.indexOf("diaperPlay") !== -1){
                    this.usingDiamond++;
                    if(this.usingDiamond === this.texturesDiamond.length){
                        this.collectedFull = true;
                    }
                }
            }
            if(this.waterGroup.total > 0){
                this.waterGroup.total--;
            }
        })
    }
    destroy(obj){
        obj.destroy();
    }
    createWater(x = config.rangePodium.end, y = 0){
        if(this.waterGroup.changeTexture !== null){
            this.waterGroup.defaultKey = this.texturesDiamond[this.waterGroup.changeTexture];
        }
        else{
            this.waterGroup.defaultKey = 'waterDrop';
        }
        var water = this.waterGroup.create(x, y).setGravity(0, Phaser.Math.Between(this.gravityWater.min, this.gravityWater.max));
        water.body.onWorldBounds = true;
        water.alpha = 0;
        var tweenDiamond = '';
        if(this.waterGroup.changeTexture !== null){
            this.waterGroup.changeTexture = null;
            tweenDiamond = () => {this.tweenDiamond(water)};
        }
        this.tweenWaterDrop(water, tweenDiamond);
        this.waterGroup.total++;
    }
    tweenFadeOutWater(waterDrop, onComplete){
        var tween = TweenMax.to(waterDrop, 0.1, {
            alpha: 0,
            scale : 0,
            ease: Power1.easeInOut,
            yoyo: true,
            onComplete : () => {onComplete ? onComplete() : ''},
        });
    }
    tweenWaterDrop(waterDrop, onComplete){
        var tween = TweenMax.to(waterDrop, 1.5, {
            alpha: 1,
            ease: Power1.easeOut,
            yoyo: true,
            onComplete : () => {onComplete ? onComplete() : ''},
        });
    }
    tweenDiamond(diamon){
        var tween = TweenMax.to(diamon, 0.5, {
            scale : 0.85,
            repeat : -1,
            ease: Power1.easeInOut,
            yoyo: true
        });
    }
}
