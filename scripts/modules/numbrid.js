require(["modules/nav", 'modules/audio'], function (nav, audio) {
    nav.navigation(document.body);

    const btnVajutaKlaviatuurilNumbrileJaKuula = $("#btnVajutaKlaviatuurilNumbrileJaKuula"),
        btnVajutaHiiregaNumbrileJaKuula = $("#btnVajutaHiiregaNumbrileJaKuula");
    let numbrid = $("#numbrid");

    let i = 0, j = 0;
    for (i = 0; i < 11; i++) {
        let div = $("<div>", { "class": "btn btn-primary btn-lg m-1" });
        div.css('font-size', "4em");

        let span = $("<span>", { id: i, "class": "number d-block" });
        span.html(i);
        span.on("click", function (e) {
            audio.src = "audio/numbers/" + e.target.id + ".wav";
            audio.playAudio.play(audio.src);
        });

        span.on("mousedown", function (e) {
            e.target.style.color = "red";
        });
        span.on("mouseup", function (e) {
            e.target.style.color = "white";
        });

        div.append(span);

        if (i <= 5) {
            let img = $("<img>", { "src": "images/fingers/" + i + ".png", "class": "h-1-5-em" });
            div.append(img);
        }
        if (i > 5) {
            j++;
            let img = $("<img>", { "src": "images/fingers/5.png", "class": "h-1-5-em" });
            let img2 = $("<img>", { "src": "images/fingers/" + j + ".png", "class": "h-1-5-em" });

            div.append(img);
            div.append(img2);
        }
        numbrid.append(div);
    }

    btnVajutaKlaviatuurilNumbrileJaKuula.on("click", function () {
        audio.src = 'audio/titles/vajuta_klaviatuuril_numbrile_ja_kuula.wav';
        audio.playAudio.play(audio.src);
    });

    btnVajutaHiiregaNumbrileJaKuula.on("click", function () {
        audio.src = 'audio/titles/vajuta_hiirega_numbrile_ja_kuula.wav';
        audio.playAudio.play(audio.src);
    });

    let keysPressed = {};
    $(document).on('keydown', (e) => {
        let n0 = $("#0");
        let n1 = $("#1");
        let n10 = $("#10");

        keysPressed[event.key] = true;
        numbers = $(".number");
        numbers.each(function () {
            if (keysPressed['1'] && keysPressed['0']) {
                n0.css("color", "white");
                n1.css("color", "white");
                n10.css("color", "red");
                audio.src = 'audio/numbers/10.wav';
                audio.playAudio.play(audio.src);
            }
            if (e.key === $(this).text()) {
                $(this).css("color", "red");
                audio.src = 'audio/numbers/' + $(this).text() + '.wav'
                audio.playAudio.play(audio.src);
            }
        });
    });

    $(document).on('keyup', (e) => {
        let n10 = $("#10");

        if (keysPressed['1'] && keysPressed['0']) {
            n10.css("color", "white");
        }
        numbers.each(function () {
            if (e.key === $(this).text()) {
                $(this).css("color", "white");
            }
        });
        delete keysPressed[e.key];
    });
});