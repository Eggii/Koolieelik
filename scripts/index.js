require(["modules/nav", 'modules/carousel', "modules/audio", "constants"], function (nav, carousel, audio, CONSTANTS) {
    nav.navigation(document.body);
    carousel.carousel("#carousel");

    const ALPHABET = CONSTANTS.ALPHABET,
        letters = $("#letters"),
        btnVajutaKlaviatuurilTaheleJaKuula = $("#btnVajutaKlaviatuurilTaheleJaKuula"),
        btnVajutaHiiregaTaheleJaKuula = $("#btnVajutaHiiregaTaheleJaKuula");
    let letter, node;

    for (i = 0; i < ALPHABET.length; i++) {
        node = $("<div>", { "class": "grid-item letter btn", "data-letter": ALPHABET[i] });
        letter = ALPHABET[i].toLocaleUpperCase();
        node.html(letter);
        node.css({ "font-size": "1em" });
        node.on("click", function () {
            audio.src = 'audio/alphabet/' + $(this).data("letter") + '.wav';
            audio.playAudio.play(audio.src);
        });
        node.on("mousedown", function (e) {
            e.target.style.color = "red";
        });
        node.on("mouseup", function (e) {
            e.target.style.color = "black";
        });

        let img = $("<img>", { "src": "images/alphabet_images/" + ALPHABET[i] + ".png", "class": "img1", "data-letter": ALPHABET[i] });
        node.append(img);
        letters.append(node);
    }

    //Action with keyboard
    $(document).on('keydown', function (e) {
        letter = $(".letter");

        letter.each(function () {
            if (e.key === $(this).text().toLocaleLowerCase()) {
                $(this).css({ "color": "red" });
            }
        });
    });

    $(document).on('keyup', function (e) {
        letter = $(".letter");

        letter.each(function () {
            if (e.key === $(this).text().toLocaleLowerCase()) {
                $(this).css({ "color": "black" });
                audio.src = 'audio/alphabet/' + $(this).text().toLocaleLowerCase() + '.wav'
                audio.playAudio.play(audio.src);
            }
        });
    });

    btnVajutaKlaviatuurilTaheleJaKuula.on("click", function () {
        audio.src = 'audio/titles/vajuta_klaviatuuril_tahele_ja_kuula.wav';
        audio.playAudio.play(audio.src);
    });

    btnVajutaHiiregaTaheleJaKuula.on("click", function () {
        audio.src = 'audio/titles/vajuta_hiirega_tahele_ja_kuula.wav';
        audio.playAudio.play(audio.src);
    });
});