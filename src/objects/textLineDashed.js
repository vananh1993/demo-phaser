import TexturesPosition from "../config/positionTextures.js";
import config from "../config/config.js";
import 'phaser';
export default class TextLineDashed extends Phaser.GameObjects.Container {
    constructor(scene, group, nameTexture){
        super(scene);
        this.scene = scene;
        this.groupContain = group;
        this.nameTexture = nameTexture;
        this.init();
    }
    init(){
        this.textSprite = this.createText(this.nameTexture);
    }
    createText(nameTexture){
        var contain = this.scene.add.sprite(config.width/2, config.height/2, nameTexture);
        this.groupContain.add(contain);
        contain.setOrigin(1, 1);
        contain.setAlpha(0);
        return contain;
    }
    updatePosText(x, y){
        this.textSprite.setAlpha(1);
        this.textSprite.x = x - 15;
        this.textSprite.y = y - 7;
    }
    hide(){
        this.textSprite.setAlpha(0);
    }
}
