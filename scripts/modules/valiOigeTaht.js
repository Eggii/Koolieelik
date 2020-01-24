define(["constants", 'modules/nav', 'modules/audio'], function (CONSTANTS, nav, audio) {
    return {
        main: function (params) {
            let randomLetter;
            nav.navigation(document.body);

            const ALPHABET = CONSTANTS.ALPHABET,
                lettersContainer = $("#letters"),
                inpLetter = $("#inpLetter"),
                btnKirjutaOigeTaht = $("#btnKirjutaOigeTaht"),
                btnValiSuvalineTaht = $("#btnValiSuvalineTaht"),
                btnVastus = $("#btnVastus"),
                btnKordaTaht = $("#btnKordaTaht")

            for (i = 0; i < ALPHABET.length; i++) {
                let node = $("<div>", { "class": "grid-item letter btn btn-lg" });

                if (params.objCase) {
                    node.html(ALPHABET[i].toLocaleUpperCase());
                }
                else {
                    node.html(ALPHABET[i]);
                }
                node.css({ "font-size": "1em" });
                node.on("mousedown", function(){
                    $(this).css({"color": "red"});
                });
                node.on("mouseup", function(){
                    $(this).css({"color": "black"});
                });
                node.on('click', function (e) {
                    if (randomLetter) {
                        inpLetter.val(e.target.innerText);
                        validateInput();
                    }
                    else {
                        audio.src = 'audio/titles/vali_suvaline_taht.wav';
                        audio.playAudio.play(audio.src);
                    }
                });
               
                lettersContainer.append(node);
            }

            btnKirjutaOigeTaht.on("click", function () {
                audio.src = 'audio/titles/kirjuta_oige_taht.wav';
                audio.playAudio.play(audio.src);
            });

            btnValiSuvalineTaht.on("click", function () {
                randomLetter = CONSTANTS.ALPHABET[Math.floor(Math.random() * CONSTANTS.ALPHABET.length)];

                audio.src = 'audio/alphabet/' + randomLetter + '.wav';
                audio.playAudio.play(audio.src);

                inpLetter.focus().val("");
            });

            $(document).on('keyup', function (e) {
                if (randomLetter) {
                    if (params.objCase) {
                        inpLetter.val(e.key.toLocaleUpperCase());
                    }
                    else {
                        inpLetter.val(e.key);
                    }
                    validateInput();
                }
                else {
                    audio.src = 'audio/titles/vali_suvaline_taht.wav';
                    audio.playAudio.play(audio.src);
                }
                inpLetter.css({ "color": "black" });

                $(".letter").each(function () {
                    if (e.key === $(this).html() || e.key.toLocaleUpperCase() === $(this).html().toLocaleUpperCase())
                        $(this).css({ "color": "black" });
                });
                return false;
            });

            $(document).on("keydown", function (e) {
                $(".letter").each(function () {
                    if (e.key === $(this).html() || e.key.toLocaleUpperCase() === $(this).html().toLocaleUpperCase())
                        $(this).css({ "color": "blue" });
                });
            });

            inpLetter.on("click", function (e) {
                $(this).val("");
            });

            btnVastus.on("click", function () {
                if ($(this).is(':contains("VASTUS ON ÕIGE")')) {
                    audio.src = 'audio/titles/vastus_on_oige.wav';
                    audio.playAudio.play(audio.src);
                }
                else {
                    audio.src = 'audio/titles/vastus_on_vale.wav';
                    audio.playAudio.play(audio.src);
                }
            });

            btnKordaTaht.on("click", function () {
                if (randomLetter) {
                    audio.src = 'audio/alphabet/' + randomLetter + '.wav';
                    audio.playAudio.play(audio.src);
                }
                else {
                    audio.src = 'audio/titles/vali_suvaline_taht.wav';
                    audio.playAudio.play(audio.src);
                }
                inpLetter.focus().val("");
            });

            function validateInput() {
                let addbtnVastus = function(param){
                    btnVastus.show();
                    btnVastus.text(param.text);
                    btnVastus.append(param.element);
                    audio.src = param.src;
                    audio.playAudio.play(audio.src);
                }
                if (inpLetter.val().toLowerCase() == randomLetter) {
                    addbtnVastus({
                        text: "VASTUS ON ÕIGE",
                        element: '<img src="images/smiley_PNG131.png" alt="Kuula"style="height: 2em; width: auto; display: inline-block; vertical-align: middle;"></img>',
                        src: "audio/titles/vastus_on_oige.wav"
                    });
                }
                else {
                    addbtnVastus({
                        text: "VASTUS ON VALE",
                        element: '<img src="images/smiley_PNG175.png" alt="Kuula"style="height: 2em; width:auto display: inline-block; vertical-align: middle;"></img>',
                        src: "audio/titles/vastus_on_vale.wav"
                    });
                }
            }
        }
    }
});