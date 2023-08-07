import TexturesPosition from "../config/positionTextures.js";
import config from "../config/config.js";
import 'phaser';
import ArrowDirections from "./arrowDirections.js";
import FingerPointer from '../playScene/fingerPointer.js';
import DiaperBobby from "./diaperBobby.js";
export default class DiaperControl extends Phaser.GameObjects.Container {
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.speedRotate = 0.5;
        this.maxAngle = 15;
        this.angleDiaper = 0;
        this.directionDiaper = 1;
        this.diaperOldPosition = {x : null, y : null}
        this.countDown = 0;
        this.delayHoldNotDrag = 10;
        this.isDragOn = false;
        this.hideArrow = false;
        this.model = this.scene.sys.game.globals.model;
        this.typeStage = this.model.typeStage;
        this.init();
    }
    init(){
        this.diaperComponent();
        this.arrowDirections = new ArrowDirections(this.scene, this.diaperControl);
        this.arrowDirections.arrowDirectionLeft();
        this.arrowDirections.arrowDirectionRight();
        this.diaperBobbyComponent = new DiaperBobby(this.scene);
        this.fingerPointer = new FingerPointer(this.scene);
        this.dragEventDiaper();
    }
    get(){
        return this.diaperControl;
    }
    diaperComponent(){
        const { diaperControl, diaperControlShadow } = TexturesPosition;
        this.diaperControlShadow = this.scene.physics.add.sprite(diaperControlShadow.x, diaperControlShadow.y, 'diaperControlShadow');
        this.diaperControlShadow.setOrigin(0.5).body.allowGravity = false;
        //
        this.diaperControl = this.scene.physics.add.sprite(diaperControl.x, diaperControl.y, 'diaperPlay');
        this.diaperControl.setOrigin(0.5).body.allowGravity = false;
        this.diaperControl.setAlpha(0);
        this.diaperControl.y = diaperControl.y - 30;
        this.tweenDiaper();
    }
    fadeOut(){
        if(!this.hideArrow){
            this.hideArrow = true;
            this.diaperControl.input.draggable = false;
            this.tweenFadeOutDiaperControl();
            this.diaperBobbyComponent.showContainer();
            this.diaperBobbyComponent.tweenFadeInDiaperBobby();
            this.diaperBobbyComponent.tweenBorderDiaper();
            this.fingerPointer.hide();
            //
            let groupArrowLeft = this.arrowDirections.groupArrowDirectionLeft;
            let groupArrowRight = this.arrowDirections.groupArrowDirectionRight;
            if(!this.isDragOn){
                groupArrowLeft.toggleVisible();
                groupArrowRight.toggleVisible();
            }
            this.updatePostionArrowDirection(this.diaperControl.x);
        }
        this.diaperBobbyComponent.update();
    }
    tweenFadeOutDiaperControl(){
        const { diaperControl, diaperControlShadow, diaperBobby } = TexturesPosition;
        var tweenMove = TweenMax.to(this.diaperControl, 0.5, {
            x : diaperControl.x,
            delay : 0.75,
            angle : 0,
            ease: Back.easeOut.config(1.15),
        });
        var tweenShadowMove = TweenMax.to(this.diaperControlShadow, 0.75, {
            x : diaperControlShadow.x,
            delay : 0.75,
            ease: Back.easeOut.config(1.15),
            yoyo: true
        });
        var tweenJump = TweenMax.to(this.diaperControl, 0.75, {
            y : diaperBobby.y,
            delay : 1.25,
            ease: Back.easeOut.config(1.15),
        });
        var tweenScaleFadeOut = TweenMax.to(this.diaperControl, 0.75, {
            scale : 2,
            delay : 2,
            alpha : 0,
            ease: Back.easeOut.config(1.15),
            yoyo: true
        });
        var tweenShadowFadeOut = TweenMax.to(this.diaperControlShadow, 0.75, {
            alpha: 0,
            scaleX : 2,
            delay : 2,
            ease: Back.easeOut.config(1.15),
            yoyo: true
        });
        var tweenShadowFadeIn = TweenMax.to(this.diaperControlShadow, 0.75, {
            alpha: 1,
            scaleX : 1,
            delay : 2.2,
            ease: Back.easeOut.config(1.15),
            yoyo: true
        });
    }
    tweenDiaper(){
        const { diaperControl, diaperControlShadow } = TexturesPosition;
        var tween = TweenMax.to(this.diaperControl, 0.75, {
            alpha: 1,
            y : diaperControl.y,
            delay : 0.15,
            ease: Back.easeOut.config(1.15),
            yoyo: true
        });
    }
    dragEventDiaper(){
        this.diaperControl.setInteractive({draggable : true});
        this.diaperControl.on('dragstart', () => {
            if(this.hideArrow) return false;
            let groupArrowLeft = this.arrowDirections.groupArrowDirectionLeft;
            let groupArrowRight = this.arrowDirections.groupArrowDirectionRight;
            groupArrowLeft.toggleVisible();
            groupArrowRight.toggleVisible();
            this.fingerPointer.hide();
            this.isDragOn = true;
        })
        this.diaperControl.on('drag', (pointer, x , y) => {
            if(this.hideArrow) return false;
            if(x + this.diaperControl.width/2 < (config.width - 30) && (x - this.diaperControl.width/2 - 30) > 0){
                this.diaperControl.x = x;
                this.diaperControlShadow.x = x;
                if(this.diaperOldPosition.x === null){
                    this.diaperOldPosition.x = x;
                }
                else{
                    if(this.diaperOldPosition.x > x){
                        this.directionDiaper = 1;
                    }
                    else if (this.diaperOldPosition.x < x){
                        this.directionDiaper = -1;
                    }
                    this.diaperControl.restoredRotate = false;
                    this.diaperOldPosition.x = x;
                }
                this.rotateDiaper();
                this.updatePostionArrowDirection(x);
            }
        });
        this.diaperControl.on('dragend', () => {
            if(this.hideArrow) return false;
            let groupArrowLeft = this.arrowDirections.groupArrowDirectionLeft;
            let groupArrowRight = this.arrowDirections.groupArrowDirectionRight;
            groupArrowLeft.toggleVisible();
            groupArrowRight.toggleVisible();
            this.fingerPointer.show();
            this.fingerPointer.update(this.diaperControl.x, this.diaperControl.y);
            this.angleDiaper = 0;
            this.isDragOn = false;
        })
    }
    rotateDiaper(){
        this.countDown = 0;
        this.diaperControl.setAngle(this.angleDiaper);
        if((this.angleDiaper < this.maxAngle && this.directionDiaper > 0) ||
            (this.angleDiaper > -1*this.maxAngle && this.directionDiaper < 0)){
            this.angleDiaper += this.speedRotate*this.directionDiaper;
        }
    }
    restoreAngle(){
        if(this.diaperOldPosition.x === this.diaperControl.x && !this.diaperControl.restoredRotate){
            this.countDown++;
            if(this.countDown === this.delayHoldNotDrag){
                this.directionDiaper = -1*this.directionDiaper;
                this.diaperControl.restoredRotate = true;
            }
        }
    }
    restoreAngleAnimate(){
        if(this.diaperControl.angle !== 0 && this.diaperControl.restoredRotate){
            this.rotateDiaper();
        }
    }
    updatePostionArrowDirection(){
        let groupArrowLeft = this.arrowDirections.groupArrowDirectionLeft;
        let groupArrowRight = this.arrowDirections.groupArrowDirectionRight;
        let arrowLeftUpdatePosition = {
            x : this.diaperControl.x - this.diaperControl.width/2 - groupArrowLeft.children.size*15,
            y : this.diaperControl.y - 73
        }
        this.arrowDirections.drawGridArrow(groupArrowLeft, arrowLeftUpdatePosition.x, arrowLeftUpdatePosition.y);
        let arrowRightUpdatePosition = {
            x : this.diaperControl.x + this.diaperControl.width/2 + 10,
            y : this.diaperControl.y - 73
        }
        this.arrowDirections.drawGridArrow(groupArrowRight, arrowRightUpdatePosition.x, arrowRightUpdatePosition.y);
    }
    updateStageDiaper(keyStage){
        var tweenMax1 = TweenMax.to(this.diaperControl, 0.35, {
            alpha: 0.5,
            scale : 1.15,
            ease: Back.easeOut.config(1.15),
            yoyo: true,
            onComplete : () => {
                this.diaperControl.setTexture(this.typeStage[keyStage]);
            }
        });
        var tweenMax2 = TweenMax.to(this.diaperControl, 0.35, {
            alpha: 1,
            scale : 1,
            delay : 0.4,
            ease: Back.easeOut.config(1.15),
            yoyo: true
        });
    }
}
