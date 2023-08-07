import TexturesPosition from "../config/positionTextures.js";
import config from "../config/config.js";
import LineDashed from "../objects/lineDashed.js";
import GifLayer from '../objects/gifLayer.js';
import 'phaser';
export default class DiaperBobby extends Phaser.GameObjects.Container {
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.model = this.scene.sys.game.globals.model;
        this.gifLayer = '';
        this.sortGifFinal = this.model.sortGifFinal;
        this.init();
    }
    init(){
        this.containerDiaperBobbyBlock();
        this.lineDashedComponent();
        this.diaperBobbyComponent();
        this.diaperGridComponent();
        this.maskArcGrid();
        this.borderCircleDiaper();
        this.gifLayerFinal();
    }
    setGifLayer(gifLayer){
        this.gifLayer = gifLayer;
    }
    containerDiaperBobbyBlock(){
        this.containerDiaperBobby = this.scene.add.container(0, 0).setName('containDiaperBobby');
        this.containerDiaperBobby.setVisible(false);
    }
    showContainer(){
        this.containerDiaperBobby.setVisible(true);
    }
    lineDashedComponent(){
        //this, contain, nameText, startAngle, delay
        this.lineDashedTextThamNhanh = new LineDashed(this.scene, this.containerDiaperBobby, 'textThamNhanh', 360-30, 1.75);
        this.lineDashedTextDanDeu = new LineDashed(this.scene, this.containerDiaperBobby, 'textDanDeu',0, 5);
        this.lineDashedTextKhoaChat = new LineDashed(this.scene, this.containerDiaperBobby, 'textKhoaChat',80, 7.75);
    }
    gifLayerFinal(){
        this.gifLayerThamNhanh = new GifLayer(this.scene, this.sortGifFinal['thamNhanh'], 'arGifFinal', 'gifLayerFinalPosition', this.containerDiaperBobby);
        this.gifLayerDanDeu = new GifLayer(this.scene, this.sortGifFinal['danDeu'], 'arGifFinal', 'gifLayerFinalPosition', this.containerDiaperBobby);
        this.gifLayerKhoaChat = new GifLayer(this.scene, this.sortGifFinal['KhoaChat'], 'arGifFinal', 'gifLayerFinalPosition', this.containerDiaperBobby);
    }
    diaperBobbyComponent(){
        const { diaperBobby } = TexturesPosition;
        this.diaperBobbyTexture = this.scene.add.sprite(diaperBobby.x, diaperBobby.y, 'diaperBobby');
        this.diaperBobbyTexture.setAlpha(0);
        this.diaperBobbyTexture.setScale(2, 2);
        this.containerDiaperBobby.add(this.diaperBobbyTexture);
    }
    diaperGridComponent(){
        const { diaperBobbyGrid } = TexturesPosition;
        this.diaperBobbyGridTexture = this.scene.add.sprite(diaperBobbyGrid.x, diaperBobbyGrid.y, 'gridDiaper');
        this.diaperBobbyGridTexture.setAlpha(0);
        this.diaperBobbyGridTexture.y = diaperBobbyGrid.y + 15;
        this.diaperBobbyGridTextureOverLay = this.scene.add.sprite(diaperBobbyGrid.x, diaperBobbyGrid.y, 'gridDiaperOverLay');
        this.containerDiaperBobby.add(this.diaperBobbyGridTexture);
        this.containerDiaperBobby.add(this.diaperBobbyGridTextureOverLay);
    }
    maskArcGrid(){
        const { diaperBobbyGrid } = TexturesPosition;
        this.geomArc = this.scene.make.graphics();
        this.geomArc.slice(diaperBobbyGrid.x, diaperBobbyGrid.y - 100, 0, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true);
        //this.geomArc.fillPath();
        this.maskArc = this.geomArc.createGeometryMask();
        this.diaperBobbyGridTextureOverLay.setMask(this.maskArc);
    }
    borderCircleDiaper(){
        const { diaperBobbyBorder } = TexturesPosition;
        this.borderDiaperBobbyTexture = this.scene.add.sprite(diaperBobbyBorder.x, diaperBobbyBorder.y, 'borderDiaperBobby');
        this.borderDiaperBobbyTexture.setScale(0.5).setAlpha(0);
        this.containerDiaperBobby.add(this.borderDiaperBobbyTexture);
    }
    tweenBorderDiaper(){
        var tween = TweenMax.to(this.borderDiaperBobbyTexture, 0.75, {
            alpha: 1,
            scale : 1,
            delay : 2.15,
            ease: Power2.easeInOut,
            yoyo: true,
        });
        this.tweenRotateBorderDiaper = TweenMax.to(this.borderDiaperBobbyTexture, 10, {
            angle : -360,
            delay : 2.15,
            ease: Power0.easeNone,
            repeat: -1,
        });
    }
    tweenMaskGrid(){
        const { diaperBobbyGrid } = TexturesPosition;
        var easingObj = {t : 0, a : 1};
        var tweenGrid = this.scene.tweens.add({
            targets : easingObj,
            t : 200,
            a : 0,
            ease : 'Sine.easeInOut',
            repeat : -1,
            duration : 2000,
            onUpdate : () => {
                this.geomArc.clear();
                this.geomArc.slice(diaperBobbyGrid.x, diaperBobbyGrid.y - 100, easingObj.t, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true);
                this.geomArc.fillPath();
                this.diaperBobbyGridTextureOverLay.setAlpha(easingObj.a);
            }
        })
    }
    tweenFadeInDiaperBobby(){
        const { diaperBobby } = TexturesPosition;
        var tween = TweenMax.to(this.diaperBobbyTexture, 0.75, {
            alpha : 1,
            scale : 1,
            delay : 2,
            ease: Back.easeOut.config(1.15),
            onComplete : () => {
                this.tweenGridDiaperLayer1()
            }
        });
    }
    tweenGridDiaperLayer1(){
        const { diaperBobbyGrid } = TexturesPosition;
        var tween = TweenMax.to(this.diaperBobbyGridTexture, 0.75, {
            alpha: 1,
            y : diaperBobbyGrid.y,
            ease: Back.easeOut.config(1.15),
            yoyo: true,
            onComplete : () => {
                this.tweenMaskGrid()
                this.lineDashedTextThamNhanh.tweenFollowArcToDrawLine(() => {
                    this.lineDashedTextDanDeu.pause();
                    this.lineDashedTextKhoaChat.pause();
                    this.tweenRotateBorderDiaper.pause();
                    this.gifLayerThamNhanh.showMask(this.sortGifFinal['thamNhanh'], true);
                });
                this.lineDashedTextDanDeu.tweenFollowArcToDrawLine(() => {
                    this.lineDashedTextKhoaChat.pause();
                    this.tweenRotateBorderDiaper.pause();
                    this.gifLayerDanDeu.showMask(this.sortGifFinal['danDeu'], true);
                });
                this.lineDashedTextKhoaChat.tweenFollowArcToDrawLine(() => {
                    this.tweenRotateBorderDiaper.pause();
                    this.gifLayerKhoaChat.showMask(this.sortGifFinal['KhoaChat'], true);
                });
            }
        });
    }
    update(){
        this.gifLayerDanDeu.resumeLayer(() => {
            this.lineDashedTextKhoaChat.resume();
            this.tweenRotateBorderDiaper.resume();
        });
        this.gifLayerThamNhanh.resumeLayer(() => {
            this.lineDashedTextDanDeu.resume();
            this.lineDashedTextKhoaChat.resume();
            this.tweenRotateBorderDiaper.resume();
        });
        this.gifLayerKhoaChat.resumeLayer(() => {
            this.tweenRotateBorderDiaper.resume();
            this.doneApp();
        });
    }
    doneApp(){
        window.ycpn = true;
        if(window.closeAppEvent){
            window.closeAppEvent();
        }
    }
}
