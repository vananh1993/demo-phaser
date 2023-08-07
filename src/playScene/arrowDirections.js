import TexturesPosition from "../config/positionTextures.js";
import config from "../config/config.js";
import 'phaser';

export default class ArrowDirections extends Phaser.GameObjects.Container {
    constructor(scene, diaper){
        super(scene);
        this.scene = scene;
        this.diaperControl = diaper;
        this.init();
    }
    init(){}
    arrowDirectionLeft(){
        this.groupArrowDirectionLeft = this.scene.add.group({
            key : 'arrowLeft',
            repeat : 2,
        })
        let position = {
            x : this.diaperControl.x - this.diaperControl.width/2 - this.groupArrowDirectionLeft.children.size*15,
            y : this.diaperControl.y - 40
        }
        this.drawGridArrow(this.groupArrowDirectionLeft, position.x, position.y);
        this.tweenArrowDirectionToLeft();
    }
    arrowDirectionRight(){
        this.groupArrowDirectionRight = this.scene.add.group({
            key : 'arrowRight',
            repeat : 2,
        })
        let position = {
            x : this.diaperControl.x + this.diaperControl.width/2 + 10,
            y : this.diaperControl.y - 40
        }
        this.drawGridArrow(this.groupArrowDirectionRight, position.x, position.y);
        this.tweenArrowDirectionToRight();
    }
    drawGridArrow(groupArrow,x ,y){
        Phaser.Actions.GridAlign(groupArrow.getChildren(), {
            width: 3,
            height: 1,
            cellWidth: 15,
            cellHeight: 32,
            x : x,
            y : y}
        );
    }
    tweenArrowDirectionToLeft(){
        let children = this.groupArrowDirectionLeft.children.entries;
        for(var i = children.length - 1 ; i >= 0; i--){
            var arrow = children[i];
            var delay = (children.length - 1 - i) * 0.25;
            this.tweenArrowDirection(arrow, delay);
        }
    }
    tweenArrowDirectionToRight(){
        let children = this.groupArrowDirectionRight.children.entries;
        for(var i = 0 ; i < children.length; i++){
            var arrow = children[i];
            var delay = i * 0.25;
            this.tweenArrowDirection(arrow, delay);
        }
    }
    tweenArrowDirection(arrow, delay){
        var tween = TweenMax.to(arrow, 1.5, {
            alpha: 0,
            delay: delay,
            scale : 0.85,
            ease: Power1.easeOut,
            repeat: -1,
            yoyo: true
        });
    }
}
