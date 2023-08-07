import TexturesPosition from "../config/positionTextures.js";
import config from "../config/config.js";
import 'phaser';

export default class PodiumStand extends Phaser.GameObjects.Container {
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.init();
    }
    init(){
        this.podiumStandComponent();
    }
    get(){
        return this.podiumStand;
    }
    podiumStandComponent(){
        const { podiumStand } = TexturesPosition;
        this.podiumStand = this.scene.physics.add.sprite(podiumStand.x, podiumStand.y, 'podiumStand');
        this.podiumStand.setOrigin(0.5).body.allowGravity = false;
        this.podiumStand.setAlpha(0);
        this.podiumStand.setScale(0.95, 0.95);
        this.podiumStand.y = podiumStand.y + 25;
        this.tweenPodium();
    }
    tweenPodium(){
        const { podiumStand } = TexturesPosition;
        var tween = TweenMax.to(this.podiumStand, 0.25, {
            alpha: 1,
            scale : 1,
            y : podiumStand.y,
            ease: Power1.easeOut,
            yoyo: true
        });
    }
}
