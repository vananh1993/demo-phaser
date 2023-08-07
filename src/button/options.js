/**
 * Created by CLIMAX PRODUCTION on 7/4/2019.
 */
const btnOptions = function(){
    this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.optionsButton);

    this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.optionsText, this.optionsButton);

    this.optionsButton.on('pointerdown', function (pointer) {
        this.scene.start('Options');
    }.bind(this));
};
export default btnOptions;