import config from "../config/config.js";
import TexturesPosition from "../config/positionTextures.js";
import 'phaser';

export default class FingerPointer extends Phaser.GameObjects.Container {
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.init();
    }
    init(){
        this.finger();
    }
    finger(){
        const { diaperControl } = TexturesPosition;
        this.swipeFingerElm = this.scene.add.sprite(diaperControl.x, diaperControl.y, 'swipeFinger');
        this.tweenFinger();
    }
    hide(){
        this.swipeFingerElm.setAlpha(0);
    }
    show(){
        this.swipeFingerElm.setAlpha(1);
    }
    update(x, y){
        this.swipeFingerElm.x = x;
        this.swipeFingerElm.y = y;
    }
    tweenFinger(){
        var tween = TweenMax.to(this.swipeFingerElm, 1, {
            scale : 0.85,
            ease: Power2.easeInOut,
            yoyo: true,
            repeat : -1,
        });
    }
}
