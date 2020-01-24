define(function () {

    let soundPlayer = {
        audio: null,
        muted: false,
        playing: false,
        _ppromis: null,
        puse: function () {
            this.audio.pause();
        },
        play: function (file) {
            if (this.muted) {
                return false;
            }
            if (!this.audio && this.playing === false) {
                this.audio = new Audio(file);
                this._ppromis = this.audio.play();
                this.playing = true;

                if (this._ppromis !== undefined) {
                    this._ppromis.then(function () {
                        soundPlayer.playing = false;
                    });
                }

            } else if (!this.playing) {
                this.playing = true;
                this.audio.src = file;
                this._ppromis = soundPlayer.audio.play();
                this._ppromis.then(function () {
                    soundPlayer.playing = false;
                });
            }
        }
    };

    return {
        playAudio: soundPlayer
    }
});