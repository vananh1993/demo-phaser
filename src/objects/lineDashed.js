import TexturesPosition from "../config/positionTextures.js";
import config from "../config/config.js";
import 'phaser';
import TextLineDashed from "./textLineDashed.js";
export default class LineDashed extends Phaser.GameObjects.Container {
    constructor(scene, group, nameText ,startAngle, duration){
        super(scene);
        this.fillStyleLine = 0xffffff;
        this.isDebug = false;
        this.groupContain = group;
        this.scene = scene;
        this.startAngle = startAngle;
        this.duration = duration;
        this.nameText = nameText,
        this.paused = false;
        this.init();
    }
    init(){
        this.drawLineDashedIn();
        this.drawLineDashedOut();
        this.diamondLine();
        this.drawPathArc();
        this.TextOnLine = new TextLineDashed(this.scene, this.groupContain, this.nameText);
        //this.tweenFollowArcToDrawLine();
        this.hide();
    }
    drawPathAndDashed(from, to, graphics, spacePoints = 33){
        this.pathCurve = new Phaser.Curves.Line(
            this.makeVector2(from.x, from.y),
            this.makeVector2(to.x, to.y)
        );
        if(this.isDebug){
            graphics.lineStyle(1, 0x000000, 1);
            this.pathCurve.draw(graphics);
        }
        var pointSpace = this.pathCurve.getSpacedPoints(spacePoints);
        this.loopDrawDash(pointSpace, graphics);
    }
    drawLineDashedIn(){
        const { diaperBobbyBorder, dashedLineBobby } = TexturesPosition;
        const from = {
            x : diaperBobbyBorder.x,
            y : diaperBobbyBorder.y
        };
        const to = {
            x : diaperBobbyBorder.x,
            y : diaperBobbyBorder.y - dashedLineBobby.lineIn
        };
        this.graphicsLine = this.scene.add.graphics();
        this.drawPathAndDashed(from, to, this.graphicsLine);
        this.graphicsLine.setAlpha(0);
        this.groupContain.add(this.graphicsLine);
    }
    redrawLineDashedIn(to){
        const { diaperBobbyBorder, dashedLineBobby} = TexturesPosition;
        this.graphicsLine.clear();
        const _from = {x : diaperBobbyBorder.x, y : diaperBobbyBorder.y};
        const _to = {x : to.x, y : to.y};
        this.drawPathAndDashed(_from, _to, this.graphicsLine);
    }
    drawPathArc(){
        const { diaperBobbyBorder, arcFollowBorderBobby } = TexturesPosition;
        this.graphicsArcPath = this.scene.add.graphics();
        this.graphicsArcPath.beginPath();
        this.pathArc = new Phaser.Curves.Path();
        this.pathArc.add(new Phaser.Curves.Ellipse(
            diaperBobbyBorder.x,
            diaperBobbyBorder.y,
            arcFollowBorderBobby.radius,
            arcFollowBorderBobby.radius,
            this.startAngle, 270, true
        ));
        this.graphicsArcPath.closePath();
        if(this.isDebug){
            this.graphicsArcPath.lineStyle(1, 0x000000, 1);
            this.pathArc.draw(this.graphicsArcPath);
        }
    }
    reDrawPathArc(follower){
        this.graphicsArcPath.clear();
        this.pathArc.getPoint(follower.t, follower.vec);
        if(this.isDebug){
            this.graphicsArcPath.fillStyle(0xff0000, 1);
            this.graphicsArcPath.fillCircle(follower.vec.x, follower.vec.y, 4);
        }
        if(this.isDebug){
            this.graphicsArcPath.lineStyle(1, 0x000000, 1);
            this.pathArc.draw(this.graphicsArcPath);
        }
    }
    tweenFollowArcToDrawLine(onComplete){
        this.follower = { t : 0, vec : new Phaser.Math.Vector2};
        this.tweenRotateLine = this.scene.tweens.add({
            targets : this.follower,
            t : 1,
            duration : this.duration*1000,
            ease : 'linear',
            //repeat : -1,
            onUpdate : () => {
                this.show();
                this.reDrawPathArc(this.follower);
                this.redrawLineDashedIn(this.follower.vec);
                this.redrawLineDashedOut(this.follower.vec);
            },
            onComplete : () => {
                this.hide();
                onComplete ? onComplete() : '';
            }
        });
    }
    pause(){
        this.paused = true;
        this.tweenRotateLine.pause();
    }
    resume(){
        this.paused = false;
        this.tweenRotateLine.resume();
    }
    makeVector2(x, y){
        return new Phaser.Math.Vector2(x, y)
    }
    loopDrawDash(points, graphics){
        for (var i = 0; i < points.length - 1; i+=2)
        {
            var line = new Phaser.Geom.Line(
                points[i].x,
                points[i].y,
                points[i + 1].x,
                points[i + 1].y);
            graphics.lineStyle(2, this.fillStyleLine);
            graphics.strokeLineShape(line);
            //this.graphicsLine.setAlpha(0.25);
        }
    }
    drawLineDashedOut(){
        const { diaperBobbyBorder, dashedLineBobby } = TexturesPosition;
        const from = {
            x : diaperBobbyBorder.x,
            y : diaperBobbyBorder.y - dashedLineBobby.lineIn + 9
        };
        const to = {
            x : diaperBobbyBorder.x + dashedLineBobby.lineOut,
            y : diaperBobbyBorder.y - dashedLineBobby.lineIn + 9
        };
        this.graphicsLineOut = this.scene.add.graphics();
        this.graphicsLineOut.setAlpha(0);
        this.drawPathAndDashed(from, to, this.graphicsLineOut);
        this.groupContain.add(this.graphicsLineOut);
    }
    redrawLineDashedOut(from){
        const { diaperBobbyBorder, dashedLineBobby } = TexturesPosition;
        this.graphicsLineOut.clear();
        const _from = {
            x : from.x,
            y : from.y
        };
        const _to = {
            x : from.x + dashedLineBobby.lineOut,
            y : from.y
        };
        this.drawPathAndDashed(_from, _to, this.graphicsLineOut, 18);
        this.rePosDiamondLine(_to.x, _to.y);
        this.TextOnLine.updatePosText(_to.x, _to.y);
    }
    diamondLine(){
        this.diamondAtLineOut = this.scene.add.sprite(config.width/2, config.height/2, 'polygonBobby');
        this.groupContain.add(this.diamondAtLineOut);
        this.diamondAtLineOut.setAlpha(0);
    }
    rePosDiamondLine(x, y){
        this.diamondAtLineOut.x = x;
        this.diamondAtLineOut.y = y;
    }
    show(){
        this.graphicsLineOut.setAlpha(1);
        this.graphicsLine.setAlpha(1);
        this.diamondAtLineOut.setAlpha(1);
        this.TextOnLine.setAlpha(1);
    }
    hide(){
        this.graphicsLineOut.setAlpha(0);
        this.graphicsLine.setAlpha(0);
        this.diamondAtLineOut.setAlpha(0);
        this.TextOnLine.hide(0);
    }
}
