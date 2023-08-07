/**
 * Created by CLIMAX PRODUCTION on 7/4/2019.
 */
class Model{
    constructor(){
        this._completed = false;
        this._soundOn = false;
        this._musicOn = false;
        this._bgMusicPlaying = false;
        this._repeatGif = 0;
        this._score = 0;
        this._debugGif = false;
        this._sortGifFinal = {
            thamNhanh : 0,
            danDeu : 1,
            KhoaChat : 2
        };
        this._sortType = ['diamondThamNhanh', 'diamondDanDeu', 'diamondKhoaChat'];
        this._typeStage = {
            'diamondThamNhanh' : 'diaperPlay-stage1',
            'diamondDanDeu'    : 'diaperPlay-stage2',
            'diamondKhoaChat'  : 'diaperPlay-stage3'
        };
        this._arGif = [
            {
                sprite : "gifSpriteDanDeu",
                nameSheet : "sheetDanDeu",
                name : "sheetDanDeu",
                start : 0,
                end : 84,
                zeroPad : 2,
                prefix : '',
                suffix : '.png',
                firstFrameName : '00.png',
                frameRate : 30,
                scaleX : 1.6,
                scaleY : 1.6,
                boxContent : 'boxDanDeu',
            },
            {
                sprite : "gifSpriteThamNhanh",
                nameSheet : "sheetThamNhanh",
                name : "sheetThamNhanh",
                start : 0,
                end : 56,
                zeroPad : 2,
                prefix : '',
                suffix : '.png',
                firstFrameName : '00.png',
                frameRate : 30,
                scaleX : 1.6,
                scaleY : 1.6,
                boxContent : 'boxThamNhanh',
            },
            {
                sprite : "gifSpriteKhoaChat",
                nameSheet : "sheetKhoaChat",
                name : "sheetKhoaChat",
                start : 0,
                end : 63,
                zeroPad : 2,
                prefix : '',
                suffix : '.png',
                firstFrameName : '00.png',
                frameRate : 30,
                scaleX : 1.6,
                scaleY : 1.6,
                boxContent : 'boxKhoaChat',
            }
        ];
        this._arGifFinal = [
            {
                sprite : "gifSpriteThamNhanh",
                nameSheet : "sheetThamNhanhFinal",
                name : "sheetThamNhanh",
                start : 0,
                end : 84,
                zeroPad : 2,
                prefix : '',
                suffix : '.png',
                firstFrameName : '00.png',
                frameRate : 30,
                scaleX : 1.6,
                scaleY : 1.6,
                boxContent : 'boxThamNhanhFinal',
            },
            {
                sprite : "gifSpriteDanDeu",
                nameSheet : "sheetDanDeuFinal",
                name : "sheetDanDeu",
                start : 0,
                end : 56,
                zeroPad : 2,
                prefix : '',
                suffix : '.png',
                firstFrameName : '00.png',
                frameRate : 30,
                scaleX : 1.6,
                scaleY : 1.6,
                boxContent : 'boxDanDeuFinal',
            },
            {
                sprite : "gifSpriteKhoaChat",
                nameSheet : "sheetKhoaChatFinal",
                name : "sheetKhoaChat",
                start : 0,
                end : 63,
                zeroPad : 2,
                prefix : '',
                suffix : '.png',
                firstFrameName : '00.png',
                frameRate : 30,
                scaleX : 1.6,
                scaleY : 1.6,
                boxContent : 'boxKhoaChatFinal',
            }
        ];
    }
    get debugGif(){
        return this._debugGif;
    }
    get typeStage(){
        return this._typeStage;
    }
    get sortGifFinal(){
        return this._sortGifFinal;
    }
    get repeatGif(){
        return this._repeatGif;
    }
    get sortType(){
        return this._sortType;
    }
    get arGif(){
        return this._arGif;
    }
    get arGifFinal(){
        return this._arGifFinal;
    }
    get completed(){
        return this._completed;
    }
    get score(){
        return this._score;
    }
    set score(value){
        this._score = value;
    }
    set musicOn(value) {
        this._musicOn = value;
    }
    get musicOn() {
        return this._musicOn;
    }
    set soundOn(value) {
        this._soundOn = value;
    }
    get soundOn() {
        return this._soundOn;
    }
    set bgMusicPlaying(value) {
        this._bgMusicPlaying = value;
    }
    get bgMusicPlaying() {
        return this._bgMusicPlaying;
    }
}

export default Model;
