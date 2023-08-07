/**
 * Created by CLIMAX PRODUCTION on 7/2/2019.
 */
import Phaser from 'phaser';
import config from "../config/config.js";
import UI from "../config/ui.js";
class PreloaderScene extends Phaser.Scene {
    constructor () {
        super('Preloader');
        this.diamondGroup = [];
        this.textLoading;
        this.sizeText = {w : 82, h : 26};
    }
    preload(){
        this.groupDiamond();
        this.loadingText();
        this.loadUI();
    }
    groupDiamond(){
        for(let i = 0 ; i < 5; i++){
            this.launch(i, 5);
        }
        this.animateGroup(this.diamondGroup);
    }
    loadingText(){
        this.textLoading = this.add.image(config.width/2 + 7, config.height/2, 'textLoading');
        this.textLoading.setOrigin(0.5);
    }
    launch(i, length){
        var size = {w : 19, h : 25};
        var icon = this.add.image(config.width/2 + i*(17 + size.w) - length*(17 + size.w/2)/2, config.height/2 - this.sizeText.h - 10, 'diamond_icon');
        icon.setDisplaySize(size.w, size.h);
        icon.setOrigin(0.5);
        this.diamondGroup.push(icon);
    }
    animateGroup(group){
        for(var i = 0 ; i < group.length; i++){
            var icon = group[i];
            var tween = TweenMax.to(icon, 2, {
                alpha: 0,
                delay: i * 0.0625,
                ease: Power1.easeInOut,
                repeat: -1,
                yoyo: true
            });
        }
    }
    destroyGroupDiamond(){
        for(var i = 0 ; i < this.groupDiamond.length; i++){
            var icon = this.group[i];
            icon.destroy();
        }
    }
    loadUI(){
        this.load.on('fileprogress', function (file) {
            //console.log(file);
        })
        this.load.on('complete', () => {
            this.destroyGroupDiamond();
            setTimeout(() => {
                this.textLoading.destroy();
                this.ready();
            }, 2000);
        });
        // load assets needed in our game
        let textures = UI.textures;
        let images = UI.images;
        let audio = UI.audio;
        let spriteSheets = UI.spriteSheets;
        for(let i = 0 ; i < textures.length;  i++){
            this.load.image(textures[i].name, textures[i].src);
        };

        for(let j = 0 ; j < images.length;  j++){
            this.load.image(images[j].name, images[j].src);
        };

        for(let z = 0 ; z < audio.length;  z++){
            this.load.audio(audio[z].name, audio[z].src);
        };
        for(let n = 0 ; n < spriteSheets.length;  n++){
            this.load.multiatlas(spriteSheets[n].name, spriteSheets[n].json, spriteSheets[n].folderFrames);
        };
    }
    ready () {
        this.scene.start('Play');
    }
    create () {
        //this.scene.start('Title');
    }
}
export default PreloaderScene;
