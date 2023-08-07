import TexturesPosition from "../config/positionTextures.js";
import config from "../config/config.js";
import 'phaser';
export default class GifLayer extends Phaser.GameObjects.Container {
    constructor(scene, indexGif, groupGif, groupPosGif, parentGroup){
        super(scene);
        this.scene = scene;
        this.startEffectArc = false;
        this.completeAnimateGif = false;
        this.model = this.model = this.scene.sys.game.globals.model;
        this.arGif = this.model[groupGif];
        this.repeatGif = this.model.repeatGif;
        this.indexGif = indexGif;
        this.parentGroup = parentGroup;
        this.posGif = groupPosGif;
        this.debug = this.model.debugGif;
        this.init();
    }
    init(){
        this.containerGifLayer();
        this.layerBoxContent(this.indexGif);
        this.shadowEllipseLayer();
        this.circleEffect();
        this.overlayMask();
        this.generatorGif(this.indexGif);
        this.layerBorderMask();
        this.maskBorderLayer2();
        this.borderLayer2();
    }
    generatorGif(indexGif){
        this.gifSprite = this.createGif(
            this.arGif[indexGif].nameSheet,
            this.arGif[indexGif].name,
            this.arGif[indexGif].start,
            this.arGif[indexGif].end,
            this.arGif[indexGif].zeroPad,
            this.arGif[indexGif].prefix,
            this.arGif[indexGif].suffix,
            this.arGif[indexGif].firstFrameName,
            this.arGif[indexGif].frameRate,
            this.arGif[indexGif].scaleX,
            this.arGif[indexGif].scaleY,
            this.animsComplete.bind(this));
    }
    containerGifLayer(){
        this.containerGif = this.scene.add.container(0, 0).setName('containerGifBlock');
        this.containerGif.setVisible(false);
        if(this.parentGroup){
            this.parentGroup.add(this.containerGif);
        }
    }
    resumeLayer(callback){
        if(this.completeAnimateGif){
            callback();
            this.completeAnimateGif = false;
        }
    }
    createGif(nameAnimate,
        name,
        start,
        end,
        zeroPad,
        prefix,
        suffix,
        firstFrameName,
        frameRate,
        scaleX,
        scaleY,
        onComplete){
        const gifLayer= TexturesPosition[this.posGif]['gif'];
        //console.log(nameAnimate, name, start, end, zeroPad, prefix, suffix, firstFrameName, frameRate);
        var contain =  this.scene.add.sprite(gifLayer.x, gifLayer.y, name, firstFrameName);
        var frameNames = this.scene.anims.generateFrameNames(name,
            {   start: start,
                end: end,
                zeroPad: zeroPad,
                prefix: prefix,
                suffix: suffix });
        this.scene.anims.create({ key: nameAnimate, frames: frameNames, frameRate: frameRate, repeat: this.repeatGif, });
        if(!this.debug){
            contain.mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.arcLayer);
        }
        contain.on('animationcomplete', onComplete, contain);
        this.containerGif.add(contain);
        contain.nameAnimateSheet = nameAnimate;
        contain.setScale(scaleX, scaleY);
        contain.setAlpha(0);
        return contain;
    }
    animsComplete(animation, frame){
        this.hideLayerGif();
    }
    hideLayerGif(){
        const gifLayer = TexturesPosition[this.posGif];
        this.completeAnimateGif = true;
        this.tweenHideLayerGif(() => {
            this.containerGif.setVisible(false);
            this.resetTween();
            this.diamondFollower.t = 0;
            this.arcLayer2.clear();
            this.arcLayer.setAlpha(0);
            this.borderMaskLayer.setAlpha(0).setAngle(45);
            this.shadowEllipseTexture.setAlpha(0);
            this.pathCircle = new Phaser.Curves.Ellipse(gifLayer.x, gifLayer.y, gifLayer.border.r, gifLayer.border.r, 270, 270, false);
            this.boxContentTexture.x -= 25;
            this.boxContentTexture.setAlpha(0);
            this.gifSprite.setAlpha(0);
        });
    }
    layerBoxContent(indexGif){
        const gifLayer = TexturesPosition[this.posGif];
        this.boxContentTexture = this.scene.add.sprite(gifLayer.box.x- 25, gifLayer.box.y + 10, this.arGif[indexGif].boxContent);
        this.boxContentTexture.setAlpha(0);
        this.containerGif.add(this.boxContentTexture);
    }
    resetTween(){
        if(this.polygonEase1){
            this.polygonEase1.remove();
        }
        if(this.polygonEase2){
            this.polygonEase2.remove();
        }
        if(this.maskBorderLayer2Ease){
            this.maskBorderLayer2Ease.remove();
        }
    }
    overlayMask(){
        const gifLayer = TexturesPosition[this.posGif];
        this.arcLayer = this.scene.make.image({
            x: gifLayer.x,
            y: gifLayer.y,
            key: 'maskTexture',
            add: false
        });
        this.arcLayer.setAlpha(0);
    }
    layerBorderMask(){
        const gifLayer = TexturesPosition[this.posGif];
        this.borderMaskLayer = this.scene.add.sprite(gifLayer.x, gifLayer.y, 'maskBorder');
        this.borderMaskLayer.setAlpha(0);
        this.borderMaskLayer.setAngle(45);
        this.containerGif.add(this.borderMaskLayer);
    }
    showMask(indexGif, skipShowBorder = false){
        const { nameSheet } = this.arGif[indexGif];
        if(nameSheet !== this.gifSprite.nameAnimateSheet) return false;
        this.tweenShowLayerGif(() => {
            this.startEffectArc = true;
            this.completeAnimateGif = false;
            this.containerGif.setVisible(true);
            this.polygonIcon.setAlpha(1);
            if(!skipShowBorder){
                this.tweenHaveBorder(indexGif);
            }
            else{
                this.tweenNoBorder(indexGif);
            }
        });
    }
    tweenHaveBorder(indexGif){
        const {sprite, nameSheet } = this.arGif[indexGif];
        this.tweenellipse();
        this.tweenMaskBorderLayer2();
        this.tweenArc(() => {
            this.gifSprite.setAlpha(1);
            this.tweenOverLayMask(this.arcLayer, () => {
                this.gifSprite.anims.play(nameSheet);
            });
            this.tweenBox(this.boxContentTexture, 0);
            this.tweenOverLayMask(this.shadowEllipseTexture);
            this.tweenOverLayMask(this.borderMaskLayer);
        });
    }
    tweenNoBorder(indexGif){
        const {sprite, nameSheet } = this.arGif[indexGif];
        this.gifSprite.setAlpha(1);
        this.tweenOverLayMask(this.arcLayer, () => {
            this.gifSprite.anims.play(nameSheet);
        });
        this.tweenBox(this.boxContentTexture, 0);
        this.tweenOverLayMask(this.shadowEllipseTexture);
        this.tweenOverLayMask(this.borderMaskLayer);
    }
    circleEffect(){
        const gifLayer = TexturesPosition[this.posGif];
        this.graphicEllipse = this.scene.add.graphics();
        this.containerGif.add(this.graphicEllipse);
        // x, y, xRadius, yRadius, startAngle, endAngle, clockwise, rotation
        this.pathCircle = new Phaser.Curves.Ellipse(gifLayer.x, gifLayer.y, gifLayer.border.r, gifLayer.border.r, 270, 270, false);
        this.diamondFollower = {
            t : 0,
            vec: new Phaser.Math.Vector2(),
        }
        this.pathCircle.getPoint(this.diamondFollower.t, this.diamondFollower.vec);
        this.polygonIcon = this.scene.add.sprite(this.diamondFollower.vec.x, this.diamondFollower.vec.y, 'polygon');
        this.polygonIcon.defaultPos = {x : this.diamondFollower.vec.x, y : this.diamondFollower.vec.y};
        this.polygonIcon.setAlpha(0);
        this.containerGif.add(this.polygonIcon);
        this.graphicsArc = this.scene.add.graphics();
    }
    updateAnimateEllipse(){
        if(!this.startEffectArc) return false;
        this.graphicEllipse.clear();
        this.pathCircle.getPoint(this.diamondFollower.t, this.diamondFollower.vec);
        this.polygonIcon.x = this.diamondFollower.vec.x;
        this.polygonIcon.y = this.diamondFollower.vec.y;
    }
    maskBorderLayer2(){
        const gifLayer = TexturesPosition[this.posGif];
        this.arcLayer2 = this.scene.make.graphics();
        //  Create a hash shape Graphics object
        //this.arcLayer2.fillStyle(0xff0000);
        this.arcLayer2.slice(gifLayer.x, gifLayer.y, gifLayer.border.r + 25, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(270), false);
        this.arcLayer2.fillPath();
        this.maskborderLayer2Geom = this.arcLayer2.createGeometryMask();
        this.containerGif.add(this.arcLayer2);
    }
    shadowEllipseLayer(){
        const gifLayer = TexturesPosition[this.posGif]['shadowEllipse'];
        this.shadowEllipseTexture = this.scene.add.sprite(gifLayer.x, gifLayer.y,'shadowEllipse');
        this.shadowEllipseTexture.setAlpha(0);
        this.containerGif.add(this.shadowEllipseTexture);
    }

    borderLayer2(){
        const gifLayer = TexturesPosition[this.posGif];
        this.borderArcTexture2 = this.scene.add.sprite(gifLayer.x, gifLayer.y , 'dotArcBorder2');
        this.borderArcTexture2.setMask(this.maskborderLayer2Geom);
        this.containerGif.add(this.borderArcTexture2);
    }
    tweenOverLayMask(layer, onComplete){
        var tween = TweenMax.to(layer, 0.75, {
            alpha : 1,
            angle : 0,
            ease : Back.easeOut.config(1),
            yoyo: true,
            onComplete : () => {onComplete ? onComplete() : '';}
        });
    }
    tweenMaskBorderLayer2(){
        const gifLayer = TexturesPosition[this.posGif];
        var easingRange = {t : 270};
        this.maskBorderLayer2Ease = this.scene.tweens.add({
            targets : easingRange,
            t : 270 + 360,
            ease : 'Sine.easeInOut',
            duration : 1000,
            //yoyo : true,
            onUpdate : () => {
                this.arcLayer2.clear();
                this.arcLayer2.slice(gifLayer.x, gifLayer.y, gifLayer.border.r + 25, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(easingRange.t), false);
                this.arcLayer2.fillPath();
            }
        })
    }
    tweenellipse(){
        this.polygonEase1 = this.scene.tweens.add({
            targets: this.diamondFollower,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 100,
        });
    }
    tweenArc(onCompleteCallback){
        var tweenPathCircle = this.scene.tweens.add({
            targets: this.pathCircle,
            endAngle : 360 + 270,
            ease: 'Sine.easeInOut',
            duration: 1000,
            onComplete : () => {
                onCompleteCallback();
                tweenPathCircle.remove();
                this.tweenPolygonReRun();
            }
        });
    }
    tweenPolygonReRun(){
        this.diamondFollower.t = 0;
        this.polygonEase2 = this.scene.tweens.add({
            targets: this.diamondFollower,
            t: 1,
            ease: 'linear',
            duration: 4000,
            repeat: -1,
        });
    }
    tweenBox(layer, delay){
        var tween = TweenMax.to(layer, 0.5, {
            x : layer.x + 25,
            alpha : 1,
            ease : Power1.easeInOut,
            yoyo: true,
            delay : delay
        });
    }
    tweenHideLayerGif(onComplete){
        var tween = TweenMax.to(this.containerGif, 0.5, {
            alpha : 0,
            ease : Power1.easeInOut,
            onComplete : () => {onComplete()}
        });
    }
    tweenShowLayerGif(onComplete){
        var tween = TweenMax.to(this.containerGif, 0.5, {
            alpha : 1,
            ease : Power1.easeInOut,
            onComplete : () => {onComplete()}
        });
    }
}
